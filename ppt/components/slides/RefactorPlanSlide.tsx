import React from 'react';
import ZoomableImage from '../ui/ZoomableImage';

const RefactorPlanSlide: React.FC = () => {
  const hotspots = [
    {
      x: 40,
      y: 30,
      label: "Strategizing",
      description: "不直接写代码，而是先生成规划文档 (Markdown)。"
    },
    {
      x: 70,
      y: 70,
      label: "Execution",
      description: "在确认文档无误后，再基于文档进行代码实施，减少返工。"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 md:px-12 relative py-8">
       
       <div className="flex flex-col items-center text-center mb-8 md:mb-12 z-10 max-w-5xl">
         <div className="mb-6 flex items-center gap-3">
             <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
               重塑习惯
             </span>
             <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">
               Example 2 - Plan First
             </span>
         </div>
         <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
           激发思考而非指令，<br className="hidden md:block"/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
             落地文档。
           </span>
         </h2>
      </div>

      <div className="flex-1 w-full flex items-center justify-center min-h-0">
        <div className="relative w-full max-w-6xl h-full max-h-[70vh]">
          <ZoomableImage 
            src="assets/image 1.png" 
            alt="Planning First Example" 
            className="w-full h-full rounded-2xl border border-slate-200 shadow-2xl bg-white"
            hotspots={hotspots}
          />
        </div>
      </div>
    </div>
  );
};

export default RefactorPlanSlide;