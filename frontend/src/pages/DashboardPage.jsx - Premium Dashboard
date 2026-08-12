import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { FiShield, FiAlertCircle, FiTrendingUp, FiActivity } from 'react-icons/fi'
import Card from '../components/Card'
import StatBox from '../components/StatBox'
import useApi from '../hooks/useApi'

const DashboardPage = () => {
  const { get } = useApi()
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('/dashboard/metrics')
        setMetrics(response.data)
      } catch (error) {
        console.error('Error fetching metrics:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  const chartData = metrics?.threatTrend || []
  const protectionScore = metrics?.protectionScore || 95

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Security Command Center
        </h1>
        <p className="text-slate-400">
          Real-time threat intelligence and protection status
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <StatBox
            icon={<FiShield className="text-2xl" />}
            label="Protection Score"
            value={`${protectionScore}%`}
            trend={{ value: 2.5, up: true }}
            color="emerald"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatBox
            icon={<FiAlertCircle className="text-2xl" />}
            label="Active Threats"
            value={metrics?.threatCount || 0}
            trend={{ value: 15.3, up: false }}
            color="red"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatBox
            icon={<FiTrendingUp className="text-2xl" />}
            label="Detection Rate"
            value={`${metrics?.detectionRate || 98.5}%`}
            trend={{ value: 1.2, up: true }}
            color="blue"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatBox
            icon={<FiActivity className="text-2xl" />}
            label="System Health"
            value={metrics?.systemHealth || 99}
            unit="%"
            color="amber"
          />
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Threat Trend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card title="Threat Intelligence Trend" className="h-80">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="threats"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="blocked"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Protection Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card title="Protection Status" className="h-80">
            <div className="flex flex-col items-center justify-center h-64">
              <div className="relative w-32 h-32 mb-4">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray={`${(protectionScore / 100) * 377} 377`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {protectionScore}%
                  </span>
                  <span className="text-xs text-slate-400">PROTECTED</span>
                </div>
              </div>
              <div className="text-center text-sm text-slate-400">
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  All Systems Operational
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity & Threat Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card title="Threat Distribution">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={metrics?.threatDistribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#ef4444" />
                  <Cell fill="#f97316" />
                  <Cell fill="#eab308" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Recent Incidents */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card title="Recent Incidents">
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {metrics?.recentIncidents?.map((incident, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-700 rounded-lg flex items-center justify-between hover:bg-slate-600 transition"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {incident.type}
                    </p>
                    <p className="text-xs text-slate-400">{incident.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    incident.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    incident.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {incident.severity.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage
