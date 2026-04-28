Dim BASE, pairs, i, pptxPath, pdfPath, ppt, pres

BASE = "C:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck\"

Dim files(1,1)
files(0,0) = "PYGLARA_Pitch_Deck_EN_v3.pptx"
files(0,1) = "PYGLARA_Pitch_Deck_EN_v3.pdf"
files(1,0) = "PYGLARA_Pitch_Deck_ES_v3.pptx"
files(1,1) = "PYGLARA_Pitch_Deck_ES_v3.pdf"

Set ppt = CreateObject("PowerPoint.Application")
ppt.Visible = True
WScript.Sleep 2000

For i = 0 To 1
    pptxPath = BASE & files(i,0)
    pdfPath  = BASE & files(i,1)

    WScript.Echo "Opening: " & files(i,0)
    Set pres = ppt.Presentations.Open(pptxPath, False, False, True)
    WScript.Sleep 4000
    WScript.Echo "  Slides: " & pres.Slides.Count
    pres.SaveAs pdfPath, 32
    WScript.Echo "  Saved: " & files(i,1)
    pres.Close
    WScript.Sleep 2000
Next

ppt.Quit
WScript.Echo "Done."
