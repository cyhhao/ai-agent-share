import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Construction, TrendingUp, Sparkles } from 'lucide-react';

const TimelineNode = ({ icon, title, desc, delay, isLast = false }: { icon: React.ReactNode, title: string, desc: React.ReactNode, delay: number, isLast?: boolean }) => (
  <div className="relative flex flex-col items-center w-48 md:w-56 shrink-0 z-10">
     {/* Node Circle */}
     <motion.div 
       className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center backdrop-blur-xl border shadow-lg transition-all duration-500
         ${isLast 
           ? 'bg-indigo-600 text-white border-indigo-400 shadow-indigo-200' 
           : 'bg-white/80 text-slate-600 border-white/60 hover:scale-110 hover:border-blue-300 hover:text-blue-600'
         }`}
       initial={{ scale: 0, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       transition={{ delay, type: "spring", stiffness: 200 }}
     >
        {icon}
     </motion.div>

     {/* Text Content */}
     <motion.div 
       className="mt-6 text-center bg-white/40 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all w-full"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: delay + 0.2 }}
     >
        <h3 className={`text-base md:text-lg font-bold mb-2 ${isLast ? 'text-indigo-700' : 'text-slate-800'}`}>{title}</h3>
        <div className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
          {desc}
        </div>
     </motion.div>
  </div>
);

const EvolutionSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-16 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-purple-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="w-full max-w-[90%] mb-12 self-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">通向 AGI 之路</h2>
        <p className="text-xl md:text-2xl text-slate-500 font-light">我们如何渐进式地走向终点</p>
      </div>

      <div className="relative w-full max-w-[95%] flex items-start justify-between mt-8">
         
         {/* Responsive Connecting Line */}
         <div className="absolute top-8 md:top-10 left-0 w-full h-1 bg-slate-200 rounded-full overflow-hidden z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-slate-300 via-blue-400 to-indigo-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
         </div>

         {/* Start Node: User */}
         <TimelineNode 
            icon={<User size={28} />}
            title="起点"
            desc="Traditional User"
            delay={0.1}
         />

         {/* Step 1 */}
         <TimelineNode 
           icon={<Users size={28} />}
           title="第一步: 伙伴"
           desc={
             <>
               让 Agent 成为伙伴<br/>
               <span className="text-xs text-slate-500 block mt-1">思维转变：非工具</span>
             </>
           }
           delay={0.6}
         />

         {/* Step 2 */}
         <TimelineNode 
           icon={<Construction size={28} />}
           title="第二步: 桥梁"
           desc={
             <>
               暂时成为桥梁<br/>
               <span className="text-xs text-slate-500 block mt-1">手动管理 Context & Tools</span>
             </>
           }
           delay={1.2}
         />

         {/* Step 3 */}
         <TimelineNode 
           icon={<TrendingUp size={28} />}
           title="第三步: 演进"
           desc={
             <>
               等待并参与演进<br/>
               <span className="text-xs text-slate-500 block mt-1">跟进模型与工程探索</span>
             </>
           }
           delay={1.8}
         />

         {/* End Node: AGI */}
         <TimelineNode 
            icon={<Sparkles size={28} />}
            title="终点"
            desc="AGI / Autonomous"
            delay={2.4}
            isLast={true}
         />

      </div>
    </div>
  );
};

export default EvolutionSlide;