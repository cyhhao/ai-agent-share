import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

// ── Mechanism steps (visualized with a real "pptx" skill example) ──
interface MechStep {
  id: number
  title: string
  desc: string
  // The "simulated view" content for each step
  visual: { label: string; lines: { text: string; indent?: number }[]; highlight?: number[] }
}

const mechSteps: MechStep[] = [
  {
    id: 1,
    title: '框架扫描加载',
    desc: 'Agent 框架启动时，自动扫描 skills/* 目录下每个文件夹的 SKILL.md',
    visual: {
      label: 'skills/',
      lines: [
        { text: '📁 skills/', indent: 0 },
        { text: '📁 pptx/', indent: 1 },
        { text: '📄 SKILL.md', indent: 2 },
        { text: '📄 template.py', indent: 2 },
        { text: '📁 git-worktree/', indent: 1 },
        { text: '📄 SKILL.md', indent: 2 },
        { text: '📁 ast-grep/', indent: 1 },
        { text: '📄 SKILL.md', indent: 2 },
      ],
      highlight: [1, 2, 4, 6],
    },
  },
  {
    id: 2,
    title: '目录注入 System Prompt',
    desc: '从每个 SKILL.md 中抽取 name + description，生成目录注入到 Agent 的 system prompt',
    visual: {
      label: 'System Prompt (片段)',
      lines: [
        { text: '## Available Skills' },
        { text: '' },
        { text: '- **pptx**: 创建/编辑/解析 .pptx 文件' },
        { text: '- **git-worktree**: Git worktree 开发流程' },
        { text: '- **ast-grep**: AST 结构化代码搜索' },
        { text: '' },
        { text: '当任务匹配某个 skill 时，' },
        { text: '调用 load_skill(name) 获取完整指令。' },
      ],
      highlight: [2, 3, 4],
    },
  },
  {
    id: 3,
    title: 'Agent 触发 Skill',
    desc: '当用户说"帮我做个 PPT"，Agent 识别匹配 → 调用 load_skill("pptx")，完整 SKILL.md 注入上下文',
    visual: {
      label: 'load_skill("pptx") → 注入完整内容',
      lines: [
        { text: '# pptx Skill' },
        { text: '' },
        { text: '## 触发条件' },
        { text: '任何涉及 .pptx 文件的任务', indent: 1 },
        { text: '' },
        { text: '## 工作流程' },
        { text: '1. 用 python-pptx 创建/编辑', indent: 1 },
        { text: '2. 遵循模版和布局规范', indent: 1 },
        { text: '3. 输出到指定路径', indent: 1 },
        { text: '' },
        { text: '## 引用资源' },
        { text: '- template.py: PPT 生成脚本', indent: 1 },
        { text: '- layout.json: 布局配置', indent: 1 },
      ],
      highlight: [0, 5, 6, 7, 10, 11, 12],
    },
  },
  {
    id: 4,
    title: 'Agent 按需使用资源',
    desc: 'Agent 读完 SKILL.md 后，按需读取引用文件、执行脚本，完成任务',
    visual: {
      label: 'Agent 执行中...',
      lines: [
        { text: '> 读取 template.py      ✅' },
        { text: '> 读取 layout.json      ✅' },
        { text: '> 生成 slides 内容       ✅' },
        { text: '> 调用 python-pptx 渲染  ✅' },
        { text: '> 输出 output.pptx       ✅' },
        { text: '' },
        { text: '✨ 任务完成！' },
        { text: '已生成 20 页演示文稿。' },
      ],
      highlight: [0, 1, 2, 3, 4, 6, 7],
    },
  },
]

// ── Essence cards ──
const essences = [
  {
    icon: '📚', title: '知识', color: 'cyan',
    desc: '垂直领域的、有足够深度的知识',
    example: '如：python-pptx 的 API 细节、布局规范',
  },
  {
    icon: '🛠️', title: '方法', color: 'purple',
    desc: '经过长期实践、试错得出的最佳实践路径',
    example: '如：先建母版再填内容，避免逐页硬编码',
  },
  {
    icon: '💡', title: '偏好', color: 'pink',
    desc: '方案千万条，为何老师傅偏用这一条？',
    example: '如：坚持每页不超过 5 个要点、配色用品牌色',
  },
  {
    icon: '🏗️', title: '脚手架', color: 'orange',
    desc: '模版、脚本、流程，经验成果的复用',
    example: '如：template.py 脚本一键套用标准布局',
  },
]

const essenceColors: Record<string, { bg: string; border: string; text: string }> = {
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30',   text: 'text-cyan-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  pink:   { bg: 'bg-pink-500/10',   border: 'border-pink-500/30',   text: 'text-pink-400' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
}

export default function SkillEssenceSlide() {
  const [mechIdx, setMechIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const advance = useCallback(() => {
    setMechIdx(prev => (prev + 1) % mechSteps.length)
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(advance, 3000)
    return () => clearInterval(timer)
  }, [isPlaying, advance])

  const step = mechSteps[mechIdx]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-pink-400 font-medium mb-1">Skill 是 Code Package，不会成为另一个 MCP</h2>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text-orange">Skill 本质是什么？</span>
        </h1>
      </motion.div>

      {/* Main: left = mechanism visual, right = essence cards */}
      <div className="flex-1 flex gap-5 min-h-0">
        {/* ── LEFT: Interactive mechanism diagram ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-[54%] flex flex-col glass rounded-2xl p-4 flex-shrink-0"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white/80">运行机制</h3>
            <span className="text-xs text-white/30 font-mono">以 pptx skill 为例</span>
          </div>

          {/* Step indicator: 4 circles connected by lines */}
          <div className="flex items-center justify-between mb-4 px-2">
            {mechSteps.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => { setMechIdx(i); setIsPlaying(false) }}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 ${
                    i === mechIdx
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/40 scale-110'
                      : i < mechIdx
                        ? 'bg-purple-500/40 text-white/80'
                        : 'bg-white/10 text-white/40'
                  }`}
                >
                  {s.id}
                </button>
                {i < mechSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 transition-colors ${
                    i < mechIdx ? 'bg-purple-500/50' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step title + description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mechIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mb-3"
            >
              <h4 className="text-sm font-semibold text-purple-300 mb-1">
                Step {step.id}: {step.title}
              </h4>
              <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* Simulated code/content view */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mechIdx}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="flex-1 bg-black/40 rounded-xl p-3 font-mono text-xs overflow-y-auto min-h-0"
            >
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-white/30 text-[10px] ml-1">{step.visual.label}</span>
              </div>
              {step.visual.lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{ paddingLeft: `${(line.indent ?? 0) * 1.25}rem` }}
                  className={`leading-5 py-0.5 px-1 rounded ${
                    step.visual.highlight?.includes(i)
                      ? 'text-purple-200 bg-purple-500/10'
                      : 'text-white/40'
                  }`}
                >
                  {line.text || '\u00A0'}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-white/10">
            <button
              onClick={() => { setIsPlaying(false); setMechIdx(prev => (prev <= 0 ? mechSteps.length - 1 : prev - 1)) }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60 hover:bg-white/20 transition-colors"
            >
              ‹ 上一步
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                isPlaying ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
              }`}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              onClick={() => { setIsPlaying(false); advance() }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60 hover:bg-white/20 transition-colors"
            >
              下一步 ›
            </button>
          </div>
        </motion.div>

        {/* ── RIGHT: Essence cards + npm analogy ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 flex flex-col min-w-0 gap-3"
        >
          {/* Essence header */}
          <div className="glass rounded-2xl p-4">
            <h3 className="text-base font-semibold text-white/80 mb-1">Skill 补足 LLM 的「经验」</h3>
            <p className="text-xs text-white/40">说白了就是 prompt + scripts 组成的 package</p>
          </div>

          {/* 4 essence cards */}
          <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-0">
            {essences.map((e, i) => {
              const c = essenceColors[e.color]
              return (
                <motion.div
                  key={e.title}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className={`rounded-xl p-3 border ${c.bg} ${c.border} flex flex-col`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{e.icon}</span>
                    <h4 className={`font-semibold text-sm ${c.text}`}>{e.title}</h4>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed mb-1.5">{e.desc}</p>
                  <p className="text-white/40 text-[11px] leading-relaxed mt-auto italic">{e.example}</p>
                </motion.div>
              )
            })}
          </div>

          {/* npm analogy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-xl p-3"
          >
            <p className="text-xs text-white/50 leading-relaxed">
              <span className="text-pink-400 font-semibold">类比：</span>
              2009 年 Node.js 诞生前，前端代码是面条式的堆砌。npm 让 JS 用 package 组织起来后，直接促使了前端乃至互联网应用的大爆发。
            </p>
            <p className="text-pink-400 text-xs font-semibold mt-1">
              Skill = 新时代的 Code Package，是 AI 能力组织的最小单位。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
