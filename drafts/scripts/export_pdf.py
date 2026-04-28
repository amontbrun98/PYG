#!/usr/bin/env python3
"""
Export PYGLARA v3 PPTX files to PDF using PowerPoint COM automation.
"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

import os
import shutil
import pythoncom
import win32com.client

pythoncom.CoInitialize()

BASE = r'C:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck'
DOCS = r'C:\Users\amont\Documents'

PAIRS = [
    ('PYGLARA_Pitch_Deck_EN_v3.pptx', 'PYGLARA_Pitch_Deck_EN_v3.pdf'),
    ('PYGLARA_Pitch_Deck_ES_v3.pptx', 'PYGLARA_Pitch_Deck_ES_v3.pdf'),
]

ppt = win32com.client.DispatchEx('PowerPoint.Application')
try:
    ppt.Visible = True
except:
    pass
ppt.DisplayAlerts = False

for pptx_name, pdf_name in PAIRS:
    src_orig = os.path.join(BASE, pptx_name)
    tmp_pptx = os.path.join(DOCS, 'pyg_tmp.pptx')
    tmp_pdf  = os.path.join(DOCS, 'pyg_tmp.pdf')
    dst_pdf  = os.path.join(BASE, pdf_name)

    print(f'Converting {pptx_name}...')
    print(f'  Source exists: {os.path.exists(src_orig)}')

    shutil.copy2(src_orig, tmp_pptx)
    print(f'  Copied to temp: {os.path.exists(tmp_pptx)}')

    try:
        prs = ppt.Presentations.Open(tmp_pptx, ReadOnly=0, Untitled=0, WithWindow=True)
        print(f'  Opened — {prs.Slides.Count} slides')
        prs.ExportAsFixedFormat(tmp_pdf, 2, Intent=1)  # 2=ppFixedFormatTypePDF
        prs.Close()
        shutil.move(tmp_pdf, dst_pdf)
        print(f'  [OK] {pdf_name} — {os.path.getsize(dst_pdf) // 1024} KB')
    except Exception as e:
        print(f'  [ERROR] {e}')
    finally:
        if os.path.exists(tmp_pptx):
            os.remove(tmp_pptx)

ppt.Quit()
pythoncom.CoUninitialize()
print('Done.')
