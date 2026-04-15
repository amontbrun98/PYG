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
