import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code2, Play, Server, Zap, ArrowRight, Lock, Lightbulb } from 'lucide-react';

const ToolCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex items-start gap-4 bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/60 hover:bg-white/80 transition-colors shadow-sm group">
    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{title}</h4>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>
    </div>
  </div>
);

const EmpowermentSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-green-100/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] bg-purple-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">3. 成就他人</h2>
        <p className="text-xl text-slate-500 font-light">
          助力 Agent 完成 <span className="text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded-lg">反馈闭环</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl relative z-10">
        
        {/* Left: Give Access (MCP) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-2xl text-green-600">
               <Shield size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">给它权限：MCP</h3>
          </div>
          <p className="text-slate-600 mb-6 text-lg leading-relaxed">
            通过 <span className="font-mono text-slate-800 bg-slate-100 px-1 rounded">Model Context Protocol</span>，让 Agent 安全地与你的真实环境交互。
          </p>
          
          <div className="space-y-4">
            <ToolCard 
              icon={<Server size={20} />} 
              title="dev-mcp" 
              desc="我自己开发的 MCP，暴露个人开发工具。" 
            />
            <ToolCard 
              icon={<Play size={20} />} 
              title="Chrome 官方 MCP" 
              desc="自动化前端测试与浏览器控制。" 
            />
          </div>
        </motion.div>

        {/* Right: The No-Code Challenge */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 relative z-10 shadow-xl overflow-hidden group hover:bg-white/50 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <Code2 size={120} />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
                 <Zap size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">跨越鸿沟</h3>
            </div>
            
            <div className="mb-6 bg-slate-900 rounded-xl p-4 shadow-inner">
               <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Challenge</h4>
               <p className="text-xl text-white font-mono italic">"试着一行代码都不写。"</p>
            </div>

            <div className="space-y-4 text-slate-600 text-base leading-relaxed font-medium">
              <div className="flex gap-3">
                 <div className="mt-1 shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-xs font-bold">!</div>
                 <p>
                   <span className="text-slate-900 font-bold">阵痛：</span> 一开始会感觉没有以前效率高，感到挫败。
                 </p>
              </div>
              <div className="flex gap-3">
                 <div className="mt-1 shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-xs font-bold">✓</div>
                 <p>
                   <span className="text-slate-900 font-bold">必须经历：</span> 这是强迫自己跨出去必须经历的。
                 </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mt-4 flex gap-3 items-start">
                <Lightbulb className="text-blue-500 shrink-0 mt-1" size={20} />
                <p className="text-blue-800 text-sm italic">
                  "停下来想想它不知道什么，问问它在想什么，让它自己总结。"
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default EmpowermentSlide;