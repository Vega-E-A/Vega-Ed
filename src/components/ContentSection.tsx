import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Shield, Target, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ContentSectionProps {
  section: {
    id: string;
    title: string;
    content: string[];
    category: string;
  };
}

export const ContentSection: React.FC<ContentSectionProps> = ({ section }) => {
  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Mission': return <Rocket className="w-5 h-5" />;
      case 'Schedules': return <Target className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20">
             {getIcon(section.category)}
          </div>
          <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">
            Module {section.category}-01
          </span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">
          {section.title}
        </h2>
        <div className="h-1 w-20 bg-brand-indigo rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Intro Card - Spans full width */}
        {section.content.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 lg:col-span-3 p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Rocket className="w-32 h-32" />
            </div>
            <div className="relative z-10 max-w-3xl">
              <div className="prose prose-invert prose-slate max-w-none prose-p:text-xl prose-p:text-slate-300 prose-p:leading-relaxed prose-strong:text-brand-gold prose-strong:font-black">
                <ReactMarkdown>{section.content[0]}</ReactMarkdown>
                {section.content[1] && section.content[1].startsWith('"') && (
                  <div className="mt-4 border-l-4 border-brand-indigo pl-6 italic text-slate-400 text-lg">
                    <ReactMarkdown>{section.content[1]}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Grouped Content Cards */}
        {(() => {
          const cards: { title: string; items: string[] }[] = [];
          let currentCard: { title: string; items: string[] } | null = null;

          // Skip the first two items if they are the header/intro
          section.content.slice(2).forEach((item) => {
            if (item.startsWith('**') && (item.endsWith(':**') || item.includes('Grade') || item.includes('Mission'))) {
              if (currentCard) cards.push(currentCard);
              currentCard = { title: item.replace(/\*\*|:/g, ''), items: [] };
            } else if (currentCard) {
              currentCard.items.push(item);
            } else {
              // Handle items before the first category header
              if (item.trim()) {
                cards.push({ title: '', items: [item] });
              }
            }
          });
          if (currentCard) cards.push(currentCard);

          return cards.map((card, cardIndex) => (
            <motion.div
              key={cardIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: cardIndex * 0.1 }}
              className={`p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-gold/20 transition-all flex flex-col ${
                card.items.some(i => i.includes('![')) ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {card.title && (
                <h3 className="text-sm font-black text-brand-gold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                  {card.title}
                </h3>
              )}
              <div className="space-y-3 flex-grow">
                {card.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="text-sm text-slate-400 prose prose-invert prose-slate max-w-none prose-a:text-sky-400 prose-a:font-bold prose-a:no-underline hover:prose-a:text-sky-300 prose-a:transition-colors prose-img:rounded-2xl prose-img:border prose-img:border-white/10"
                  >
                    <ReactMarkdown
                      components={{
                        a: ({ ...props }) => (
                          <a {...props} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                            {props.children}
                            <ExternalLink className="w-3 h-3 opacity-50" />
                          </a>
                        ),
                        p: ({ children }) => <p className="m-0 leading-relaxed">{children}</p>
                      }}
                    >
                      {item}
                    </ReactMarkdown>
                  </div>
                ))}
              </div>
            </motion.div>
          ));
        })()}
      </div>

      {section.id.startsWith('stage') && (
        <div className="mt-12 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 flex items-start gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Target className="w-24 h-24" />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-indigo/20 flex items-center justify-center shrink-0 border border-brand-indigo/30">
            <Target className="w-6 h-6 text-brand-indigo" />
          </div>
          <div className="space-y-2 relative z-10">
            <h4 className="text-sm font-black text-slate-100 uppercase tracking-widest">Mission Directive</h4>
            <p className="text-slate-500 leading-relaxed text-sm max-w-lg">
              Stage completion is essential for trajectory sync. 
              Verify all inputs before the next phase shift.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
