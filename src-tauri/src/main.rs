#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;

use commands::*;
use tauri::WindowEvent;

fn main() {
    tauri::Builder::default()
        .setup(|_app| {
            Ok(())
        })
        .on_window_event(|event| {
            match event.event() {
                WindowEvent::CloseRequested { .. } => {
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
