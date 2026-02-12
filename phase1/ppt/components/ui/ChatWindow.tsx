import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Terminal, Copy, ChevronDown } from 'lucide-react';
import { ChatMessage } from '../../types';

interface ChatWindowProps {
  title: string;
  messages: ChatMessage[];
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ title, messages, className = "" }) => {
  return (
    <div className={`bg-[#0d1117] rounded-xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl font-mono text-sm ${className}`}>
      {/* Header */}
      <div className="bg-[#161b22] px-4 py-2 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-slate-400" />
          <span className="text-slate-300 font-semibold text-xs">{title}</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.3 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-purple-600' : 'bg-cyan-600'
            }`}>
              {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed relative group ${
              msg.role === 'user' 
                ? 'bg-[#21262d] text-slate-100 border border-slate-700' 
                : 'bg-[#0d1117] text-slate-300 border border-slate-800'
            } ${msg.highlight ? 'ring-2 ring-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : ''}`}>
              
              {/* Thinking Process Header if available */}
              {msg.thinking && (
                <div className="mb-2 pb-2 border-b border-slate-800/50 text-xs text-slate-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-pulse"/>
                  Thought Process
                  <ChevronDown size={10} className="ml-auto opacity-50" />
                </div>
              )}

              <div className="whitespace-pre-wrap">{msg.content}</div>
              
              {/* Hover Actions */}
              <div className="absolute -bottom-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 text-slate-500">
                 <Copy size={12} className="cursor-pointer hover:text-slate-300" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
