import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Rocket, 
  Calendar, 
  Users, 
  FileText, 
  Search, 
  ChevronRight,
  Menu,
  X,
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import { VegaLogo } from './Logo';
import { VEGA_SITE_CONTENT } from '../constants';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  theme: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  theme
}) => {
  const categories = Array.from(new Set(VEGA_SITE_CONTENT.sections.map(s => s.category)))
    .filter(c => !['Archive', 'Schedules', 'Institutional'].includes(c));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Strategy': return <Rocket className="w-4 h-4" />;
      case 'Schedules': return <Calendar className="w-4 h-4" />;
      case 'Archive': return <Zap className="w-4 h-4" />;
      case 'Institutional': return <Globe className="w-4 h-4" />;
      default: return <Compass className="w-4 h-4" />;
    }
  };

  const navContent = (
    <div className="flex flex-col h-full bg-brand-slate-900 border-r border-white/5 p-6 shadow-2xl">
      <div 
        onClick={() => {
          setActiveSection('dashboard');
          setIsMobileMenuOpen(false);
        }}
        className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="w-10 h-10 bg-brand-indigo/10 rounded-xl flex items-center justify-center border border-brand-indigo/20 relative group overflow-hidden">
          <VegaLogo className="w-7 h-7 relative z-10" />
        </div>
        <div>
          <h1 className="text-slate-100 font-black text-[11px] tracking-[0.2em] leading-none uppercase mb-1">
            {theme === 'musical' ? 'Noteworthy' : <>Vega <span className="text-brand-gold">Edu</span></>}
          </h1>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em]">
            {theme === 'musical' ? 'Consulting' : 'Associates'}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide">
        <div className="space-y-2">
          <h2 className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-600 px-3">
            Principal Control
          </h2>
          <button
            onClick={() => {
              setActiveSection('dashboard');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between group px-3 py-2.5 rounded-xl transition-all duration-300 ${
              activeSection === 'dashboard' 
                ? 'bg-brand-indigo/10 text-brand-gold border border-brand-gold/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`transition-colors ${activeSection === 'dashboard' ? 'text-brand-gold' : 'text-slate-600 group-hover:text-slate-400'}`}>
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-tight">Command Deck</span>
            </div>
            {activeSection === 'dashboard' && (
              <ChevronRight className="w-3 h-3 text-brand-gold" />
            )}
          </button>
        </div>

        {categories.map(category => (
          <div key={category} className="space-y-3">
            <h2 className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-600 px-3">
              {category}
            </h2>
            <div className="space-y-1">
              {VEGA_SITE_CONTENT.sections
                .filter(s => s.category === category)
                .map(section => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between group px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      activeSection === section.id 
                        ? 'bg-brand-indigo/10 text-brand-gold border border-brand-gold/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`transition-colors ${activeSection === section.id ? 'text-brand-gold' : 'text-slate-600 group-hover:text-slate-400'}`}>
                        {getCategoryIcon(category)}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-tight">{section.title}</span>
                    </div>
                    {activeSection === section.id && (
                      <ChevronRight className="w-3 h-3 text-brand-gold" />
                    )}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
            <Users className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-200">System Command</p>
            <p className="text-[10px] text-brand-gold animate-pulse uppercase tracking-widest">Active</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen fixed left-0 top-0 z-40">
        {navContent}
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-4/5 max-w-[300px] h-full"
              onClick={e => e.stopPropagation()}
            >
              {navContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
