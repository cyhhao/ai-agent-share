import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SlideWrapper from './components/SlideWrapper'
import CoverSlide from './components/slides/CoverSlide'
import PreTrainingSlide from './components/slides/PreTrainingSlide'
import PostTrainingSFTSlide from './components/slides/PostTrainingSFTSlide'
import PostTrainingPrefSlide from './components/slides/PostTrainingPrefSlide'
import PostTrainingSafetySlide from './components/slides/PostTrainingSafetySlide'
import PostTrainingToolSlide from './components/slides/PostTrainingToolSlide'
import XReviewSlide from './components/slides/XReviewSlide'
import TrainingSummarySlide from './components/slides/TrainingSummarySlide'
import AgentIntroSlide from './components/slides/AgentIntroSlide'
import ReActFlowSlide from './components/slides/ReActFlowSlide'
import AgentChallengeToolsSlide from './components/slides/AgentChallengeToolsSlide'
import AgentChallengeContextSlide from './components/slides/AgentChallengeContextSlide'
import AgentChallengeMemorySlide from './components/slides/AgentChallengeMemorySlide'
import AgentEngineeringSlide from './components/slides/AgentEngineeringSlide'
import SkillEssenceSlide from './components/slides/SkillEssenceSlide'
import SkillShowcaseSlide from './components/slides/SkillShowcaseSlide'
import HowToWriteSkillSlide from './components/slides/HowToWriteSkillSlide'
import AIBoundarySlide from './components/slides/AIBoundarySlide'
import InsightsSlide from './components/slides/InsightsSlide'
import EcosystemSlide from './components/slides/EcosystemSlide'
import Navigation from './components/Navigation'

const slides = [
  { id: 'cover', component: CoverSlide, title: '封面' },
  { id: 'pre-training', component: PreTrainingSlide, title: 'Pre-training' },
  { id: 'post-sft', component: PostTrainingSFTSlide, title: 'SFT' },
  { id: 'post-pref', component: PostTrainingPrefSlide, title: 'Preference' },
  { id: 'post-safety', component: PostTrainingSafetySlide, title: 'Safety' },
  { id: 'post-tool', component: PostTrainingToolSlide, title: 'Tool-use' },
  { id: 'x-review', component: XReviewSlide, title: 'X评价' },
  { id: 'training-summary', component: TrainingSummarySlide, title: '训练总结' },
  { id: 'agent-intro', component: AgentIntroSlide, title: 'Agent架构' },
  { id: 'react-flow', component: ReActFlowSlide, title: 'ReAct流程' },
  { id: 'challenge-tools', component: AgentChallengeToolsSlide, title: 'Tools设计' },
  { id: 'challenge-context', component: AgentChallengeContextSlide, title: '上下文控制' },
  { id: 'challenge-memory', component: AgentChallengeMemorySlide, title: '记忆管理' },
  { id: 'agent-engineering', component: AgentEngineeringSlide, title: '工程提升' },
  { id: 'skill-essence', component: SkillEssenceSlide, title: 'Skill本质' },
  { id: 'skill-showcase', component: SkillShowcaseSlide, title: 'Skill大赏' },
  { id: 'how-to-skill', component: HowToWriteSkillSlide, title: '如何写Skill' },
  { id: 'ai-boundary', component: AIBoundarySlide, title: 'AI边界' },
  { id: 'insights', component: InsightsSlide, title: '洞察' },
  { id: 'ecosystem', component: EcosystemSlide, title: '生态位' },
]

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setDirection(index > currentSlide ? 1 : -1)
      setCurrentSlide(index)
    }
  }, [currentSlide])

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1)
      setCurrentSlide(prev => prev + 1)
    }
  }, [currentSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(prev => prev - 1)
    }
  }, [currentSlide])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  // Touch/swipe support
  useEffect(() => {
    let touchStartX = 0
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const diffX = touchStartX - touchEndX
      const diffY = touchStartY - touchEndY

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide()
        } else {
          prevSlide()
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [nextSlide, prevSlide])

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      {/* Slide container */}
      <AnimatePresence mode="wait" custom={direction}>
        <SlideWrapper key={currentSlide} direction={direction}>
          <CurrentSlideComponent />
        </SlideWrapper>
      </AnimatePresence>

      {/* Navigation */}
      <Navigation 
        currentSlide={currentSlide}
        totalSlides={slides.length}
        slides={slides}
        onPrev={prevSlide}
        onNext={nextSlide}
        onGoTo={goToSlide}
      />

      {/* Progress bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

export default App
