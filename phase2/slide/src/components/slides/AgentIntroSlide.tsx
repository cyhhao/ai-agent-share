import { motion } from 'framer-motion'
import agentImg from '../../assets/agent_1.png'
import ImageModal from '../ImageModal'

export default function AgentIntroSlide() {
  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-green-400 font-medium mb-2">重新认识 Agent</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text-blue">ReAct Agent 架构</span>
        </h1>
        <p className="text-white/60 text-lg">
          最小、最简单，也几乎是 <span className="text-cyan-400">99% 的主流 Agent 架构</span>
        </p>
      </motion.div>

      <div className="flex-1 flex items-center mt-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Image */}
            <div className="flex-1 w-full">
              <ImageModal
                src={agentImg}
                alt="ReAct Agent Architecture"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </div>

            {/* Description */}
            <div className="flex-1 space-y-4">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
              >
                <h3 className="font-semibold text-cyan-400 mb-2">Thought</h3>
                <p className="text-white/70 text-sm">模型思考下一步应该做什么</p>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
              >
                <h3 className="font-semibold text-purple-400 mb-2">Action</h3>
                <p className="text-white/70 text-sm">执行工具调用或生成响应</p>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
              >
                <h3 className="font-semibold text-green-400 mb-2">Observation</h3>
                <p className="text-white/70 text-sm">观察工具返回的结果</p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-white/50 text-sm mt-4"
              >
                最初的 Agent 需要 prompt 约束行为 Thought → Action → Observation
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
