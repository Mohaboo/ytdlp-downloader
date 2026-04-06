import { 
  Folder, Film, FileText, Scissors, Keyboard, 
  Youtube, Check, Key 
} from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/utils/cn';

export function SettingsScreen() {
  const { settings, updateSettings, youtubeLoginStatus, setYoutubeLoginStatus } = useAppStore();
  
  const handleYoutubeLogin = () => {
    // Open YouTube in default browser
    window.open('https://youtube.com', '_blank');
    setYoutubeLoginStatus('logging_in');
  };
  
  const captureSession = () => {
    // Simulate capturing cookies from browser
    setTimeout(() => {
      setYoutubeLoginStatus('logged_in');
      updateSettings({ youtubeLoggedIn: true });
    }, 1000);
  };
  
  return (
    <div className="flex-1 h-screen bg-background overflow-y-auto">
      {/* Header */}
      <header className="h-16 bg-surface border-b border-border/30 flex items-center px-6 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <SettingsIcon />
          <h1 className="text-headline font-semibold text-text-primary">Settings</h1>
        </div>
      </header>
      
      {/* Content */}
      <main className="p-6 max-w-3xl mx-auto space-y-6">
        {/* Download Location */}
        <Card variant="default" className="space-y-4">
          <SectionHeader icon={<Folder size={18} />} title="Download Location" />
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={settings.downloadPath}
                onChange={(e) => updateSettings({ downloadPath: e.target.value })}
                className="h-11"
              />
            </div>
            <Button className="h-11 px-6">Browse</Button>
          </div>
        </Card>
        
        {/* Default Quality */}
        <Card variant="default" className="space-y-4">
          <SectionHeader icon={<Film size={18} />} title="Default Quality" />
          <RadioGroup
            options={[
              { value: 'best', label: 'Best Available' },
              { value: '1080p', label: '1080p' },
              { value: '720p', label: '720p' },
              { value: 'audio', label: 'Audio Only' },
            ]}
            value={settings.defaultQuality}
            onChange={(v) => updateSettings({ defaultQuality: v as any })}
          />
        </Card>
        
        {/* Default Format */}
        <Card variant="default" className="space-y-4">
          <SectionHeader icon={<FileText size={18} />} title="Default Format" />
          <RadioGroup
            options={[
              { value: 'mp4', label: 'MP4 (H.264)' },
              { value: 'mkv', label: 'MKV' },
              { value: 'mp3', label: 'MP3 (Audio Only)' },
            ]}
            value={settings.defaultFormat}
            onChange={(v) => updateSettings({ defaultFormat: v as any })}
          />
        </Card>
        
        {/* SponsorBlock */}
        <Card variant="default" className="space-y-4">
          <SectionHeader icon={<Scissors size={18} />} title="SponsorBlock (Auto-skip segments)" />
          <div className="grid grid-cols-2 gap-3">
            <Checkbox
              label="Sponsorships"
              checked={settings.sponsorBlock.sponsor}
              onChange={(v) => updateSettings({ 
                sponsorBlock: { ...settings.sponsorBlock, sponsor: v } 
              })}
            />
            <Checkbox
              label="Intro/Outro"
              checked={settings.sponsorBlock.intro}
              onChange={(v) => updateSettings({ 
                sponsorBlock: { ...settings.sponsorBlock, intro: v } 
              })}
            />
            <Checkbox
              label="Subscription reminders"
              checked={settings.sponsorBlock.outro}
              onChange={(v) => updateSettings({ 
                sponsorBlock: { ...settings.sponsorBlock, outro: v } 
              })}
            />
            <Checkbox
              label="Self-promotion"
              checked={settings.sponsorBlock.selfPromo}
              onChange={(v) => updateSettings({ 
                sponsorBlock: { ...settings.sponsorBlock, selfPromo: v } 
              })}
            />
          </div>
        </Card>
        
        {/* YouTube Account */}
        <Card variant="default" className="space-y-4">
          <SectionHeader icon={<Key size={18} />} title="YouTube Account" />
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <span className={cn(
                "w-2 h-2 rounded-full",
                youtubeLoginStatus === 'logged_in' ? "bg-secondary" : 
                youtubeLoginStatus === 'logging_in' ? "bg-tertiary animate-pulse" : "bg-error"
              )} />
              <span className="text-text-secondary">
                {youtubeLoginStatus === 'logged_in' 
                  ? 'Logged in - Can download restricted videos' 
                  : youtubeLoginStatus === 'logging_in'
                  ? 'Waiting for login completion...'
                  : 'Not logged in - Some videos may be restricted'}
              </span>
            </div>
            
            {youtubeLoginStatus === 'logging_in' ? (
              <Button 
                onClick={captureSession}
                leftIcon={<Check size={18} />}
                className="w-full"
              >
                Capture Session
              </Button>
            ) : youtubeLoginStatus === 'logged_in' ? (
              <Button 
                variant="secondary"
                onClick={() => setYoutubeLoginStatus('logged_out')}
                className="w-full"
              >
                Logout
              </Button>
            ) : (
              <Button 
                onClick={handleYoutubeLogin}
                leftIcon={<Youtube size={18} />}
                className="w-full"
              >
                Login to YouTube
              </Button>
            )}
            
            <p className="text-xs text-text-muted">
              Login once to download age-restricted and private videos. 
              The app will capture your session automatically.
            </p>
          </div>
        </Card>
        
        {/* Global Hotkey */}
        <Card variant="default" className="space-y-4">
          <SectionHeader icon={<Keyboard size={18} />} title="Global Hotkey" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">Download from clipboard:</span>
            <div className="flex items-center gap-2">
              <kbd className="px-3 py-1.5 bg-surface-light rounded text-sm font-mono text-text-primary">
                {settings.globalHotkey}
              </kbd>
              <Button variant="secondary" size="sm">Change</Button>
            </div>
          </div>
        </Card>
        
        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </main>
    </div>
  );
}

// Helper Components
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-primary">
      {icon}
      <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

interface RadioGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

function RadioGroup({ options, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-6">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
          <div
            onClick={() => onChange(option.value)}
            className={cn(
              "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
              value === option.value
                ? "border-primary"
                : "border-border group-hover:border-text-secondary"
            )}
          >
            {value === option.value && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
          <span className={cn(
            "text-sm transition-colors",
            value === option.value ? "text-text-primary" : "text-text-secondary"
          )}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        onClick={() => onChange(!checked)}
        className={cn(
          "w-4 h-4 rounded border flex items-center justify-center transition-colors",
          checked
            ? "bg-primary border-primary"
            : "border-border group-hover:border-text-secondary"
        )}
      >
        {checked && <Check size={12} className="text-white" />}
      </div>
      <span className={cn(
        "text-sm transition-colors",
        checked ? "text-text-primary" : "text-text-secondary"
      )}>
        {label}
      </span>
    </label>
  );
}
