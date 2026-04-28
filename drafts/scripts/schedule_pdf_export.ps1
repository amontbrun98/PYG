# Schedule PDF export as interactive task and wait for result
$scriptPath = 'C:\Users\amont\Desktop\PYG\ppt_export_task.ps1'

$pairs = @(
    @{ src = 'C:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck\PYGLARA_Pitch_Deck_EN_v3.pptx'
       dst = 'C:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck\PYGLARA_Pitch_Deck_EN_v3.pdf' },
    @{ src = 'C:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck\PYGLARA_Pitch_Deck_ES_v3.pptx'
       dst = 'C:\Users\amont\Desktop\PYG\investor-ready\01-Pitch-Deck\PYGLARA_Pitch_Deck_ES_v3.pdf' }
)

foreach ($pair in $pairs) {
    $src = $pair.src
    $dst = $pair.dst
    $name = [System.IO.Path]::GetFileName($dst)

    Write-Host "Exporting: $name"

    # Remove existing PDF if any
    if (Test-Path $dst) { Remove-Item $dst -Force }

    $action   = New-ScheduledTaskAction -Execute 'PowerShell.exe' `
        -Argument "-NonInteractive -File `"$scriptPath`" -src `"$src`" -dst `"$dst`""
    $trigger  = New-ScheduledTaskTrigger -Once -At (Get-Date).AddSeconds(3)
    $settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Minutes 3)
    $principal = New-ScheduledTaskPrincipal -UserId ([System.Security.Principal.WindowsIdentity]::GetCurrent().Name) -RunLevel Highest

    Register-ScheduledTask -TaskName 'PYG_PPT_Export' -Action $action -Trigger $trigger `
        -Settings $settings -Principal $principal -Force | Out-Null
    Start-ScheduledTask -TaskName 'PYG_PPT_Export'
    Write-Host "  Task started, waiting..."

    # Wait up to 60 seconds for PDF to appear
    $waited = 0
    while (-not (Test-Path $dst) -and $waited -lt 60) {
        Start-Sleep -Seconds 2
        $waited += 2
    }

    if (Test-Path $dst) {
        $kb = [math]::Round((Get-Item $dst).Length / 1KB)
        Write-Host "  [OK] $name -- $kb KB"
    } else {
        Write-Host "  [FAIL] PDF not created after ${waited}s"
        # Get task last run result
        $task = Get-ScheduledTask -TaskName 'PYG_PPT_Export'
        $info = $task | Get-ScheduledTaskInfo
        Write-Host "  Last result: $($info.LastTaskResult)"
    }

    Unregister-ScheduledTask -TaskName 'PYG_PPT_Export' -Confirm:$false
    Start-Sleep -Seconds 2
}

Write-Host "All exports complete."
