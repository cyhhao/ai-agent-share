import React from 'react';
import { motion } from 'framer-motion';
import { Network, BrainCircuit, Lightbulb, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

const PhilosophySlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 md:px-24 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] right-[30%] w-[60%] h-[60%] bg-emerald-50/50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">核心理念</h2>
        <p className="text-xl text-slate-500 font-light">Core Philosophy</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl relative z-10 items-stretch">
        
        {/* Card 1: Engineering Problem */}
        <motion.div 
          className="flex-1 bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-lg flex flex-col relative overflow-hidden group hover:shadow-xl transition-all"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
           <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Network size={120} />
           </div>
           
           <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm relative z-10">
              <Network size={32} />
           </div>
           
           <h3 className="text-2xl font-bold text-slate-800 mb-4 relative z-10">复杂工程问题</h3>
           <ul className="space-y-4 text-slate-600 relative z-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={20} />
                <span>AI 发展迅速，无全能模型</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={20} />
                <span>业界尚无 Agent 最佳实践</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={20} />
                <span>需要架构设计与模块解耦</span>
              </li>
           </ul>
        </motion.div>

        {/* Card 2: Not Tricks */}
        <motion.div 
          className="flex-1 bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-lg flex flex-col relative overflow-hidden group hover:shadow-xl transition-all"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
           <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <BrainCircuit size={120} />
           </div>

           <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-sm relative z-10">
              <AlertTriangle size={32} />
           </div>
           
           <h3 className="text-2xl font-bold text-slate-800 mb-4 relative z-10">不要迷信 "技巧"</h3>
           <div className="space-y-4 relative z-10">
             <p className="text-slate-600 leading-relaxed">
               学习 Agent 使用技巧只会固化你的工作流。好不容易习得的工作框架很快会被淘汰。
             </p>
             <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
               <p className="text-amber-900 font-bold flex items-center gap-2">
                 <BrainCircuit size={20} />
                 转变思维 &gt; 学习工具
               </p>
             </div>
           </div>
        </motion.div>

      </div>
    </div>
  );
};

export default PhilosophySlide;