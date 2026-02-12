import { motion } from 'framer-motion'
import { useState } from 'react'

const stages = [
  { id: 'llm', name: 'LLM', desc: '大语言模型基础能力' },
  { id: 'reasoning', name: 'Reasoning', desc: '推理与思维链' },
  { id: 'agent', name: 'Agent', desc: '自主规划与执行' },
  { id: 'skill', name: 'Skill', desc: '经验与最佳实践' },
  { id: 'future', name: '?', desc: '下一个突破点' },
]

export default function AIBoundarySlide() {
  const [activeStage, setActiveStage] = useState<number | null>(null)

  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-orange-400 font-medium mb-2">思考</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text-orange">AI 能力的边界</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex flex-col justify-center">
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6 mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-orange-500 to-pink-500" />
          <blockquote className="text-xl md:text-2xl text-white/90 pl-4">
            别再为<span className="text-white/50">功能</span>而赞叹，
            而要为<span className="text-orange-400 font-semibold">能力边界</span>的扩宽赞叹
          </blockquote>
        </motion.div>

        {/* Evolution timeline */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white/80 mb-6">能力边界演进</h3>
          
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 -translate-y-1/2 rounded-full" />
            
            {/* Stages */}
            <div className="relative flex justify-between">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex flex-col items-center cursor-pointer"
                  onMouseEnter={() => setActiveStage(i)}
                  onMouseLeave={() => setActiveStage(null)}
                >
                  <motion.div
                    animate={{
                      scale: activeStage === i ? 1.2 : 1,
                      boxShadow: activeStage === i ? '0 0 30px rgba(255,255,255,0.3)' : 'none'
                    }}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-sm md:text-base font-bold z-10 ${
                      i === stages.length - 1
                        ? 'bg-gradient-to-br from-orange-500 to-pink-500'
                        : 'bg-gradient-to-br from-cyan-500 to-purple-500'
                    }`}
                  >
                    {stage.name}
                  </motion.div>
                  <motion.p
                    animate={{ opacity: activeStage === i ? 1 : 0.5 }}
                    className="mt-3 text-sm md:text-base text-white/70 text-center max-w-[80px] md:max-w-[100px]"
                  >
                    {stage.desc}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <p className="text-cyan-400 text-base font-medium mb-1">每一个关键节点的诞生</p>
              <p className="text-white/60 text-base">都在上一级达到阶段性瓶颈时，拓宽了 AI 能力的边界</p>
            </div>

            {/* Middle annotation: cyclic relationship */}
            <div className="flex flex-col items-center gap-1 px-2">
              <div className="flex items-center gap-1">
                <span className="text-cyan-400 text-sm">瓶颈催生下一级</span>
                <span className="text-cyan-400 text-lg">→</span>
              </div>
              <div className="w-8 h-px bg-white/20" />
              <div className="flex items-center gap-1">
                <span className="text-purple-400 text-lg">←</span>
                <span className="text-purple-400 text-sm">繁荣反哺上一级</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-purple-400 text-base font-medium mb-1">每一个关键节点的繁荣</p>
              <p className="text-white/60 text-base">都在反哺上一级节点</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
