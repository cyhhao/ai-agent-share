import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Award, Terminal, Image, Music, Video, Code, BookOpen } from 'lucide-react';

const LeaderboardCard = ({ title, desc, delay }: { title: string, desc: string, delay: number }) => (
  <motion.div 
    className="bg-slate-900 border border-slate-800 p-4 rounded-lg hover:border-cyan-500/50 transition-colors"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <h4 className="font-bold text-slate-200 mb-1">{title}</h4>
    <p className="text-xs text-slate-400">{desc}</p>
  </motion.div>
);

const SOTARow = ({ category, icon, model }: { category: string, icon: React.ReactNode, model: string }) => (
  <div className="flex items-center justify-between p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors group">
    <div className="flex items-center gap-3 text-slate-400 group-hover:text-cyan-400 transition-colors w-1/3">
      {icon}
      <span className="font-mono text-sm uppercase tracking-wider font-bold">{category}</span>
    </div>
    <div className="text-slate-200 font-semibold w-2/3 text-right group-hover:text-white">
      {model}
    </div>
  </div>
);

const SelectionSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-8 items-center justify-center p-4">
      
      {/* Left Column: Strategy */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">1. 学会挑人</h2>
          <p className="text-purple-400 font-mono text-sm">（面试模型）</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
            <BarChart2 className="text-cyan-500" size={18} /> 看榜（分数）
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <LeaderboardCard title="HLE (Humanity's Last Exam)" desc="终极学术考试。当前所有前沿模型的准确率都很低。" delay={0.1} />
            <LeaderboardCard title="MMLU-Pro" desc="考验多模态能力。" delay={0.2} />
            <LeaderboardCard title="SWE-bench" desc="真实开源项目里自动修 bug。" delay={0.3} />
          </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
            <Award className="text-yellow-500" size={18} /> 看评价（口碑）
          </h3>
          <p className="text-sm text-slate-400">
            分数只代表预训练好。这时候靠人类的感受，参考 <strong>LMSYS Chatbot Arena</strong> 双盲PK测试。
            <br/><br/>
            <em>"用户会用脚投票。比如 GPT5-codex 发布后，有不少人都迁到 Codex 了。"</em>
          </p>
        </div>
      </div>

      {/* Right Column: The SOTA Table */}
      <div className="w-full md:w-1/2 bg-slate-900/80 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Terminal size={16} className="text-green-400" />
            亲测 SOTA (实习期) 名单
          </h3>
          <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded border border-green-800">Verified</span>
        </div>
        
        <div className="flex flex-col">
          <SOTARow 
            category="文科 (写文章)" 
            icon={<BookOpen size={18} />} 
            model="gemini3-pro" 
          />
          <SOTARow 
            category="理科 (研究)" 
            icon={<BarChart2 size={18} />} 
            model="GPT5.1-high" 
          />
          <SOTARow 
            category="后端开发" 
            icon={<Code size={18} />} 
            model="GPT5.1-codex-max" 
          />
          <SOTARow 
            category="前端开发" 
            icon={<Code size={18} />} 
            model="gemini3-pro" 
          />
          <SOTARow 
            category="视觉" 
            icon={<Image size={18} />} 
            model="gemini3-pro-image (nanobanana2)" 
          />
          <SOTARow 
            category="音乐" 
            icon={<Music size={18} />} 
            model="Suno V5" 
          />
          <SOTARow 
            category="视频" 
            icon={<Video size={18} />} 
            model="kling2.5 = veo3.1 > Sora2" 
          />
        </div>

        <div className="p-6 bg-red-950/20 border-t border-red-900/30">
          <h4 className="text-red-400 font-bold text-sm uppercase mb-2">铁律</h4>
          <p className="text-slate-300 text-sm italic">
            "智能无法叠加。每个场景下，只用当前最好的。 <br/>
            <span className="text-white font-bold">个人非商业用途，永远不要用中庸的模型。</span> 省了1/10的钱，浪费了10倍的时间，是血亏的。"
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectionSlide;