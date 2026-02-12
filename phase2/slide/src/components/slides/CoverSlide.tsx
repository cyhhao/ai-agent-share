import { motion } from 'framer-motion'

export default function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        {/* Animated background shapes */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute -inset-20 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 relative">
          <span className="gradient-text-blue">AI 能力的边界</span>
          <br />
          <span className="text-white/90">在哪里</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl md:text-2xl text-white/60 mt-8 max-w-2xl"
      >
        重新认识 Training、Agent 与 Skill
      </motion.p>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-16 flex items-center gap-4"
      >
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-cyan-500" />
        <span className="text-white/40 text-sm">AI Agent 技术分享</span>
        <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-purple-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-white/30"
        >
          <span className="text-xs mb-2">滑动或按键开始</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
