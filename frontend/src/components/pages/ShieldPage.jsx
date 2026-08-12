import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUploadCloud, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import Card from '../components/Card'
import useApi from '../hooks/useApi'
import toast from 'react-hot-toast'

export default function ShieldPage() {
  const { post } = useApi()
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const dropZoneRef = useRef(null)

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      await scanFile(files[0])
    }
  }

  const scanFile = async (file) => {
    setScanning(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await post('/shield/scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(response.data)
      toast.success('Scan completed')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Threat Shield</h1>
        <p className="text-slate-400">AI-powered file analysis and malware detection</p>
      </div>

      <motion.div
        ref={dropZoneRef}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        whileHover={{ scale: 1.02 }}
        className="border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-xl p-12 text-center cursor-pointer transition bg-slate-800/50"
      >
        <FiUploadCloud className="text-5xl text-slate-400 mx-auto mb-4" />
        <p className="text-white text-lg font-semibold mb-2">Drop files to scan</p>
        <p className="text-slate-400 text-sm">or click to browse</p>
        <input
          type="file"
          hidden
          onChange={(e) => e.target.files?.[0] && scanFile(e.target.files[0])}
          className="hidden"
        />
      </motion.div>

      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white font-semibold">Scanning file...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && !scanning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card title="Scan Results">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {result.isMalicious ? (
                    <FiAlertCircle className="text-4xl text-red-500" />
                  ) : (
                    <FiCheckCircle className="text-4xl text-emerald-500" />
                  )}
                  <div>
                    <p className="text-white font-semibold text-lg">{result.filename}</p>
                    <p className="text-slate-400 text-sm">{result.hash}</p>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${
                  result.isMalicious
                    ? 'bg-red-500/10 border border-red-500/30'
                    : 'bg-emerald-500/10 border border-emerald-500/30'
                }`}>
                  <p className={result.isMalicious ? 'text-red-400' : 'text-emerald-400'}>
                    {result.verdict}
                  </p>
                </div>
                <p className="text-slate-300 whitespace-pre-wrap">{result.analysis}</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
