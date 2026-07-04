/**
 * Chat Window - Displays chat messages with rich content support
 * Supports cards, SQL code, tables, suggestions, and streaming
 */

import React, { useEffect, useRef } from 'react';
import { Message } from '../../types';
import MessageBubble from './MessageBubble';
import styles from './ChatWindow.module.css';

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  onRunSQL?: (query: string) => void;
  onSelectSuggestion?: (suggestion: string) => void;
  onSubmit?: (content: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  loading,
  onRunSQL,
  onSelectSuggestion,
  onSubmit
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Suggestions used in original Figma hero
  const SUGGESTIONS = [
    { title: 'Write a SQL query', desc: 'to find the 2nd highest salary', icon: 'terminal', color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { title: 'Explain concepts', desc: 'What are Window Functions?', icon: 'book', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { title: 'Optimize my query', desc: 'Make this JOIN faster...', icon: 'database', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Design schema', desc: 'for an e-commerce store', icon: 'sparkles', color: 'text-orange-400', bg: 'bg-orange-500/10' }
  ];

  return (
    <div className={styles.chatWindow}>
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col h-full bg-[#0a0a0a] relative">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 py-20 min-h-full flex flex-col justify-center pb-40">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <span className="text-cyan-400 text-2xl">💾</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                  What do you want to learn in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">MySQL</span> today?
                </h1>
                <p className="text-zinc-400 text-lg max-w-xl">I'm your AI SQL Tutor. Ask me anything about databases, queries, optimization, or schema design.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      // if onSubmit is provided, submit the suggestion as the first message
                      if (onSubmit) {
                        onSubmit(`${s.title} ${s.desc}`);
                        return;
                      }
                      if (onSelectSuggestion) onSelectSuggestion(`${s.title} ${s.desc}`);
                    }}
                    className="group relative flex flex-col items-start p-5 rounded-2xl bg-[#111] border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all text-left overflow-hidden"
                  >
                    <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-4`}>
                      {/* simple icon placeholder */}
                      <span className="w-4 h-4 text-sm" />
                    </div>
                    <h3 className="text-zinc-200 font-medium mb-1 group-hover:text-white transition-colors">{s.title}</h3>
                    <p className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Area (Fixed Bottom) */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent pt-10 pb-6 px-4">
            <div className="max-w-3xl mx-auto relative">
              <div className="relative group">
                <div className="relative flex items-end gap-2 bg-[#18181b] border border-white/10 rounded-2xl shadow-xl overflow-hidden p-2">
                  <input
                    id="chat-hero-input"
                    type="text"
                    placeholder="What do you want to learn today?"
                    className="flex-1 max-h-[200px] min-h-[44px] bg-transparent text-white placeholder:text-zinc-500 outline-none py-3 px-3 text-[15px] leading-relaxed"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      const target = e.target as HTMLInputElement;
                      if (e.key === 'Enter' && onSubmit) {
                        e.preventDefault();
                        const val = target.value.trim();
                        if (val) {
                          onSubmit(val);
                          target.value = '';
                        }
                      }
                    }}
                  />

                  <div className="flex items-center gap-2 p-1 shrink-0">
                    <button
                      className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                      title="Attach schema file"
                    >
                      <span>📁</span>
                    </button>
                    <button
                      onClick={() => {
                        const input = document.getElementById('chat-hero-input') as HTMLInputElement | null;
                        const val = input?.value.trim();
                        if (val && onSubmit) {
                          onSubmit(val);
                          if (input) input.value = '';
                        }
                      }}
                      className={`p-2.5 rounded-xl flex items-center justify-center transition-all duration-200 bg-violet-600 hover:bg-violet-500 text-white`}
                    >
                      Send
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-zinc-500">SQL Tutor Bot can make mistakes. Consider verifying syntax for critical queries.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.messagesList}>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message as any}
              onRunSQL={onRunSQL}
              onSelectSuggestion={onSelectSuggestion}
            />
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingBubble}>
                <div className={styles.loadingDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p className={styles.loadingText}>Thinking...</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;