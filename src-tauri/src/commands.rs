use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::process::Stdio;
use tauri::{api::process::Command, Window};
use tokio::io::{AsyncBufReadExt, BufReader};
use regex::Regex;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VideoInfo {
    pub id: String,
    pub title: String,
    pub channel: String,
    pub duration: String,
    pub views: String,
    pub thumbnail: String,
    pub formats: Vec<VideoFormat>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VideoFormat {
    pub format_id: String,
    pub quality: String,
    pub ext: String,
    pub filesize: Option<u64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DownloadProgress {
    pub download_id: String,
    pub progress: f64,
    pub speed: String,
    pub eta: String,
    pub status: String,
}

/// Get video information from URL
#[tauri::command]
pub async fn get_video_info(url: String) -> Result<VideoInfo, String> {
    let sidecar = Command::new_sidecar("yt-dlp")
        .map_err(|e| format!("Failed to find yt-dlp: {}", e))?;

    let output = sidecar
        .args([
            "--dump-json",
            "--no-download",
            "--ignore-errors",
            &url,
        ])
        .output()
        .await
        .map_err(|e| format!("Failed to execute yt-dlp: {}", e))?;

    if !output.status.success() {
        return Err(format!("yt-dlp error: {}", output.stderr));
    }

    // Parse JSON output
    let json_str = output.stdout;
    let data: serde_json::Value = serde_json::from_str(&json_str)
        .map_err(|e| format!("Failed to parse video info: {}", e))?;

    let formats: Vec<VideoFormat> = data["formats"]
        .as_array()
        .unwrap_or(&vec![])
        .iter()
        .filter(|f| f["vcodec"].as_str().unwrap_or("") != "none")
        .map(|f| VideoFormat {
            format_id: f["format_id"].as_str().unwrap_or("").to_string(),
            quality: f["quality_label"].as_str().unwrap_or("unknown").to_string(),
            ext: f["ext"].as_str().unwrap_or("mp4").to_string(),
            filesize: f["filesize"].as_u64(),
        })
        .collect();

    Ok(VideoInfo {
        id: data["id"].as_str().unwrap_or("").to_string(),
        title: data["title"].as_str().unwrap_or("Unknown").to_string(),
        channel: data["channel"].as_str().unwrap_or("Unknown").to_string(),
        duration: format_duration(data["duration"].as_u64().unwrap_or(0)),
        views: format_views(data["view_count"].as_u64().unwrap_or(0)),
        thumbnail: data["thumbnail"].as_str().unwrap_or("").to_string(),
        formats,
    })
}

/// Start a download and emit progress events
#[tauri::command]
pub async fn start_download(
    window: Window,
    url: String,
    download_id: String,
    output_path: String,
    quality: String,
    format: String,
) -> Result<(), String> {
    let sidecar = Command::new_sidecar("yt-dlp")
        .map_err(|e| format!("Failed to find yt-dlp: {}", e))?;

    // Build quality format string
    let format_arg = match quality.as_str() {
        "best" => "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best".to_string(),
        "1080p" => "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[height<=1080]".to_string(),
        "720p" => "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720]".to_string(),
        "480p" => "bestvideo[height<=480][ext=mp4]+bestaudio[ext=m4a]/best[height<=480]".to_string(),
        "audio" => "bestaudio[ext=m4a]/bestaudio".to_string(),
        _ => "best[ext=mp4]/best".to_string(),
    };

    let output_template = format!("{}/%(title)s.%(ext)s", output_path);

    let mut args = vec![
        "--newline",
        "--progress",
        "--no-warnings",
        "-f", &format_arg,
        "-o", &output_template,
        "--no-playlist",
    ];

    // Add sponsorblock if needed
    // args.push("--sponsorblock-remove");
    // args.push("sponsor,intro,outro");

    args.push(&url);

    let mut child = sidecar
        .args(&args)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|e| format!("Failed to spawn yt-dlp: {}", e))?;

    let stdout = child.stdout.take().ok_or("Failed to capture stdout")?;
    let reader = BufReader::new(stdout);
    let mut lines = reader.lines();

    // Regex patterns for parsing progress
    let progress_re = Regex::new(r"\[download\]\s+(\d+\.?\d*)%\s+of\s+~?\s*(\S+)\s+at\s+(\S+)\s+ETA\s+(\S+)").unwrap();

    // Read output lines
    while let Some(line) = lines.next_line().await.map_err(|e| e.to_string())? {
        if let Some(caps) = progress_re.captures(&line) {
            let progress: f64 = caps[1].parse().unwrap_or(0.0);
            let size = caps[2].to_string();
            let speed = caps[3].to_string();
            let eta = caps[4].to_string();

            let progress_data = DownloadProgress {
                download_id: download_id.clone(),
                progress,
                speed: format!("{}/s", speed),
                eta,
                status: "downloading".to_string(),
            };

            // Emit progress event to frontend
            let _ = window.emit("download-progress", progress_data);
        }
    }

    // Wait for process to complete
    let status = child.wait().await.map_err(|e| e.to_string())?;

    if status.success() {
        let _ = window.emit("download-complete", download_id);
        Ok(())
    } else {
        Err("Download failed".to_string())
    }
}

/// Cancel an ongoing download
#[tauri::command]
pub async fn cancel_download(download_id: String) -> Result<(), String> {
    // Implementation would track process handles and kill them
    // For now, just return success
    Ok(())
}

/// Get default download directory
#[tauri::command]
pub fn get_default_download_dir() -> Result<String, String> {
    let home = dirs::home_dir().ok_or("Could not find home directory")?;
    let download_dir = home.join("Videos");
    
    // Create directory if it doesn't exist
    if !download_dir.exists() {
        std::fs::create_dir_all(&download_dir).map_err(|e| e.to_string())?;
    }
    
    Ok(download_dir.to_string_lossy().to_string())
}

/// Open a folder in file explorer
#[tauri::command]
pub async fn open_folder(path: String) -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        std::process::Command::new("explorer")
            .args(["/select,", &path])
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    
    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg(&path)
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    
    #[cfg(target_os = "linux")]
    {
        std::process::Command::new("xdg-open")
            .arg(&path)
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    
    Ok(())
}

// Helper functions
fn format_duration(seconds: u64) -> String {
    let hours = seconds / 3600;
    let minutes = (seconds % 3600) / 60;
    let secs = seconds % 60;
    
    if hours > 0 {
        format!("{}:{:02}:{:02}", hours, minutes, secs)
    } else {
        format!("{}:{:02}", minutes, secs)
    }
}

fn format_views(count: u64) -> String {
    if count >= 1_000_000 {
        format!("{:.1}M views", count as f64 / 1_000_000.0)
    } else if count >= 1_000 {
        format!("{}K views", count / 1_000)
    } else {
        format!("{} views", count)
    }
}
