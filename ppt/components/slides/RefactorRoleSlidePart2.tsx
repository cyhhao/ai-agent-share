import React from 'react';
import { motion } from 'framer-motion';
import { FileCode, Terminal, Search, ExternalLink, ArrowRight, Lightbulb, Puzzle } from 'lucide-react';

const ExampleCard = ({ icon, title, desc, link, delay }: { icon: React.ReactNode, title: string, desc: string, link?: string, delay: number }) => (
  <motion.div 
    className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-sm flex flex-col gap-3 hover:shadow-lg transition-all h-full group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-slate-800 font-bold text-lg group-hover:text-blue-600 transition-colors">
        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 transition-colors">
           {icon}
        </div>
        <span>{title}</span>
      </div>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
          <ExternalLink size={16} />
        </a>
      )}
    </div>
    <p className="text-sm text-slate-600 leading-relaxed font-medium">
      {desc}
    </p>
  </motion.div>
);

const RefactorRoleSlidePart2: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 md:px-24 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] right-[20%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

       <div className="mb-12 text-center relative z-10">
            <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">2. 重构角色</h2>
            <p className="text-xl text-slate-500 font-light tracking-wide uppercase">Part 2: 落地实践</p>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto items-stretch relative z-10">
           {/* Examples Section */}
          <motion.div 
            className="flex-1 flex flex-col gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> 
               参考案例 (Real World Examples)
             </h3>
             <div className="flex flex-col gap-6 flex-1">
                <ExampleCard 
                  icon={<FileCode size={20} className="text-purple-600"/>}
                  title="Speckit"
                  desc="GitHub 开源项目。演示了如何通过 Specs 清晰定义 'What'，让 Agent 能够精准执行。"
                  link="https://github.com/github/spec-kit"
                  delay={0.3}
                />
                <ExampleCard 
                  icon={<Terminal size={20} className="text-slate-800"/>}
                  title="ClaudeCode Init"
                  desc="观察 ClaudeCode 和 Codex 的初始化指令 (System Prompt)。它们花费了大量 Token 在定义角色边界和目标。"
                  delay={0.4}
                />
             </div>
          </motion.div>

          {/* Principles Section */}
          <div className="flex flex-col gap-6">
             <motion.div 
              className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-blue-100 shadow-lg flex-1 flex flex-col justify-center hover:shadow-xl transition-all"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
             >
               <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                 <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Search size={24} />
                 </div>
                 高屋建瓴 (High-Level)
               </h4>
               <p className="text-base text-slate-600 mb-4 font-medium">
                 多谈思路，少讲步骤。不要陷入微观管理。
               </p>
               <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wider">Example: 合约审计 Agent</span>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-500 italic font-mono">
                      "不要一行行查代码。先检查逻辑漏洞，再看权限控制..."
                    </p>
                  </div>
               </div>
             </motion.div>

             <motion.div 
              className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-orange-100 shadow-lg flex-1 flex flex-col justify-center hover:shadow-xl transition-all"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
             >
               <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                 <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <Puzzle size={24} />
                 </div>
                 保持耐心 (Be Patient)
               </h4>
               <p className="text-base text-slate-600 font-medium leading-relaxed">
                 给予思考和规划的时间。
                 <br/>
                 不要因为早期的 "笨拙" 或失败而过早定性放弃。这是磨合过程。
               </p>
             </motion.div>
          </div>
      </div>
    </div>
  );
};

export default RefactorRoleSlidePart2;
