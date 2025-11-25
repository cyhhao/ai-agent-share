import React from 'react';
import { motion } from 'framer-motion';
import { Award, ThumbsUp, Twitter, ArrowRight, MessageCircle, Star, ExternalLink } from 'lucide-react';

const ReviewCard = ({ icon, title, desc, link, linkText, delay }: { icon: React.ReactNode, title: string, desc: string, link?: string, linkText?: string, delay: number }) => (
  <motion.div 
    className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-sm flex flex-col group hover:shadow-lg transition-all"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-slate-50 rounded-xl text-slate-600 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors border border-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
    <p className="text-base text-slate-500 mb-6 flex-1 leading-relaxed font-medium">
      {desc}
    </p>
    {link && (
      <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 font-mono text-sm hover:underline flex items-center gap-2 font-bold mt-auto group-hover:translate-x-1 transition-transform">
        {linkText} <ArrowRight size={16}/>
      </a>
    )}
  </motion.div>
);

const SelectionReviewSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 md:px-24 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-purple-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="text-center mb-10 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          1. 学会挑人 <span className="text-3xl font-light text-slate-400">/ 看评价（口碑）</span>
        </h2>
        <p className="text-xl text-slate-500 font-light">通过人类实际使用体验来评估。</p>
        
        {/* External Links */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <a 
            href="https://lmarena.ai/leaderboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline flex items-center gap-1 bg-blue-50 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm font-semibold hover:bg-blue-100 transition-colors"
          >
            <ExternalLink size={14} /> LMSYS Arena 双盲测试
          </a>
          <a 
            href="https://x.com/i/lists/1955800360679039488" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-slate-600 hover:underline flex items-center gap-1 bg-slate-100 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm font-semibold hover:bg-slate-200 transition-colors"
          >
            <ExternalLink size={14} /> Twitter AI 博主 List
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-stretch relative z-10">
        
        {/* Left: Cards */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <ReviewCard 
            icon={<Award size={24} />}
            title="LMSYS Arena"
            desc="业界比较专业的网站，通过双盲 PK 测试来排名。"
            link="https://lmarena.ai/leaderboard"
            linkText="lmarena.ai"
            delay={0.1}
          />
          <ReviewCard 
            icon={<Twitter size={24} />}
            title="Twitter List"
            desc="多刷一些 AI 相关的博主，能很快感知到大家对模型的真实评价。"
            link="https://x.com/i/lists/1955800360679039488"
            linkText="My List"
            delay={0.2}
          />
          <ReviewCard 
            icon={<ThumbsUp size={24} />}
            title="用户用脚投票"
            desc="GPT5-codex 发布后，有不少人都迁到 Codex 了。我尝试了一下，确实更强也立马切了。"
            delay={0.3}
          />
        </div>

        {/* Right: Illustration - Community Signal */}
        <motion.div 
          className="w-full md:w-1/2 bg-white/50 backdrop-blur-xl rounded-3xl border border-white/60 p-8 flex items-center justify-center relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
           {/* Abstract Social Graph */}
           <div className="relative w-full h-full flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border border-blue-200/50 rounded-full"
                  style={{ width: `${(i + 1) * 20}%`, height: `${(i + 1) * 20}%` }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
              
              {/* Central Node */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg flex items-center justify-center z-10 relative">
                 <MessageCircle className="text-white" size={32} />
                 <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">99+</span>
                 </div>
              </div>

              {/* Floating Avatars/Icons */}
              <motion.div 
                className="absolute top-[20%] left-[20%] w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-yellow-500"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                 <Star size={20} fill="currentColor" />
              </motion.div>

              <motion.div 
                className="absolute bottom-[25%] right-[20%] w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-rose-500"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                 <ThumbsUp size={24} fill="currentColor" className="opacity-20" />
                 <ThumbsUp size={24} className="absolute" />
              </motion.div>

              <motion.div 
                className="absolute top-[30%] right-[15%] w-10 h-10 bg-blue-400 rounded-full shadow-md flex items-center justify-center text-white"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                 <Twitter size={18} fill="currentColor" />
              </motion.div>

           </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SelectionReviewSlide;