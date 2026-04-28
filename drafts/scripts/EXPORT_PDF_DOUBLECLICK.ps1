# Double-click this file in PowerShell to export PDFs
# Or right-click -> Run with PowerShell

$base = 'C:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck'

$pairs = @(
    @{ src = "$base\PYGLARA_Pitch_Deck_EN_v3.pptx"; dst = "$base\PYGLARA_Pitch_Deck_EN_v3.pdf" },
    @{ src = "$base\PYGLARA_Pitch_Deck_ES_v3.pptx"; dst = "$base\PYGLARA_Pitch_Deck_ES_v3.pdf" }
)

Add-Type -AssemblyName Microsoft.Office.Interop.PowerPoint
$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue

foreach ($pair in $pairs) {
    $name = [System.IO.Path]::GetFileName($pair.src)
    Write-Host "Converting: $name"
    try {
        if (Test-Path $pair.dst) { Remove-Item $pair.dst -Force }
        $pres = $ppt.Presentations.Open($pair.src, $false, $false, $true)
        Start-Sleep -Seconds 3
        $pres.SaveAs($pair.dst, 32)
        $pres.Close()
        $kb = [math]::Round((Get-Item $pair.dst).Length / 1KB)
        Write-Host "  [OK] $([System.IO.Path]::GetFileName($pair.dst)) -- $kb KB"
    } catch {
        Write-Host "  [ERROR] $_"
    }
}

$ppt.Quit()
Write-Host ""
Write-Host "Done. Press any key to close."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
