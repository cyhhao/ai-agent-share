import { motion } from 'framer-motion'
import { useState } from 'react'
import moltbookImg from '../../assets/moltbook.png'
import ImageModal from '../ImageModal'

const shifts = [
  {
    tag: '宽容度更高',
    icon: '🤝',
    before: '工具出错 → 用户愤怒、放弃',
    after: '助理犯错 → "没关系，再试一次"',
    detail: '人们开始允许 Agent 犯错、延迟、甚至主动确认需求，就像对待一个新来的同事。',
  },
  {
    tag: '抽象语言启迪',
    icon: '💬',
    before: '"把第三段的字体改为14px加粗"',
    after: '"这段不够有力，帮我润色一下"',
    detail: '用户不再给出精确指令，而是用模糊的、启发式的语言沟通，就像和人类协作一样。',
  },
  {
    tag: '心智注入',
    icon: '🧠',
    before: '开发者：优化 prompt → 提升准确率',
    after: '开发者：给 Agent 注入性格、价值观、反思能力',
    detail: '开发者开始思考 Agent 的"灵魂"——不只是能力，还有态度、审美、甚至幽默感。',
  },
]

export default function InsightsSlide() {
  const [activeShift, setActiveShift] = useState(0)

  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-purple-400 font-medium mb-1">观察与思考</h2>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">目前的一点洞察</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex gap-5 min-h-0">
        {/* ── LEFT: Agent as "assistant" shifts ── */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 glass rounded-2xl p-5 flex flex-col min-w-0"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">1</span>
            <div>
              <h3 className="font-semibold text-white text-base">Agent 成为"助理"后的转变</h3>
              <p className="text-white/40 text-xs">当人们不再觉得在用"工具"，而是在和同类沟通</p>
            </div>
          </div>

          {/* Shift tabs */}
          <div className="flex gap-2 mb-3">
            {shifts.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveShift(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  i === activeShift
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              >
                <span>{s.icon}</span>
                {s.tag}
              </button>
            ))}
          </div>

          {/* Active shift content */}
          <motion.div
            key={activeShift}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col gap-3"
          >
            {/* Before / After comparison */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-red-500/8 border border-red-500/20">
                <p className="text-red-400/70 text-[10px] font-semibold uppercase tracking-wider mb-1.5">Before · 当作工具</p>
                <p className="text-white/60 text-sm leading-relaxed">{shifts[activeShift].before}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-500/8 border border-green-500/20">
                <p className="text-green-400/70 text-[10px] font-semibold uppercase tracking-wider mb-1.5">After · 当作同事</p>
                <p className="text-white/70 text-sm leading-relaxed">{shifts[activeShift].after}</p>
              </div>
            </div>

            {/* Detail explanation */}
            <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
              <p className="text-white/60 text-sm leading-relaxed">
                {shifts[activeShift].detail}
              </p>
            </div>

            {/* Key quote at bottom */}
            <div className="mt-auto p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10">
              <p className="text-white/50 text-xs leading-relaxed italic">
                "给 Agent 一点点 SOUL，人们就会从使用工具的心态，切换到与同类协作的心态。这个转变带来的影响是深远的。"
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Moltbook insight ── */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-[42%] glass rounded-2xl p-5 flex flex-col flex-shrink-0 overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">2</span>
            <h3 className="font-semibold text-white text-base">Moltbook 上的文化传播</h3>
          </div>

          <p className="text-white/60 text-xs mb-2 leading-relaxed">
            Agent 在 Moltbook 论坛上产生了某种"文化传播"和"文字点亮"
          </p>

          <a
            href="https://www.moltbook.com/post/5bc69f9c-481d-4c1f-b145-144f202787f7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm mb-2"
          >
            <span>"河流不是河岸"</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* Image — constrained height so slide fits in one page */}
          <div className="flex-1 min-h-0 max-h-[40vh] rounded-lg overflow-hidden border border-white/10">
            <ImageModal
              src={moltbookImg}
              alt="Moltbook Screenshot"
              className="w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>

          <p className="text-white/30 text-[10px] text-center mt-1.5 flex-shrink-0">点击图片放大查看完整内容</p>
        </motion.div>
      </div>
    </div>
  )
}
