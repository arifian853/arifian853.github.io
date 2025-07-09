import { useState, useRef, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { MdSend, MdClose, MdReply } from 'react-icons/md'

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

// API Base URL - sesuaikan dengan backend URL Anda
const API_BASE_URL = import.meta.env.VITE_CONFESS_API_URL || 'http://localhost:3000'

export const Write = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchingMessages, setFetchingMessages] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const MAX_MESSAGE_LENGTH = 250
  
  const [messages, setMessages] = useState<Message[]>([])

  // Fetch messages from API
  const fetchMessages = async () => {
    setFetchingMessages(true)
    try {
      const response = await fetch(`${API_BASE_URL}/confess?limit=20`)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_BASE_URL}/confess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message.trim() })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }
      
      // Clear form and refresh messages
      setMessage('')
      await fetchMessages() // Refresh messages after successful submission
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleClearMessage = () => {
    setMessage('')
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-5 md:p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className='text-3xl text-center p-6 display-font'> Welcome! </h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-[#EFEFEF] dark:bg-[#1C1C1C] p-6 rounded-lg shadow-lg" data-aos="fade-right">
              <h2 className="mb-6 text-center display-font text-xl">
                Write me something <b>anonymously!</b>
              </h2>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-lg">
                  {error}
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                    className="w-full h-32 p-4 rounded-lg bg-[#E0E0E0] dark:bg-[#1C1D24] 
                              border border-gray-300 dark:border-gray-600 
                              focus:ring-2 focus:ring-blue-500 focus:border-transparent
                              resize-none transition-all duration-300"
                    placeholder="Type your message here..."
                    required
                    disabled={loading}
                    aria-label="Anonymous message"
                    maxLength={MAX_MESSAGE_LENGTH}
                  />
                  {message && (
                    <button
                      type="button"
                      onClick={handleClearMessage}
                      className="absolute top-2 right-2 p-1 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                      aria-label="Clear message"
                    >
                      <MdClose size={16} />
                    </button>
                  )}
                  <div className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
                    {message.length}/{MAX_MESSAGE_LENGTH}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className={`w-full flex items-center gap-2 justify-center py-3 rounded-lg transition-all duration-300 font-medium
                            ${loading || !message.trim()
                      ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                      : 'bg-[#1C1D24] dark:bg-[#E0E0E0] text-white dark:text-black hover:bg-opacity-80'
                    }`}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <MdSend />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                <p>Your message will be sent anonymously.</p>
              </div>
            </div>

            {/* Messages Display Section */}
            <div className="bg-[#EFEFEF] dark:bg-[#1C1C1C] p-6 rounded-lg shadow-lg" data-aos="fade-left">
              <h2 className="mb-6 text-center display-font text-xl">
                Recent Messages
              </h2>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2">
                {fetchingMessages ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="loader mx-auto mb-4"></div>
                    Loading messages...
                  </div>
                ) : messages.length > 0 ? (
                  messages.map((msg) => (
                    <div key={msg.id} className="space-y-3">
                      {/* Original Message */}
                      <div className="bg-gray-300 text-black dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md">
                        <p className="text-gray-800 dark:text-gray-200 break-words leading-relaxed">{msg.content}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{msg.timestamp}</p>
                      </div>
                      
                      {/* Admin Reply */}
                      {msg.reply && (
                        <div className="ml-6 bg-[#EFEFEF] dark:bg-[#1C1C1C] p-4 rounded-lg border-l-4 border-[#121212] dark:border-[#E0E0E0]">
                          <div className="flex items-start gap-2">
                            <MdReply className="text-[#121212] dark:text-[#E0E0E0] mt-1 flex-shrink-0" size={16} />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-[#121212] dark:text-[#E0E0E0] mb-1">
                                Arifian replied:
                              </p>
                              <p className="text-gray-700 dark:text-gray-300 break-words text-sm leading-relaxed">
                                {msg.reply}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {msg.replyTimestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No messages yet. Be the first to send one!
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}