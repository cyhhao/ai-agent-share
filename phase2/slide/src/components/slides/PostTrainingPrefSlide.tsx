import { motion } from 'framer-motion'
import { useState } from 'react'

const responses = [
  { type: 'textbook', label: '教科书式', text: '压力是一种心理生理反应，建议您了解Hans Selye的一般适应综合征理论...', color: 'blue' },
  { type: 'overconfident', label: '过度自信', text: '你这是心理素质太差了，要学会坚强一点，别那么软弱。', color: 'red' },
  { type: 'overpleasing', label: '过度迎合', text: '抱抱你~别哭了~一切都会好的呢~加油加油~', color: 'orange' },
  { type: 'balanced', label: '经过偏好优化', text: '理解你的感受。高压时期确实很难熬。能具体聊聊是什么让你感到压力吗？我们一起看看有什么可以调整的。', color: 'green' },
]

export default function PostTrainingPrefSlide() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-pink-400 font-medium mb-2">Post-training</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text-orange">Preference Optimization</span>
        </h1>
        <p className="text-white/60 text-lg">偏好对齐：RLHF / RLAIF / DPO…</p>
      </motion.div>

      <div className="flex-1 flex flex-col mt-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-4 mb-4"
        >
          <p className="text-sm text-blue-400 mb-1">用户提问：</p>
          <p className="text-white">「我最近压力很大，你能不能给点建议？」</p>
        </motion.div>

        <p className="text-white/60 text-sm mb-3">如果只有 SFT，没有 preference optimization：</p>

        <div className="grid md:grid-cols-2 gap-3 flex-1">
          {responses.map((r, i) => (
            <motion.button
              key={r.type}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => setSelected(i)}
              className={`p-4 rounded-xl text-left transition-all ${
                selected === i
                  ? r.color === 'green'
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : r.color === 'blue'
                    ? 'bg-blue-500/20 border-2 border-blue-500'
                    : r.color === 'red'
                    ? 'bg-red-500/20 border-2 border-red-500'
                    : 'bg-orange-500/20 border-2 border-orange-500'
                  : 'glass hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  r.color === 'green' ? 'bg-green-500/30 text-green-400' :
                  r.color === 'blue' ? 'bg-blue-500/30 text-blue-400' :
                  r.color === 'red' ? 'bg-red-500/30 text-red-400' :
                  'bg-orange-500/30 text-orange-400'
                }`}>
                  {r.label}
                </span>
                {r.type === 'balanced' && (
                  <span className="text-xs text-green-400">✓ 最佳</span>
                )}
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{r.text}</p>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 p-4 glass rounded-xl"
        >
          <p className="text-white/60 text-sm">
            <span className="text-purple-400 font-medium">CoT 层面：</span> "哪条思维链更值得走" — 偏好优化帮助模型选择更合理的推理路径
          </p>
        </motion.div>
      </div>
    </div>
  )
}
