#!/usr/bin/env python3
"""
Fix broken slide relationship ordering in PYGLARA v3 PPTX files.
Root cause: python-pptx appended slides 4/5/6 as new rId34/35/36 entries
in the rels file after our fix scripts deleted and recreated shapes,
causing PowerPoint to fail to open the files.
Fix: reorder the rels so slides 4/5/6 appear in the correct rId slots,
and normalize the sldIdLst in presentation.xml to match.
"""

import sys, io, os, zipfile, shutil, copy
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

import xml.etree.ElementTree as ET

# Preserve namespace declarations exactly
ET.register_namespace('', 'http://schemas.openxmlformats.org/presentationml/2006/main')
ET.register_namespace('r', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
ET.register_namespace('a', 'http://schemas.openxmlformats.org/drawingml/2006/main')
ET.register_namespace('p', 'http://schemas.openxmlformats.org/presentationml/2006/main')

BASE = r'c:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck'

DECKS = [
    'PYGLARA_Pitch_Deck_EN_v3.pptx',
    'PYGLARA_Pitch_Deck_ES_v3.pptx',
]

NS_REL = 'http://schemas.openxmlformats.org/package/2006/relationships'
NS_P   = 'http://schemas.openxmlformats.org/presentationml/2006/main'
NS_R   = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
SLD_TYPE = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide'


def fix_pptx(src_path, dst_path):
    print(f'\nFixing: {os.path.basename(src_path)}')

    # Work on a copy
    shutil.copy2(src_path, dst_path)

    # Read the zip
    with zipfile.ZipFile(dst_path, 'r') as zin:
        names = zin.namelist()
        files = {n: zin.read(n) for n in names}

    # ── 1. Parse presentation.xml.rels ────────────────────────────
    rels_xml = files['ppt/_rels/presentation.xml.rels']
    rels_root = ET.fromstring(rels_xml)

    # Collect all slide rels: {rId: target_filename}
    slide_rels = {}
    non_slide_rels = []
    for rel in rels_root:
        if rel.get('Type') == SLD_TYPE:
            slide_rels[rel.get('Id')] = rel.get('Target')
        else:
            non_slide_rels.append(rel)

    print(f'  Found {len(slide_rels)} slide relationships')
    print(f'  Slide rels: {sorted(slide_rels.items())}')

    # ── 2. Parse presentation.xml sldIdLst to get display order ───
    prs_xml = files['ppt/presentation.xml']
    prs_root = ET.fromstring(prs_xml)

    sld_id_lst = prs_root.find(f'.//{{{NS_P}}}sldIdLst')
    if sld_id_lst is None:
        print('  ERROR: No sldIdLst found')
        return

    # Get the ordered list of rIds from sldIdLst
    ordered_rids = []
    for sld_el in sld_id_lst:
        rid = sld_el.get(f'{{{NS_R}}}id')
        ordered_rids.append(rid)

    print(f'  sldIdLst order (rIds): {ordered_rids}')

    # ── 3. Determine which target files exist and remap ───────────
    # Build: display_position -> target_file
    # rId34->slide4.xml, rId35->slide5.xml, rId36->slide6.xml need to be
    # mapped back into the correct display positions (4, 5, 6 = 0-indexed 3,4,5)

    # Map rId -> target for all slides
    rid_to_target = {**slide_rels}

    # The sldIdLst has them at positions 3,4,5 (0-indexed) with rId34,35,36
    # We need to renumber these to fit sequentially without gaps
    # Strategy: assign compact rId numbers (rId2 through rId31 for 30 slides)
    # keeping non-slide rIds intact

    # Find max non-slide rId number
    non_slide_nums = []
    for rel in non_slide_rels:
        rid = rel.get('Id', '')
        if rid.startswith('rId'):
            try:
                non_slide_nums.append(int(rid[3:]))
            except:
                pass
    max_non_slide = max(non_slide_nums) if non_slide_nums else 1

    # Build new rId assignments for slides in sldIdLst order
    # Keep original rIds for rId2-4 (slides 1-3), reassign rId34-36 -> rId5-7,
    # and shift rId5-28 -> rId8-31

    # Current state:
    # sldIdLst: rId2, rId3, rId4, rId34, rId35, rId36, rId5, rId6, ... rId28
    # Rels:     rId2->slide1, rId3->slide2, rId4->slide3,
    #           rId5->slide7, ..., rId28->slide30,
    #           rId34->slide4, rId35->slide5, rId36->slide6

    # Target state: rId2->slide1, rId3->slide2, rId4->slide3,
    #               rId5->slide4, rId6->slide5, rId7->slide6,
    #               rId8->slide7, ..., rId31->slide30

    # Build the mapping: old_rId -> new_rId
    # First, resolve the ordered targets
    ordered_targets = [rid_to_target[rid] for rid in ordered_rids]
    print(f'  Ordered slide targets: {ordered_targets}')

    # Assign new sequential rIds starting from rId2
    # Preserve non-slide rIds
    new_rid_map = {}  # old_rId -> new_rId
    target_to_new_rid = {}
    next_slide_rid = 2

    for old_rid in ordered_rids:
        target = rid_to_target[old_rid]
        new_rid = f'rId{next_slide_rid}'
        new_rid_map[old_rid] = new_rid
        target_to_new_rid[target] = new_rid
        next_slide_rid += 1

    print(f'  rId remapping: {new_rid_map}')

    # ── 4. Rebuild rels file ───────────────────────────────────────
    new_rels_root = ET.Element(f'{{{NS_REL}}}Relationships')

    # Add non-slide rels first (unchanged)
    for rel in non_slide_rels:
        new_rels_root.append(rel)

    # Add slide rels in new order
    for old_rid in ordered_rids:
        new_rid = new_rid_map[old_rid]
        target = rid_to_target[old_rid]
        el = ET.SubElement(new_rels_root, f'{{{NS_REL}}}Relationship')
        el.set('Id', new_rid)
        el.set('Type', SLD_TYPE)
        el.set('Target', target)

    new_rels_xml = ET.tostring(new_rels_root, encoding='unicode', xml_declaration=False)
    new_rels_xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' + new_rels_xml
    files['ppt/_rels/presentation.xml.rels'] = new_rels_xml.encode('utf-8')

    # ── 5. Update sldIdLst in presentation.xml ────────────────────
    for sld_el in sld_id_lst:
        old_rid = sld_el.get(f'{{{NS_R}}}id')
        if old_rid in new_rid_map:
            sld_el.set(f'{{{NS_R}}}id', new_rid_map[old_rid])

    new_prs_xml = ET.tostring(prs_root, encoding='unicode', xml_declaration=False)
    new_prs_xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' + new_prs_xml
    files['ppt/presentation.xml'] = new_prs_xml.encode('utf-8')

    # ── 6. Write new PPTX ─────────────────────────────────────────
    with zipfile.ZipFile(dst_path, 'w', zipfile.ZIP_DEFLATED) as zout:
        for name, data in files.items():
            zout.writestr(name, data)

    print(f'  [OK] Saved: {os.path.basename(dst_path)} ({os.path.getsize(dst_path)//1024} KB)')

    # ── 7. Verify with python-pptx ────────────────────────────────
    from pptx import Presentation
    try:
        p = Presentation(dst_path)
        print(f'  Verification: {p.slide_count} slides readable via python-pptx')
    except Exception as e:
        print(f'  Verification error: {e}')


for deck in DECKS:
    src = os.path.join(BASE, deck)
    dst = os.path.join(BASE, deck)  # overwrite in place
    fix_pptx(src, dst)

print('\nDone.')
