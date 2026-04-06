# Download yt-dlp for Windows
$ytDlpUrl = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe"
$outputPath = "$PSScriptRoot\..\src-tauri\binaries\yt-dlp.exe"

# Create binaries directory if it doesn't exist
$binariesDir = Split-Path $outputPath -Parent
if (!(Test-Path $binariesDir)) {
    New-Item -ItemType Directory -Path $binariesDir -Force
}

Write-Host "Downloading yt-dlp..." -ForegroundColor Green

# Download with progress
try {
    $ProgressPreference = 'Continue'
    Invoke-WebRequest -Uri $ytDlpUrl -OutFile $outputPath -UseBasicParsing
    Write-Host "yt-dlp downloaded successfully to: $outputPath" -ForegroundColor Green
    
    # Verify download
    if (Test-Path $outputPath) {
        $fileSize = (Get-Item $outputPath).Length / 1MB
        Write-Host "File size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
    }
} catch {
    Write-Host "Error downloading yt-dlp: $_" -ForegroundColor Red
    exit 1
}
