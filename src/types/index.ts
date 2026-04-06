export interface VideoFormat {
  format_id: string;
  quality: string;
  ext: string;
  filesize?: number;
}

export interface VideoInfo {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  thumbnail: string;
  quality: string;
  format: string;
  formats?: VideoFormat[];
}

export interface DownloadItem {
  id: string;
  videoId: string;
  title: string;
  status: 'pending' | 'downloading' | 'paused' | 'completed' | 'error';
  progress: number;
  speed: string;
  eta: string;
  size: string;
  path?: string;
}

export interface DownloadProgress {
  download_id: string;
  progress: number;
  speed: string;
  eta: string;
  status: string;
}

export interface Settings {
  downloadPath: string;
  defaultQuality: 'best' | '1080p' | '720p' | 'audio';
  defaultFormat: 'mp4' | 'mkv' | 'mp3';
  sponsorBlock: {
    sponsor: boolean;
    intro: boolean;
    outro: boolean;
    selfPromo: boolean;
  };
  globalHotkey: string;
  youtubeLoggedIn: boolean;
}

export type Screen = 'main' | 'settings' | 'onboarding' | 'mini';
