import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PostTrainingSFTSlide() {
  const [showWithSFT, setShowWithSFT] = useState(false)

  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-purple-400 font-medium mb-2">Post-training · 让模型"像助手一样做事"</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">SFT / Instruction tuning</span>
        </h1>
        <p className="text-white/60 text-lg">监督微调</p>
      </motion.div>

      <div className="flex-1 flex items-center mt-6">
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Interactive Demo */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-2xl p-6 relative"
          >
            <h3 className="text-lg font-semibold mb-4 text-white/80">交互演示</h3>
            
            <div className="mb-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm text-blue-400 mb-1">用户提问：</p>
              <p className="text-white">「今天天气怎么样？」</p>
            </div>

            <button
              onClick={() => setShowWithSFT(!showWithSFT)}
              className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity mb-4"
            >
              {showWithSFT ? '查看：没有 Instruction 微调' : '查看：有 Instruction 微调'}
            </button>

            <motion.div
              key={showWithSFT ? 'with' : 'without'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${showWithSFT ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'} border`}
            >
              <p className={`text-sm mb-1 ${showWithSFT ? 'text-green-400' : 'text-red-400'}`}>
                LLM 回复{showWithSFT ? '（有SFT）' : '（无SFT）'}：
              </p>
              <p className="text-white/90">
                {showWithSFT 
                  ? '「今天北京天气晴朗，气温 25°C，适合外出。」'
                  : '「这句简单的寒暄仿佛诉尽了千言万语」'
                }
              </p>
            </motion.div>
          </motion.div>

          {/* Key Points */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-white/80">关键作用</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">指令遵循</h4>
                  <p className="text-white/60 text-sm">让模型理解用户意图并正确响应，而不是简单续写</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">学会 CoT（思维链）</h4>
                  <p className="text-white/60 text-sm">让模型学会"我要按步骤办事"</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-400 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">格式规范</h4>
                  <p className="text-white/60 text-sm">输出结构化、可预测的回复格式</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
