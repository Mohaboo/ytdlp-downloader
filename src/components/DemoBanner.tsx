import { useEffect, useState } from 'react';

export function DemoBanner() {
  const [isTauri, setIsTauri] = useState(true);
  
  useEffect(() => {
    setIsTauri(typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined);
  }, []);
  
  if (isTauri) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-tertiary/90 text-black px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
        🧪 Demo Mode - Using mock data (no backend)
      </div>
    </div>
  );
}
