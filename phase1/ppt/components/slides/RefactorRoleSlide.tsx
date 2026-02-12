import React from 'react';
import { motion } from 'framer-motion';
import { FileCode, Terminal, Search, ExternalLink, ArrowRight } from 'lucide-react';
import toolUserImg from '@/assets/tool_user.png';
import aiManagerImg from '@/assets/ai_manager.png';

const ExampleCard = ({ icon, title, desc, link }: { icon: React.ReactNode, title: string, desc: string, link?: string }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 hover:border-blue-300 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-slate-800 font-bold">
        {icon}
        <span className="text-sm">{title}</span>
      </div>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600">
          <ExternalLink size={14} />
        </a>
      )}
    </div>
    <p className="text-xs text-slate-500 leading-relaxed">
      {desc}
    </p>
  </div>
);

const RefactorRoleSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-12 py-6 overflow-y-auto">
      <div className="text-center mb-8 max-w-4xl shrink-0">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">2. 重构角色</h2>
        <p className="text-lg md:text-xl text-slate-600">
          你的新职责：定义 <span className="text-orange-600 font-bold">“为什么” (Why)</span> 与 <span className="text-blue-600 font-bold">“做什么” (What)</span>，而非 “怎么做” (How)
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full max-w-6xl">
        
        {/* Visual Metaphor Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
          
          {/* Tool User */}
          <motion.div 
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-slate-800">工具使用者</h3>
            <div className="w-64 h-48 bg-white rounded-2xl border-2 border-slate-200 p-4 flex items-center justify-center shadow-sm">
              <img src={toolUserImg} alt="Tool User" className="w-full h-full object-contain opacity-80" />
            </div>
            <p className="text-sm text-slate-500 text-center max-w-[200px]">
              精确指令，一步步 Micro-management
            </p>
          </motion.div>

          {/* Transition Arrow */}
          <motion.div 
            className="flex flex-col items-center gap-2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-[2px] h-12 md:w-24 md:h-[2px] bg-slate-300 hidden md:block relative">
               <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                 <ArrowRight size={24} className="text-slate-300" />
               </div>
            </div>
            {/* Mobile Arrow */}
            <ArrowRight size={32} className="text-orange-500 md:hidden rotate-90" />
            
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg whitespace-nowrap">
              思维转变
            </div>
          </motion.div>

          {/* AI Manager */}
          <motion.div 
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-slate-800">AI 管理者</h3>
            <div className="w-64 h-48 bg-white rounded-2xl border-2 border-slate-200 p-4 flex items-center justify-center shadow-sm relative overflow-hidden">
               <div className="absolute inset-0 bg-blue-50/30"></div>
              <img src={aiManagerImg} alt="AI Manager" className="w-full h-full object-contain relative z-10" />
            </div>
            <p className="text-sm text-slate-500 text-center max-w-[200px]">
              定义意图 (Intent)，允许路径探索
            </p>
          </motion.div>

        </div>

        {/* Examples & Principles Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
           {/* Examples */}
           <motion.div 
             className="bg-slate-50 rounded-2xl border border-slate-200 p-6"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
           >
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> 
                参考案例 (Real World Examples)
              </h3>
              <div className="flex flex-col gap-3">
                 <ExampleCard 
                   icon={<FileCode size={18} className="text-purple-600"/>}
                   title="Speckit"
                   desc="GitHub 开源项目。演示了如何通过 Specs 清晰定义 'What'，让 Agent 能够精准执行。"
                   link="https://github.com/github/spec-kit"
                 />
                 <ExampleCard 
                   icon={<Terminal size={18} className="text-slate-800"/>}
                   title="ClaudeCode Init"
                   desc="观察 ClaudeCode 和 Codex 的初始化指令 (System Prompt)。它们花费了大量 Token 在定义角色边界和目标。"
                 />
              </div>
           </motion.div>

           {/* Principles */}
           <div className="flex flex-col gap-4">
              <motion.div 
               className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex-1"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
              >
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Search size={18} className="text-blue-600"/> 高屋建瓴 (High-Level)
                </h4>
                <p className="text-sm text-slate-600">
                  多谈思路，少讲步骤。不要陷入微观管理。
                </p>
                <div className="mt-2 pt-2 border-t border-slate-100">
                   <span className="text-xs font-bold text-slate-500 block mb-1">Example: 合约审计 Agent</span>
                   <p className="text-xs text-slate-400">
                     "不要一行行查代码。先检查逻辑漏洞，再看权限控制..."
                   </p>
                </div>
              </motion.div>

              <motion.div 
               className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm flex-1"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
              >
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <ArrowRight size={18} className="text-orange-600"/> 保持耐心 (Be Patient)
                </h4>
                <p className="text-sm text-slate-600">
                  给予思考和规划的时间。不要因为早期的 "笨拙" 或失败而过早定性放弃。
                </p>
              </motion.div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default RefactorRoleSlide;