import { motion } from 'framer-motion'

const principles = [
  {
    title: '最小充分',
    description: '只暴露 LLM 真正需要的能力，不多不少',
    icon: '🎯',
  },
  {
    title: '语义清晰',
    description: '名称和参数要让 LLM 一看就懂',
    icon: '📖',
  },
  {
    title: '失败友好',
    description: '工具出错时返回有意义的错误信息，而非让 LLM 猜测',
    icon: '🛡️',
  },
]

export default function AgentChallengeToolsSlide() {
  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-orange-400 font-medium mb-2">Agent 真正的难点挑战</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text-orange">1. Tools 设计</span>
        </h1>
        <p className="text-white/60 text-lg">如何最小化设计 Tools 满足 LLM 需要，又使 LLM 理解清晰</p>
      </motion.div>

      <div className="flex-1 flex items-center mt-6">
        <div className="w-full grid grid-cols-2 gap-6">
          {/* Left column - Questions */}
          <div className="space-y-4">
            {/* Question 1 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 font-bold">?</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">note() vs file(): 做一个记笔记的工具还是用 file system？</h3>
                  <p className="text-white/60 text-base">抽象层级的选择会影响 LLM 的使用效率和理解程度</p>
                </div>
              </div>
            </motion.div>

            {/* Question 2 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 font-bold">?</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">read_file 一次性太大了怎么办？</h3>
                  <p className="text-white/60 text-base">需要考虑分页、流式读取、或智能截取策略</p>
                </div>
              </div>
            </motion.div>

            {/* Claude Code Tools */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">来看一看：ClaudeCode 的 Tools</h3>
                  <a 
                    href="https://github.com/Piebald-AI/claude-code-system-prompts?tab=readme-ov-file#builtin-tool-descriptions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-base"
                  >
                    <span className="font-mono bg-black/30 px-2 py-1 rounded">github.com/.../claude-code-system-prompts</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Key insight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-4 rounded-xl bg-white/5 border-l-4 border-orange-500"
            >
              <p className="text-white/70 text-base">
                <span className="text-orange-400 font-medium">关键洞察：</span> Tool 设计的本质是在 LLM 能力边界内，
                找到最佳的抽象层级和接口粒度
              </p>
            </motion.div>
          </div>

          {/* Right column - Tool Design Principles */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative rounded-2xl p-[2px] bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500"
          >
            <div className="h-full rounded-2xl bg-[#0f0f23]/95 p-6 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-sm">
                  ✦
                </span>
                Tool 设计三原则
              </h3>
              <div className="flex-1 flex flex-col justify-center space-y-5">
                {principles.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-2xl mt-0.5">{p.icon}</span>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                          {p.title}
                        </span>
                      </h4>
                      <p className="text-base text-white/65 leading-relaxed">{p.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
