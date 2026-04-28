# Run as: powershell -ExecutionPolicy Bypass -File do_pdf_export.ps1
# Converts both v3 PPTX files to PDF using PowerPoint COM

$pairs = @(
    @{
        src = 'C:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck\PYGLARA_Pitch_Deck_EN_v3.pptx'
        dst = 'C:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck\PYGLARA_Pitch_Deck_EN_v3.pdf'
    },
    @{
        src = 'C:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck\PYGLARA_Pitch_Deck_ES_v3.pptx'
        dst = 'C:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck\PYGLARA_Pitch_Deck_ES_v3.pdf'
    }
)

$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
Start-Sleep -Seconds 2

foreach ($pair in $pairs) {
    Write-Host "Converting: $([System.IO.Path]::GetFileName($pair.src))"
    try {
        $pres = $ppt.Presentations.Open($pair.src)
        Write-Host "  Slides: $($pres.Slides.Count)"
        $pres.SaveAs($pair.dst, 32)
        $pres.Close()
        $kb = [math]::Round((Get-Item $pair.dst).Length / 1KB)
        Write-Host "  [OK] $([System.IO.Path]::GetFileName($pair.dst)) -- $kb KB"
    } catch {
        Write-Host "  [ERROR] $_"
    }
}

$ppt.Quit()
Write-Host "Done."
