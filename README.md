# YT-DLP Downloader

A modern, beautiful desktop application for downloading YouTube videos. Just download and run - no installation needed!

![App Screenshot](./screenshot.png)

## 🚀 Quick Start (For Users)

### Download
1. Go to [Releases](https://github.com/Mohaboo/ytdlp-downloader/releases)
2. Download `YT-DLP Downloader-x.x.x-setup.exe`
3. Double-click to install, or use the portable `.exe`

### That's it!
No Node.js, no Rust, no yt-dlp installation required. Everything is bundled.

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

## 🛠️ Development (For Developers Only)

Want to build or modify this app? You'll need:

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
Output will be in `src-tauri/target/release/bundle/`.

---

## 📦 What's Bundled

The distributed app includes:
- ✅ React frontend (~2MB)
- ✅ Tauri runtime (~5MB)
- ✅ yt-dlp downloader (~18MB)
- ✅ Everything needed to run

**Total size**: ~25MB

---

## 🏗️ Project Structure

```
ytdlp-app/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── screens/            # Main screens
│   ├── stores/             # Zustand state management
│   └── types/              # TypeScript types
├── src-tauri/              # Tauri (Rust) backend
│   ├── src/
│   └── binaries/           # Bundled yt-dlp
└── package.json
```

---

## 🎨 Design System

- **Background**: `#1E1E2E` (Dark Navy)
- **Surface**: `#252537`
- **Primary**: `#7C3AED` (Purple)
- **Secondary**: `#10B981` (Emerald)
- **Font**: Inter

---

## 📄 License

MIT
