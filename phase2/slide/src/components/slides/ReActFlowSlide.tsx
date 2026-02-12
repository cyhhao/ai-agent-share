import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'

// ── State Machine ─────────────────────────────────────────
// Layout (no crossing):
//   Top row:    [输入] → [LLM] → [判断] ──No──→ [结束]
//                          ↑        │Yes
//                        Loop       ↓
//                       [追加] ← [Tool]
type StateId = 'input' | 'llm' | 'tool_check' | 'end' | 'tool_exec' | 'append'

interface SMState {
  id: StateId
  label: string
  short: string
  color: string
  x: number // percentage 0-100
  y: number
}

const states: SMState[] = [
  { id: 'input',      label: 'System Prompt + 用户输入', short: '输入', color: 'cyan',   x: 10, y: 28 },
  { id: 'llm',        label: 'LLM 推理',                short: 'LLM',  color: 'purple', x: 36, y: 28 },
  { id: 'tool_check', label: '有 Tool Call?',            short: '判断',  color: 'yellow', x: 62, y: 28 },
  { id: 'end',        label: '返回最终回复',              short: '结束', color: 'orange', x: 88, y: 28 },
  { id: 'tool_exec',  label: '执行 Tool',                short: 'Tool', color: 'green',  x: 62, y: 76 },
  { id: 'append',     label: '结果追加到 Messages',       short: '追加', color: 'blue',   x: 36, y: 76 },
]

interface Edge { from: StateId; to: StateId; label?: string }
const edges: Edge[] = [
  { from: 'input',      to: 'llm' },
  { from: 'llm',        to: 'tool_check' },
  { from: 'tool_check', to: 'end',       label: 'No' },
  { from: 'tool_check', to: 'tool_exec', label: 'Yes' },
  { from: 'tool_exec',  to: 'append' },
  { from: 'append',     to: 'llm',       label: 'Loop' },
]

const stateById = Object.fromEntries(states.map(s => [s.id, s])) as Record<StateId, SMState>

// ── Demo scenario ─────────────────────────────────────────
interface DemoStep {
  state: StateId
  role: 'user' | 'assistant' | 'tool_call' | 'tool_result' | 'system'
  content: string
  highlight?: string
  toolCalls?: string[]  // tool call tags attached to this LLM message
}

const demoSteps: DemoStep[] = [
  { state: 'input',      role: 'user',        content: '帮我看下明天在北京穿什么' },
  { state: 'llm',        role: 'assistant',    content: '用户想知道穿什么，这取决于天气，我先查一下明天北京的天气。', toolCalls: ['get_weather(city="北京", date="明天")'] },
  { state: 'tool_check', role: 'system',       content: '检测到 tool_call → 进入工具执行', highlight: 'has_tool_call = true' },
  { state: 'tool_exec',  role: 'tool_call',    content: 'get_weather(city="北京", date="明天")', highlight: 'Tool Call' },
  { state: 'append',     role: 'tool_result',  content: '{ "temp": "3~12°C", "weather": "晴转多云", "wind": "北风3级" }', highlight: 'Tool Result' },
  { state: 'llm',        role: 'assistant',    content: '已获取天气：3~12°C 晴转多云。气温偏低，我再搜索一下适合这个温度的穿搭建议。', toolCalls: ['web_search(query="3~12度 晴转多云 穿搭推荐")'] },
  { state: 'tool_check', role: 'system',       content: '检测到 tool_call → 再次进入工具执行', highlight: 'has_tool_call = true' },
  { state: 'tool_exec',  role: 'tool_call',    content: 'web_search(query="3~12度 晴转多云 穿搭推荐")', highlight: 'Tool Call' },
  { state: 'append',     role: 'tool_result',  content: '建议内搭薄毛衣 + 外穿中长款风衣或轻羽绒，搭配围巾，注意早晚温差', highlight: 'Tool Result' },
  { state: 'llm',        role: 'assistant',    content: '天气和穿搭信息都齐了，可以给出最终回复。' },
  { state: 'tool_check', role: 'system',       content: '无 tool_call → 走向结束', highlight: 'has_tool_call = false' },
  { state: 'end',        role: 'assistant',    content: '明天北京 3~12°C，晴转多云，北风3级。\n\n推荐穿搭：内搭薄毛衣，外穿中长款风衣或轻羽绒服，搭配围巾，注意早晚温差大。' },
]

// ── Colors ────────────────────────────────────────────────
const colorMap: Record<string, { bg: string; border: string; glow: string; fill: string }> = {
  cyan:   { bg: 'bg-cyan-500/20',   border: 'border-cyan-500/60',   glow: 'rgba(0,212,255,0.4)',  fill: '#06b6d4' },
  purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/60', glow: 'rgba(168,85,247,0.4)', fill: '#a855f7' },
  yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/60', glow: 'rgba(234,179,8,0.4)',  fill: '#eab308' },
  green:  { bg: 'bg-green-500/20',  border: 'border-green-500/60',  glow: 'rgba(34,197,94,0.4)',  fill: '#22c55e' },
  blue:   { bg: 'bg-blue-500/20',   border: 'border-blue-500/60',   glow: 'rgba(59,130,246,0.4)', fill: '#3b82f6' },
  orange: { bg: 'bg-orange-500/20', border: 'border-orange-500/60', glow: 'rgba(249,115,22,0.4)', fill: '#f97316' },
}

const roleBadge: Record<string, { label: string; cls: string }> = {
  user:        { label: 'User',        cls: 'bg-cyan-500/30 text-cyan-300' },
  assistant:   { label: 'LLM',         cls: 'bg-purple-500/30 text-purple-300' },
  tool_call:   { label: 'Tool Call',   cls: 'bg-green-500/30 text-green-300' },
  tool_result: { label: 'Tool Result', cls: 'bg-blue-500/30 text-blue-300' },
  system:      { label: '状态判断',     cls: 'bg-yellow-500/30 text-yellow-300' },
}

// ── SVG helpers ───────────────────────────────────────────
const VB_W = 460
const VB_H = 200
const NODE_RX = 30  // half-width of rect node
const NODE_RY = 16  // half-height of rect node
const DIAMOND_R = 20

function toSvg(s: SMState) {
  return { cx: s.x / 100 * VB_W, cy: s.y / 100 * VB_H }
}

// ── Component ─────────────────────────────────────────────
export default function ReActFlowSlide() {
  const [stepIdx, setStepIdx] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(2200)
  const chatRef = useRef<HTMLDivElement>(null)

  const currentState = stepIdx >= 0 ? demoSteps[stepIdx].state : null
  const loopCount = stepIdx >= 0
    ? demoSteps.slice(0, stepIdx + 1).filter(s => s.state === 'append').length
    : 0

  const advance = useCallback(() => {
    setStepIdx(prev => (prev >= demoSteps.length - 1 ? 0 : prev + 1))
  }, [])

  const goBack = useCallback(() => {
    setStepIdx(prev => (prev <= 0 ? demoSteps.length - 1 : prev - 1))
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    if (stepIdx === -1) {
      const t = setTimeout(() => setStepIdx(0), 600)
      return () => clearTimeout(t)
    }
    const timer = setInterval(advance, speed)
    return () => clearInterval(timer)
  }, [isPlaying, stepIdx, advance, speed])

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [stepIdx])

  // ── Edge rendering ───────────────────────────────────
  // Determine the *active edge* precisely: it's the edge whose `to` matches current state
  // and whose `from` matches the previous step's state.
  const activeEdge = stepIdx > 0
    ? edges.find(e => {
        const prevState = demoSteps[stepIdx - 1]?.state
        return e.from === prevState && e.to === currentState
      }) ?? null
    : stepIdx === 0
      ? edges.find(e => e.to === 'input') ?? null
      : null

  function renderEdge(e: Edge, idx: number) {
    const from = stateById[e.from]
    const to = stateById[e.to]
    const a = toSvg(from)
    const b = toSvg(to)
    const isActive = activeEdge === e

    const isLoop = e.from === 'append' && e.to === 'llm'
    const isHoriz = Math.abs(a.cy - b.cy) < 5
    const isVert = Math.abs(a.cx - b.cx) < 5

    // Compute path with proper offsets from node edges
    let pathD: string
    if (isLoop) {
      // Left-side curve from append up to llm (both same x, different y)
      const startX = a.cx - NODE_RX
      const startY = a.cy
      const endX = b.cx - NODE_RX
      const endY = b.cy
      const bulge = -50
      pathD = `M ${startX} ${startY} C ${startX + bulge} ${startY}, ${endX + bulge} ${endY}, ${endX} ${endY}`
    } else if (isHoriz) {
      const dir = b.cx > a.cx ? 1 : -1
      // Start from edge of "from" node, end at edge of "to" node
      const fromR = e.from === 'tool_check' ? DIAMOND_R : NODE_RX
      const toR = e.to === 'tool_check' ? DIAMOND_R : NODE_RX
      pathD = `M ${a.cx + dir * fromR} ${a.cy} L ${b.cx - dir * toR} ${b.cy}`
    } else if (isVert) {
      const dir = b.cy > a.cy ? 1 : -1
      const fromR = e.from === 'tool_check' ? DIAMOND_R : NODE_RY
      const toR = e.to === 'tool_check' ? DIAMOND_R : NODE_RY
      pathD = `M ${a.cx} ${a.cy + dir * fromR} L ${b.cx} ${b.cy - dir * toR}`
    } else {
      pathD = `M ${a.cx} ${a.cy} L ${b.cx} ${b.cy}`
    }

    // Label position
    let labelX = (a.cx + b.cx) / 2
    let labelY = (a.cy + b.cy) / 2 - 8
    if (isLoop) { labelX = a.cx - NODE_RX - 50; labelY = (a.cy + b.cy) / 2 + 4 }
    if (isVert && e.label) { labelX += 14 }

    return (
      <g key={idx}>
        <path
          d={pathD}
          fill="none"
          stroke={isActive ? '#a78bfa' : 'rgba(255,255,255,0.18)'}
          strokeWidth={isActive ? 2.5 : 1.5}
          strokeDasharray={isLoop ? '6,3' : undefined}
          markerEnd={isActive ? 'url(#arrowAct)' : 'url(#arrow)'}
          className="transition-all duration-500"
        />
        {e.label && (
          <text x={labelX} y={labelY} textAnchor="middle"
            className={`text-[10px] font-semibold ${isActive ? 'fill-purple-300' : 'fill-white/35'}`}>
            {e.label}
          </text>
        )}
      </g>
    )
  }

  // ── Node rendering ──────────────────────────────────
  function renderNode(s: SMState) {
    const c = toSvg(s)
    const isActive = currentState === s.id
    const cm = colorMap[s.color]
    const isDiamond = s.id === 'tool_check'

    return (
      <g key={s.id}>
        {isActive && (
          <circle cx={c.cx} cy={c.cy} r={28} fill={cm.glow} opacity={0.35}>
            <animate attributeName="r" values="26;32;26" dur="1.5s" repeatCount="indefinite" />
          </circle>
        )}
        {isDiamond ? (
          <g transform={`translate(${c.cx},${c.cy}) rotate(45)`}>
            <rect x={-DIAMOND_R * 0.78} y={-DIAMOND_R * 0.78}
              width={DIAMOND_R * 1.56} height={DIAMOND_R * 1.56} rx={3}
              fill={isActive ? cm.fill : 'rgba(255,255,255,0.08)'}
              stroke={isActive ? cm.fill : 'rgba(255,255,255,0.25)'}
              strokeWidth={isActive ? 2 : 1}
              className="transition-all duration-500"
            />
          </g>
        ) : (
          <rect
            x={c.cx - NODE_RX} y={c.cy - NODE_RY}
            width={NODE_RX * 2} height={NODE_RY * 2} rx={8}
            fill={isActive ? cm.fill : 'rgba(255,255,255,0.08)'}
            stroke={isActive ? cm.fill : 'rgba(255,255,255,0.25)'}
            strokeWidth={isActive ? 2 : 1}
            className="transition-all duration-500"
          />
        )}
        <text x={c.cx} y={c.cy + 1} textAnchor="middle" dominantBaseline="middle"
          className={`text-[11px] font-bold ${isActive ? 'fill-white' : 'fill-white/60'}`}>
          {s.short}
        </text>
        <text x={c.cx} y={c.cy + 24} textAnchor="middle"
          className={`text-[7.5px] ${isActive ? 'fill-white/70' : 'fill-white/25'}`}>
          {s.label}
        </text>
      </g>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-lg text-purple-400 font-medium mb-1">重新认识 Agent</h2>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">ReAct 主流程</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex gap-5 min-h-0">
        {/* ── LEFT: State Machine ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="w-[44%] flex flex-col glass rounded-2xl p-4 flex-shrink-0"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-white/80">状态机</h3>
            {loopCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                Loop {loopCount}
              </span>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center">
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto max-h-full">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.25)" />
                </marker>
                <marker id="arrowAct" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#a78bfa" />
                </marker>
              </defs>
              {edges.map((e, i) => renderEdge(e, i))}
              {states.map(s => renderNode(s))}
            </svg>
          </div>

          {/* Controls row 1: play/speed/reset */}
          <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-white/10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                isPlaying ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              }`}
            >
              {isPlaying ? '⏸ 暂停' : '▶ 播放'}
            </button>
            <button
              onClick={() => setSpeed(s => s === 2200 ? 1200 : s === 1200 ? 3200 : 2200)}
              className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/60 hover:bg-white/20 transition-colors"
            >
              {speed === 1200 ? '⚡ 快速' : speed === 3200 ? '🐢 慢速' : '⏱ 正常'}
            </button>
            <button
              onClick={() => { setStepIdx(0); setIsPlaying(true) }}
              className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/60 hover:bg-white/20 transition-colors"
            >
              ↺ 重置
            </button>
          </div>

          {/* Controls row 2: step buttons */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              onClick={() => { setIsPlaying(false); goBack() }}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/70 hover:bg-white/20 active:bg-white/30 transition-colors"
            >
              ‹ 上一步
            </button>
            <span className="text-xs text-white/30 font-mono min-w-[5rem] text-center">
              {Math.max(0, stepIdx + 1)} / {demoSteps.length}
            </span>
            <button
              onClick={() => { setIsPlaying(false); advance() }}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/70 hover:bg-white/20 active:bg-white/30 transition-colors"
            >
              下一步 ›
            </button>
          </div>
        </motion.div>

        {/* ── RIGHT: Chat Demo ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="flex-1 flex flex-col glass rounded-2xl p-4 min-w-0"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white/80">
              场景演示
              <span className="text-xs text-white/40 font-normal ml-2">「明天在北京穿什么」</span>
            </h3>
            <span className="text-xs text-white/30 font-mono">
              Step {Math.max(0, stepIdx + 1)} / {demoSteps.length}
            </span>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0 max-h-[45vh] scrollbar-thin">
            <AnimatePresence initial={false}>
              {demoSteps.slice(0, Math.max(0, stepIdx + 1)).map((step, i) => {
                const badge = roleBadge[step.role]
                const cm = colorMap[stateById[step.state].color]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className={`rounded-xl p-3 border ${
                      i === stepIdx ? `${cm.bg} ${cm.border}` : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.cls}`}>
                        {badge.label}
                      </span>
                      {step.highlight && (
                        <span className="text-xs text-white/40 font-mono">{step.highlight}</span>
                      )}
                      <span className="text-xs text-white/20 ml-auto font-mono">#{i + 1}</span>
                    </div>
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                      step.role === 'tool_call' || step.role === 'tool_result'
                        ? 'font-mono text-green-300/90' : 'text-white/80'
                    }`}>
                      {step.content}
                    </p>
                    {step.toolCalls && step.toolCalls.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {step.toolCalls.map((tc, ti) => (
                          <span key={ti} className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-md bg-green-500/15 border border-green-500/30 text-green-400">
                            <span className="text-green-500/70">&#9654;</span>
                            {tc}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {stepIdx < 0 && (
              <div className="flex items-center justify-center h-full text-white/30 text-sm">
                即将开始演示...
              </div>
            )}
          </div>

          <div className="mt-2 pt-2 border-t border-white/10 text-xs text-white/40 flex items-center gap-4">
            <span>共 <b className="text-white/60">{demoSteps.filter(s => s.state === 'llm').length}</b> 次 LLM 调用</span>
            <span>共 <b className="text-white/60">{demoSteps.filter(s => s.state === 'tool_exec').length}</b> 次 Tool 调用</span>
            <span>共 <b className="text-white/60">{demoSteps.filter(s => s.state === 'append').length}</b> 轮 Loop</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
