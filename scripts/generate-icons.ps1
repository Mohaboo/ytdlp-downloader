# Generate app icons from a simple colored square
# This creates basic placeholder icons for the app

$iconsDir = "$PSScriptRoot\..\src-tauri\icons"

# Create a simple icon using ImageMagick if available, or download placeholder
Write-Host "Creating app icons..." -ForegroundColor Green

# For now, create a simple colored square as PNG using .NET
Add-Type -AssemblyName System.Drawing

function Create-Icon {
    param($size, $outputPath)
    
    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    
    # Purple background (#7C3AED)
    $graphics.Clear([System.Drawing.Color]::FromArgb(124, 58, 237))
    
    # Draw a simple play triangle in white
    $brush = [System.Drawing.Brushes]::White
    $centerX = $size / 2
    $centerY = $size / 2
    $triangleSize = $size * 0.3
    
    $points = @(
        [System.Drawing.PointF]::new($centerX - $triangleSize/2, $centerY - $triangleSize/2)
        [System.Drawing.PointF]::new($centerX - $triangleSize/2, $centerY + $triangleSize/2)
        [System.Drawing.PointF]::new($centerX + $triangleSize/2, $centerY)
    )
    
    $graphics.FillPolygon($brush, $points)
    $graphics.Dispose()
    
    $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bitmap.Dispose()
    
    Write-Host "Created: $outputPath" -ForegroundColor Cyan
}

# Create standard icon sizes
Create-Icon -size 32 -outputPath "$iconsDir\32x32.png"
Create-Icon -size 128 -outputPath "$iconsDir\128x128.png"
Create-Icon -size 256 -outputPath "$iconsDir\128x128@2x.png"
Create-Icon -size 512 -outputPath "$iconsDir\icon.png"

Write-Host "Icons created successfully!" -ForegroundColor Green
Write-Host "Note: For production, replace these with a proper designed icon." -ForegroundColor Yellow
