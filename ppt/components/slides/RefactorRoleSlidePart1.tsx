import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, BrainCircuit, UserCog, Bot } from 'lucide-react';

const RefactorRoleSlidePart1: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-12 py-6 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="text-center mb-12 max-w-4xl shrink-0 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">2. 重构角色</h2>
        <p className="text-xl md:text-2xl text-slate-600 font-light">
          你的新职责：定义 <span className="text-orange-600 font-bold">“为什么” (Why)</span> 与 <span className="text-blue-600 font-bold">“做什么” (What)</span>
        </p>
        <p className="text-lg text-slate-400 mt-2 font-mono">而非 “怎么做” (How)</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-6xl relative z-10">
          
          {/* Tool User */}
          <motion.div 
            className="flex flex-col items-center gap-6 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">工具使用者</h3>
            <div className="w-72 h-64 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/60 p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
               {/* Visual Metaphor: Command Line / Manual Control */}
               <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-orange-50 opacity-50"></div>
               
               <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 border border-slate-100">
                     <UserCog size={40} />
                  </div>
                  <div className="flex flex-col gap-2 w-full px-4">
                     <div className="h-2 bg-slate-200 rounded-full w-full animate-pulse"></div>
                     <div className="h-2 bg-slate-200 rounded-full w-3/4"></div>
                     <div className="h-2 bg-slate-200 rounded-full w-1/2"></div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-2 bg-slate-100 px-3 py-1 rounded-full">
                     <Terminal size={12} />
                     <span>&gt; step_by_step.sh</span>
                  </div>
               </div>
            </div>
            <p className="text-base text-slate-500 text-center max-w-[240px] font-medium">
              精确指令，一步步 <br/> Micro-management
            </p>
          </motion.div>

          {/* Transition Arrow */}
          <motion.div 
            className="flex flex-col items-center gap-3 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-[2px] h-16 md:w-32 md:h-[2px] bg-gradient-to-b md:bg-gradient-to-r from-orange-200 to-blue-200 hidden md:block relative">
               <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-2 rounded-full shadow-sm border border-slate-100">
                 <ArrowRight size={24} className="text-slate-400" />
               </div>
            </div>
            {/* Mobile Arrow */}
            <ArrowRight size={40} className="text-slate-400 md:hidden rotate-90" />
            
            <motion.div 
              className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-2.5 rounded-full font-bold shadow-xl whitespace-nowrap text-lg flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              思维转变 <ArrowRight size={18} />
            </motion.div>
          </motion.div>

          {/* AI Manager */}
          <motion.div 
            className="flex flex-col items-center gap-6 group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">AI 管理者</h3>
            <div className="w-72 h-64 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/60 p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
               {/* Visual Metaphor: Brain / Network / Intent */}
               <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
               
               <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center text-white">
                     <Bot size={40} />
                  </div>
                  
                  {/* Abstract Connections */}
                  <div className="relative w-full h-12 flex justify-center items-center">
                     <BrainCircuit className="text-blue-400 opacity-50 absolute" size={60} />
                     <motion.div 
                       className="absolute w-2 h-2 bg-blue-500 rounded-full"
                       animate={{ x: [-20, 20], y: [-10, 10], opacity: [0, 1, 0] }}
                       transition={{ duration: 2, repeat: Infinity }}
                     />
                     <motion.div 
                       className="absolute w-2 h-2 bg-indigo-500 rounded-full"
                       animate={{ x: [20, -20], y: [10, -10], opacity: [0, 1, 0] }}
                       transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                     />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-blue-600 mt-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                     <span>Intent: "Build App"</span>
                  </div>
               </div>
            </div>
            <p className="text-base text-slate-500 text-center max-w-[240px] font-medium">
              定义意图 (Intent) <br/> 允许路径探索
            </p>
          </motion.div>

        </div>
    </div>
  );
};

export default RefactorRoleSlidePart1;
