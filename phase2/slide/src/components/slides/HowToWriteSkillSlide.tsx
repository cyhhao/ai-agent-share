import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Section {
  id: string
  num: string
  title: string
  subtitle: string
  color: string
  paragraphs: string[]
  tip: string | null
  doList: string[]
  dontList: string[]
  example: { label: string; code: string }
  link?: { text: string; url: string }
}

const sections: Section[] = [
  {
    id: 'knowledge',
    num: '01',
    title: '知识',
    subtitle: '点亮 LLM 的盲区',
    color: 'cyan',
    paragraphs: [
      '很少有 LLM 不懂的知识，但如果有，且对完成任务很有必要，请提供出来。',
      '对于 LLM 已经掌握的知识，你不需要教它，而是应该挑选知识的"索引"提及就可以了。',
    ],
    tip: '这就是为什么很多 prompt 一上来就是"你是一位资深的 xxx" —— 这不是在教知识，而是在激活正确的知识索引。',
    doList: [
      '提供 LLM 训练数据中不太有的垂直领域知识',
      '提供最新版本的 API 变更、参数说明',
      '用"索引"而非"教学"方式唤醒已有知识',
    ],
    dontList: [
      '重复教 LLM 已经知道的基础知识',
      '写成教科书式的长篇教程',
    ],
    example: {
      label: 'SKILL.md 片段',
      code: '# 你是一位资深的 python-pptx 开发者\n\n## 关键 API 变化 (v0.6.23+)\n- Slide.shapes.add_chart() 新增 chart_style 参数\n- 图片插入改用 add_picture(image_path, left, top)',
    },
  },
  {
    id: 'method',
    num: '02',
    title: '方法',
    subtitle: 'LLM 最缺的东西',
    color: 'purple',
    paragraphs: [
      '这正是 LLM 现阶段非常缺乏的。它靠预训练学到了海量知识，却受困于没有肉体之身，无法大规模投身于实践。',
      '我们人类要传授的"方法"正是经过无数血泪换来的"最佳实践"路径。',
    ],
    tip: 'LLM 有知识但缺实践 —— 它知道一百种排序算法，但不知道生产环境中该用哪种、踩过什么坑。',
    doList: [
      '总结经过验证的 step-by-step 工作流',
      '标注常见的坑和 workaround',
      '给出"先做 A 再做 B"的明确顺序',
    ],
    dontList: [
      '只讲"是什么"不讲"怎么做"',
      '给出多条等价路径却不指明推荐',
    ],
    example: {
      label: 'SKILL.md 片段',
      code: '## 工作流程（严格按顺序）\n1. 先创建母版 Slide Layout，定义占位符\n2. 再基于母版批量生成内容页\n3. 最后统一调整字号和配色\n\n⚠️ 不要逐页硬编码样式，后期维护成本极高',
    },
  },
  {
    id: 'preference',
    num: '03',
    title: '偏好',
    subtitle: '极致的信息压缩与路径过滤',
    color: 'pink',
    paragraphs: [
      '看似主观，但其实主观也是一种极致的"信息压缩"和"路径过滤"。',
      '比如我偏好一个代码文件不能超过 500 行，否则必须拆分重构。这并不是行业共识，但传达了很长的信息：',
    ],
    tip: null,
    doList: [
      '极致的复用 → 想要架构清晰',
      '可读性强 → 对工程质量的坚定决心',
    ],
    dontList: [
      '为了解决 bug 而堆砌补丁代码',
      '不拆分、不重构的"能跑就行"心态',
    ],
    example: {
      label: 'SKILL.md 片段',
      code: '## 偏好约束\n- 单文件不超过 500 行，超出必须拆分重构\n- 优先使用组合而非继承\n- 所有 public API 必须有 JSDoc 注释\n- 禁止 any 类型，用 unknown + 类型守卫',
    },
    link: {
      text: '关于"偏好即信息压缩"的更多思考',
      url: 'https://x.com/alex_metacraft/status/2009255084006293744',
    },
  },
  {
    id: 'scaffold',
    num: '04',
    title: '脚手架',
    subtitle: '经验成果的直接复用',
    color: 'green',
    paragraphs: [
      '一般以模版、脚本等形式提供出来，既是一种行为约束，又是一种"经验成果"的复用，极大提升效率。',
      '脚手架让 Agent 不需要"从零开始想"，而是"在框架内发挥"。',
    ],
    tip: '好的脚手架 = 约束 + 自由的平衡。约束太多则僵化，太少则混乱。',
    doList: [
      '提供可直接套用的模版文件',
      '提供自动化脚本（构建、检查、部署）',
      '定义清晰的输入→输出契约',
    ],
    dontList: [
      '只有抽象描述没有可执行的模版',
      '脚手架过于死板，不留弹性空间',
    ],
    example: {
      label: 'Skill 目录结构',
      code: '📁 my-skill/\n  📄 SKILL.md          # 核心指令\n  📄 template.py       # 生成脚本\n  📄 layout.json       # 布局配置\n  📄 check.sh          # 质检脚本\n  📁 examples/          # 示例输出',
    },
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string; tabActive: string }> = {
  cyan:   { bg: 'bg-cyan-500/8',   border: 'border-cyan-500/25',   text: 'text-cyan-400',   badge: 'bg-cyan-500/20',   tabActive: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' },
  purple: { bg: 'bg-purple-500/8', border: 'border-purple-500/25', text: 'text-purple-400', badge: 'bg-purple-500/20', tabActive: 'bg-purple-500/20 border-purple-500/50 text-purple-300' },
  pink:   { bg: 'bg-pink-500/8',   border: 'border-pink-500/25',   text: 'text-pink-400',   badge: 'bg-pink-500/20',   tabActive: 'bg-pink-500/20 border-pink-500/50 text-pink-300' },
  green:  { bg: 'bg-green-500/8',  border: 'border-green-500/25',  text: 'text-green-400',  badge: 'bg-green-500/20',  tabActive: 'bg-green-500/20 border-green-500/50 text-green-300' },
}

export default function HowToWriteSkillSlide() {
  const [activeId, setActiveId] = useState('knowledge')
  const active = sections.find(s => s.id === activeId)!
  const c = colorClasses[active.color]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <h2 className="text-lg text-green-400 font-medium mb-1">实践指南</h2>
        <h1 className="text-3xl md:text-4xl font-bold mb-1">
          <span className="gradient-text">如何写一个 Skill</span>
        </h1>
        <p className="text-white/50 text-sm">
          首先你应该关注的是：在 LLM 现阶段的能力范围内，你要告诉它一个什么<span className="text-white/80 font-medium">「经验」</span>？
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {sections.map((s, i) => {
          const sc = colorClasses[s.color]
          const isActive = s.id === activeId
          return (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              onClick={() => setActiveId(s.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                isActive
                  ? sc.tabActive
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
              }`}
            >
              <span className="opacity-50 mr-1.5 font-mono text-xs">{s.num}</span>
              {s.title}
            </motion.button>
          )
        })}
      </div>

      {/* Active tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={`flex-1 min-h-0 rounded-2xl border ${c.border} ${c.bg} p-5 flex flex-col`}
        >
          {/* Section header */}
          <div className="flex items-baseline gap-3 mb-3">
            <span className={`text-2xl font-black ${c.text} opacity-40 font-mono`}>{active.num}</span>
            <h3 className={`text-xl font-bold ${c.text}`}>{active.title}</h3>
            <span className="text-white/40 text-sm">— {active.subtitle}</span>
          </div>

          {/* Content: left text + right code */}
          <div className="flex gap-5 flex-1 min-h-0">
            {/* Left */}
            <div className="flex-1 min-w-0 space-y-3 overflow-y-auto">
              {/* Paragraphs */}
              <div className="space-y-1.5">
                {active.paragraphs.map((p, i) => (
                  <p key={i} className="text-white/70 text-sm leading-relaxed">{p}</p>
                ))}
              </div>

              {/* Tip */}
              {active.tip && (
                <div className={`p-2.5 rounded-lg ${c.badge} border ${c.border}`}>
                  <p className="text-white/60 text-xs leading-relaxed">
                    <span className={`${c.text} font-semibold`}>Tip: </span>{active.tip}
                  </p>
                </div>
              )}

              {/* Do / Don't */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-green-400/80 text-[10px] font-bold uppercase tracking-wider mb-1.5">Do</p>
                  <ul className="space-y-1">
                    {active.doList.map((item, i) => (
                      <li key={i} className="text-white/60 text-xs leading-relaxed flex items-start gap-1.5">
                        <span className="text-green-400 mt-0.5 flex-shrink-0">+</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-red-400/80 text-[10px] font-bold uppercase tracking-wider mb-1.5">Don't</p>
                  <ul className="space-y-1">
                    {active.dontList.map((item, i) => (
                      <li key={i} className="text-white/40 text-xs leading-relaxed flex items-start gap-1.5">
                        <span className="text-red-400 mt-0.5 flex-shrink-0">-</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Link */}
              {active.link && (
                <a
                  href={active.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 ${c.text} hover:opacity-80 text-xs`}
                >
                  <span>{active.link.text}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>

            {/* Right: code example */}
            <div className="w-[42%] flex-shrink-0">
              <div className="bg-black/40 rounded-xl p-3 font-mono text-xs h-full overflow-y-auto">
                <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-white/10">
                  <div className="w-2 h-2 rounded-full bg-red-500/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <div className="w-2 h-2 rounded-full bg-green-500/70" />
                  <span className="text-white/25 text-[10px] ml-1">{active.example.label}</span>
                </div>
                {active.example.code.split('\n').map((line, i) => (
                  <div
                    key={i}
                    className={`leading-5 py-0.5 ${
                      line.startsWith('#') || line.startsWith('##')
                        ? `${c.text} font-semibold`
                        : line.startsWith('⚠️') || line.startsWith('-')
                          ? 'text-white/60'
                          : line.startsWith('📁') || line.startsWith('  📄') || line.startsWith('  📁')
                            ? 'text-white/50'
                            : 'text-white/45'
                    }`}
                    style={{ paddingLeft: line.startsWith('  ') ? '1rem' : undefined }}
                  >
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
