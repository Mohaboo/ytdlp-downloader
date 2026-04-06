import { useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MainScreen } from '@/screens/MainScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { QualitySelector } from '@/components/QualitySelector';
import { DemoBanner } from '@/components/DemoBanner';
import { useAppStore } from '@/stores/appStore';
import { useDownloadProgress, useDownloadComplete } from '@/hooks';

function App() {
  const { currentScreen, updateDownload, initSettings } = useAppStore();
  
  // Initialize settings on mount
  useEffect(() => {
    initSettings();
  }, [initSettings]);
  
  // Listen for download progress
  useDownloadProgress((progress) => {
    updateDownload(progress.download_id, {
      progress: progress.progress,
      speed: progress.speed,
      eta: progress.eta,
    });
  });
  
  // Listen for download completion
  useDownloadComplete((downloadId) => {
    updateDownload(downloadId, {
      status: 'completed',
      progress: 100,
    });
  });
  
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      {currentScreen === 'main' && <MainScreen />}
      {currentScreen === 'settings' && <SettingsScreen />}
      
      {/* Modals */}
      <QualitySelector />
      
      {/* Demo Mode Banner */}
      <DemoBanner />
    </div>
  );
}

export default App;
