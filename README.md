# YT-DLP Downloader

A modern, beautiful desktop application for downloading YouTube videos. Built with Tauri, React, TypeScript, and Tailwind CSS.

![App Screenshot](./screenshot.png)

## Features

- 🎨 **Beautiful Dark UI** - Modern design with purple and emerald accents
- 📥 **Easy Downloads** - Paste URL and download with one click
- ⚙️ **Quality Selection** - Choose from presets or custom quality
- ⏸️ **Download Management** - Pause, resume, and monitor downloads
- ✂️ **SponsorBlock** - Auto-skip sponsored segments
- 🔑 **YouTube Login** - Download age-restricted videos
- ⌨️ **Global Hotkey** - Quick download from clipboard (Ctrl+Shift+D)
- 🪟 **Mini Mode** - Compact window for quick access

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Tauri (Rust)
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Rust](https://rustup.rs/)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) installed on your system

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ytdlp-app.git
cd ytdlp-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run tauri:dev
```

### Building for Production

```bash
npm run tauri:build
```

The compiled app will be in `src-tauri/target/release/`.

## Project Structure

```
ytdlp-app/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── screens/            # Main screens
│   ├── stores/             # Zustand state management
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
├── src-tauri/              # Tauri (Rust) backend
│   ├── src/
│   └── Cargo.toml
└── package.json
```

## Design System

The app follows a custom design system inspired by the "Kinetic Precision" aesthetic:

### Colors
- **Background**: `#1E1E2E` (Dark Navy)
- **Surface**: `#252537`
- **Primary**: `#7C3AED` (Purple)
- **Secondary**: `#10B981` (Emerald)
- **Text Primary**: `#F8FAFC`
- **Text Secondary**: `#94A3B8`

### Typography
- **Font**: Inter
- **Scale**: Display (2.75rem) → Headline (1.5rem) → Title (1.125rem) → Body (0.875rem)

## License

MIT
