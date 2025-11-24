import React from 'react';
import { motion } from 'framer-motion';
import { Image, Music, Video, Code, BookOpen, BarChart2 } from 'lucide-react';

const SOTARow = ({ category, icon, model, delay }: { category: string, icon: React.ReactNode, model: string, delay: number }) => (
  <motion.div 
    className="flex items-center justify-between p-6 border-b border-slate-100 hover:bg-slate-50 transition-colors group last:border-0"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className="flex items-center gap-6 text-slate-500 group-hover:text-blue-600 transition-colors w-1/3">
      <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <span className="font-bold text-xl">{category}</span>
    </div>
    <div className="text-slate-800 font-medium w-2/3 text-right font-mono text-xl bg-slate-50 px-4 py-2 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-200">
      {model}
    </div>
  </motion.div>
);

const SelectionSOTASlidePart2: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 md:px-24">
       <div className="mb-10 text-center">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">亲测 SOTA (实习期)</h2>
            <p className="text-xl text-slate-500">Part 2: 实战榜单</p>
       </div>

      <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
            <span className="text-sm px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full font-bold uppercase tracking-wider flex items-center gap-2">
               <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
               Verified by usage
            </span>
            <span className="text-slate-400 text-sm font-mono">Last Updated: 2025.11</span>
          </div>
          
          <div className="flex flex-col p-4">
            <SOTARow category="文科 (写文章)" icon={<BookOpen size={24} />} model="gemini3-pro" delay={0.1} />
            <SOTARow category="理科 (研究)" icon={<BarChart2 size={24} />} model="GPT5.1-high" delay={0.2} />
            <SOTARow category="后端开发" icon={<Code size={24} />} model="GPT5.1-codex-max" delay={0.3} />
            <SOTARow category="前端开发" icon={<Code size={24} />} model="gemini3-pro" delay={0.4} />
            <SOTARow category="视觉" icon={<Image size={24} />} model="gemini3-pro-image (nanobanana2)" delay={0.5} />
            <SOTARow category="音乐" icon={<Music size={24} />} model="Suno V5" delay={0.6} />
            <SOTARow category="视频" icon={<Video size={24} />} model="kling2.5 = veo3.1 > Sora2" delay={0.7} />
          </div>
      </div>
    </div>
  );
};

export default SelectionSOTASlidePart2;
