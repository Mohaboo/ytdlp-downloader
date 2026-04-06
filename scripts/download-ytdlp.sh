#!/bin/bash

# Download yt-dlp for Unix systems
YT_DLP_URL="https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp"
OUTPUT_PATH="$(dirname "$0")/../src-tauri/binaries/yt-dlp"

# Create binaries directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_PATH")"

echo "Downloading yt-dlp..."

# Download
curl -L "$YT_DLP_URL" -o "$OUTPUT_PATH"

# Make executable
chmod +x "$OUTPUT_PATH"

if [ -f "$OUTPUT_PATH" ]; then
    FILE_SIZE=$(du -h "$OUTPUT_PATH" | cut -f1)
    echo "yt-dlp downloaded successfully to: $OUTPUT_PATH"
    echo "File size: $FILE_SIZE"
else
    echo "Error downloading yt-dlp"
    exit 1
fi
