import { Pause, X, Play, Film } from 'lucide-react';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { IconButton } from '@/components/IconButton';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/utils/cn';

export function ActiveDownloads() {
  const { downloads, updateDownload, removeDownload } = useAppStore();
  
  const activeDownloads = downloads.filter(
    (d) => d.status === 'downloading' || d.status === 'paused'
  );
  
  if (activeDownloads.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <h3 className="text-body font-semibold text-text-primary flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
        Active Downloads
      </h3>
      
      {activeDownloads.map((download) => (
        <Card key={download.id} variant="high" className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Thumbnail placeholder */}
              <div className="w-14 h-10 bg-surface-light rounded flex items-center justify-center flex-shrink-0">
                <Film size={16} className="text-text-muted" />
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-text-primary line-clamp-1">
                  {download.title}
                </h4>
                <p className="text-xs text-text-muted mt-0.5">{download.size}</p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-1">
              <IconButton
                size="sm"
                onClick={() => 
                  updateDownload(download.id, {
                    status: download.status === 'downloading' ? 'paused' : 'downloading'
                  })
                }
                className={cn(
                  download.status === 'downloading' 
                    ? 'text-tertiary hover:text-tertiary' 
                    : 'text-secondary hover:text-secondary'
                )}
              >
                {download.status === 'downloading' ? <Pause size={16} /> : <Play size={16} />}
              </IconButton>
              
              <IconButton
                size="sm"
                variant="danger"
                onClick={() => removeDownload(download.id)}
              >
                <X size={16} />
              </IconButton>
            </div>
          </div>
          
          {/* Progress */}
          <div className="space-y-1.5">
            <ProgressBar progress={download.progress} size="sm" />
            <p className="text-xs text-text-secondary">
              {download.progress}% • {download.speed} • {download.eta}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
