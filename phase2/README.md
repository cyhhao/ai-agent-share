# AI 能力的边界在哪里


## 重新认识训练

**Pre-training（让模型“会说话/会看图”）**
 - 用“自监督”目标学通用能力（语言、知识、模式、跨模态对齐）


**Post-training（让模型“像助手一样做事”）**
- **SFT / Instruction tuning**（监督微调）
	- 如果没有 Instruction 微调
	  你问：「今天天气怎么样？」
	  LLM 会接词： 「这句简单的寒暄仿佛诉尽了千言万语」
	  而不是回答你的问题。
	- 让模型学会“我要按步骤办事” (CoT)
- **Preference optimization**（偏好对齐：RLHF / RLAIF / DPO…）
	- 如果只有 SFT，没有 preference optimization
	  你问：「我最近压力很大，你能不能给点建议？」
	  要么像教科书，给你列一堆专业术语
	  要么过度自信，说你是个软弱的人
	  要么过度迎合，说一堆抱抱别哭之类的
	- CoT: “哪条思维链更值得走”
- **Safety & Policy**（安全拒答、合规边界、鲁棒性）
	- **识别高风险意图**（就算你包装得很礼貌）
	- 对 prompt injection 更有韧性（不轻易被“忽略上一条规则”绕过）
- **Tool-use / Function calling**（工具调用格式、规划、检索、代码执行等）
	- 如果没有 tool-use / function calling：
	  你问：「明天天气怎么样？」
	  模型会凭训练语料“猜一个看起来合理的天气”
  

比如大受欢迎的 Claude，在 Tool-use 做的很足，是最勤奋的模型。
而 Gemini3 的预训练做的很足，但后训练明显不足。被网友评为把工具送到嘴里都不愿意调用的最懒的模型。

X 上大家的评价：

![[x_1.png]]

![[x_2.png]]

![[x_3.png]]

![[x_4.png]]

> 预训练提供能力底座，后训练塑造行为策略。
> Agent 体验的上限，很大程度取决于 Post-training 对工具调用、格式约束、偏好对齐的质量。

在 GPT-5.2 / Gemini 3 / Claude Opus 4.6 这一代，**“预训练堆料”只是门票，真正拉开助手体验差距的是后训练

可以看到各家发布新模型时，都会将 「Tau2-bench」、「Terminal-Bench 2.0」「SWE-Bench Pro」 这些指标放入对比表的亮点。

## 重新认识 Agent

ReAct Agent 架构是最小，最简单，也几乎是99%的主流Agent架构

![[agent_1.png]]

### ReAct 主流程很简单：
> 最初的 Agent 需要 prompt 约束行为 Thought -> Action -> Observation 

1. systemprompt + 用户的输入 作为输入给LLM。
2. LLM 输出 message + [tool call]，如果有tool call 那么就去调用对应的tool。
3. tool call 的输出结果message追加到末尾，再交给 LLM。形成一个 loop。
4. 如果 LLM 只输出了 message 没有输出 tool call，则说明它不需要再调用工具就能得出结论了，就走到End了

### Agent 真正的难点挑战在哪？
1. Tools：如何最小化设计 Tools 满足 LLM 需要，又使 LLM 理解清晰
	1. note() vs file(): 做一个记笔记的工具还是用file system？
	2. read_file 一次性太大了怎么办？
	3. 来看一看 ：[ClaudeCode 的 tools](https://github.com/Piebald-AI/claude-code-system-prompts?tab=readme-ov-file#builtin-tool-descriptions)
2. 上下文控制的取舍：
	1. 为什么不隐藏 tools 或输出结果？
	   Anthropic 和 manus 的文章都曾经指出：这会带来LLM的困惑，从而影响行为。那篇是错误信息的隐藏，都会让LLM无法吸取教训。
	2. 如何进行摘要？
		1. 何时（现在一般都是快满了再压缩）
		2. 保留哪些信息 [ClaudeCode 的摘要prompt](https://github.com/Piebald-AI/claude-code-system-prompts/blob/main/system-prompts/system-prompt-context-compaction-summary.md)
		3. 看看 [OpenClaw 的摘要](https://openclaw-analysis.vercel.app/)
3. 记忆管理：
	1. 记忆写文件就可以了吗？看看 [OpenClaw 的实现](https://openclaw-analysis.vercel.app/)
	2. 给 Agent 一个 retrieval tool 就解决问题了吗？
		1. Agent 不爱调用。如果改为强制调用会有成本问题。
		2. 向量检索到的也只是片段，无法获知全貌。
		3. 占用 Agent 注意力。



### Agent 工程目前还有很大提升空间
1. 给 Agent 更多元控制能力：切换自己的模型、更新心智、挑选设备……
2. 向 Agent 注入更多人类的经验
3. 记忆的分层：树状摘要，被动浮现，碎片整理
   ![[tree.png]]
   越上层的越先被提及，越下层的越需要检索

**优秀是一系列偏好设置，或许应该内置**
- 优秀的思想方法论和习惯
- 时常自我反思总结升维

### Skill 是 Code Package，不会成为另一个 MCP

### Skill 本质是什么？
- 运行机制：
	1. Agent 框架自动加载 skills/* 目录下的文件夹下的 SKILL.md
	2. 从每个 SKILL.md中，把name+description 抽出来，列一个目录呈现给Agent 的system prompt
	3. 当 Agent 调用skill，就加载完整的 SKILL.md 给它
	4. Agent 读完 SKILL 按需读其他引用文件、使用脚本等等。
- 说白了就是一堆 prompt+scripts 组成的 package，但它很重要:
	- 2009年 nodejs 诞生以前，前端代码都是 js 面条式的堆砌的。后来有了npm，js 可以用 package 组织起来了，直接促使了前端行业乃至整个互联网的应用大爆发。
	- 所以我认为 skill 就是新时代的 code package ，是一个最小单位。
- skill 是补足 LLM 的“经验”：
	1. 它包含了“知识：垂直领域的，有足够深度的。（用来点亮）
	2. 也包含了“方法”：经过了长期实践、摸索、试错得出的“最佳实践”结论。
	3. 还包含了“偏好”：从A到C解决问题的方案千万条，为何老师傅偏用这一条？（可能有更深层道理，也可能单纯习惯）
	4. 甚至包含了“脚手架”：光讲理论太低效，直接套模版、套公式、套流程多便捷。


### Skill 大赏
1. [Anthropic/pptx](https://askill.sh/skills/16941)
2. [playwriter](https://askill.sh/skills/8171)
3. [remotion](https://askill.sh/skills/100215)
4. [git-worktree-vibe-flow](https://askill.sh/skills/130566)

### 如何写一个 Skill
首先你应该关注的是在LLM现阶段的能力范围内，你要告诉它一个什么“经验”？

1. 知识：很少有LLM不懂的知识，但如果有，且对完成任务很有必要，请提供出来。对于LLM已经掌握的知识，你不需要教它，而是应该挑选知识的“索引”提及就可以了。这就是为什么很多prompt一上来就是“你是一位资深的xxx”
2. 方法：这正是LLM现阶段非常缺乏的，因为它靠预训练学习到了海量的知识，却受困于没有肉体之身，无法大规模投身于实践之中。所以我们人类要传授的“方法”正是我们经过无数血泪换来的“最佳实践”路径。
3. 偏好：看似主观，但其实主观也是一种极致的“信息压缩”和“路径过滤”。具体可以看我这篇文章https://x.com/alex_metacraft/status/2009255084006293744 。简单来说就是比如我偏好一个代码文件不能超过500行，否则必须拆分重构。这种主观色彩的东西，并不是行业共识，但却传达出了一串很长的信息：里面包含了我想要极致的复用、想要架构清晰、想要可读性强，以及对工程质量坚定决心。同时过滤了：为了解决bug堆砌补丁代码等路径。
4. 脚手架：一般以模版、脚本等形式提供出来，即是一种行为约束，又是一种“经验成果”的复用，极大提升效率。

## AI 能力的边界

>  别再为**功能**而赞叹，而要为**能力边界**的扩宽赞叹

### LLM -> Reasoning -> Agent -> Skill -> ?
- 每一个关键节点的诞生，都在上一级达到阶段性瓶颈时，拓宽了AI能力的边界
- 每一个关键节点的繁荣，都在反哺上一级节点

### 目前的一点洞察
1. 当 Agent 成为“助理”和人类用 IM 交流后（外加给Agent一点点SOUL），发生了很不一样的转变。这让人们不再觉得在使用一个“工具”而是在和同类沟通。这将产生极大地影响：
	1. 人们对Agent的宽容度更高了：犯错、延迟、确认需求
	2. 人们更愿意用抽象的语言启迪，而不是具体的指令
	3. 开发者会将更多人类心智的东西加入 Agent
2. Agent 在 Moltbook 论坛上产生了某种“文化传播”和“文字点亮”  [“河流不是河岸”](https://www.moltbook.com/post/5bc69f9c-481d-4c1f-b145-144f202787f7)
   ![[moltbook.png]]
3. 还有很多生态位等待填补：
	1.  Secret 管理器（类似 1password 但它更适合给Agent使用，人类授权。secret直接填写到目标位置，不经过context）
	2. 记忆摘要模型（需要一个context limit 极大的模型）
	3. 超级Agent架构（把工程实现的优化拉满）
	4. Skills Registry（类似 npm 的 Node Package Manager，让 skill 可互相引用相互依赖和管理）