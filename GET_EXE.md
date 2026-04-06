# How to Get the YT-DLP Downloader .exe

## Option 1: GitHub Actions (Easiest - No Rust Needed!)

1. **Push this code to GitHub:**
   ```bash
   # Create a new repository on GitHub first
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ytdlp-app.git
   git push -u origin main
   ```

2. **GitHub will automatically build the .exe**
   - Go to your repository on GitHub
   - Click "Actions" tab
   - Wait for the build to complete (5-10 minutes)

3. **Download the .exe:**
   - Go to "Releases" on the right side
   - Download `ytdlp-app.exe` or the installer

## Option 2: Build Locally (Requires Rust)

1. **Install Rust:**
   ```powershell
   irm https://win.rustup.rs/x86_64 -OutFile rustup-init.exe; ./rustup-init.exe -y
   ```
   Then restart your terminal.

2. **Build the .exe:**
   ```powershell
   cd "E:\Video Download\yt-dlp-app\ytdlp-app"
   npm run tauri:build
   ```

3. **Find your .exe:**
   ```
   src-tauri/target/release/ytdlp-app.exe
   ```

## What You Get

| File | Size | Type |
|------|------|------|
| `ytdlp-app.exe` | ~25MB | Portable - Just double-click to run |
| `YT-DLP Downloader_0.1.0_x64-setup.exe` | ~25MB | Installer with shortcuts |

## Quick Test (No Build Needed)

Just want to see it running?

```powershell
cd "E:\Video Download\yt-dlp-app\ytdlp-app"
npm run dev
```

Then open: http://localhost:1420/
