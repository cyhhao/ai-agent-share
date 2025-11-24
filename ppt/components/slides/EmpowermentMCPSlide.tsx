import React from 'react';
import { motion } from 'framer-motion';
import { Server, Play, CheckCircle2, MousePointerClick } from 'lucide-react';
import ZoomableImage from '../ui/ZoomableImage';

const EmpowermentMCPSlide: React.FC = () => {
  const hotspots = [
    {
      x: 85,
      y: 25,
      label: "Approval Workflow",
      description: "敏感操作（如执行 Shell 命令）需要人工点击批准，保证安全。"
    },
    {
      x: 30,
      y: 60,
      label: "Tool Output",
      description: "Agent 能够读取本地环境的真实反馈，而非依靠幻想。"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 md:px-24 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-green-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="mb-12 relative z-10">
        <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">3. 成就他人 <span className="text-3xl font-light text-slate-400">/ 给它权限 (MCP)</span></h2>
        <p className="text-xl text-slate-500 font-light">
          Model Context Protocol (MCP) 是让 Agent 安全连接真实世界的钥匙。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[65vh] relative z-10">
        <motion.div 
          className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-xl flex flex-col overflow-hidden hover:shadow-2xl transition-all"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
           <div className="flex items-center gap-6 mb-6">
             <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 border border-indigo-100 shadow-sm">
               <Server size={32} />
             </div>
             <div>
               <h3 className="text-2xl font-bold text-slate-800">Example 1: dev-mcp</h3>
               <div className="flex items-center gap-2 mt-1">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 <p className="text-indigo-600 font-bold text-xs uppercase tracking-wide">带审核功能 (Approval)</p>
               </div>
             </div>
           </div>
           <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative shadow-inner group">
              <ZoomableImage 
                src="assets/image5.jpg" 
                alt="dev-mcp interface" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                hotspots={hotspots}
              />
           </div>
        </motion.div>

        <motion.div 
          className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-xl flex flex-col justify-center relative overflow-hidden hover:shadow-2xl transition-all"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Play size={120} />
           </div>

           <div className="flex items-center gap-6 mb-8 relative z-10">
             <div className="p-4 bg-green-50 rounded-2xl text-green-600 border border-green-100 shadow-sm">
               <Play size={32} />
             </div>
             <h3 className="text-3xl font-bold text-slate-800">Example 2: Chrome MCP</h3>
           </div>
           
           <div className="relative z-10 space-y-6">
             <p className="text-slate-600 text-xl leading-relaxed font-medium">
               Chrome 官方的 MCP。
               <br/>
               允许 Agent 控制浏览器进行：
             </p>
             
             <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100 flex items-start gap-4">
                <MousePointerClick className="text-green-600 shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-green-800 mb-1">自动化前端测试</h4>
                  <p className="text-sm text-green-700">Automated Frontend Testing</p>
                </div>
             </div>

             <div className="flex items-center gap-2 text-slate-400 text-sm">
               <CheckCircle2 size={16} />
               <span>Official Google Tool</span>
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmpowermentMCPSlide;