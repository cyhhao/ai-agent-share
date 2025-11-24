import React from 'react';
import { motion } from 'framer-motion';
import { Code2, FolderTree, Hammer, Database, Cpu } from 'lucide-react';

const FlowCard = ({ icon, title, steps, delay, colorClass, bgClass }: { icon: React.ReactNode, title: string, steps: string[], delay: number, colorClass: string, bgClass: string }) => (
  <motion.div 
    className="flex-1 bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-lg flex flex-col relative overflow-hidden group hover:shadow-xl transition-all"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className={`absolute top-0 left-0 w-full h-1 ${bgClass}`}></div>
    
    <div className="flex items-center gap-4 mb-6">
      <div className={`p-3 rounded-2xl ${bgClass} ${colorClass} shadow-sm`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>

    <div className="space-y-4 relative z-10">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-3">
           <div className="flex flex-col items-center mt-1">
              <div className={`w-2 h-2 rounded-full ${index === steps.length - 1 ? colorClass : 'bg-slate-300'}`}></div>
              {index !== steps.length - 1 && <div className="w-0.5 h-full bg-slate-200 my-1"></div>}
           </div>
           <p className={`text-sm ${index === steps.length - 1 ? 'text-slate-900 font-bold bg-white/50 px-2 py-1 rounded-lg border border-slate-100 shadow-sm' : 'text-slate-500'}`}>
             {step}
           </p>
        </div>
      ))}
    </div>
  </motion.div>
);

const WhyCodingSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 md:px-16 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[10%] right-[20%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="text-center mb-12 relative z-10 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
          为什么模型厂商都这么注重编程能力？
        </h2>
        <div className="inline-block bg-white/60 backdrop-blur-md px-8 py-4 rounded-2xl border border-indigo-100 shadow-sm">
           <p className="text-xl text-slate-600 font-medium">
             因为 <span className="text-indigo-600 font-bold flex items-center gap-2 inline-flex mx-1"><Code2 size={20}/> Coding</span> 是
             “硅基数字生物”在现实世界解决问题的
             <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded-lg ml-1">“元能力”</span>
           </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl relative z-10 items-stretch">
        
        {/* Branch 1: Context */}
        <FlowCard 
          icon={<Database size={28} />}
          title="上下文管理"
          steps={[
            "上下文管理是必经之路",
            "最佳实践是文件系统 (File System)",
            "Agent Context 自我管理"
          ]}
          delay={0.2}
          colorClass="text-blue-600"
          bgClass="bg-blue-500"
        />

        {/* Branch 2: Tools */}
        <FlowCard 
          icon={<Hammer size={28} />}
          title="参与现实世界"
          steps={[
            "参与现实需要大量手脚 (Tools)",
            "在实践中按需创造 Tools",
            "Agent Tools 自我打造"
          ]}
          delay={0.4}
          colorClass="text-orange-600"
          bgClass="bg-orange-500"
        />

      </div>
      
      {/* Visual Connection */}
      <motion.div 
        className="absolute bottom-12 text-slate-400 flex items-center gap-2 text-sm font-mono opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
      >
         <Cpu size={16} />
         <span>Silicon-based Digital Organism</span>
      </motion.div>

    </div>
  );
};

export default WhyCodingSlide;