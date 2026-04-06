# App Icons

Icons will be generated automatically during build.

To manually generate icons from a PNG:
```bash
npm run tauri icon /path/to/your/icon.png
```

Required icon files (auto-generated):
- `32x32.png` - Taskbar icon
- `128x128.png` - App icon
- `128x128@2x.png` - Retina display
- `icon.icns` - macOS icon
- `icon.ico` - Windows icon
