import React from 'react';
import { motion } from 'framer-motion';
import { Key, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react';

const StepCard = ({ icon, title, subtitle, desc, delay, colorClass, bgClass }: { icon: React.ReactNode, title: string, subtitle: string, desc: string, delay: number, colorClass: string, bgClass: string }) => (
  <motion.div 
    className="flex-1 bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-lg flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className={`absolute top-0 left-0 w-full h-1 ${colorClass} opacity-50`}></div>
    
    <div className={`w-20 h-20 mb-6 rounded-2xl flex items-center justify-center ${bgClass} ${colorClass} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
       {icon}
    </div>
    
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{subtitle}</p>
    
    <p className="text-slate-600 text-sm leading-relaxed font-medium">
      {desc}
    </p>
  </motion.div>
);

const EmpowermentChasmSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-8 md:px-16 py-8 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[30%] left-[10%] w-[50%] h-[50%] bg-purple-100/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="text-center mb-16 max-w-4xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          信任与授权：让 Agent 真正完成<span className="text-purple-600 relative inline-block px-2">
            反馈闭环
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-purple-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h2>
        <div className="inline-block bg-white/50 backdrop-blur-md px-6 py-2 rounded-full border border-purple-100 shadow-sm">
           <span className="text-xl font-mono text-purple-700 font-bold">
             "试着一行代码都不写。"
           </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-stretch max-w-6xl w-full relative z-10">
        
        <StepCard 
          icon={<Key size={36} />}
          title="1. 给足权限"
          subtitle="Grant Authority"
          desc="提供必要的工具 (如 MCPs, CLIs)，让它能够直接与外部世界交互和执行任务。"
          delay={0.1}
          colorClass="text-blue-600"
          bgClass="bg-blue-50"
        />

        {/* Arrow Connector */}
        <div className="hidden md:flex items-center justify-center text-slate-300">
           <ArrowRight size={32} />
        </div>

        <StepCard 
          icon={<TrendingUp size={36} />}
          title="2. 强制跨越鸿沟"
          subtitle="Force the Leap"
          desc="初期会有“阵痛”和挫败感，但这是转变习惯的必经之路。忍住不插手。"
          delay={0.2}
          colorClass="text-orange-500"
          bgClass="bg-orange-50"
        />

        {/* Arrow Connector */}
        <div className="hidden md:flex items-center justify-center text-slate-300">
           <ArrowRight size={32} />
        </div>

        <StepCard 
          icon={<MessageCircle size={36} />}
          title="3. 主动沟通与反思"
          subtitle="Proactive Dialogue"
          desc="停下来问问它在想什么，需要什么信息。引导它自己总结需求和偏好。"
          delay={0.3}
          colorClass="text-teal-600"
          bgClass="bg-teal-50"
        />

      </div>
    </div>
  );
};

export default EmpowermentChasmSlide;