import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Image as ImageIcon, MessageSquare, ArrowRight, Radio } from 'lucide-react';

const CommsCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <motion.div 
    className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all group relative overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
       {icon}
    </div>
    
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{title}</h3>
    </div>
    <p className="text-base text-slate-500 leading-relaxed font-medium">
      {desc}
    </p>
  </motion.div>
);

const CommunicationSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 md:px-24 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[30%] w-[50%] h-[50%] bg-sky-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="mb-12 text-center relative z-10">
        <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">4. 优化沟通</h2>
        <p className="text-xl text-slate-500 font-light">
          为自己提效，让 Agent 更懂你。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <CommsCard 
          icon={<Mic size={24} />}
          title="语音转文字"
          desc="利用 Whisper 等模型，把你的碎碎念转成结构化的 Prompt。口语表达往往比打字更丰富、更直观。"
          delay={0.1}
        />
        <CommsCard 
          icon={<ImageIcon size={24} />}
          title="利用多模态"
          desc="一图胜千言。直接截图报错信息、UI 界面给 Agent，比你费力描述准确得多。"
          delay={0.2}
        />
        <CommsCard 
          icon={<MessageSquare size={24} />}
          title="Slack Bot 遥控"
          desc="把 Agent 集成到 IM 工具中。随时随地（手机上）都能呼叫它干活，不用打开电脑终端。"
          delay={0.3}
        />
      </div>

      {/* Visual Metaphor: Signal Waves */}
      <div className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-center gap-2 opacity-20 pointer-events-none">
         {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-2 bg-blue-500 rounded-t-full"
              animate={{ height: [10, 40 + Math.random() * 60, 10] }}
              transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
            />
         ))}
      </div>
    </div>
  );
};

export default CommunicationSlide;