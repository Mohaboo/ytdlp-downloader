# YT-DLP Downloader - .EXE Build Guide

## 🎯 What You Want: A Single .EXE File

You want a **portable .exe** that users can just double-click to run.

## 📦 What Gets Built

When you build, you get TWO files:

```
src-tauri/target/release/
├── ytdlp-app.exe              ← Portable .exe (~25MB)
└── bundle/nsis/
    └── YT-DLP Downloader_0.1.0_x64-setup.exe  ← Installer (~25MB)
```

| File | Purpose |
|------|---------|
| **ytdlp-app.exe** | Portable - just run it, no install |
| **-setup.exe** | Installer - adds shortcuts, register app |

## 🚀 How to Build

### Option A: GitHub Actions (Recommended - No Rust!)

**Step 1: Push to GitHub**

```powershell
cd "E:\Video Download\yt-dlp-app\ytdlp-app"

git init
git add .
git commit -m "Initial commit"
git branch -M main

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/ytdlp-app.git
git push -u origin main
```

**Step 2: Wait for GitHub to Build**

- Go to https://github.com/YOUR_USERNAME/ytdlp-app
- Click "Actions" tab
- Build completes in ~5-10 minutes

**Step 3: Download Your .EXE**

- Go to "Releases" section
- Download `ytdlp-app.exe`
- Or download `YT-DLP Downloader_0.1.0_x64-setup.exe` for installer

---

### Option B: Build Locally (Requires Rust)

**Step 1: Install Rust (10 minutes)**

```powershell
# Download and run installer
irm https://win.rustup.rs/x86_64 -OutFile rustup-init.exe
./rustup-init.exe -y

# Restart PowerShell after this!
```

**Step 2: Build**

```powershell
cd "E:\Video Download\yt-dlp-app\ytdlp-app"

# Download yt-dlp binary first
.\scripts\download-ytdlp.ps1

# Build the .exe
npm run tauri:build
```

**Step 3: Get Your .EXE**

```
src-tauri/target/release/ytdlp-app.exe
```

---

## 📊 Build Times

| Machine | Time |
|---------|------|
| GitHub Actions | 5-10 minutes |
| Local (first build) | 10-15 minutes |
| Local (rebuild) | 2-3 minutes |

---

## ✅ Current Status

Your app is **ready to build**! Everything is configured:

- ✅ React + TypeScript frontend
- ✅ Tailwind CSS styling
- ✅ Rust backend with yt-dlp integration
- ✅ yt-dlp binary bundled (18MB)
- ✅ App icons generated
- ✅ GitHub Actions workflow ready
- ✅ All screens implemented

**Just push to GitHub and the .exe will be built automatically!**

---

## 📁 Project Structure

```
ytdlp-app/
├── src/                      # React frontend
│   ├── components/           # UI components
│   ├── screens/              # Main screens
│   ├── hooks/useTauri.ts     # Backend API
│   └── stores/appStore.ts    # State management
├── src-tauri/
│   ├── src/commands.rs       # Rust backend
│   ├── binaries/yt-dlp.exe   # Bundled downloader (18MB)
│   └── icons/                # App icons
├── .github/workflows/        # Auto-build on GitHub
└── scripts/                  # Build helpers
```

---

## 🎨 What's Inside the .EXE?

| Component | Size | What It Does |
|-----------|------|--------------|
| React app | ~2MB | UI (buttons, inputs, etc.) |
| Tauri runtime | ~5MB | Desktop window framework |
| WebView2 | System | Renders the UI (built into Windows 10/11) |
| yt-dlp.exe | ~18MB | Downloads YouTube videos |
| **Total** | **~25MB** | **Everything needed!** |

Users just need:
- Windows 10 or 11
- Nothing else!

---

## ❓ FAQ

**Q: Do users need to install anything?**  
A: No! The .exe includes everything.

**Q: Does it work offline?**  
A: Yes, after downloading yt-dlp once.

**Q: How do I update the app?**  
A: Build a new version and replace the .exe.

**Q: Can I distribute this?**  
A: Yes! It's your app.

---

## 🚀 Next Steps

1. **Push to GitHub** (if you want auto-builds)
2. **Or install Rust** (if you want to build locally)
3. **Test with `npm run dev`** (immediate, no build needed)

Your professional YT-DLP Downloader is ready! 🎉
