import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Hammer, X, Equal, ArrowRight, Sparkles } from 'lucide-react';

const EquationItem = ({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) => (
  <motion.div 
    className="flex flex-col items-center gap-3"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${color} shadow-lg backdrop-blur-sm border border-white/20`}>
      {icon}
    </div>
    <span className="font-bold text-slate-700 text-lg">{label}</span>
  </motion.div>
);

const IntroSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 md:px-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <div className="absolute top-[20%] left-[15%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-3xl opacity-60 animate-pulse"></div>
         <div className="absolute bottom-[20%] right-[15%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
          AI Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">分享</span>
        </h1>
        <p className="text-2xl text-slate-500 font-light">
          重塑我们与数字世界的协作方式
        </p>
      </div>

      {/* The Equation Visualization */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-16 scale-90 md:scale-100 relative z-10">
         <EquationItem 
           icon={<Bot size={40} className="text-white" />} 
           label="用 AI" 
           color="bg-gradient-to-br from-blue-500 to-blue-600"
         />
         
         <Equal size={32} className="text-slate-300" />
         
         <EquationItem 
           icon={<User size={40} className="text-white" />} 
           label="用人" 
           color="bg-gradient-to-br from-indigo-500 to-indigo-600"
         />
         
         <div className="flex items-center justify-center w-8 h-8">
            <span className="text-4xl font-bold text-slate-300">≠</span>
         </div>
         
         <EquationItem 
           icon={<Hammer size={40} className="text-white" />} 
           label="用工具" 
           color="bg-slate-400"
         />
      </div>

      <div className="flex gap-8 relative z-10">
        <motion.div 
          className="bg-white/60 backdrop-blur-xl border border-white/60 px-8 py-6 rounded-2xl shadow-sm text-center max-w-xs hover:shadow-md transition-all"
          whileHover={{ y: -5 }}
        >
           <h3 className="text-lg font-bold text-slate-800 mb-2">转变思维方式</h3>
           <p className="text-slate-500 text-sm">Shift Mindset</p>
        </motion.div>

        <motion.div 
          className="bg-white/60 backdrop-blur-xl border border-white/60 px-8 py-6 rounded-2xl shadow-sm text-center max-w-xs hover:shadow-md transition-all"
          whileHover={{ y: -5 }}
        >
           <h3 className="text-lg font-bold text-slate-800 mb-2">跨越鸿沟</h3>
           <p className="text-slate-500 text-sm">Cross the Chasm</p>
        </motion.div>
      </div>

    </div>
  );
};

export default IntroSlide;