import { motion } from 'framer-motion'
import x1 from '../../assets/x_1.png'
import x2 from '../../assets/x_2.png'
import x3 from '../../assets/x_3.png'
import x4 from '../../assets/x_4.png'
import ImageModal from '../ImageModal'

const images = [
  { src: x1, alt: 'X评论1' },
  { src: x2, alt: 'X评论2' },
  { src: x3, alt: 'X评论3' },
  { src: x4, alt: 'X评论4' },
]

export default function XReviewSlide() {
  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-cyan-400 font-medium mb-2">Claude vs Gemini</h2>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">X 上大家的评价</span>
        </h1>
        <p className="text-white/60">
          Claude 在 Tool-use 做得很足，是<span className="text-green-400">最勤奋的模型</span>。
          <br />
          Gemini3 预训练做得很足，但后训练明显不足，被网友评为<span className="text-red-400">最懒的模型</span>。
        </p>
      </motion.div>

      <div className="flex-1 flex items-center mt-4">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass rounded-xl p-2 hover:bg-white/10 transition-all transform hover:scale-105"
            >
              <ImageModal
                src={img.src}
                alt={img.alt}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-white/40 text-sm mt-4"
      >
        点击图片可放大查看
      </motion.p>
    </div>
  )
}
