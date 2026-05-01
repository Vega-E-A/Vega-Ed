import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity,
  ArrowUpRight,
  Zap,
  Database,
  Guitar,
  ShieldAlert,
  Target,
  Cpu,
  Scan
} from 'lucide-react';
import { VegaLogo } from './Logo';
import { TerminalLog } from './TerminalLog';
import { VEGA_SITE_CONTENT } from '../constants';

interface DashboardProps {
  onNavigate: (id: string) => void;
  theme: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, theme }) => {
  const archiveData = VEGA_SITE_CONTENT.sections.filter(s => s.category === 'Archive');

  const row1 = archiveData.slice(0, 3);
  const row2 = archiveData.slice(3, 5);

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      {/* Hero HUD Section */}
      <section className="relative overflow-hidden rounded-[40px] bg-brand-slate-800/40 p-8 lg:p-16 border border-white/5">
        <div className="absolute top-0 right-0 -m-12 w-96 h-96 bg-brand-indigo/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 -m-12 w-64 h-64 bg-brand-gold/5 blur-[80px] rounded-full"></div>
        
        {/* Scanner Line Animation */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="w-full h-px bg-white animate-scan"></div>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-brand-indigo mb-10">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>Session Operational • Link Verified</span>
        </div>

        <div className="relative z-10">
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-20 h-20 bg-brand-indigo/10 rounded-2xl border border-brand-indigo/20 flex items-center justify-center overflow-hidden hover:border-brand-gold/50 transition-all relative group">
                <VegaLogo className="w-12 h-12 relative z-10 transition-transform group-hover:scale-110" />
                <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>
              </div>
              <div className="h-16 w-px bg-white/5"></div>
              <div>
                <h2 className="text-5xl lg:text-8xl font-black text-white tracking-tighter leading-[0.75] italic uppercase underline decoration-brand-gold/30">
                  {theme === 'musical' ? (
                    <div className="relative inline-block">
                      Noteworthy <br/>
                      <span className="text-brand-indigo">Consulting</span>
                      <motion.div 
                        initial={{ rotate: -20, opacity: 0, x: 20 }}
                        animate={{ rotate: 10, opacity: 1, x: 0 }}
                        className="absolute -right-16 top-0 hidden lg:block"
                      >
                        <Guitar className="w-24 h-24 text-brand-gold opacity-40" />
                      </motion.div>
                      <br/>
                      <span className="text-white/20 text-[10px] lg:text-xs tracking-[0.4em] font-sans lowercase font-normal block mt-4">The Search for Intelligent Life</span>
                    </div>
                  ) : theme === 'batman' ? (
                    <div className="relative inline-block">
                      Dark <span className="text-brand-indigo">Knight</span> <br/>
                      <span className="text-white">Detective</span>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -right-24 top-0 hidden lg:block"
                      >
                        <div className="relative w-32 h-32 flex items-center justify-center">
                          <div className="absolute inset-0 bg-brand-gold/20 blur-2xl rounded-full animate-pulse"></div>
                          <Zap className="w-16 h-16 text-brand-gold relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                        </div>
                      </motion.div>
                      <br/>
                      <span className="text-white/20 text-[10px] lg:text-xs tracking-[0.4em] font-sans lowercase font-normal block mt-4">Shadow of the Ascension</span>
                    </div>
                  ) : (
                    <>
                      Vega Educational <br/>
                      <span className="text-brand-indigo">Associates</span>
                    </>
                  )}
                </h2>
              </div>
            </div>

            <div className="p-8 rounded-[32px] bg-brand-gold/5 border border-brand-gold/20 max-w-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Zap className="w-20 h-20 text-brand-gold whitespace-nowrap" />
              </div>
              <p className="text-brand-gold text-2xl lg:text-3xl font-black uppercase tracking-tight leading-tight relative z-10">
                Accelerating excellence <br/>
                <span className="text-white">one prompt at a time</span>
              </p>
              <div className="mt-4 h-1 w-20 bg-brand-gold rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Knight Secret Gadgets */}
      {theme === 'batman' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Batarang Sync', icon: <Target className="w-5 h-5" />, color: 'text-brand-gold' },
            { label: 'Smoke Pellet', icon: <Scan className="w-5 h-5" />, color: 'text-slate-400' },
            { label: 'Bat-Computer', icon: <Cpu className="w-5 h-5" />, color: 'text-brand-indigo' },
            { label: 'Infiltration', icon: <ShieldAlert className="w-5 h-5" />, color: 'text-red-500' },
          ].map((gadget, i) => (
            <button 
              key={i}
              className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-brand-gold/40 transition-all flex flex-col items-center gap-3 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className={`${gadget.color} group-hover:scale-110 transition-transform`}>
                {gadget.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                {gadget.label}
              </span>
              <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-brand-gold animate-ping"></div>
            </button>
          ))}
        </motion.div>
      )}

      <div className="space-y-12">
        {/* Main Section: Mission & Projects */}
        <div className="space-y-12">
          
          {/* Academic Resource Portal - Primary Assets */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 px-4">
              <Database className="w-4 h-4 text-brand-indigo" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                Academic Portal
              </h3>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                {row1.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => onNavigate(section.id)}
                    className="p-8 rounded-[32px] bg-slate-900 border border-white/5 hover:border-brand-indigo/40 hover:bg-brand-indigo/5 transition-all text-left text-slate-400 hover:text-white group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 mt-6 mr-6 opacity-10 group-hover:opacity-30 transition-opacity">
                      <Database className="w-12 h-12" />
                    </div>
                    <p className="text-base font-black tracking-tight leading-tight uppercase group-hover:translate-x-1 transition-transform line-clamp-2">{section.title}</p>
                    <p className="mt-2 text-[10px] text-slate-500 font-medium line-clamp-2 group-hover:text-slate-300 transition-colors">
                      {section.content[0].replace(/\*\*/g, '')}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <div></div>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0" />
                    </div>
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {row2.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => onNavigate(section.id)}
                    className="p-8 rounded-[32px] bg-slate-900 border border-white/5 hover:border-brand-indigo/40 hover:bg-brand-indigo/5 transition-all text-left text-slate-400 hover:text-white group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 mt-6 mr-6 opacity-10 group-hover:opacity-30 transition-opacity">
                      <Database className="w-12 h-12" />
                    </div>
                    <p className="text-base font-black tracking-tight leading-tight uppercase group-hover:translate-x-1 transition-transform line-clamp-2">{section.title}</p>
                    <p className="mt-2 text-[10px] text-slate-500 font-medium line-clamp-2 group-hover:text-slate-300 transition-colors">
                      {section.content[0].replace(/\*\*/g, '')}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <div></div>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* System Telemetry - Bottom Section */}
      <section className="mt-12">
        <div className="flex items-center gap-4 px-4 mb-6">
          <Activity className="w-4 h-4 text-brand-indigo" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
            Session Logs & Activity
          </h3>
        </div>
        <div className="max-w-4xl mx-auto">
          <TerminalLog />
        </div>
      </section>
    </div>
  );
};
