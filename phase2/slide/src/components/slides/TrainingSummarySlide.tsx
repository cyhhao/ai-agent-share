import { motion } from 'framer-motion'

export default function TrainingSummarySlide() {
  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-purple-400 font-medium mb-2">重新认识训练</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">总结</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex items-center">
        <div className="w-full space-y-6">
          {/* Key quote */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-500 to-purple-500" />
            <blockquote className="text-xl md:text-2xl text-white/90 pl-6">
              预训练提供<span className="text-cyan-400 font-semibold">能力底座</span>，
              后训练塑造<span className="text-purple-400 font-semibold">行为策略</span>。
            </blockquote>
            <p className="text-white/60 mt-4 pl-6">
              Agent 体验的上限，很大程度取决于 Post-training 对工具调用、格式约束、偏好对齐的质量。
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-white/80">GPT-5.2 / Gemini 3 / Claude Opus 4.6 这一代</h3>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/60 text-sm mb-1">预训练堆料</p>
                <p className="text-lg font-medium text-white">只是门票</p>
              </div>
              <svg className="w-8 h-8 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <p className="text-purple-400 text-sm mb-1">真正拉开差距</p>
                <p className="text-lg font-medium text-white">后训练质量</p>
              </div>
            </div>
          </motion.div>

          {/* Benchmarks */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-white/80">各家发布新模型时的亮点指标</h3>
            <div className="flex flex-wrap gap-3">
              {['Tau2-bench', 'Terminal-Bench 2.0', 'SWE-Bench Pro'].map((bench, i) => (
                <motion.span
                  key={bench}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 font-mono text-sm"
                >
                  {bench}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
