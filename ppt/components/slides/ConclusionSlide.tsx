import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Database, Cpu } from 'lucide-react';

const Step = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex items-start gap-4 mb-8 last:mb-0">
    <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-purple-400 shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-white">{title}</h4>
      <p className="text-slate-400 text-sm mt-1">{desc}</p>
    </div>
  </div>
);

const ConclusionSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between p-8 max-w-7xl mx-auto">
      
      <div className="lg:w-1/2 mb-12 lg:mb-0">
        <motion.h2 
          className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          渐进式 <br/>
          <span className="text-cyan-500">适应那个终点</span>
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <p className="text-xl text-slate-300 font-bold">
            为什么模型厂商都这么注重编程能力？
          </p>
          <p className="text-slate-400 italic">
            "因为 Coding 是'硅基数字生物'在现实世界解决问题的'元能力'。"
          </p>
        </motion.div>
      </div>

      <div className="lg:w-1/2 bg-slate-950/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm">
        <div className="absolute top-0 left-8 -translate-y-1/2 bg-slate-900 px-4 py-1 rounded-full border border-purple-500/50 text-xs font-mono text-purple-400 uppercase tracking-widest">
          演进路径
        </div>

        <div className="mt-4">
          <Step 
            icon={<Database size={24} />}
            title="上下文管理 (Context)"
            desc="必经之路。最佳实践是：文件系统 -> Agent Context 自我管理。"
          />
          <Step 
            icon={<GitBranch size={24} />}
            title="大量手脚 (Tools)"
            desc="参与现实需要工具。实践中按需创造 Tools -> Agent Tools 自我打造。"
          />
          <Step 
            icon={<Cpu size={24} />}
            title="成为桥梁"
            desc="暂时让自己成为桥梁（手动管理Context：SubAgent、Skill、CLI），等待模型升级 + Agent工程演进。"
          />
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-lg font-bold text-white">
            让 Agent 成为伙伴，而非工具。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConclusionSlide;