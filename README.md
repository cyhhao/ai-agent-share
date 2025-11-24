# AI Agent分享

# 用AI = 用人 ≠ 用工具

虽然我用了很多也开发过一些Agent，但没有形成一个完美成熟Agent工作体系。因为：

1. 目前AI发展很快，没有哪家的模型是全方位突出。所以不能完全依赖某一家的生态。
2. Agent是一个复杂的工程问题，目前有一些业界共识的思路，但还远称不上有Agent工作的最佳实践方案。

所以我认为当下这个阶段最重要的，不是学习什么Agent使用技巧，这样只会固化你的工作流/工作模式，让你好不容易习得的工作框架很快被淘汰。

当下更应该做的是：转变自己的思维方式，主动地 **跨越鸿沟 。**培养AI时代的工作生活习惯。

这个思维方式用标题上的这一句话就可以概括。

## 1. 学会挑人（面试模型）

### 看榜（分数）

- Humanity’s Last Exam (HLE)  - 终极学术考试，人类专家需要认真算、查资料才能答；当前所有前沿模型的准确率都很低。
- MMLU-Pro  - 考验多模态
- AIME 2025 - 完全不考知识记忆，只考数学解题
- SWE-bench - 真实开源项目里自动修 bug

有一个汇总较全的网站供参考：[https://artificialanalysis.ai/evaluations](https://artificialanalysis.ai/evaluations)

### 看评价（口碑）

一个好的测试分数往往只代表模型的预训练好，但实际使用往往有体感差异。这时候靠人类的感受，有一个业界比较专业的网站：[https://lmarena.ai/leaderboard](https://lmarena.ai/leaderboard)  通过双盲PK测试来排名。

另外在 Twitter 上多刷一些AI相关的博主，也能很快感知到大家对模型的评价。

用户会用脚投票，比如 GPT5 出来的时候，也没能完全动摇从 Claude Code迁移到Codex，而GPT5-codex 发布后，有不少人都迁到Codex了。我尝试了一下，确实更强也立马切了。

### 亲测（实习期）

以下是我心目中的 SOTA(state-of-the-art) model 表：

| 文科（写文章） | 理科（研究） | 后端开发 | 前端开发 | 视觉 | 音乐 | 视频 |
| --- | --- | --- | --- | --- | --- | --- |
| gemini3-pro | GPT5.1-high | GPT5.1-codex-max | gemini3-pro | gemini3-pro-image (nanobanana2) | Suno V5 | kling2.5 = veo3.1 > Sora2 |

### 铁律

智能无法叠加，每个场景下，只用当前**最好**的**。个人非商业用途，永远不要用中庸的模型。**

因为你用1/10的价格，换来超过10次的对话，浪费了10倍的时间，却换不来一次跑通，是血亏的。

而且一定要保持开启 Thinking 并开到最高 High 模式，永不使用Auto，我认为不在乎多等一会儿。

### 为什么要自研Agent？

- 模型 SOTA 随时会变，不要被模型厂锁死
- 各家官方的Agent、CLI 能力参差不齐

（我了解到很多人是用GPT讨论方案，用Claude执行，用Gemini写前端）

但可惜的是各家的Agent 都是套餐最划算

## 2. 重构角色

- 你的职责不是告诉AI每一步怎么做，而是定义清楚“为什么”和”做什么“。
举例1 - 我的文档 SubAgent
举例2 - ClaudeCode&Codex 的 init指令

- 重塑习惯：像对伙伴一样讲话
举例1 - 坦诚一点，说原因，说目的
    
    ![image.png](assets/image.png)
    
    举例2 - 激发思考而非指令，先计划，落地文档，再实施
    
    ![image.png](assets/image%201.png)
    

- 高屋建瓴：多谈思路，少讲步骤
示例 - 我的合约审计Agent
- 保持耐心，别过早定性而放弃

## 3. 成就他人，助力Agent完成反馈闭环

- 给它权限：mcp
示例1 - 我开发的 dev-mcp
示例2 - chrome 官方的 MCP（自动化前端测试）
- 跨过鸿沟：试着一行代码都不写
一开始会有点“阵痛”（感觉没有以前效率高，感到挫败），但这是强迫自己跨出去必须经历的。
- 停下来想想它不知道什么，问问它在想什么，让它自己总结。
    
    ![image.png](assets/image%202.png)
    
    然后进一步，让它自己将要求、偏好总结出来。
    
    ![image.png](assets/image%203.png)
    

## 4. 优化沟通，为自己提效（会说多说点）

- 语音转文字：wisperflow、闪电说
- 利用多模态
- slack bot：走到哪里都能遥控Agent。这里推荐我的开源项目 https://github.com/cyhhao/vibe-remote

# 通向AGI之路

## 为什么模型厂商都这么注重编程能力？

因为我认为Coding是“硅基数字生物”在现实世界解决问题的“元能力”

- 上下文管理是必经之路 → 最佳实践是文件系统 → Agent Context 自我管理
- 参与现实需要大量手脚（tools) → 在实践中按需创造 tools → Agent Tools 自我打造

## 我们如何渐进式地适应那个终点

- 让Agent成为伙伴，而非工具
- 暂时让自己成为桥梁（手动管理context： SubAgent、Skill，打造工具：MCP、CLI）
    
    ![image.png](assets/image%204.png)
    
- 等待模型升级 + Agent工程的探索演进（也可以自己参与其中）