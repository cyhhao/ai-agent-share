import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SlideWrapperProps {
  children: ReactNode
  direction: number
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}

export default function SlideWrapper({ children, direction }: SlideWrapperProps) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className="absolute inset-0 overflow-y-auto p-8 md:p-12 lg:p-16"
    >
      <div className="w-full min-h-full max-w-7xl mx-auto flex flex-col justify-center">
        {children}
      </div>
    </motion.div>
  )
}
