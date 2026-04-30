import { create } from 'zustand';
import type { DownloadItem, Settings, Screen, VideoInfo } from '@/types';
import { getDefaultDownloadDir, getVideoInfo as fetchVideoInfo } from '@/hooks/useTauri';

interface AppState {
  // Navigation
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  
  // Video preview
  videoInfo: VideoInfo | null;
  currentUrl: string;
  setVideoInfo: (info: VideoInfo | null) => void;
  isLoadingVideo: boolean;
  videoError: string | null;
  loadVideoInfo: (url: string) => Promise<void>;
  
  // Downloads
  downloads: DownloadItem[];
  addDownload: (item: DownloadItem) => void;
  updateDownload: (id: string, updates: Partial<DownloadItem>) => void;
  removeDownload: (id: string) => void;
  clearCompleted: () => void;
  
  // Settings
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  initSettings: () => Promise<void>;
  
  // Quality selector modal
  showQualitySelector: boolean;
  setShowQualitySelector: (show: boolean) => void;
  
  // YouTube login
  youtubeLoginStatus: 'logged_out' | 'logging_in' | 'logged_in';
  setYoutubeLoginStatus: (status: 'logged_out' | 'logging_in' | 'logged_in') => void;
}

const defaultSettings: Settings = {
  downloadPath: 'C:\\Users\\Videos',
  defaultQuality: 'best',
  defaultFormat: 'mp4',
  sponsorBlock: {
    sponsor: true,
    intro: true,
    outro: true,
    selfPromo: false,
  },
  globalHotkey: 'Ctrl + Shift + D',
  youtubeLoggedIn: false,
};

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  currentScreen: 'main',
  setScreen: (screen) => set({ currentScreen: screen }),
  
  // Video preview
  videoInfo: null,
  currentUrl: '',
  setVideoInfo: (info) => set({ videoInfo: info }),
  isLoadingVideo: false,
  videoError: null,
  loadVideoInfo: async (url: string) => {
    set({ isLoadingVideo: true, currentUrl: url, videoError: null });
    try {
      const info = await fetchVideoInfo(url);
      set({ videoInfo: info, isLoadingVideo: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Failed to load video info:', error);
      set({ isLoadingVideo: false, videoError: message });
    }
  },
  
  // Downloads
  downloads: [
    {
      id: '1',
      videoId: 'vid1',
      title: 'How to Build Desktop Apps.mp4',
      status: 'downloading',
      progress: 80,
      speed: '45.2 MB/s',
      eta: '2:15 remaining',
      size: '125 MB',
    },
    {
      id: '2',
      videoId: 'vid2',
      title: 'Python Tutorial Series.mp4',
      status: 'completed',
      progress: 100,
      speed: '',
      eta: '',
      size: '450 MB',
      path: 'C:\\Users\\Videos\\Python Tutorial Series.mp4',
    },
  ],
  addDownload: (item) => set((state) => ({ 
    downloads: [item, ...state.downloads] 
  })),
  updateDownload: (id, updates) => set((state) => ({
    downloads: state.downloads.map((d) => 
      d.id === id ? { ...d, ...updates } : d
    ),
  })),
  removeDownload: (id) => set((state) => ({
    downloads: state.downloads.filter((d) => d.id !== id),
  })),
  clearCompleted: () => set((state) => ({
    downloads: state.downloads.filter((d) => d.status !== 'completed'),
  })),
  
  // Settings
  settings: defaultSettings,
  updateSettings: (updates) => set((state) => ({
    settings: { ...state.settings, ...updates },
  })),
  initSettings: async () => {
    try {
      const defaultPath = await getDefaultDownloadDir();
      set((state) => ({
        settings: { ...state.settings, downloadPath: defaultPath },
      }));
    } catch (error) {
      console.error('Failed to get default download dir:', error);
    }
  },
  
  // Quality selector
  showQualitySelector: false,
  setShowQualitySelector: (show) => set({ showQualitySelector: show }),
  
  // YouTube login
  youtubeLoginStatus: 'logged_out',
  setYoutubeLoginStatus: (status) => set({ youtubeLoginStatus: status }),
}));
