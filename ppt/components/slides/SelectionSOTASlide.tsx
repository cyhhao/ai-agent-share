import React from 'react';
import { motion } from 'framer-motion';
import { Image, Music, Video, Code, BookOpen, BarChart2, AlertTriangle, ShieldAlert, Cpu, Zap } from 'lucide-react';

const SOTARow = ({ category, icon, model, delay }: { category: string, icon: React.ReactNode, model: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-blue-50/50 transition-colors group rounded-lg"
  >
    <div className="flex items-center gap-4 text-slate-500 group-hover:text-blue-600 transition-colors w-2/5">
      <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors text-slate-600 group-hover:text-blue-600">
        {icon}
      </div>
      <span className="font-bold text-base md:text-lg">{category}</span>
    </div>
    <div className="text-slate-800 font-medium w-3/5 text-right font-mono text-sm md:text-base truncate" title={model}>
      {model}
    </div>
  </motion.div>
);

const SelectionSOTASlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 md:px-12 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-100/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

       <div className="mb-6 relative z-10">
            <h2 className="text-5xl font-black text-slate-900 mb-2 tracking-tight">亲测 SOTA <span className="text-3xl font-light text-slate-400">(实习期)</span></h2>
       </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch h-[75vh] relative z-10">
        {/* The SOTA Table */}
        <div className="w-full lg:w-3/5 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl overflow-hidden flex flex-col">
          <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
            <span className="text-xs md:text-sm px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
               Verified by usage
            </span>
            <span className="text-slate-400 text-xs font-mono">Updated: 2025.11</span>
          </div>
          
          <div className="flex flex-col p-4 overflow-y-auto custom-scrollbar">
            <SOTARow category="文科 (写文章)" icon={<BookOpen size={18} />} model="gemini3-pro" delay={0.1} />
            <SOTARow category="理科 (研究)" icon={<BarChart2 size={18} />} model="GPT5.1-high" delay={0.2} />
            <SOTARow category="后端开发" icon={<Code size={18} />} model="GPT5.1-codex-max" delay={0.3} />
            <SOTARow category="前端开发" icon={<Code size={18} />} model="gemini3-pro" delay={0.4} />
            <SOTARow category="视觉" icon={<Image size={18} />} model="gemini3-pro-image (nanobanana2)" delay={0.5} />
            <SOTARow category="音乐" icon={<Music size={18} />} model="Suno V5" delay={0.6} />
            <SOTARow category="视频" icon={<Video size={18} />} model="kling2.5 = veo3.1 > Sora2" delay={0.7} />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6">
           {/* Iron Rule Side Panel */}
          <motion.div 
            className="flex-1 bg-rose-50/80 backdrop-blur-xl border border-rose-100 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute -top-4 -right-4 p-6 opacity-5 text-rose-900">
               <AlertTriangle size={150} />
            </div>
            <h3 className="text-2xl font-bold text-rose-600 mb-6 flex items-center gap-2">
                <AlertTriangle size={24} />
                铁律
            </h3>
            <p className="text-rose-900 text-lg leading-relaxed mb-6 font-medium">
              智能无法叠加。每个场景下，只用当前<span className="bg-rose-200 px-2 py-0.5 mx-1 rounded-md shadow-sm text-rose-800">最好</span>的。
            </p>
            <p className="text-rose-950 font-bold text-lg mb-6 border-l-4 border-rose-400 pl-4 italic">
               "用 1/10 的价格，浪费 10 倍的时间，却换不来一次跑通，是血亏的。"
            </p>
            <div className="bg-white/60 backdrop-blur-md border border-rose-200 p-4 rounded-xl text-rose-700 text-sm font-bold flex items-center gap-3 shadow-sm">
               <Cpu size={20} className="shrink-0" />
               <span>永远开启 <span className="underline decoration-2 decoration-rose-400 underline-offset-2">High Thinking</span>。永不使用 Auto。</span>
            </div>
          </motion.div>

          {/* Why Self-Research */}
          <motion.div 
            className="flex-1 bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-3xl flex flex-col justify-center shadow-lg hover:shadow-xl transition-all"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4 text-indigo-600">
               <ShieldAlert size={24} />
               <h3 className="text-xl font-bold text-slate-900">为什么要自研 Agent?</h3>
            </div>
            <ul className="space-y-3 text-slate-600 text-base">
               <li className="flex items-start gap-2">
                 <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0"></span>
                 <span><strong className="text-slate-900">防锁定：</strong> 模型 SOTA 随时会变。</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0"></span>
                 <span><strong className="text-slate-900">一致性：</strong> 官方 Agent 能力参差不齐。</span>
               </li>
            </ul>
             <p className="text-xs text-slate-400 mt-auto pt-4 border-t border-slate-100 italic">
              (现状：GPT 讨论方案 + Claude 执行 + Gemini 写前端 = 自研串联 SOTA)
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default SelectionSOTASlide;