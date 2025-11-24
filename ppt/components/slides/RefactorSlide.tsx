import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, AlertCircle } from 'lucide-react';

const ChatBubble = ({ role, content, isThinking }: { role: 'user' | 'bot', content: React.ReactNode, isThinking?: boolean }) => (
  <div className={`flex gap-3 mb-6 ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
    {role === 'bot' && (
      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
        <Bot size={16} className="text-white" />
      </div>
    )}
    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
      role === 'user' 
        ? 'bg-blue-600 text-white rounded-tr-none' 
        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
    }`}>
      {isThinking && (
        <div className="text-xs text-slate-400 mb-2 font-mono flex items-center gap-2 border-b border-slate-100 pb-2">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
          Thinking Process (High Mode)
        </div>
      )}
      {content}
    </div>
    {role === 'user' && (
      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
        <User size={16} className="text-slate-500" />
      </div>
    )}
  </div>
);

const RefactorSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col p-4 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900">2. 重构角色</h2>
        <p className="text-slate-500 mt-2">你的职责不是告诉 AI 每一步怎么做，而是定义清楚 <span className="text-blue-600 font-bold">“为什么”</span> 和 <span className="text-indigo-600 font-bold">“做什么”</span>。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[60vh]">
        {/* Scenario 1: The Honest Context */}
        <motion.div 
          className="bg-slate-50 rounded-xl border border-slate-200 flex flex-col overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white p-3 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">Claude Code - Session 42</span>
            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100 font-bold">Thinking: High</span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto scrollbar-hide bg-slate-50">
            
            <ChatBubble 
              role="user" 
              content={
                <div>
                  <p className="mb-2 font-semibold text-blue-100">坦诚一点，说原因，说目的：</p>
                  <p>因为 <code>langgraph-api</code> 的docker镜像生产级 self-host 部署需要企业 license <span className="underline decoration-white decoration-wavy">我买不起</span>。</p>
                  <p className="mt-2">所以我决定不用它官方的镜像了，而是把 <code>langgraph_api</code> 集成进项目里。</p>
                  <p className="mt-2 border-t border-blue-400/30 pt-2">所以接下来你帮我把整个部署流程重构一下，看看怎么重写。</p>
                </div>
              } 
            />

            <ChatBubble 
              role="bot" 
              isThinking={true}
              content={
                <div>
                  <p>明白了。既然有成本限制，我们需要从官方企业级镜像转向本地集成方案。</p>
                  <p className="mt-2 text-indigo-600 font-semibold">重构思路：</p>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-600">
                    <li>分析 Dockerfile 依赖。</li>
                    <li>本地构建 <code>langgraph_api</code>。</li>
                    <li>修改 GitHub Action，不再拉取镜像，改为源码构建。</li>
                  </ul>
                </div>
              } 
            />
          </div>
        </motion.div>

        {/* Scenario 2: Planning First */}
        <motion.div 
           className="bg-slate-50 rounded-xl border border-slate-200 flex flex-col overflow-hidden shadow-lg"
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.4 }}
        >
          <div className="bg-white p-3 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">架构规划</span>
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 font-bold">Strategic Mode</span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto scrollbar-hide bg-slate-50">
            <ChatBubble 
              role="user" 
              content={
                <div>
                   <p>可以，你把这些方案做个规划，<strong className="text-white border-b border-white/50">写成文档</strong>。</p>
                   <p className="mt-2">然后就开工吧。<strong className="text-white">按照你的想法排优先级。</strong> 就按你说的，先 copy 一个 <code>langgraph_runtime_product</code> 出来。</p>
                </div>
              } 
            />
             <ChatBubble 
              role="bot" 
              content={
                <div className="font-mono text-xs">
                  <div className="bg-slate-100 p-3 rounded border border-slate-200 mb-2">
                    <p className="text-indigo-600 font-semibold">File Created: docs/langgraph_runtime_product.md</p>
                    <p className="text-slate-500 mt-1">系统梳理 product runtime 的目标、模块职能、依赖与分裂计划...</p>
                  </div>
                  <p>文档已创建。按照最佳实践，我将开始模块复制工作。</p>
                </div>
              } 
            />
          </div>
          <div className="p-4 bg-amber-50 border-t border-amber-100">
            <div className="flex items-start gap-2 text-sm text-amber-800">
              <AlertCircle size={16} className="mt-1 text-amber-500" />
              <p>像对伙伴一样讲话。激发思考而非指令。 <span className="font-bold">先计划，落地文档，再实施。</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefactorSlide;