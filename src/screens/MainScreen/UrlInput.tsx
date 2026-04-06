import { useState } from 'react';
import { Link, ClipboardPaste, Loader2 } from 'lucide-react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useAppStore } from '@/stores/appStore';

export function UrlInput() {
  const [url, setUrl] = useState('');
  const { loadVideoInfo, isLoadingVideo } = useAppStore();
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      // Auto-fetch video info after paste
      if (text.includes('youtube.com') || text.includes('youtu.be')) {
        loadVideoInfo(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && (url.includes('youtube.com') || url.includes('youtu.be'))) {
      loadVideoInfo(url);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1 relative">
        <Input
          placeholder="Paste YouTube URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          leftIcon={isLoadingVideo ? <Loader2 size={18} className="animate-spin" /> : <Link size={18} />}
          className="h-12"
          disabled={isLoadingVideo}
        />
      </div>
      <Button 
        onClick={handlePaste}
        leftIcon={<ClipboardPaste size={18} />}
        className="h-12 px-5"
        disabled={isLoadingVideo}
      >
        Paste
      </Button>
    </form>
  );
}
