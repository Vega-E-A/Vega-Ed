import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Command } from 'lucide-react';
import { VEGA_SITE_CONTENT } from '../constants';

interface GlobalSearchProps {
  onSelect: (id: string) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return VEGA_SITE_CONTENT.sections.filter(
      s => s.title.toLowerCase().includes(query.toLowerCase()) || 
           s.content.some(c => c.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white transition-colors group lg:w-64"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm flex-1 text-left">Search mission...</span>
        <kbd className="hidden lg:flex items-center gap-1 text-[10px] bg-slate-700 px-1.5 py-0.5 rounded border border-slate-600">
          <Command className="w-2.5 h-2.5" /> K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
            >
              <div className="bg-brand-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden gold-glow">
                <div className="p-6 border-b border-slate-700 flex items-center gap-4">
                  <Search className="w-6 h-6 text-brand-gold" />
                  <input
                    autoFocus
                    placeholder="Search the AI Ascension Strategy..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none text-xl outline-none placeholder:text-slate-600"
                  />
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="max-h-[400px] overflow-y-auto p-2">
                  {results.length > 0 ? (
                    <div className="grid gap-1">
                      {results.map(result => (
                        <button
                          key={result.id}
                          onClick={() => {
                            onSelect(result.id);
                            setIsOpen(false);
                            setQuery('');
                          }}
                          className="w-full text-left p-4 rounded-2xl hover:bg-slate-700/50 border border-transparent hover:border-slate-600 transition-all flex items-center justify-between group"
                        >
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-1">{result.category}</p>
                            <h3 className="font-bold text-slate-100">{result.title}</h3>
                          </div>
                          <div className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 group-hover:text-brand-gold transition-colors">
                            Navigate →
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : query ? (
                    <div className="p-12 text-center text-slate-500">
                      <p>No results found for "{query}"</p>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-slate-500 italic">
                      <p>Start typing to search the manifest...</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
