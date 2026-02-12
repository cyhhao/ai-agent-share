import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';

const SelectionSOTASlidePart1: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 md:px-24">
       <div className="mb-12 text-center">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">亲测 SOTA (实习期)</h2>
            <p className="text-xl text-slate-500">Part 1: 选型心法</p>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
           {/* Iron Rule Side Panel */}
          <motion.div 
            className="bg-rose-50 border border-rose-100 p-10 rounded-3xl relative overflow-hidden flex flex-col justify-center shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute -top-4 -right-4 p-6 opacity-5 text-rose-900">
               <AlertTriangle size={200} />
            </div>
            <h3 className="text-3xl font-bold text-rose-600 mb-6 flex items-center gap-3">
                <AlertTriangle size={32} />
                铁律
            </h3>
            <p className="text-rose-900 text-xl leading-relaxed mb-6 font-medium">
              智能无法叠加。每个场景下，只用当前<span className="bg-rose-200 px-2 mx-1 rounded">最好</span>的。
            </p>
            <p className="text-rose-950 font-bold text-2xl mb-6 border-l-4 border-rose-400 pl-6 py-2">
               用 1/10 的价格，浪费 10 倍的时间，却换不来一次跑通，是血亏的。
            </p>
            <div className="bg-white border border-rose-200 p-6 rounded-2xl text-rose-700 text-lg font-bold flex items-center gap-4 shadow-sm">
               <Cpu size={24} className="shrink-0" />
               <span>永远开启 <span className="underline">High Thinking</span>。永不使用 Auto。多等一会是值得的。</span>
            </div>
          </motion.div>

          {/* Why Self-Research */}
          <motion.div 
            className="bg-white border border-slate-200 p-10 rounded-3xl flex flex-col justify-center shadow-xl relative overflow-hidden"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
          >
            <div className="absolute top-0 right-0 p-10 opacity-5">
                <ShieldAlert size={200} />
            </div>
            <div className="flex items-center gap-4 mb-8 text-indigo-600">
               <ShieldAlert size={36} />
               <h3 className="text-3xl font-bold text-slate-900">为什么要自研 Agent?</h3>
            </div>
            <ul className="space-y-6 text-slate-600 text-xl">
               <li className="flex items-start gap-3">
                 <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2.5 shrink-0"></span>
                 <span><strong className="text-slate-900">防锁定：</strong> 模型 SOTA 随时会变。不要被生态锁死。</span>
               </li>
               <li className="flex items-start gap-3">
                 <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2.5 shrink-0"></span>
                 <span><strong className="text-slate-900">一致性：</strong> 各家官方 Agent 能力参差不齐（且多为“套餐”）。</span>
               </li>
            </ul>
             <div className="mt-auto pt-8 border-t border-slate-100">
                <p className="text-sm text-slate-400 italic">
                  现状：很多人用 GPT 讨论方案，Claude 执行，Gemini 写前端。自研能串联这些 SOTA。
                </p>
             </div>
          </motion.div>
      </div>
    </div>
  );
};

export default SelectionSOTASlidePart1;
