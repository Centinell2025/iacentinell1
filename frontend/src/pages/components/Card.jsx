import { motion } from 'framer-motion'

export default function Card({ title, children, className = '', noPadding = false }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl shadow-2xl hover:border-slate-600 transition ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </motion.div>
  )
}
