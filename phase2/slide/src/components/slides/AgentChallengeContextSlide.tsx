import { motion } from 'framer-motion'

export default function AgentChallengeContextSlide() {
  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-blue-400 font-medium mb-2">Agent 真正的难点挑战</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text-blue">2. 上下文控制的取舍</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex items-center mt-6">
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Left: Why not hide */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">!</span>
              为什么不隐藏 tools 或输出结果？
            </h3>
            <div className="space-y-3">
              <p className="text-white/70 text-sm">
                <span className="text-red-400 font-medium">Anthropic</span> 和 <span className="text-red-400 font-medium">Manus</span> 的文章都曾指出：
              </p>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-white/80 text-sm">
                  这会带来 LLM 的困惑，从而影响行为。
                </p>
                <p className="text-white/60 text-sm mt-2">
                  甚至错误信息的隐藏，都会让 LLM 无法吸取教训。
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Summary strategies */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">?</span>
              如何进行摘要？
            </h3>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-cyan-400 text-sm font-medium mb-1">1. 何时摘要？</p>
                <p className="text-white/60 text-sm">现在一般都是快满了再压缩</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-cyan-400 text-sm font-medium mb-1">2. 保留哪些信息？</p>
                <a 
                  href="https://github.com/Piebald-AI/claude-code-system-prompts/blob/main/system-prompts/system-prompt-context-compaction-summary.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm underline"
                >
                  查看 ClaudeCode 的摘要 prompt
                </a>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-cyan-400 text-sm font-medium mb-1">3. 实际案例</p>
                <a 
                  href="https://openclaw-analysis.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm underline"
                >
                  看看 OpenClaw 的摘要
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
