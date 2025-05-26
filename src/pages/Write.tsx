import { useState, useRef } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { MdSend, MdClose } from 'react-icons/md'

interface Message {
  id: number
  content: string
  timestamp: string
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

export const Write = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const MAX_MESSAGE_LENGTH = 250
  
  // Dummy messages dengan format tanggal Indonesia
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Halo ini adalah contoh pesan anonim 1",
      timestamp: "20 Maret 2024, 10:30"
    },
    {
      id: 2,
      content: "Halo ini adalah contoh pesan anonim 2",
      timestamp: "19 Maret 2024, 15:45"
    }
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Placeholder for backend integration
      // When backend is ready, replace this with actual API call
      // const response = await fetch('/api/messages', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ content: message })
      // });
      
      // if (!response.ok) throw new Error('Failed to send message');
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newMessage = {
        id: messages.length + 1,
        content: message,
        timestamp: formatDate(new Date())
      }
      
      setMessages([newMessage, ...messages])
      setMessage('')
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
        <div className="max-w-2xl mx-auto">
          <h1 className='text-2xl text-center p-3'> Welcome! </h1>
          <div className="bg-[#EFEFEF] dark:bg-[#1C1C1C] p-6 rounded-lg shadow-lg" data-aos="fade-out">
            <h1 className="mb-6 text-center display-font">
              Write me something <b>anonymously!</b>
            </h1>

            {/* Messages Display Area */}
            <div className="mb-8 space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-gray-300 text-black dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md"
                  >
                    <p className="text-gray-800 dark:text-gray-200 break-words">{msg.content}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{msg.timestamp}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No messages yet. Be the first to send one!
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

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
                  className="w-full h-24 p-4 rounded-lg bg-[#E0E0E0] dark:bg-[#1C1D24] 
                            border border-gray-300 dark:border-gray-600 
                            focus:ring-2 focus:ring-red-500 focus:border-transparent
                            resize-none"
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
                className={`w-full flex items-center gap-2 justify-center py-2 rounded-lg transition-all duration-300
                          ${loading || !message.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
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
              <p className='text-red-500'>SOON! | This is not yet online!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
