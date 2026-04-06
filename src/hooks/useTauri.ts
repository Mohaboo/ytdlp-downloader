import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
import { useEffect, useCallback } from 'react';
import type { VideoInfo, DownloadProgress } from '@/types';

// Check if Tauri is available
const isTauri = () => {
  return typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined;
};

// Mock video info for browser testing
const mockVideoInfo = (url: string): VideoInfo => ({
  id: 'demo123',
  title: 'Sample YouTube Video - Tauri Desktop App Tutorial',
  channel: 'Tech Tutorials',
  duration: '15:42',
  views: '2.5M views',
  thumbnail: '',
  formats: [
    { format_id: '137', quality: '1080p', ext: 'mp4', filesize: 150000000 },
    { format_id: '136', quality: '720p', ext: 'mp4', filesize: 80000000 },
    { format_id: '135', quality: '480p', ext: 'mp4', filesize: 40000000 },
  ],
});

// Get video info from URL
export async function getVideoInfo(url: string): Promise<VideoInfo> {
  // If not in Tauri, return mock data
  if (!isTauri()) {
    console.log('Tauri not available - using mock data');
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockVideoInfo(url);
  }

  return invoke('get_video_info', { url });
}

// Start a download
export async function startDownload(
  url: string,
  downloadId: string,
  outputPath: string,
  quality: string,
  format: string
): Promise<void> {
  if (!isTauri()) {
    console.log('Tauri not available - download simulation');
    return;
  }

  return invoke('start_download', {
    url,
    downloadId,
    outputPath,
    quality,
    format,
  });
}

// Cancel a download
export async function cancelDownload(downloadId: string): Promise<void> {
  if (!isTauri()) {
    return;
  }

  return invoke('cancel_download', { downloadId });
}

// Get default download directory
export async function getDefaultDownloadDir(): Promise<string> {
  if (!isTauri()) {
    return 'C:\\Users\\Videos';
  }

  return invoke('get_default_download_dir');
}

// Open folder in file explorer
export async function openFolder(path: string): Promise<void> {
  if (!isTauri()) {
    console.log('Would open folder:', path);
    return;
  }

  return invoke('open_folder', { path });
}

// Hook to listen for download progress
export function useDownloadProgress(
  onProgress: (progress: DownloadProgress) => void
) {
  useEffect(() => {
    if (!isTauri()) return;
    
    let unlisten: (() => void) | null = null;
    
    const setupListener = async () => {
      unlisten = await listen<DownloadProgress>('download-progress', (event) => {
        onProgress(event.payload);
      });
    };
    
    setupListener();
    
    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, [onProgress]);
}

// Hook to listen for download completion
export function useDownloadComplete(
  onComplete: (downloadId: string) => void
) {
  useEffect(() => {
    if (!isTauri()) return;
    
    let unlisten: (() => void) | null = null;
    
    const setupListener = async () => {
      unlisten = await listen<string>('download-complete', (event) => {
        onComplete(event.payload);
      });
    };
    
    setupListener();
    
    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, [onComplete]);
}
