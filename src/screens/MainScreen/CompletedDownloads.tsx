import { CheckCircle2, FolderOpen, Trash2 } from 'lucide-react';
import { Card } from '@/components/Card';
import { IconButton } from '@/components/IconButton';
import { useAppStore } from '@/stores/appStore';

export function CompletedDownloads() {
  const { downloads, clearCompleted } = useAppStore();
  
  const completedDownloads = downloads.filter((d) => d.status === 'completed');
  
  if (completedDownloads.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-body font-semibold text-text-primary flex items-center gap-2">
          <CheckCircle2 size={16} className="text-secondary" />
          Completed ({completedDownloads.length})
        </h3>
        
        <button
          onClick={clearCompleted}
          className="text-xs text-text-secondary hover:text-error transition-colors flex items-center gap-1"
        >
          <Trash2 size={12} />
          Clear All
        </button>
      </div>
      
      {completedDownloads.map((download) => (
        <Card 
          key={download.id} 
          variant="high" 
          className="flex items-center justify-between py-3 opacity-80"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
            <span className="text-sm text-text-secondary line-clamp-1">
              {download.title}
            </span>
          </div>
          
          <IconButton size="sm" className="text-text-secondary hover:text-primary">
            <FolderOpen size={16} />
          </IconButton>
        </Card>
      ))}
    </div>
  );
}
