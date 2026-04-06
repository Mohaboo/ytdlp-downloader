# Build YT-DLP Downloader for Windows
param(
    [switch]$Dev,
    [switch]$Release
)

$ErrorActionPreference = "Stop"

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "YT-DLP Downloader Build Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Ensure yt-dlp is downloaded
$ytDlpPath = "$PSScriptRoot\..\src-tauri\binaries\yt-dlp.exe"
if (!(Test-Path $ytDlpPath)) {
    Write-Host "yt-dlp not found. Downloading..." -ForegroundColor Yellow
    & "$PSScriptRoot\download-ytdlp.ps1"
}

# Install dependencies if needed
Write-Host "Installing npm dependencies..." -ForegroundColor Green
Set-Location "$PSScriptRoot\.."
npm install

if ($Dev) {
    Write-Host "Starting development server..." -ForegroundColor Green
    npm run tauri:dev
}
elseif ($Release) {
    Write-Host "Building release version..." -ForegroundColor Green
    npm run tauri:build
    
    Write-Host ""
    Write-Host "Build complete!" -ForegroundColor Green
    Write-Host "Installer location: src-tauri\target\release\bundle\msi\" -ForegroundColor Cyan
}
else {
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\build-windows.ps1 -Dev     # Run in development mode" -ForegroundColor White
    Write-Host "  .\build-windows.ps1 -Release  # Build release installer" -ForegroundColor White
}
