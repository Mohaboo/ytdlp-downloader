use std::process::Command;
use std::env;
use std::path::PathBuf;

fn main() {
    // Build the Tauri application
    tauri_build::build();
    
    // Get target triple
    let target = env::var("TARGET").unwrap_or_else(|_| {
        // Detect target from rustup
        let output = Command::new("rustc")
            .args(&["--version", "--verbose"])
            .output()
            .expect("Failed to run rustc");
        
        let stdout = String::from_utf8_lossy(&output.stdout);
        let host_line = stdout.lines()
            .find(|l| l.starts_with("host:"))
            .expect("Could not find host triple");
        
        host_line.split(':').nth(1).unwrap().trim().to_string()
    });
    
    println!("cargo:rustc-env=TARGET={}", target);
    
    // Tell cargo to rerun if binaries change
    println!("cargo:rerun-if-changed=binaries/");
}
