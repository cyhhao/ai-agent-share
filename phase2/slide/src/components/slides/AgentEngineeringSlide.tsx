import { motion } from 'framer-motion'
import treeImg from '../../assets/tree.png'
import ImageModal from '../ImageModal'

export default function AgentEngineeringSlide() {
  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-purple-400 font-medium mb-2">Agent 工程目前还有很大提升空间</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">工程优化方向</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex items-center mt-4">
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Left: Improvements */}
          <div className="space-y-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">1</span>
                <h3 className="font-semibold text-white">更多元控制能力</h3>
              </div>
              <p className="text-white/60 text-sm pl-11">切换自己的模型、更新心智、挑选设备……</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">2</span>
                <h3 className="font-semibold text-white">注入更多人类经验</h3>
              </div>
              <p className="text-white/60 text-sm pl-11">向 Agent 传授实践中积累的智慧</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 font-bold">3</span>
                <h3 className="font-semibold text-white">记忆的分层</h3>
              </div>
              <p className="text-white/60 text-sm pl-11">树状摘要，被动浮现，碎片整理</p>
            </motion.div>

            {/* Excellence quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-l-4 border-purple-500"
            >
              <p className="text-white/90 font-medium mb-2">优秀是一系列偏好设置，或许应该内置</p>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• 优秀的思想方法论和习惯</li>
                <li>• 时常自我反思总结升维</li>
              </ul>
            </motion.div>
          </div>

          {/* Right: Tree diagram */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-5"
          >
            <h3 className="font-semibold text-white mb-4">记忆分层示意</h3>
            <ImageModal
              src={treeImg}
              alt="Tree Memory Structure"
              className="w-full h-auto rounded-lg mb-4"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                <span className="text-white/70">越上层的越先被提及</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-white/70">越下层的越需要检索</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
