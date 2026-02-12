import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

interface Slide {
  id: string
  title: string
}

interface NavigationProps {
  currentSlide: number
  totalSlides: number
  slides: Slide[]
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
}

export default function Navigation({ 
  currentSlide, 
  totalSlides, 
  slides,
  onPrev, 
  onNext,
  onGoTo 
}: NavigationProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      {/* Bottom navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className="p-1.5 rounded-full glass hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        
        <div className="px-3 py-1 glass rounded-full text-xs font-medium text-white/60">
          {currentSlide + 1} / {totalSlides}
        </div>
        
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="p-1.5 rounded-full glass hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Menu button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="absolute top-6 right-6 p-3 rounded-full glass hover:bg-white/10 transition-colors z-50"
      >
        {showMenu ? (
          <XMarkIcon className="w-5 h-5" />
        ) : (
          <Bars3Icon className="w-5 h-5" />
        )}
      </button>

      {/* Slide menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute top-0 right-0 w-72 h-full glass z-40 overflow-y-auto"
          >
            <div className="p-6 pt-20">
              <h3 className="text-lg font-semibold mb-4 gradient-text">目录</h3>
              <div className="space-y-1">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      onGoTo(index)
                      setShowMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                      currentSlide === index
                        ? 'bg-purple-600/30 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-white/40 mr-2">{String(index + 1).padStart(2, '0')}</span>
                    {slide.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard hints */}
      <div className="absolute bottom-4 right-6 text-[10px] text-white/25 hidden md:block">
        ← → 键盘导航 | 空格键下一页
      </div>
    </>
  )
}
