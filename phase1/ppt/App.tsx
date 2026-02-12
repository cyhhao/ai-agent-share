import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SlideType } from './types';

// Slides
import IntroSlide from './components/slides/IntroSlide';
import PhilosophySlide from './components/slides/PhilosophySlide';
import SelectionScoreSlide from './components/slides/SelectionScoreSlide';
import SelectionReviewSlide from './components/slides/SelectionReviewSlide';
import SelectionSOTASlidePart1 from './components/slides/SelectionSOTASlidePart1';
import SelectionSOTASlidePart2 from './components/slides/SelectionSOTASlidePart2';
import RefactorRoleSlidePart1 from './components/slides/RefactorRoleSlidePart1';
import RefactorRoleSlidePart2 from './components/slides/RefactorRoleSlidePart2';
import RefactorSlide from './components/slides/RefactorSlide';
import RefactorHonestSlide from './components/slides/RefactorHonestSlide';
import RefactorPlanSlide from './components/slides/RefactorPlanSlide';
import EmpowermentMCPSlide from './components/slides/EmpowermentMCPSlide';
import EmpowermentChasmSlide from './components/slides/EmpowermentChasmSlide';
import FeedbackSlide from './components/slides/FeedbackSlide';
import CommunicationSlide from './components/slides/CommunicationSlide';
import CommunicationPromptSlide from './components/slides/CommunicationPromptSlide';
import WhyCodingSlide from './components/slides/WhyCodingSlide';
import EvolutionSlide from './components/slides/EvolutionSlide';
import ConclusionSlide from './components/slides/ConclusionSlide';

const slides = [
  { id: SlideType.INTRO, component: IntroSlide, label: '简介' },
  { id: SlideType.PHILOSOPHY, component: PhilosophySlide, label: '核心理念' },
  { id: SlideType.SELECTION_SCORE, component: SelectionScoreSlide, label: '看榜单' },
  { id: SlideType.SELECTION_REVIEW, component: SelectionReviewSlide, label: '看评价' },
  { id: SlideType.SELECTION_SOTA, component: SelectionSOTASlidePart1, label: '亲测 SOTA (心法)' },
  { id: SlideType.SELECTION_SOTA, component: SelectionSOTASlidePart2, label: '亲测 SOTA (榜单)' },
  { id: SlideType.REFACTOR_ROLE, component: RefactorRoleSlidePart1, label: '重构角色 (转变)' },
  { id: SlideType.REFACTOR_ROLE, component: RefactorRoleSlidePart2, label: '重构角色 (实践)' },
  { id: SlideType.REFACTOR_HONEST, component: RefactorHonestSlide, label: '场景：坦诚' },
  { id: SlideType.REFACTOR_PLAN, component: RefactorPlanSlide, label: '场景：规划' },
  { id: SlideType.EMPOWERMENT_MCP, component: EmpowermentMCPSlide, label: '给权限 (MCP)' },
  { id: SlideType.EMPOWERMENT_CHASM, component: EmpowermentChasmSlide, label: '跨越鸿沟' },
  { id: SlideType.FEEDBACK_LOOP, component: FeedbackSlide, label: '反馈闭环' },
  { id: SlideType.COMMUNICATION_TOOLS, component: CommunicationSlide, label: '优化沟通' },
  { id: SlideType.COMMUNICATION_PROMPT, component: CommunicationPromptSlide, label: '沉淀 Prompt' },
  { id: SlideType.WHY_CODING, component: WhyCodingSlide, label: 'Coding 元能力' },
  { id: SlideType.EVOLUTION, component: EvolutionSlide, label: '演进之路' },
];

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setDirection(1);
      setCurrentSlideIndex((prev) => prev + 1);
    }
  }, [currentSlideIndex]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const CurrentComponent = slides[currentSlideIndex].component;

  return (
    <div className="w-full h-screen bg-slate-50 text-slate-900 overflow-hidden relative selection:bg-blue-100 selection:text-blue-900">
      {/* Background Ambience - Light Mode */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-dot-pattern opacity-40"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200 z-50">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "circOut" }}
        />
      </div>

      {/* Main Content Area */}
      <main className="w-full h-full flex flex-col items-center justify-center relative z-10 px-4 md:px-8">
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentSlideIndex}
            custom={direction}
            initial={{ opacity: 0, y: direction * 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction * -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-7xl h-full flex flex-col justify-center"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls - Right Side Dots */}
      {/* Removed overflow-y-auto to allow tooltips to be visible without clipping */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 py-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              setDirection(index > currentSlideIndex ? 1 : -1);
              setCurrentSlideIndex(index);
            }}
            className={`group relative flex items-center justify-center w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlideIndex 
                ? 'bg-blue-600 scale-125 shadow-md' 
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
          >
            {/* Tooltip */}
            <span className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-slate-700 text-xs font-semibold rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
              {slide.label}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-50">
        <button 
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className="p-3 rounded-full bg-white shadow-md border border-slate-200 hover:border-blue-400 text-slate-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronUp size={20} />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlideIndex === slides.length - 1}
          className="p-3 rounded-full bg-white shadow-md border border-slate-200 hover:border-blue-400 text-slate-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Page Number */}
      <div className="absolute bottom-8 left-8 text-slate-400 text-xs font-mono tracking-widest uppercase flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full" />
        AI Agent 分享 // {currentSlideIndex + 1} <span className="text-slate-300">/</span> {slides.length}
      </div>
    </div>
  );
};

export default App;