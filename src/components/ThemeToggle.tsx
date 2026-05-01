import React from 'react';
import { Palette, Sparkles, Zap, Shield, Music } from 'lucide-react';

interface ThemeToggleProps {
  currentTheme: string;
  setTheme: (theme: string) => void;
}

export function ThemeToggle({ currentTheme, setTheme }: ThemeToggleProps) {
  const themes = [
    { id: 'default', name: 'Command', icon: <Shield className="w-3 h-3" /> },
    { id: 'party', name: 'Party', icon: <Sparkles className="w-3 h-3" /> },
    { id: 'batman', name: 'Dark Knight', icon: <Zap className="w-3 h-3" /> },
    { id: 'musical', name: 'Notes', icon: <Music className="w-3 h-3" /> },
  ];

  return (
    <div className="flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/5">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
            currentTheme === t.id
              ? 'bg-brand-indigo text-white shadow-lg shadow-brand-indigo/20'
              : 'text-slate-500 hover:text-slate-300'
          }`}
          title={`${t.name} Theme`}
        >
          {t.icon}
          <span className="hidden sm:inline">{t.name}</span>
        </button>
      ))}
    </div>
  );
}
