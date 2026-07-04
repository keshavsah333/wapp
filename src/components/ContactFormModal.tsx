import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, MessageSquare, Calendar, Mail, Phone, ExternalLink, Store, BadgeCheck } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Load existing messages on mount
  useEffect(() => {
    const saved = localStorage.getItem('keshav_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const newMessage: ContactMessage = {
      id: crypto.randomUUID(),
      name,
      email,
      subject: subject || 'General Query',
      message,
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('keshav_messages', JSON.stringify(updated));

    setSubmitted(true);
    // Reset inputs
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const clearMessages = () => {
    if (window.confirm('Are you sure you want to clear your message log?')) {
      setMessages([]);
      localStorage.removeItem('keshav_messages');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="contact-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
            id="modal-backdrop-overlay"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            id="contact-modal-card"
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row"
          >
            {/* Left side styling - branding column */}
            <div className="w-full md:w-2/5 bg-neutral-950 text-white p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-yellow rounded-full blur-[80px] opacity-40 animate-pulse" />
              
              <div className="relative z-10 space-y-6">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow text-neutral-950 flex items-center justify-center font-bold text-lg mb-4">
                    KS
                  </div>
                  <h3 className="text-2xl font-display font-bold">Let's Connect</h3>
                  <p className="text-neutral-400 text-sm mt-1">
                    Have an idea, project representation, or just want to chat AI/Design? Send a note!
                  </p>
                </div>

                <div className="space-y-4 pt-4 text-sm text-neutral-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-neutral-900 text-brand-yellow">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Email Address</p>
                      <a href="mailto:keshavsah333@gmail.com" className="hover:text-brand-yellow transition-colors font-mono">
                        keshavsah333@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-neutral-900 text-emerald-400">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Phone & WhatsApp</p>
                      <a href="tel:+918920149248" className="hover:text-emerald-400 transition-colors font-mono">
                        +91 8920149248
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-neutral-900 text-blue-400">
                      <ExternalLink size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Website</p>
                      <a 
                        href="https://keshavsah.me" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="hover:text-blue-400 transition-colors font-mono text-xs sm:text-sm"
                      >
                        keshavsah.me
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-neutral-900 text-brand-yellow">
                      <Store size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 leading-none">
                        <p className="text-xs text-neutral-500">Google Business</p>
                        <BadgeCheck className="w-3.5 h-3.5 text-blue-400 fill-blue-400/10" />
                      </div>
                      <a 
                        href="https://share.google/ki9cQKrkOgeDEXoAj" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="hover:text-brand-yellow transition-colors font-mono text-xs sm:text-sm"
                        title="View Google Business Profile"
                      >
                        ⭐ Google Business (Verified) • Keshav Sah
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-6 border-t border-neutral-800 text-xs text-neutral-500 flex justify-between items-center">
                <span>Keshav Sah Portfolio</span>
                <span className="font-mono">New Delhi, India</span>
              </div>
            </div>

            {/* Right side form */}
            <div className="w-full md:w-3/5 p-8 overflow-y-auto max-h-[60vh] md:max-h-[90vh] bg-white dark:bg-neutral-900 flex flex-col justify-between">
              {/* Close Button */}
              <button
                id="close-contact-modal-btn"
                onClick={onClose}
                className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
                        Write a Message
                      </h4>
                      <p className="text-xs text-neutral-500">
                        Fill in down here, it will be securely cached locally on your machine.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                          Subject <span className="text-neutral-300 dark:text-neutral-600">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all"
                          placeholder="Collaboration Request"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                          Your Message *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all resize-none"
                          placeholder="Hey Keshav, love your AI design work! Let's build..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      id="submit-message-btn"
                      className="w-full py-3 px-4 rounded-xl bg-brand-yellow hover:bg-brand-yellow-hover text-neutral-900 font-medium text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md shadow-brand-yellow/10"
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="inline-flex p-3 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500">
                      <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-display font-bold text-neutral-950 dark:text-white">
                        Message Received!
                      </h4>
                      <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                        Thank you for reaching out. The message has been simulated and saved to your local browser storage.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}

                {/* Submissions History Log */}
                {messages.length > 0 && (
                  <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6 mt-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                        <MessageSquare size={12} />
                        Your Message Log ({messages.length})
                      </h5>
                      <button
                        onClick={clearMessages}
                        className="text-[10px] text-red-500 hover:underline hover:text-red-600 cursor-pointer"
                      >
                        Clear Log
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800/80 text-xs text-neutral-700 dark:text-neutral-300 space-y-1 hover:border-neutral-200 dark:hover:border-neutral-700 transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-semibold text-neutral-900 dark:text-white">{msg.name}</span>
                            <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                              <Calendar size={10} />
                              {msg.timestamp.split(',')[0]}
                            </span>
                          </div>
                          <div className="text-neutral-500 dark:text-neutral-400 font-medium">Sub: {msg.subject}</div>
                          <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1 italic">
                            "{msg.message}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
