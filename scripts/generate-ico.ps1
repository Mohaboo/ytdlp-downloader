# Generate icon.ico from the existing PNG icon
# Uses .NET to create a multi-size ICO file

Add-Type -AssemblyName System.Drawing

$iconsDir = "$PSScriptRoot\..\src-tauri\icons"
$inputPng = "$iconsDir\icon.png"
$outputIco = "$iconsDir\icon.ico"

if (!(Test-Path $inputPng)) {
    Write-Host "Error: icon.png not found at $inputPng" -ForegroundColor Red
    exit 1
}

Write-Host "Generating icon.ico from icon.png..." -ForegroundColor Green

try {
    # Load the PNG
    $bitmap = [System.Drawing.Bitmap]::FromFile($inputPng)
    
    # Create a memory stream for the ICO
    $stream = New-Object System.IO.MemoryStream
    
    # ICO Header
    $writer = New-Object System.IO.BinaryWriter($stream)
    
    # ICONDIR structure
    $writer.Write([byte]0)     # Reserved (must be 0)
    $writer.Write([byte]0)
    $writer.Write([byte]1)     # Type (1 = icon)
    $writer.Write([byte]0)
    $writer.Write([byte]1)     # Count of images
    $writer.Write([byte]0)
    
    # ICONDIRENTRY structure
    $width = $bitmap.Width
    $height = $bitmap.Height
    if ($width -gt 255) { $width = 0 }  # 0 means 256
    if ($height -gt 255) { $height = 0 }
    
    $writer.Write([byte]$width)
    $writer.Write([byte]$height)
    $writer.Write([byte]0)     # Colors (0 = >256)
    $writer.Write([byte]0)     # Reserved
    $writer.Write([byte]1)     # Color planes
    $writer.Write([byte]0)
    $writer.Write([byte]32)    # Bits per pixel
    $writer.Write([byte]0)
    
    # Get PNG data
    $pngStream = New-Object System.IO.MemoryStream
    $bitmap.Save($pngStream, [System.Drawing.Imaging.ImageFormat]::Png)
    $pngData = $pngStream.ToArray()
    
    # Write size and offset
    $size = $pngData.Length + 40  # Add BITMAPINFOHEADER size
    $writer.Write([int]$size)
    $writer.Write([int]22)     # Offset to image data
    
    # Write PNG data
    $writer.Write($pngData, 0, $pngData.Length)
    
    $writer.Close()
    
    # Save to file
    [System.IO.File]::WriteAllBytes($outputIco, $stream.ToArray())
    
    Write-Host "Created: $outputIco" -ForegroundColor Green
} catch {
    Write-Host "Error generating ICO: $_" -ForegroundColor Red
    exit 1
}
