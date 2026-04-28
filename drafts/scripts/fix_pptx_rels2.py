#!/usr/bin/env python3
"""
Fix broken slide relationship ordering in PYGLARA v3 PPTX files.
Reads file bytes directly (no shutil.copy2) to avoid Windows file lock issues.
"""

import sys, io, os, zipfile
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

import xml.etree.ElementTree as ET

BASE = r'c:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck'
DECKS = [
    'PYGLARA_Pitch_Deck_EN_v3.pptx',
    'PYGLARA_Pitch_Deck_ES_v3.pptx',
]

NS_REL  = 'http://schemas.openxmlformats.org/package/2006/relationships'
NS_P    = 'http://schemas.openxmlformats.org/presentationml/2006/main'
NS_R    = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
SLD_TYPE = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide'


def fix_pptx(path):
    print(f'\nFixing: {os.path.basename(path)}')

    # Read all file bytes directly
    with open(path, 'rb') as fh:
        raw = fh.read()

    with zipfile.ZipFile(io.BytesIO(raw), 'r') as zin:
        names = zin.namelist()
        files = {n: zin.read(n) for n in names}
        info_list = zin.infolist()

    # ── Parse rels ───────────────────────────────────────────────
    rels_root = ET.fromstring(files['ppt/_rels/presentation.xml.rels'])
    slide_rels = {}    # rId -> target
    non_slide_rels = []
    for rel in rels_root:
        if rel.get('Type') == SLD_TYPE:
            slide_rels[rel.get('Id')] = rel.get('Target')
        else:
            non_slide_rels.append(rel)

    print(f'  Slide rels ({len(slide_rels)}): {sorted(slide_rels.items())}')

    # ── Parse sldIdLst to get current display order ──────────────
    prs_root = ET.fromstring(files['ppt/presentation.xml'])
    sld_id_lst = prs_root.find(f'.//{{{NS_P}}}sldIdLst')
    ordered_rids = [sld.get(f'{{{NS_R}}}id') for sld in sld_id_lst]
    print(f'  Display order rIds: {ordered_rids}')

    # ── Build new sequential rId mapping ────────────────────────
    # Assign rId2, rId3, ... in display order
    new_rid_map = {}
    next_num = 2
    for old_rid in ordered_rids:
        new_rid_map[old_rid] = f'rId{next_num}'
        next_num += 1
    print(f'  Remapping: {new_rid_map}')

    # ── Rebuild rels ─────────────────────────────────────────────
    new_rels = ET.Element(f'{{{NS_REL}}}Relationships')
    for rel in non_slide_rels:
        new_rels.append(copy_element(rel))
    for old_rid in ordered_rids:
        el = ET.SubElement(new_rels, f'{{{NS_REL}}}Relationship')
        el.set('Id', new_rid_map[old_rid])
        el.set('Type', SLD_TYPE)
        el.set('Target', slide_rels[old_rid])

    files['ppt/_rels/presentation.xml.rels'] = (
        b'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        ET.tostring(new_rels, encoding='unicode').encode('utf-8')
    )

    # ── Update sldIdLst rIds ─────────────────────────────────────
    for sld_el in sld_id_lst:
        old_rid = sld_el.get(f'{{{NS_R}}}id')
        if old_rid in new_rid_map:
            sld_el.set(f'{{{NS_R}}}id', new_rid_map[old_rid])

    files['ppt/presentation.xml'] = (
        b'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        ET.tostring(prs_root, encoding='unicode').encode('utf-8')
    )

    # ── Write back ───────────────────────────────────────────────
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, 'w', zipfile.ZIP_DEFLATED) as zout:
        for name in names:  # preserve original order
            zout.writestr(name, files[name])

    with open(path, 'wb') as fh:
        fh.write(buf.getvalue())

    print(f'  Written: {os.path.getsize(path)//1024} KB')

    # ── Verify ───────────────────────────────────────────────────
    from pptx import Presentation
    try:
        p = Presentation(path)
        print(f'  python-pptx: {p.slide_count} slides OK')
    except Exception as e:
        print(f'  python-pptx error: {e}')


def copy_element(el):
    """Deep copy an XML element."""
    import copy
    return copy.deepcopy(el)


for deck in DECKS:
    fix_pptx(os.path.join(BASE, deck))

print('\nAll done. Now retrying PDF export...')

# Retry PDF export via PowerShell (most reliable method)
import subprocess, time, shutil

DOCS = r'C:\Users\amont\Documents'

for deck in DECKS:
    pptx_path = os.path.join(BASE, deck)
    pdf_name  = deck.replace('.pptx', '.pdf')
    pdf_path  = os.path.join(BASE, pdf_name)

    tmp_pptx = os.path.join(DOCS, 'pyg_export.pptx')
    tmp_pdf  = os.path.join(DOCS, 'pyg_export.pdf')

    shutil.copy2(pptx_path, tmp_pptx)

    ps_script = f'''
$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
Start-Sleep -Seconds 2
$pres = $ppt.Presentations.Open("{tmp_pptx}")
Write-Host "Opened $($pres.Slides.Count) slides"
$pres.SaveAs("{tmp_pdf}", 32)
$pres.Close()
$ppt.Quit()
Write-Host "Done"
'''
    print(f'\nExporting {deck} to PDF...')
    r = subprocess.run(
        ['powershell', '-NonInteractive', '-Command', ps_script],
        capture_output=True, text=True, timeout=90
    )
    print('  stdout:', r.stdout.strip())
    if r.stderr.strip():
        print('  stderr:', r.stderr.strip()[:200])

    if os.path.exists(tmp_pdf):
        shutil.move(tmp_pdf, pdf_path)
        print(f'  [OK] {pdf_name} — {os.path.getsize(pdf_path)//1024} KB')
    else:
        print(f'  PDF not created')

    if os.path.exists(tmp_pptx):
        try: os.remove(tmp_pptx)
        except: pass
