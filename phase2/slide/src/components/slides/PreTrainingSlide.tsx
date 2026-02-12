import { motion } from 'framer-motion'

export default function PreTrainingSlide() {
  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl text-cyan-400 font-medium mb-2">重新认识训练</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">Pre-training</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex items-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full"
        >
          <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-white/90">
                让模型 <span className="text-cyan-400">"会说话/会看图"</span>
              </h3>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-medium text-white mb-1">自监督学习目标</h4>
                    <p className="text-white/60 text-base">学习通用能力：语言、知识、模式、跨模态对齐</p>
                  </div>
                  <div className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30">
                    <span className="text-cyan-300 text-base font-medium">= 象牙塔读书</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {['语言理解', '知识储备', '模式识别', '多模态对齐'].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 text-center"
                    >
                      <span className="text-white/80 text-base font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Annotation area */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-5 p-5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10"
          >
            <p className="text-white/70 text-base leading-relaxed">
              <span className="text-cyan-400 font-semibold">💡 类比：</span>预训练好比一个人在象牙塔里读书——学了很多知识，但没有经历过实际的社会活动，不知道如何在真实场景中做出合理的行为。所以才需要 <span className="text-cyan-400 font-medium">Post-training</span>。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
