import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Rocket, Globe, Mail, User, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactFormData {
  name: string;
  email: string;
  mission: string;
  message: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log('Mission Briefing Received:', data);
    // In a real app, this would be sent to a backend or used to trigger a mailto/api
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      reset();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-slate-950/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-brand-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="relative h-32 bg-gradient-to-br from-brand-indigo/20 to-brand-slate-900 flex items-center px-8 border-b border-white/5">
              <div className="absolute top-0 right-0 p-4">
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="w-5 h-5 text-brand-indigo" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-indigo">Vega Mission Control</span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Book Your Flight</h2>
                <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Initiating Consultation Sequence</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <User className="w-3 h-3" /> Navigator Name
                      </label>
                      <input
                        {...register('name', { required: true })}
                        className="w-full bg-brand-slate-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-brand-indigo/50 transition-colors"
                        placeholder="Commander..."
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Mail className="w-3 h-3" /> Comms Frequency
                      </label>
                      <input
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                        className="w-full bg-brand-slate-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-brand-indigo/50 transition-colors"
                        placeholder="email@dimension.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Globe className="w-3 h-3" /> Target Mission
                    </label>
                    <select
                      {...register('mission', { required: true })}
                      className="w-full bg-brand-slate-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-indigo/50 transition-colors appearance-none"
                    >
                      <option value="ai-strategy">AI Ascension Strategy</option>
                      <option value="curriculum">Curriculum Synthesis</option>
                      <option value="professional-dev">Professional Orbit</option>
                      <option value="other">Other Flight Path</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" /> Mission Briefing
                    </label>
                    <textarea
                      {...register('message', { required: true })}
                      rows={3}
                      className="w-full bg-brand-slate-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-brand-indigo/50 transition-colors resize-none"
                      placeholder="Outline your objectives..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full group relative flex items-center justify-center gap-2 px-6 py-3 bg-brand-indigo text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-brand-indigo/90 transition-all shadow-lg overflow-hidden"
                  >
                    <span className="relative z-10">Launch Request</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-brand-indigo/20 rounded-full flex items-center justify-center mb-6">
                    <Rocket className="w-8 h-8 text-brand-indigo animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Mission Logged</h3>
                  <p className="text-slate-400 text-sm max-w-[280px]">
                    Your flight plan has been received at Vega HQ. Stay tuned for orbital confirmation.
                  </p>
                </motion.div>
              )}
            </div>

            <div className="px-8 py-4 bg-brand-slate-950/50 border-t border-white/5 flex justify-center text-[8px] font-bold text-slate-600 uppercase tracking-[0.3em]">
              Protocol Enforced • Secure Transmission Channel
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal; 
