import React from 'react';
import ZoomableImage from '../ui/ZoomableImage';

const FeedbackSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 md:px-12 relative py-8">
       
       <div className="flex flex-col items-center text-center mb-8 md:mb-12 z-10 max-w-5xl">
         <div className="mb-6 flex items-center gap-3">
             <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase tracking-wider">
               反馈闭环
             </span>
         </div>
         <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
           停下来想想 <span className="text-slate-400">它不知道什么</span>，<br className="md:hidden"/>
           问问 <span className="text-slate-400">它在想什么</span>，<br className="md:hidden"/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
             让它自己总结。
           </span>
         </h2>
      </div>

      <div className="flex-1 w-full flex items-center justify-center min-h-0">
        <div className="relative w-full max-w-6xl h-full max-h-[70vh]">
          <ZoomableImage 
            src="assets/image 2.png" 
            alt="Feedback Loop Example" 
            className="w-full h-full rounded-2xl border border-slate-200 shadow-2xl bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackSlide;