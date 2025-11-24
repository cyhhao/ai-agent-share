import React from 'react';
import ZoomableImage from '../ui/ZoomableImage';

const RefactorHonestSlide: React.FC = () => {
  const hotspots = [
    {
      x: 35,
      y: 25,
      label: "User Context",
      description: "坦诚地告诉 AI 你的真实约束（如预算限制），不要让它瞎猜。"
    },
    {
      x: 65,
      y: 65,
      label: "Thinking Process",
      description: "AI 根据真实约束，调整了架构决策，从企业级镜像转向本地构建。"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 md:px-12 relative py-8">
      
       <div className="flex flex-col items-center text-center mb-8 md:mb-12 z-10 max-w-5xl">
         <div className="mb-6 flex items-center gap-3">
             <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
               重塑习惯
             </span>
             <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">
               Example 1 - Be Honest
             </span>
         </div>
         <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
           像对伙伴一样讲话，<br className="hidden md:block"/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
             说原因，说目的。
           </span>
         </h2>
      </div>

      <div className="flex-1 w-full flex items-center justify-center min-h-0">
        <div className="relative w-full max-w-6xl h-full max-h-[70vh]">
             <ZoomableImage 
              src="assets/image.png" 
              alt="Honest Communication Example" 
              className="w-full h-full rounded-2xl border border-slate-200 shadow-2xl bg-white"
              hotspots={hotspots}
            />
        </div>
      </div>
    </div>
  );
};

export default RefactorHonestSlide;