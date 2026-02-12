import { motion } from 'framer-motion'

const skills = [
  {
    name: 'Anthropic/pptx',
    url: 'https://askill.sh/skills/16941',
    description: 'PowerPoint 生成与编辑',
    annotation: '让 Agent 像设计师一样创建专业演示文稿，内含模板、样式与排版规则',
    color: 'cyan',
  },
  {
    name: 'playwriter',
    url: 'https://askill.sh/skills/8171',
    description: '浏览器自动化与测试',
    annotation: '让 Agent 直接操控浏览器，进行端到端自动化测试和网页交互',
    color: 'purple',
  },
  {
    name: 'remotion',
    url: 'https://askill.sh/skills/100215',
    description: '视频编程与生成',
    annotation: '让 Agent 通过编程方式生成视频，结合React组件实现复杂动画',
    color: 'pink',
  },
  {
    name: 'git-worktree-vibe-flow',
    url: 'https://askill.sh/skills/130566',
    description: 'Git 工作流优化',
    annotation: '标准化的 Git 工作流 SOP，让 Agent 并行开发多个功能分支',
    color: 'green',
  },
]

export default function SkillShowcaseSlide() {
  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-cyan-400 font-medium mb-2">精选案例</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text-blue">Skill 大赏</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex items-center">
        <div className="w-full grid md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <motion.a
              key={skill.name}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`glass rounded-xl p-6 block hover:bg-white/10 transition-all cursor-pointer group relative overflow-hidden`}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                skill.color === 'cyan' ? 'bg-cyan-500/10' :
                skill.color === 'purple' ? 'bg-purple-500/10' :
                skill.color === 'pink' ? 'bg-pink-500/10' : 'bg-green-500/10'
              }`} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-semibold ${
                    skill.color === 'cyan' ? 'text-cyan-400' :
                    skill.color === 'purple' ? 'text-purple-400' :
                    skill.color === 'pink' ? 'text-pink-400' : 'text-green-400'
                  }`}>
                    {skill.name}
                  </h3>
                  <svg 
                    className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                
                <p className="text-white/60 text-base mb-2">{skill.description}</p>
                <p className="text-white/40 text-sm mb-4 leading-relaxed">{skill.annotation}</p>
                
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    skill.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                    skill.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                    skill.color === 'pink' ? 'bg-pink-500/20 text-pink-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    askill.sh
                  </span>
                  <span className="text-white/40 text-xs">点击查看详情</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
