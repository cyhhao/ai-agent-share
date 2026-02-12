import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface ImageModalProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}

/**
 * 可点击放大的图片组件。
 * 点击后全屏展示，再次点击或按 Esc 关闭。
 * 使用 Portal 渲染到 body，避免父级 transform 导致 fixed 定位失效。
 */
export default function ImageModal({ src, alt, className = '', style }: ImageModalProps) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <img
        src={src}
        alt={alt}
        style={style}
        className={`cursor-zoom-in hover:brightness-110 transition-all ${className}`}
        onClick={(e) => { e.stopPropagation(); setOpen(true) }}
      />

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.92)', cursor: 'zoom-out' }}
              onClick={close}
              onKeyDown={(e) => e.key === 'Escape' && close()}
              tabIndex={0}
              role="dialog"
              ref={(el) => el?.focus()}
            >
              <motion.img
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                src={src}
                alt={alt}
                style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
                onClick={(e) => e.stopPropagation()}
              />

              {/* Close hint */}
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ position: 'absolute', top: 24, right: 24, color: 'rgba(255,255,255,0.5)', fontSize: 14, userSelect: 'none' }}
              >
                点击空白处关闭 · ESC
              </motion.span>

              {/* Close button */}
              <button
                style={{ position: 'absolute', top: 24, left: 24, padding: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={close}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
