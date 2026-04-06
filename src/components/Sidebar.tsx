import { cn } from '@/utils/cn';
import { Home, Download, Settings, Activity, RefreshCw } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import type { Screen } from '@/types';

interface NavItem {
  id: Screen;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'main', icon: <Home size={22} />, label: 'Home' },
  { id: 'main', icon: <Download size={22} />, label: 'Downloads' },
  { id: 'settings', icon: <Settings size={22} />, label: 'Settings' },
];

const bottomItems: NavItem[] = [
  { id: 'main', icon: <Activity size={20} />, label: 'Stats' },
  { id: 'main', icon: <RefreshCw size={20} />, label: 'Updates' },
];

export function Sidebar() {
  const { currentScreen, setScreen } = useAppStore();
  
  return (
    <aside className="w-16 h-screen bg-surface border-r border-border/30 flex flex-col items-center py-6 gap-6">
      {/* Top Navigation */}
      <nav className="flex flex-col items-center gap-4">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setScreen(item.id)}
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200',
              currentScreen === item.id
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
            )}
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
      </nav>
      
      {/* Divider */}
      <div className="w-8 h-px bg-border/50" />
      
      {/* Bottom Navigation */}
      <nav className="mt-auto flex flex-col items-center gap-3">
        {bottomItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setScreen(item.id)}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-200"
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </aside>
  );
}
