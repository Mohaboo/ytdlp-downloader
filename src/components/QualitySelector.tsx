import { Star, Monitor, Smartphone, Music, X, ChevronDown, Check } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { startDownload } from '@/hooks/useTauri';

const presets = [
  { id: 'best', icon: Star, label: 'Best Quality (1080p+)', color: 'text-tertiary' },
  { id: 'hd', icon: Monitor, label: 'HD Video (720p)', color: 'text-primary' },
  { id: 'mobile', icon: Smartphone, label: 'Mobile Quality (480p)', color: 'text-primary' },
  { id: 'audio', icon: Music, label: 'Audio Only (MP3 320kbps)', color: 'text-secondary' },
];

export function QualitySelector() {
  const { 
    showQualitySelector, 
    setShowQualitySelector, 
    videoInfo, 
    currentUrl,
    settings,
    addDownload 
  } = useAppStore();
  const [selectedPreset, setSelectedPreset] = useState('best');
  const [embedSubtitles, setEmbedSubtitles] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  
  if (!showQualitySelector) return null;
  
  const handleDownload = async () => {
    if (!videoInfo) return;
    
    setIsStarting(true);
    
    // Create download ID
    const downloadId = Date.now().toString();
    
    // Add to active downloads
    addDownload({
      id: downloadId,
      videoId: videoInfo.id,
      title: `${videoInfo.title}.${selectedPreset === 'audio' ? 'mp3' : 'mp4'}`,
      status: 'downloading',
      progress: 0,
      speed: 'Starting...',
      eta: 'Calculating...',
      size: 'Unknown',
    });
    
    // Close modal
    setShowQualitySelector(false);
    
    try {
      // Start actual download via Tauri
      await startDownload(
        currentUrl,
        downloadId,
        settings.downloadPath,
        selectedPreset,
        selectedPreset === 'audio' ? 'mp3' : 'mp4'
      );
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsStarting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card variant="elevated" className="w-full max-w-md space-y-5" padding="lg">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-headline font-semibold text-text-primary">Quality & Format</h2>
          <button 
            onClick={() => setShowQualitySelector(false)}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Quick Presets */}
        <div className="space-y-3">
          <h3 className="text-body font-semibold text-text-primary">Quick Presets</h3>
          <div className="space-y-1">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                  selectedPreset === preset.id
                    ? "bg-surface-light"
                    : "hover:bg-surface-light/50"
                )}
              >
                <preset.icon size={18} className={preset.color} />
                <span className={cn(
                  "text-sm flex-1 text-left",
                  selectedPreset === preset.id ? "text-text-primary" : "text-text-secondary"
                )}>
                  {preset.label}
                </span>
                {selectedPreset === preset.id && (
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-border/50" />
        
        {/* Custom Selection */}
        <div className="space-y-4">
          <h3 className="text-body font-semibold text-text-primary">Custom Selection</h3>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-1">
              <label className="text-xs text-text-muted">Video</label>
              <button className="w-full flex items-center justify-between px-3 py-2 bg-surface-light rounded-lg text-sm text-text-primary">
                <span>1080p</span>
                <ChevronDown size={14} className="text-text-muted" />
              </button>
            </div>
            
            <div className="flex-1 space-y-1">
              <label className="text-xs text-text-muted">Audio</label>
              <button className="w-full flex items-center justify-between px-3 py-2 bg-surface-light rounded-lg text-sm text-text-primary">
                <span>M4A</span>
                <ChevronDown size={14} className="text-text-muted" />
              </button>
            </div>
          </div>
          
          {/* Embed Subtitles */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setEmbedSubtitles(!embedSubtitles)}
              className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                embedSubtitles ? "bg-primary border-primary" : "border-border"
              )}
            >
              {embedSubtitles && <Check size={12} className="text-white" />}
            </div>
            <span className="text-sm text-text-primary">Embed subtitles</span>
          </label>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={() => setShowQualitySelector(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDownload}
            isLoading={isStarting}
            leftIcon={<Music size={16} />}
          >
            Download
          </Button>
        </div>
      </Card>
    </div>
  );
}
