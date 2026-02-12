import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Info } from 'lucide-react';

export interface Hotspot {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
  description: string;
}

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  hotspots?: Hotspot[];
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt, className = "", hotspots = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <div 
        className={`relative group cursor-zoom-in overflow-hidden ${className}`} 
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hotspots Layer (Only visible when not zoomed in initially) */}
        <div className="absolute inset-0 z-10">
          {hotspots.map((spot, index) => (
            <div
              key={index}
              className="absolute w-8 h-8 -ml-4 -mt-4"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(activeHotspot === index ? null : index);
              }}
              onMouseEnter={() => setActiveHotspot(index)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* Pulse Circle */}
              <div className="relative w-full h-full flex items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-4 w-4 rounded-full bg-blue-600 border-2 border-white shadow-sm items-center justify-center">
                   <Info size={8} className="text-white" />
                </span>
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {activeHotspot === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-1/2 bottom-full mb-3 w-64 -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm text-white p-4 rounded-xl shadow-2xl border border-slate-700 z-50 pointer-events-none"
                  >
                    <h4 className="font-bold text-blue-300 text-sm mb-1">{spot.label}</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">{spot.description}</p>
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-b border-r border-slate-700 transform rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Overlay Hover Effect for Zoom */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-all duration-300 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100">
           <div className="bg-white/90 backdrop-blur p-3 rounded-full text-blue-600 shadow-xl transform scale-75 group-hover:scale-100 transition-transform border border-slate-200">
             <ZoomIn size={24} />
           </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white hover:bg-slate-100 text-slate-800 rounded-full transition-colors z-[101] border border-slate-200 shadow-lg"
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            >
              <X size={28} />
            </button>
            <motion.img 
              src={src} 
              alt={alt}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default bg-white"
              onClick={(e) => e.stopPropagation()} 
            />
            
            {/* Legend for Hotspots in Zoomed Mode (Optional, maybe at bottom) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-sm border border-white/10 flex gap-6">
               {hotspots.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="font-medium text-slate-200">{h.label}</span>
                  </div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ZoomableImage;