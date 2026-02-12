import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy, Target, Code2, Brain } from 'lucide-react';

const LeaderboardCard = ({ title, desc, icon, delay }: { title: string, desc: string, icon: React.ReactNode, delay: number }) => (
  <motion.div 
    className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-default group relative overflow-hidden"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
       {icon}
    </div>
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
         {icon}
      </div>
      <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{title}</h4>
    </div>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
  </motion.div>
);

const SelectionScoreSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-6 md:px-16 py-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-sky-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="mb-10 text-center md:text-left relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          1. 学会挑人 <span className="text-3xl font-light text-slate-400">/ 看榜（分数）</span>
        </h2>
        <p className="text-xl text-slate-500 font-light">用客观榜单评估基础能力。</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
        
        {/* Left: Cards */}
        <div className="w-full md:w-1/3 space-y-4">
          <LeaderboardCard 
            title="HLE (Humanity’s Last Exam)" 
            desc="终极学术考试，考验模型推理上限。" 
            icon={<Trophy size={20} />}
            delay={0.1} 
          />
          <LeaderboardCard 
            title="MMLU-Pro" 
            desc="核心多模态能力测试。" 
            icon={<Target size={20} />}
            delay={0.2} 
          />
           <LeaderboardCard 
            title="SWE-bench" 
            desc="真实开源项目中的代码修复能力。" 
            icon={<Code2 size={20} />}
            delay={0.3} 
          />
           <LeaderboardCard 
            title="AIME 2025" 
            desc="纯粹的数学解题能力，排除知识记忆。" 
            icon={<Brain size={20} />}
            delay={0.4} 
          />
        </div>

        {/* Right: Chart Illustration (CSS Based) */}
        <motion.div 
           className="w-full md:w-2/3 h-[50vh] bg-white/50 backdrop-blur-xl rounded-3xl border border-white/60 p-8 md:p-12 relative flex items-center justify-center overflow-hidden shadow-xl"
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
        >
           {/* Abstract Chart Visual */}
           <div className="relative w-full h-full flex items-end justify-around px-8 pb-8 gap-4">
              {[40, 65, 45, 80, 55, 90].map((h, i) => (
                <motion.div 
                  key={i}
                  className="w-full bg-gradient-to-t from-blue-500 to-indigo-400 rounded-t-xl relative group"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1, type: "spring" }}
                >
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded">
                     {h}%
                   </div>
                </motion.div>
              ))}
              
              {/* Grid Lines */}
              <div className="absolute inset-0 border-l border-b border-slate-200/50 pointer-events-none">
                 <div className="w-full h-1/4 border-t border-slate-200/30 border-dashed"></div>
                 <div className="w-full h-1/4 border-t border-slate-200/30 border-dashed"></div>
                 <div className="w-full h-1/4 border-t border-slate-200/30 border-dashed"></div>
              </div>
           </div>

           <a 
            href="https://artificialanalysis.ai/evaluations" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute bottom-6 right-8 text-xs text-blue-600 hover:underline flex items-center gap-1 z-20 bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm font-bold"
          >
            Source: artificialanalysis.ai <ExternalLink size={12} />
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default SelectionScoreSlide;