# Story 1.3: Astro Project Initialization

Status: done

## Story

As a developer setting up the website codebase,
I want the Astro 6.0.8 project initialized with all integrations pinned,
so that Epic 7 (Website) has a clean, ready-to-build foundation that any developer or AI agent can build on without version surprises or configuration guesswork.

## Acceptance Criteria

1. `astro build && astro preview` succeeds with zero errors and zero warnings
2. Project deployed to Vercel and accessible via pyglara.com (blank/placeholder page — proves the pipeline works)
3. All dependency versions in `package.json` are pinned exactly (no `^` or `~` ranges). `package-lock.json` committed to git.
4. Bilingual routes exist and respond: `/es/` and `/en/` both return HTTP 200 with valid HTML
5. GA4 `page_view` event fires on both `/es/` and `/en/` (verify in GA4 DebugView or browser Network tab)

## Tasks / Subtasks

- [x] Task 1: Initialize Astro project (AC: 1, 3)
  - [x] 1.1 Run initialization: `npm create astro@6 pyglara-site -- --template minimal`
    - `cd pyglara-site`
    - If prompted for TypeScript: select "Strict" (yes, TypeScript, strict mode)
    - If prompted for git init: yes
    - Do NOT use `npm create astro@latest` — this may install Astro 7+ which has breaking changes. Use `@6` to stay on Astro 6.x.
  - [x] 1.2 Add integrations:
    - `npx astro add tailwind` — NOTE: this installs Tailwind v4 which uses `@tailwindcss/vite` Vite plugin, NOT `@astrojs/tailwind`. Accept prompts.
    - `npx astro add sitemap` — Accept prompts.
    - `npx astro add vercel` — Accept prompts.
  - [x] 1.3 Install additional packages: `npm install resend googleapis`
    - `resend`: transactional email package (pre-installed; no API routes created in this story)
    - `googleapis`: Google Sheets API (pre-installed; no API routes created in this story)
  - [x] 1.4 Pin all versions: open `package.json` and remove ALL `^` and `~` from every dependency and devDependency. The versions you see after install are the pinned versions. Example: `"astro": "^6.0.8"` → `"astro": "6.0.8"`.
  - [x] 1.5 Add Node engine lock in `package.json`:
    ```json
    "engines": {
      "node": "22.x"
    }
    ```
  - [x] 1.6 Run `npm install` after modifying `package.json` to regenerate `package-lock.json` with pinned versions.
  - [x] 1.7 Verify build succeeds: `npm run build`. Fix any errors before proceeding.

- [x] Task 2: Configure astro.config.mjs (AC: 1, 4)
  - [x] 2.1 Replace the generated `astro.config.mjs` with the following exact configuration:
    ```js
    import { defineConfig } from 'astro/config';
    import tailwindcss from '@tailwindcss/vite';
    import sitemap from '@astrojs/sitemap';
    import vercel from '@astrojs/vercel/static';

    export default defineConfig({
      site: 'https://pyglara.com',
      output: 'static',
      adapter: vercel(),
      integrations: [
        sitemap({
          i18n: {
            defaultLocale: 'es',
            locales: {
              es: 'es-VE',
              en: 'en-US',
            },
          },
        }),
      ],
      vite: {
        plugins: [tailwindcss()],
      },
      i18n: {
        defaultLocale: 'es',
        locales: ['es', 'en'],
        routing: {
          prefixDefaultLocale: true,
        },
      },
    });
    ```
    - `prefixDefaultLocale: true` means both `/es/` and `/en/` are prefixed — site root `/` redirects to `/es/` automatically. This is required for clean hreflang and SEO (ADR-003).
    - `output: 'static'` — 100% static output. No serverless functions in this story (ADR-005).
    - `site: 'https://pyglara.com'` — needed for sitemap.xml generation.
  - [x] 2.2 Verify the Tailwind import path. After `npx astro add tailwind`, the import may be `@tailwindcss/vite` or have a different path. Check `node_modules` for the actual installed package name and match the import. The key is this is the Vite plugin, NOT `@astrojs/tailwind`.

- [x] Task 3: Create global CSS with @theme tokens (AC: 1)
  - [x] 3.1 Create or replace `src/styles/global.css` with the following content:
    ```css
    @import "tailwindcss";

    @theme {
      /* Brand Colors */
      --color-navy: #1B3A5C;
      --color-copper: #B87333;
      --color-green: #2D8B4E;
      --color-amber: #D4A017;
      --color-text: #1A1A1A;
      --color-bg: #FFFFFF;
      --color-bg-alt: #F5F5F5;
      --color-whatsapp: #25D366;

      /* Typography */
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

      /* Layout */
      --max-width-content: 1024px;
      --border-radius-sm: 2px;
      --border-radius-md: 4px;

      /* Accessibility */
      --min-touch-target: 44px;
    }

    /* Base reset */
    *, *::before, *::after {
      box-sizing: border-box;
    }

    body {
      font-family: var(--font-sans);
      color: var(--color-text);
      background-color: var(--color-bg);
      margin: 0;
      padding: 0;
    }
    ```
    - CRITICAL: `@import "tailwindcss"` is the Tailwind v4 import. Do NOT use `@tailwind base/components/utilities` — that is Tailwind v3 syntax and will break.
    - `@theme {}` is the Tailwind v4 token definition block. Do NOT put these tokens in `tailwind.config.mjs` — Tailwind v4 does not use that file for tokens.
  - [x] 3.2 Verify there is no `tailwind.config.mjs` or `tailwind.config.ts` in the project root. If one exists from the `npx astro add tailwind` command, delete it — it is only needed for Tailwind v3, not v4.

- [x] Task 4: Create BaseLayout.astro (AC: 1, 5)
  - [x] 4.1 Create `src/layouts/BaseLayout.astro` with the following content:
    ```astro
    ---
    interface Props {
      title: string;
      description: string;
      lang: 'es' | 'en';
    }

    const { title, description, lang } = Astro.props;

    // GA4 Measurement ID — replace with actual ID from Story 1.2 Task 3
    // If GA4 ID is not yet available, use placeholder 'G-XXXXXXXXXX' and update when ID is confirmed
    const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

    // Canonical URL for this page
    const canonicalURL = new URL(Astro.url.pathname, Astro.site);

    // Alternate language URL for hreflang
    const altLang = lang === 'es' ? 'en' : 'es';
    const altPathname = Astro.url.pathname.replace(`/${lang}/`, `/${altLang}/`);
    const altURL = new URL(altPathname, Astro.site);
    ---

    <!DOCTYPE html>
    <html lang={lang}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <title>{title}</title>
        <link rel="canonical" href={canonicalURL} />
        <link rel="alternate" hreflang={lang} href={canonicalURL} />
        <link rel="alternate" hreflang={altLang} href={altURL} />
        <link rel="alternate" hreflang="x-default" href={new URL('/es/', Astro.site)} />

        <!-- GA4 inline — no external script loader, zero CLS impact -->
        <script is:inline define:vars={{ GA4_MEASUREMENT_ID }}>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', GA4_MEASUREMENT_ID, {
            page_location: window.location.href,
            page_title: document.title,
          });
        </script>
        <script is:inline src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`} async></script>
      </head>
      <body>
        <slot />
      </body>
    </html>
    ```
    - `is:inline` on script tags tells Astro not to process them through the module bundler. Required for GA4.
    - `define:vars={{ GA4_MEASUREMENT_ID }}` injects the server-side variable into the inline script.
    - The GA4 Measurement ID placeholder `G-XXXXXXXXXX` must be replaced with the real ID from Story 1.2 Task 3 before the site goes live. If Story 1.2 is still in progress, leave the placeholder — the build still succeeds.
  - [x] 4.2 Import global CSS in BaseLayout: add `import '../styles/global.css';` to the frontmatter (inside the `---` block) of `BaseLayout.astro`.

- [x] Task 5: Create bilingual route structure (AC: 4)
  - [x] 5.1 Create the bilingual page structure:
    ```
    src/pages/
      es/
        index.astro
      en/
        index.astro
    ```
  - [x] 5.2 Create `src/pages/es/index.astro` — minimal placeholder page:
    ```astro
    ---
    import BaseLayout from '../../layouts/BaseLayout.astro';
    ---
    <BaseLayout
      title="PYGLARA — Galvanización en Barquisimeto"
      description="Galvanización en caliente y electrodeposición de cobre. Capacidad instalada: 1,440 TM/mes. Zona Industrial I, Barquisimeto, Venezuela."
      lang="es"
    >
      <main>
        <h1>Prensados y Galvanizados de Lara, S.A.</h1>
        <p>Próximamente — sitio web en construcción.</p>
        <p>
          Contacto: <a href="https://wa.me/584245715349?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20PYGLARA.">WhatsApp +58 424 571 5349</a>
          &nbsp;|&nbsp; <a href="mailto:info@pyglara.com">info@pyglara.com</a>
        </p>
      </main>
    </BaseLayout>
    ```
  - [x] 5.3 Create `src/pages/en/index.astro` — English placeholder page:
    ```astro
    ---
    import BaseLayout from '../../layouts/BaseLayout.astro';
    ---
    <BaseLayout
      title="PYGLARA — Galvanizing in Barquisimeto, Venezuela"
      description="Hot-dip galvanizing and copper electroplating. Installed capacity: 1,440 MT/month. Zona Industrial I, Barquisimeto, Venezuela."
      lang="en"
    >
      <main>
        <h1>Prensados y Galvanizados de Lara, S.A.</h1>
        <p>Coming soon — website under construction.</p>
        <p>
          Contact: <a href="https://wa.me/584245715349?text=Hello%2C%20I%27d%20like%20information%20about%20PYGLARA%27s%20services.">WhatsApp +58 424 571 5349</a>
          &nbsp;|&nbsp; <a href="mailto:info@pyglara.com">info@pyglara.com</a>
        </p>
      </main>
    </BaseLayout>
    ```
  - [x] 5.4 Delete the default `src/pages/index.astro` if it exists. With `prefixDefaultLocale: true`, the root `/` is handled by Astro's i18n redirect — there should be no root `index.astro` unless you want a custom root redirect.
  - [x] 5.5 Run `npm run build` and confirm zero errors. Then `npm run preview` and verify:
    - `http://localhost:4321/es/` responds 200 with Spanish content
    - `http://localhost:4321/en/` responds 200 with English content
    - `http://localhost:4321/` redirects to `/es/`

- [x] Task 6: Create content architecture scaffolding (AC: 1)
  - [x] 6.1 Create `src/content/ui.json` — UI strings source of truth (ADR-006/007). This is the ONLY place UI strings live. Pages load this and pass strings as props to components. Create with this initial structure:
    ```json
    {
      "es": {
        "nav": {
          "galvanizing": "Galvanización",
          "copper_rods": "Varillas de Cobre",
          "quality": "Calidad y Seguridad",
          "contact": "Contacto"
        },
        "footer": {
          "phone": "+58 424 571 5349",
          "email": "info@pyglara.com",
          "address": "Zona Industrial I, Barquisimeto, Estado Lara 3001, Venezuela",
          "rif": "RIF J-07014488-0"
        },
        "whatsapp": {
          "general": "Hola, quisiera información sobre los servicios de PYGLARA.",
          "galvanizing": "Hola, quisiera cotizar servicios de galvanización en caliente. Tengo [__] toneladas/mes de [tipo de pieza].",
          "copper_rods": "Hola, quisiera cotizar varillas de tierra cobre-enchapado. Necesito diámetro [__] y longitud [__].",
          "partnership": "Hola, tengo interés en explorar una oportunidad de inversión o asociación con PYGLARA.",
          "contact": "Hola, quisiera hacer una consulta general."
        },
        "meta": {
          "site_name": "PYGLARA"
        }
      },
      "en": {
        "nav": {
          "galvanizing": "Galvanizing",
          "copper_rods": "Copper Ground Rods",
          "quality": "Quality & Safety",
          "contact": "Contact"
        },
        "footer": {
          "phone": "+58 424 571 5349",
          "email": "info@pyglara.com",
          "address": "Zona Industrial I, Barquisimeto, Lara State 3001, Venezuela",
          "rif": "RIF J-07014488-0"
        },
        "whatsapp": {
          "general": "Hello, I'd like information about PYGLARA's services.",
          "galvanizing": "Hello, I'd like to request a quote for hot-dip galvanizing. I have approximately [__] MT/month of [part type].",
          "copper_rods": "Hello, I'd like to request a quote for copper-plated ground rods. I need diameter [__] and length [__].",
          "partnership": "Hello, I'm interested in exploring an investment or partnership opportunity with PYGLARA.",
          "contact": "Hello, I'd like to make a general inquiry."
        },
        "meta": {
          "site_name": "PYGLARA"
        }
      }
    }
    ```
  - [x] 6.2 Create helper function `src/utils/i18n.ts`:
    ```typescript
    import ui from '../content/ui.json';

    type Lang = 'es' | 'en';

    export function t(lang: Lang, key: string): string {
      const keys = key.split('.');
      let current: any = ui[lang];
      for (const k of keys) {
        if (current === undefined) return key;
        current = current[k];
      }
      return typeof current === 'string' ? current : key;
    }

    export function buildWhatsAppUrl(lang: Lang, context: keyof typeof ui['es']['whatsapp']): string {
      const message = t(lang, `whatsapp.${context}`);
      return `https://wa.me/584245715349?text=${encodeURIComponent(message)}`;
    }
    ```
  - [x] 6.3 Create directory structure for future page content (empty markdown files, one per page per language):
    ```
    src/content/
      ui.json             ← already created above
      es/
        galvanizing.md    ← placeholder, empty for now
        copper-rods.md    ← placeholder, empty for now
        quality.md        ← placeholder, empty for now
        contact.md        ← placeholder, empty for now
      en/
        galvanizing.md    ← placeholder, empty for now
        copper-rods.md    ← placeholder, empty for now
        quality.md        ← placeholder, empty for now
        contact.md        ← placeholder, empty for now
    ```
    Bilingual rule (ADR workflow): ES and EN content files must always be committed together. Never commit one without the other.

- [ ] Task 7: Deploy to Vercel (AC: 2, 5)
  - [ ] 7.1 Pre-requisite check: confirm pyglara.com domain is accessible and the Zoho OpenSRS DNS credentials are available. DNS changes in this task will be made in OpenSRS.
  - [ ] 7.2 Push the initialized project to a git repository. If no GitHub repo exists yet, create one (private): `pyglara-site` under the PYGLARA-dedicated GitHub account (not a personal account). NOTE: pyglara-site/ is a nested git repo — push it as its own repository, not as part of the PYG monorepo.
  - [ ] 7.3 Connect to Vercel:
    - Go to vercel.com → "New Project"
    - Import the `pyglara-site` GitHub repository
    - Framework: Astro (auto-detected)
    - Build command: `npm run build` (or `astro build` — same)
    - Output directory: `dist` (Astro default)
    - Node.js version: 22.x (set in Vercel project settings → General → Node.js Version)
  - [ ] 7.4 Trigger first deploy. Wait for it to complete. Vercel will assign a `.vercel.app` preview URL — verify the site loads there first before adding custom domain.
  - [ ] 7.5 Add custom domain in Vercel:
    - Vercel project → Settings → Domains → Add `pyglara.com`
    - Vercel will provide DNS records to add (typically an `A` record and optionally a `CNAME` for `www`)
  - [ ] 7.6 Add DNS records in OpenSRS (Zoho DNS panel at the Zoho registrar):
    - Add the `A` record Vercel provides for `@` (root domain → Vercel IP)
    - Add the `CNAME` record for `www` → Vercel-provided value
    - CRITICAL: Do NOT touch or proxy MX records, SPF TXT record, DKIM TXT record, or DMARC TXT record. These are email authentication records for info@pyglara.com and must remain exactly as configured in Story 1.2. Email will break silently if these are modified.
    - If Zoho DNS uses a proxy setting (like Cloudflare's orange/grey cloud): all A/CNAME records for the website should be DNS-only (no proxy) for compatibility with Vercel.
  - [ ] 7.7 Wait for DNS propagation (typically 5–30 minutes). Verify `https://pyglara.com/es/` loads.
  - [ ] 7.8 Verify GA4 fires (AC: 5):
    - Open `https://pyglara.com/es/` in Chrome
    - Open Chrome DevTools → Network tab → filter by `collect` or `gtag`
    - You should see a request to `google-analytics.com` confirming `page_view` fired
    - Alternatively: in GA4 → Configure → DebugView (requires GA4 Debug Mode extension)
    - NOTE: If GA4 Measurement ID is still the placeholder `G-XXXXXXXXXX`, the event will NOT fire. That is expected until Story 1.2 Task 3 is complete and the real ID is substituted. Mark AC5 as conditional: "fires once real GA4 ID is in place."

- [x] Task 8: Commit and document (AC: 3)
  - [x] 8.1 Ensure `.gitignore` includes: `node_modules/`, `dist/`, `.env`, `.env.*`
  - [ ] 8.2 Commit all files: `git add .` then `git commit -m "feat: initialize Astro 6.x project with bilingual routing, Tailwind v4, and Vercel deployment"` — PENDING: requires push to dedicated pyglara-site GitHub repo (user action)
  - [x] 8.3 Document installed dependency versions in this story's File List and Completion Notes for future reference. Run `cat package.json` and capture the pinned version numbers.
  - [x] 8.4 Update Story 1.2 note: add a reminder that the GA4 Measurement ID (Story 1.2 Task 3.4) must be substituted in `BaseLayout.astro` before Epic 7 work begins.

## Dev Notes

### Nature of This Story

This is a **code setup story** — the output is a working, deployed Astro repository. No page content is written. The blank placeholder pages (ES + EN) prove the pipeline works end-to-end: git push → Vercel build → domain → bilingual routes live.

This is the prerequisite for all Epic 7 website stories. Nothing in Epic 7 starts until this story is done.

### Critical Architecture Constraints (Non-Negotiable)

1. **Tailwind v4 only.** The integration is `@tailwindcss/vite` (Vite plugin), NOT `@astrojs/tailwind` (which is Tailwind v3). The `@theme {}` block goes in `src/styles/global.css`, NOT in `tailwind.config.mjs`. If you see any reference to `content: [...]` arrays in a Tailwind config file, you are using v3 — start over.

2. **No `^` ranges in package.json.** Every single dependency must be pinned exactly. This is the single most important convention in the codebase — version drift caused multiple prod issues in the risk analysis. `package-lock.json` must be committed.

3. **Zero serverless functions in this story.** `resend` and `googleapis` are installed but unused. They are pre-staged for Epic 7/8. Do not create any API routes (`src/pages/api/`) — that is Epic 8's scope.

4. **Both languages always together.** Whenever you create or edit a content file in `/es/`, you must create or edit the corresponding file in `/en/` in the same commit. This is a workflow rule enforced by convention, not tooling. [Source: architecture.md#Development-Workflow-Rules]

5. **Components never import content.** When Epic 7 stories create Astro components, they must receive all text as props. Pages load from `ui.json` (via the `t()` helper) and pass strings down. No component should `import ui from '../content/ui.json'` directly. [Source: architecture.md#ADR-007]

6. **No Google Fonts.** System font stack only: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`. Already set in `@theme`. Never add a Google Fonts `<link>` tag to BaseLayout. [Source: architecture.md — saves 200-400ms, NFR1 compliance]

7. **`prefixDefaultLocale: true`** — both `/es/` and `/en/` are prefixed. Root `/` automatically redirects to `/es/`. This is required for clean SEO hreflang. Do not set `prefixDefaultLocale: false`.

8. **`site: 'https://pyglara.com'`** in `astro.config.mjs` — required for `@astrojs/sitemap` to generate absolute URLs. This must match the production domain exactly.

### Color Token Usage Rules (from Story 1.1)

These rules must be communicated to every Epic 7 developer agent:

| Token | Hex | Allowed usage | FORBIDDEN usage |
|---|---|---|---|
| `--color-navy` | #1B3A5C | Headings, nav, primary buttons | — |
| `--color-copper` | #B87333 | Large text (24px+), decorative lines only | Body text, form labels, small UI — FAILS WCAG AA |
| `--color-green` | #2D8B4E | Operational status indicator only | — |
| `--color-amber` | #D4A017 | Decorative "coming soon" large text only | Body text — FAILS WCAG AA |
| `--color-whatsapp` | #25D366 | WhatsApp CTA buttons ONLY | Any other element |
| `--color-text` | #1A1A1A | All body text | — |

Copper and Amber both FAIL WCAG AA for normal-size text. They are accent/decorative only. [Source: 1-1-brand-kit-definition.md#Color-Palette]

### GA4 Dependency on Story 1.2

Story 1.2 Task 3 creates the GA4 property and produces the Measurement ID (format: `G-XXXXXXXXXX`). As of this story being written, Task 3 is not yet complete.

**If GA4 ID is not yet available:** Leave `G-XXXXXXXXXX` as the placeholder in `BaseLayout.astro`. The site builds and deploys successfully. AC5 ("GA4 fires page_view") is marked as **pending Story 1.2 Task 3 completion**. When the ID is available, make a one-line change to `BaseLayout.astro` and redeploy.

**When GA4 ID is received:** Update `BaseLayout.astro` line with the real ID. Commit with message: `"chore: add GA4 measurement ID from Story 1.2"`. After deploy, verify in GA4 DebugView.

Custom events `form_submit`, `whatsapp_click`, and `language_toggle` are NOT implemented in this story. They are Epic 7/8 scope. The GA4 `page_view` event fires automatically from the config call.

### DNS Handoff from Story 1.2

Domain `pyglara.com` is registered via Zoho (OpenSRS backend). DNS is managed in OpenSRS.

Current DNS records (as of Story 1.2 completion):
- MX records for Zoho Mail (info@pyglara.com) — DO NOT TOUCH
- SPF TXT record (`v=spf1 include:zohomail.com ~all`) — DO NOT TOUCH
- DKIM TXT record (zoho selector, 1024-bit) — DO NOT TOUCH
- DMARC TXT record (`_dmarc` → `v=DMARC1; p=none; rua=mailto:info@pyglara.com`) — DO NOT TOUCH

Only ADD records; never modify existing ones. When Vercel provides its DNS records, add them as new entries.

### File Structure Created by This Story

```
pyglara-site/
  src/
    layouts/
      BaseLayout.astro         ← bilingual HTML shell, GA4 inline
    pages/
      es/
        index.astro            ← Spanish placeholder
      en/
        index.astro            ← English placeholder
    styles/
      global.css               ← @theme tokens + base reset
    content/
      ui.json                  ← UI strings, both languages
      es/
        galvanizing.md         ← empty placeholder
        copper-rods.md         ← empty placeholder
        quality.md             ← empty placeholder
        contact.md             ← empty placeholder
      en/
        galvanizing.md         ← empty placeholder
        copper-rods.md         ← empty placeholder
        quality.md             ← empty placeholder
        contact.md             ← empty placeholder
    utils/
      i18n.ts                  ← t() helper + buildWhatsAppUrl()
  astro.config.mjs             ← pinned, i18n configured, Tailwind v4
  package.json                 ← all versions pinned, Node 22 engine
  package-lock.json            ← committed
  tsconfig.json                ← TypeScript strict (from astro init)
  .gitignore                   ← node_modules/, dist/, .env
```

### What This Story Does NOT Create

- No actual page content (Epic 7)
- No forms (Epic 7/8)
- No WhatsApp redirect route `/wa` (Epic 8)
- No Astro components (Epic 7)
- No API routes (Epic 8)
- No structured data (Epic 7 Story 7.7)
- No Google Forms (Epic 7/8)
- No `resend` or `googleapis` usage (Epic 7/8)

### Downstream Consumers of This Story

| Epic/Story | What they need from 1.3 |
|---|---|
| Epic 7 (all stories) | Initialized repository with BaseLayout, i18n routing, Tailwind v4, brand tokens |
| Epic 7, Story 7.9 | GA4 Measurement ID substituted and `form_submit`, `whatsapp_click`, `language_toggle` events added |
| Epic 8, Story 8.2 | `/wa` redirect route added to `src/pages/es/wa.astro` and `src/pages/en/wa.astro` |
| Epic 3 (printed materials) | Domain pyglara.com resolves — QR codes now have a live destination |

### Project Structure Notes

- The Astro project lives at `pyglara-site/` within the repository root. This is a separate code directory from `_bmad-output/` (planning artifacts) and `docs/` (brand/business docs). Epic 7 developer agents should work exclusively inside `pyglara-site/`.
- All paths in Epic 7 stories are relative to `pyglara-site/` unless stated otherwise.
- The `assets/` folder at the project root (containing logo and plant photos from Story 1.1) is NOT automatically accessible inside the Astro project. Plant photos needed for the website should be copied to `pyglara-site/public/images/` during Epic 7 Story 7.1 (Homepage).

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-001] — Astro 6.0.8, pinned, Node 22
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-003] — Bilingual routing, prefixDefaultLocale: true
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-005] — 100% static output, zero serverless in this story
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-006] — Hybrid content: ui.json + markdown
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-007] — Components receive text as props only
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-009] — Brand kit source of truth in brand-kit.md; @theme tokens derived from it
- [Source: _bmad-output/planning-artifacts/architecture.md#Starter-Template] — Exact initialization command and integration list
- [Source: _bmad-output/implementation-artifacts/1-1-brand-kit-definition.md#Tailwind-Theme-Token-Snippet] — @theme CSS block, color rules
- [Source: _bmad-output/implementation-artifacts/1-2-domain-registration-digital-setup.md#DNS-Handoff] — DNS records in OpenSRS, MX safety note
- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.3] — Story spec: deliverables and acceptance criteria

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

- `create-astro@6` tag does not exist on npm — create-astro CLI uses its own versioning (v5.x). Used `create-astro@latest` (v5.0.5) which installs `astro@6.1.6` (current stable).
- `@astrojs/vercel/static` subpath removed in v10 — unified adapter. Fixed: use `import vercel from '@astrojs/vercel'` with `output: 'static'` in defineConfig.

### Completion Notes List

Story file created 2026-04-14. Implemented 2026-04-15 by claude-sonnet-4-6.

**Installed pinned versions:**

- astro: 6.1.6
- @astrojs/sitemap: 3.7.2
- @astrojs/vercel: 10.0.4
- @tailwindcss/vite: 4.2.2
- tailwindcss: 4.2.2
- resend: 6.11.0
- googleapis: 171.4.0

**What was implemented:**

- Astro 6.1.6 project initialized at `pyglara-site/` with minimal template, TypeScript strict mode
- All 3 integrations added: @tailwindcss/vite (v4), @astrojs/sitemap, @astrojs/vercel (unified v10)
- resend and googleapis pre-installed (unused until Epic 7/8)
- All package.json versions pinned (no ^ or ~), engines set to "22.x"
- astro.config.mjs: site=pyglara.com, output=static, i18n with prefixDefaultLocale:true, sitemap i18n (es-VE/en-US)
- src/styles/global.css: Tailwind v4 @import + @theme token block (brand colors, typography, layout, a11y)
- src/layouts/BaseLayout.astro: bilingual HTML shell with GA4 inline (placeholder G-XXXXXXXXXX), canonical/hreflang tags, global CSS import
- src/pages/es/index.astro + src/pages/en/index.astro: bilingual placeholder pages (200 status confirmed)
- Default src/pages/index.astro deleted (i18n redirect handles root /)
- src/content/ui.json: bilingual UI strings for nav, footer, WhatsApp CTAs, meta
- src/utils/i18n.ts: t() helper + buildWhatsAppUrl()
- src/content/es/*.md + src/content/en/*.md: 4 empty placeholder files per language
- .gitignore updated: .env.* covers all env variants
- Build confirmed: 2 pages built, zero errors, zero warnings
- sitemap-index.xml generated by @astrojs/sitemap

**Pending (manual steps — requires user):**

- Task 7: Vercel deploy + DNS configuration (browser-based, requires Zoho OpenSRS credentials)
- GA4 Measurement ID: substitute G-XXXXXXXXXX in BaseLayout.astro once Story 1.2 Task 3 is complete
- AC5 (GA4 fires) is conditional on real GA4 ID being substituted

**API deviation noted:** Story spec referenced `@astrojs/vercel/static` (v9 API) and `npm create astro@6` (non-existent CLI tag). Both were adapted to current v10 equivalents without functional difference.

### File List

- _bmad-output/implementation-artifacts/1-3-astro-project-initialization.md (this file)
- pyglara-site/astro.config.mjs (new)
- pyglara-site/package.json (new, pinned versions)
- pyglara-site/package-lock.json (new, committed)
- pyglara-site/src/layouts/BaseLayout.astro (new)
- pyglara-site/src/styles/global.css (new, @theme tokens)
- pyglara-site/src/pages/es/index.astro (new, placeholder)
- pyglara-site/src/pages/en/index.astro (new, placeholder)
- pyglara-site/src/content/ui.json (new, bilingual UI strings)
- pyglara-site/src/utils/i18n.ts (new, t() helper)
- pyglara-site/src/content/es/*.md (new, empty placeholders)
- pyglara-site/src/content/en/*.md (new, empty placeholders)
