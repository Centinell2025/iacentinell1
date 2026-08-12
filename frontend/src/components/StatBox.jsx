import { motion } from 'framer-motion'
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

export default function StatBox({ icon, label, value, unit = '', trend, color = 'blue' }) {
  const colorClasses = {
    emerald: 'from-emerald-500/10 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
    red: 'from-red-500/10 to-red-600/10 border-red-500/30 text-red-400',
    blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/30 text-blue-400',
    amber: 'from-amber-500/10 to-amber-600/10 border-amber-500/30 text-amber-400'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 backdrop-blur`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            trend.up ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {trend.value}%
            {trend.up ? <FiTrendingUp /> : <FiTrendingDown />}
          </div>
        )}
      </div>
      <p className="text-slate-400 text-sm mb-2">{label}</p>
      <p className="text-2xl font-bold text-white">
        {value}
        <span className="text-lg ml-1 opacity-70">{unit}</span>
      </p>
    </motion.div>
  )
}
