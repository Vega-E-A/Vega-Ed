import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const LOG_MESSAGES = [
  "SYSTEM_CHECK: Navigation systems online...",
  "AI_ENGINE: Optimizing instructional prompts...",
  "SIGNAL_STRENGTH: 98% Linked to Mission Control",
  "DATA_SYNC: Stage 4 resources verified.",
  "PROTOCOL_DELTA: Analyzing district benchmarks...",
  "ACCESS_GRANTED: User 'Educator' authenticated.",
  "MISSION_LOG: Galactic Excellence achieved in Sector 7",
  "UPLINK_STABLE: Real-time consultancy pulse active.",
  "DIAGNOSTIC: No friction detected in pedagogical flow.",
  "SECURITY: Guarding Ground Truth alignment...",
];

export function TerminalLog() {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]];
        return next.slice(-8); // Keep last 8 logs
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-brand-indigo/60 h-48 flex flex-col group hover:border-brand-indigo/30 transition-colors">
      <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
        <Terminal className="w-3 h-3 animate-pulse" />
        <span className="uppercase tracking-[0.2em] font-black">System_Telemetry</span>
        <div className="ml-auto flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/30"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/30"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide" ref={scrollRef}>
        {logs.length === 0 && <p className="animate-pulse">Initialising uplink...</p>}
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2 opacity-80 animate-in fade-in slide-in-from-left-2 duration-500">
            <span className="text-white/20">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
            <span className="text-brand-indigo/80">{log}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[8px] uppercase tracking-[0.3em] font-black text-brand-gold animate-pulse">
        Status: Optimal
      </div>
    </div>
  );
}
