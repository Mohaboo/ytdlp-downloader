import { Image, Download } from 'lucide-react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { useAppStore } from '@/stores/appStore';

export function VideoPreview() {
  const { videoInfo, setShowQualitySelector } = useAppStore();
  
  if (!videoInfo) return null;
  
  // Get best quality from formats
  const bestFormat = videoInfo.formats?.[0];
  const quality = bestFormat?.quality || '1080p';
  const format = bestFormat?.ext?.toUpperCase() || 'MP4';
  
  return (
    <Card variant="high" className="flex gap-5">
      {/* Thumbnail */}
      <div className="w-52 h-28 bg-surface-light rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
        {videoInfo.thumbnail ? (
          <img 
            src={videoInfo.thumbnail} 
            alt={videoInfo.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to icon on error
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <Image size={40} className="text-text-muted" />
        )}
      </div>
      
      {/* Info */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="text-title font-semibold text-text-primary mb-1 line-clamp-1">
            {videoInfo.title}
          </h3>
          <p className="text-body text-text-secondary">
            {videoInfo.channel} • {videoInfo.duration} • {videoInfo.views}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="primary">{quality}</Badge>
            <Badge variant="secondary">{format}</Badge>
          </div>
          
          <Button 
            variant="primary" 
            size="sm"
            leftIcon={<Download size={16} />}
            onClick={() => setShowQualitySelector(true)}
            className="bg-gradient-success"
          >
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
}
