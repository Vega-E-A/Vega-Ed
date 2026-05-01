import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Bell, Home, ChevronRight, Guitar, Shield } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ContentSection } from './components/ContentSection';
import { GlobalSearch } from './components/GlobalSearch';
import { ThemeToggle } from './components/ThemeToggle';
import { VEGA_SITE_CONTENT } from './constants';
import ContactModal from './components/ContactModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<string>('default');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-party', 'theme-batman', 'theme-musical');
    if (theme !== 'default') {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  const currentSection = VEGA_SITE_CONTENT.sections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-brand-slate-900 text-slate-50 font-sans selection:bg-brand-indigo selection:text-white transition-colors duration-500">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        theme={theme}
      />

      <main className="lg:pl-72 min-h-screen flex flex-col">
        {/* Header */}
        <header className={`sticky top-0 z-30 transition-all duration-300 px-8 py-4 flex items-center justify-between ${
          scrolled ? 'bg-brand-slate-900/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}>
          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-slate-400" />
            </button>
            
            {/* Persistent Home Button */}
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all group ${
                activeSection === 'dashboard' 
                  ? 'bg-brand-indigo/10 text-white border border-brand-indigo/20' 
                  : 'hover:bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Home className={`w-4 h-4 ${activeSection === 'dashboard' ? 'text-brand-gold' : 'text-slate-500 group-hover:text-brand-indigo'}`} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Home</span>
            </button>

            {activeSection !== 'dashboard' && (
              <div className="hidden sm:flex items-center gap-2 lg:gap-4 text-slate-700">
                <ChevronRight className="w-4 h-4 opacity-30" />
                <nav className="flex items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-brand-indigo opacity-70 flex items-center gap-1.5">
                    {theme === 'musical' ? (
                      <>
                        Noteworthy Consulting
                        <Guitar className="w-3 h-3 text-brand-gold" />
                      </>
                    ) : 'Vega Educational Associates'}
                  </span>
                  {currentSection && (
                    <>
                      <span className="mx-3">/</span>
                      <span className="text-slate-300 truncate max-w-[150px] lg:max-w-[300px]">{currentSection.title}</span>
                    </>
                  )}
                </nav>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <ThemeToggle currentTheme={theme} setTheme={setTheme} />
            <div className="h-4 w-px bg-white/10 hidden lg:block"></div>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brand-indigo/10 border border-brand-indigo/20 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-indigo hover:bg-brand-indigo hover:text-white transition-all shadow-sm group"
            >
              <Shield className="w-3.5 h-3.5 text-brand-gold group-hover:text-white transition-colors focus:ring-2 focus:ring-brand-gold" />
              <span className="hidden sm:inline">Book a flight with Vega</span>
            </button>
            <div className="h-4 w-px bg-white/10 hidden lg:block"></div>
            <button className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
              <Bell className="w-4 h-4 text-brand-gold" />
              <span className="hidden lg:inline">Alerts</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1">
          <div className="px-8 py-12 lg:px-16 max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {activeSection === 'dashboard' ? (
                  <Dashboard onNavigate={setActiveSection} theme={theme} />
                ) : (
                  currentSection && <ContentSection section={currentSection} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-brand-slate-900 border-t border-white/5 py-12 px-8 text-slate-500">
          <div className="max-w-5xl flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-brand-indigo rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white uppercase tracking-tighter">VE</span>
                </div>
                <p className="text-xs font-bold text-slate-200 uppercase tracking-widest">Vega Educational Associates</p>
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em]">
                © 2026 • Secure Repository • Powered by Gemini
              </p>
            </div>
            <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em]">
              <div className="space-y-4">
                <p className="text-slate-700">Explore</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setActiveSection('dashboard')} className="hover:text-brand-indigo transition-all">Dashboard</button>
                  <button onClick={() => setActiveSection('mission-manifest')} className="hover:text-brand-indigo transition-all">Strategy</button>
                </div>
              </div>
              <div className="space-y-4 text-right">
                <p className="text-slate-700">System</p>
                <div className="flex flex-col gap-3">
                  <span className="cursor-not-allowed opacity-30">Network Status</span>
                  <span className="cursor-not-allowed opacity-30">Security Logs</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
