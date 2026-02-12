import { motion } from 'framer-motion'

export default function AgentChallengeMemorySlide() {
  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-green-400 font-medium mb-2">Agent 真正的难点挑战</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">3. 记忆管理</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex items-center mt-6">
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Left column: two problem cards */}
          <div className="space-y-4">
            {/* Question 1 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">记忆写文件就可以了吗？</h3>
                  <a 
                    href="https://openclaw-analysis.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 text-base"
                  >
                    看看 OpenClaw 的实现 →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Question 2 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-3">给 Agent 一个 retrieval tool 就解决问题了吗？</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-red-400 text-base font-medium mb-1">问题 1：Agent 不爱调用</p>
                      <p className="text-white/60 text-sm">如果改为强制调用会有成本问题</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-red-400 text-base font-medium mb-1">问题 2：向量检索只是片段</p>
                      <p className="text-white/60 text-sm">无法获知全貌</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-red-400 text-base font-medium mb-1">问题 3：占用 Agent 注意力</p>
                      <p className="text-white/60 text-sm">检索结果可能分散模型对当前任务的关注</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key insight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-l-4 border-green-500"
            >
              <p className="text-white/70 text-base">
                <span className="text-green-400 font-medium">核心挑战：</span> 记忆系统需要在 
                <span className="text-white">存储效率</span>、
                <span className="text-white">检索精度</span> 和 
                <span className="text-white">注意力分配</span> 之间找到平衡
              </p>
            </motion.div>
          </div>

          {/* Right column: Memory architecture diagram */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center"
          >
            <h3 className="text-base font-semibold text-white/80 mb-4">记忆架构示意</h3>
            <div className="flex flex-col items-center gap-0 w-full max-w-xs">
              {/* Layer 1: System Prompt */}
              <div className="w-full px-5 py-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-center backdrop-blur-sm">
                <p className="text-cyan-300 font-semibold text-base">System Prompt</p>
                <p className="text-cyan-200/50 text-sm">全局指令 · 始终存在</p>
              </div>
              {/* Arrow */}
              <div className="flex flex-col items-center py-1">
                <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-500/60 to-purple-500/60" />
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-purple-500/60" />
              </div>

              {/* Layer 2: 会话摘要 */}
              <div className="w-full px-5 py-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-center backdrop-blur-sm">
                <p className="text-purple-300 font-semibold text-base">会话摘要</p>
                <p className="text-purple-200/50 text-sm">近期对话 · 压缩保留</p>
              </div>
              {/* Arrow */}
              <div className="flex flex-col items-center py-1">
                <div className="w-0.5 h-4 bg-gradient-to-b from-purple-500/60 to-green-500/60" />
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-green-500/60" />
              </div>

              {/* Layer 3: Memory Files */}
              <div className="w-full px-5 py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-center backdrop-blur-sm">
                <p className="text-green-300 font-semibold text-base">Memory Files</p>
                <p className="text-green-200/50 text-sm">持久化存储 · 文件系统</p>
              </div>
              {/* Arrow */}
              <div className="flex flex-col items-center py-1">
                <div className="w-0.5 h-4 bg-gradient-to-b from-green-500/60 to-orange-500/60" />
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-orange-500/60" />
              </div>

              {/* Layer 4: Vector Store */}
              <div className="w-full px-5 py-3 rounded-xl bg-orange-500/15 border border-orange-500/30 text-center backdrop-blur-sm">
                <p className="text-orange-300 font-semibold text-base">Vector Store</p>
                <p className="text-orange-200/50 text-sm">语义检索 · 按需召回</p>
              </div>
            </div>

            {/* Diagram annotation */}
            <p className="text-white/40 text-sm mt-4 text-center">
              信息从上到下：覆盖范围扩大，检索精度下降
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
