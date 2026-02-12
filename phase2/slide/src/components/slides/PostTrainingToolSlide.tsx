import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PostTrainingToolSlide() {
  const [showComparison, setShowComparison] = useState<'without' | 'with'>('without')

  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-green-400 font-medium mb-2">Post-training</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text-blue">Tool-use / Function Calling</span>
        </h1>
        <p className="text-white/60 text-lg">工具调用格式、规划、检索、代码执行等</p>
      </motion.div>

      <div className="flex-1 flex items-center mt-6">
        <div className="w-full">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="mb-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm text-blue-400 mb-1">用户提问：</p>
              <p className="text-white text-lg">「明天天气怎么样？」</p>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowComparison('without')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  showComparison === 'without'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                无 Tool-use
              </button>
              <button
                onClick={() => setShowComparison('with')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  showComparison === 'with'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                有 Tool-use
              </button>
            </div>

            <motion.div
              key={showComparison}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {showComparison === 'without' ? (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <p className="text-sm text-red-400 mb-2">模型响应（无 Tool-use）：</p>
                  <p className="text-white/80">
                    "明天大概率是晴天，气温在 20-25 度左右，建议穿薄外套。"
                  </p>
                  <p className="text-red-400/60 text-xs mt-2">
                    ⚠️ 这是凭训练语料"猜"出来的，可能完全不准确
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                    <p className="text-sm text-purple-400 mb-2">1. 模型调用工具：</p>
                    <code className="text-sm text-white/80 font-mono bg-black/30 p-2 rounded block">
                      get_weather(location="用户位置", date="明天")
                    </code>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                    <p className="text-sm text-blue-400 mb-2">2. 工具返回结果：</p>
                    <code className="text-sm text-white/80 font-mono bg-black/30 p-2 rounded block">
                      {`{"temp": "18-24°C", "weather": "多云转晴", "humidity": "65%"}`}
                    </code>
                  </div>
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                    <p className="text-sm text-green-400 mb-2">3. 最终回复：</p>
                    <p className="text-white/80">
                      "根据天气预报，明天是多云转晴，气温 18-24°C，湿度 65%，建议带件薄外套出门。"
                    </p>
                    <p className="text-green-400/60 text-xs mt-2">
                      ✓ 基于实时数据的准确回答
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
