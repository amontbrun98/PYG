# PowerPoint PDF Export via Scheduled Task
param(
    [string]$src,
    [string]$dst
)

$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = 1
Start-Sleep -Seconds 2
$pres = $ppt.Presentations.Open($src)
Write-Host "Opened: $($pres.Slides.Count) slides"
$pres.SaveAs($dst, 32)
$pres.Close()
$ppt.Quit()
Write-Host "Saved: $dst"
