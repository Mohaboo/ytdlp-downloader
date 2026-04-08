# YT-DLP Downloader

A modern, beautiful desktop application for downloading YouTube videos. Just download and run - no installation needed!

![App Screenshot](./screenshot.png)

---

## 🚀 Download & Install

### Option 1: Windows Installer (Recommended)
➡️ **[Download YT-DLP Downloader](https://github.com/Mohaboo/ytdlp-downloader/releases/latest)**

1. Click the link above ↑
2. Download `YT-DLP Downloader-x.x.x-setup.exe` (the installer)
3. Double-click to install

### Option 2: Portable (No Install)
➡️ **[Download Portable Version](https://github.com/Mohaboo/ytdlp-downloader/releases/latest)**

1. Download `ytdlp-app.exe` 
2. Double-click to run directly - no installation!

### Requirements
- ✅ Windows 10 or 11
- ✅ Nothing else! (yt-dlp is bundled inside)

---

## ✨ Features

- 🎨 **Beautiful Dark UI** - Modern design with purple and emerald accents
- 📥 **Easy Downloads** - Paste URL and download with one click
- ⚙️ **Quality Selection** - Choose from presets or custom quality
- ⏸️ **Download Management** - Pause, resume, and monitor downloads
- ✂️ **SponsorBlock** - Auto-skip sponsored segments
- 🔑 **YouTube Login** - Download age-restricted videos (one-click login)
- ⌨️ **Global Hotkey** - Quick download from clipboard (Ctrl+Shift+D)

---

## 🛠️ For Developers

Want to build or modify this app?

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [Rust](https://rustup.rs/)

### Setup
```bash
# Clone the repo
git clone https://github.com/Mohaboo/ytdlp-downloader.git
cd ytdlp-downloader

# Install dependencies
npm install

# Run development server
npm run tauri:dev
```

### Build for Production
```bash
npm run tauri:build
```
Output: `src-tauri/target/release/bundle/`

---

## 📦 What's Inside

The distributed app (~25MB) includes:
- ✅ React frontend
- ✅ Tauri runtime
- ✅ yt-dlp downloader (bundled - no separate install!)

---

## 🏗️ Project Structure

```
ytdlp-app/
├── src/                    # React frontend (source code)
├── src-tauri/              # Rust backend (source code)
│   └── binaries/           # yt-dlp gets bundled here during build
└── package.json
```

**Note:** The `.exe` files are built from this source code and released on the [Releases page](https://github.com/Mohaboo/ytdlp-downloader/releases), not stored in the git repository.

---

## 📄 License

MIT
