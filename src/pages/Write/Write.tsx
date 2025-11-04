import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeCard } from '@/components/EnvelopeCard'
import { WriteMessageModal } from '@/components/WriteMessageModal'

interface Message {
  id: number
  content: string
  timestamp: string
  reply?: string
  replyTimestamp?: string
}

// Interface untuk confession dari API
interface Confession {
  _id: string
  message: string
  createdAt: string
  ipAddress: string
  reply?: string
  replyCreatedAt?: string
}

// Interface untuk response API
interface ConfessionResponse {
  confessions: Confession[]
  total: number
  page: number
  limit: number
}

const formatDate = (date: Date): string => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const d = date.getDate()
  const m = months[date.getMonth()]
  const y = date.getFullYear()
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')

  return `${d} ${m} ${y}, ${h}:${min}`
}

// API Base URL
const API_BASE_URL = import.meta.env.VITE_CONFESS_API_URL

export const Write = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchingMessages, setFetchingMessages] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  // Fetch messages from API - tampilkan SEMUA confession
  const fetchMessages = async () => {
    setFetchingMessages(true)
    try {
      // Hapus parameter replied_only, ambil semua
      const response = await fetch(`${API_BASE_URL}/confessions/public/list?limit=50`)
      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }
      const data: ConfessionResponse = await response.json()
      
      // Transform API response to match frontend format
      const transformedMessages = data.confessions.map((confession: Confession, index: number) => ({
        id: index + 1,
        content: confession.message,
        timestamp: formatDate(new Date(confession.createdAt)),
        reply: confession.reply,
        replyTimestamp: confession.replyCreatedAt ? formatDate(new Date(confession.replyCreatedAt)) : undefined
      }))
      
      setMessages(transformedMessages)
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError('Failed to load messages')
    } finally {
      setFetchingMessages(false)
    }
  }

  // Load messages on component mount
  useEffect(() => {
    fetchMessages()
  }, [])

  const handleSubmitMessage = async (message: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const payload = { message: message.trim() }
      
      const response = await fetch(`${API_BASE_URL}/confessions/public/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.detail || 'Failed to send message')
      }
      
      // Refresh messages setelah berhasil submit - confession langsung muncul
      await fetchMessages()
      
    } catch (err) {
      console.error('Submit error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-5 md:p-10">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className='text-3xl text-center p-6 display-font'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        > 
          Welcome! 
        </motion.h1>
        
        {/* Error Message */}
        {error && (
          <motion.div 
            className="mb-6 p-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-8">
          {/* Write Message Section */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex justify-center">
              <WriteMessageModal 
                onSubmit={handleSubmitMessage} 
                loading={loading} 
              />
            </div>
          </motion.div>

          {/* Messages Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="mb-6 text-center display-font text-xl">
              Messages
            </h2>
            
            {fetchingMessages ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-gray-300 border-t-teal-500 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-500 dark:text-gray-400">Loading messages...</p>
              </div>
            ) : messages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {messages.map((msg, index) => (
                  <EnvelopeCard 
                    key={msg.id} 
                    message={msg} 
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-12 text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p>No messages yet. Be the first to send one!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}