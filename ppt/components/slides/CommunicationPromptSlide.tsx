import React from 'react';
import ZoomableImage from '../ui/ZoomableImage';

const CommunicationPromptSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 md:px-12 relative py-8">
       
       <div className="flex flex-col items-center text-center mb-8 md:mb-12 z-10 max-w-5xl">
         <div className="mb-6 flex items-center gap-3">
             <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
               沉淀 Prompt
             </span>
         </div>
         <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
           让它自己将 <br className="hidden md:block"/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
             要求、偏好总结出来。
           </span>
         </h2>
      </div>

      <div className="flex-1 w-full flex items-center justify-center min-h-0">
        <div className="relative w-full max-w-6xl h-full max-h-[70vh]">
          <ZoomableImage 
            src="assets/image 3.png" 
            alt="Prompt Generation Example" 
            className="w-full h-full rounded-2xl border border-slate-200 shadow-2xl bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default CommunicationPromptSlide;