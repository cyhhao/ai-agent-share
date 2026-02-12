import { motion } from 'framer-motion'

const opportunities = [
  {
    id: 1,
    title: 'Secret 管理器',
    description: '类似 1password 但它更适合给 Agent 使用，人类授权。secret 直接填写到目标位置，不经过 context',
    annotation: '当前 Agent 处理密钥的方式极度不安全——密钥直接暴露在 context 中',
    icon: '🔐',
    color: 'cyan',
  },
  {
    id: 2,
    title: 'Agent Crypto Payment/DID 等协议',
    description: '需要一个现象级 app 普及协议',
    annotation: 'Agent 间交易、身份验证需要去中心化协议支撑，但协议普及依赖杀手级应用',
    icon: '🔗',
    color: 'purple',
  },
  {
    id: 3,
    title: '超级 Agent 架构',
    description: '把工程实现的优化拉满',
    annotation: '目前Agent架构的工程优化还很粗糙，有10x提升空间',
    icon: '🚀',
    color: 'pink',
  },
  {
    id: 4,
    title: 'Skills Registry',
    description: '类似 npm 的 Node Package Manager，让 skill 可互相引用相互依赖和管理',
    annotation: 'Skill 目前散落各处，缺少统一的发现、安装、版本管理机制',
    icon: '📦',
    color: 'green',
  },
]

export default function EcosystemSlide() {
  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-green-400 font-medium mb-2">洞察 · 3</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">还有很多生态位等待填补</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex items-center mt-4">
        <div className="w-full grid md:grid-cols-2 gap-6">
          {opportunities.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`glass rounded-xl p-6 relative overflow-hidden cursor-pointer group`}
            >
              {/* Glow on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                opp.color === 'cyan' ? 'bg-cyan-500/5' :
                opp.color === 'purple' ? 'bg-purple-500/5' :
                opp.color === 'pink' ? 'bg-pink-500/5' : 'bg-green-500/5'
              }`} />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <motion.span 
                    className="text-4xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    {opp.icon}
                  </motion.span>
                  <div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      opp.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                      opp.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                      opp.color === 'pink' ? 'bg-pink-500/20 text-pink-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      生态位 {opp.id}
                    </span>
                    <h3 className="font-semibold text-white text-lg mt-1">{opp.title}</h3>
                  </div>
                </div>
                <p className="text-white/70 text-base">{opp.description}</p>
                <p className="text-white/40 text-sm mt-2 leading-relaxed">{opp.annotation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Closing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center"
      >
        <p className="text-white/40 text-base">
          更多机会正等待着有远见的开发者去探索和实现
        </p>
      </motion.div>
    </div>
  )
}
