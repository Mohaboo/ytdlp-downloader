#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;

use commands::*;
use tauri::{Manager, WindowEvent};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Get the app handle for later use
            let _app_handle = app.handle();
            
            // Ensure yt-dlp binary exists
            // The sidecar should be automatically available
            
            Ok(())
        })
        .on_window_event(|event| {
            match event.event() {
                WindowEvent::CloseRequested { api, .. } => {
                    // Handle close request - could ask to cancel downloads
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![
            get_video_info,
            start_download,
            cancel_download,
            get_default_download_dir,
            open_folder,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
