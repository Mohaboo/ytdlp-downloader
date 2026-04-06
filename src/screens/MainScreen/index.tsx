import { UrlInput } from './UrlInput';
import { VideoPreview } from './VideoPreview';
import { ActiveDownloads } from './ActiveDownloads';
import { CompletedDownloads } from './CompletedDownloads';

export function MainScreen() {
  return (
    <div className="flex-1 h-screen bg-background overflow-y-auto">
      {/* Top Bar */}
      <header className="h-14 bg-surface border-b border-border/30 flex items-center justify-between px-6 sticky top-0 z-10">
        <h1 className="text-sm font-semibold text-text-primary">YT-DLP Downloader</h1>
        
        {/* Window controls placeholder */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-tertiary/50" />
          <div className="w-3 h-3 rounded-full bg-text-secondary/50" />
          <div className="w-3 h-3 rounded-full bg-error/50" />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="p-6 max-w-5xl mx-auto space-y-5">
        {/* URL Input */}
        <UrlInput />
        
        {/* Video Preview */}
        <VideoPreview />
        
        {/* Active Downloads */}
        <ActiveDownloads />
        
        {/* Completed Downloads */}
        <CompletedDownloads />
      </main>
    </div>
  );
}
