import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'

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
  // Dummy messages dengan format tanggal Indonesia
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello, this is a sample anonymous message!",
      timestamp: "20 Maret 2024, 10:30"
    },
    {
      id: 2,
      content: "Another anonymous message here...",
      timestamp: "19 Maret 2024, 15:45"
    }
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Placeholder untuk integrasi backend nanti
    const newMessage = {
      id: messages.length + 1,
      content: message,
      timestamp: formatDate(new Date())
    }
    setMessages([newMessage, ...messages])
    setMessage('')
    setLoading(false)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-5 md:p-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#BABFBF] dark:bg-[#30323D] p-6 rounded-lg shadow-lg" data-aos="fade-out">
            <h1 className="text-2xl md:text-xl mb-6 text-center display-font">
              Write me an anonymous message
            </h1>

            {/* Messages Display Area */}
            <div className="mb-8 space-y-4 max-h-[400px] overflow-y-auto">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className="bg-[#E0E0E0] dark:bg-[#1C1D24] p-4 rounded-lg shadow"
                >
                  <p className="text-gray-800 dark:text-gray-200">{msg.content}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{msg.timestamp}</p>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-24 p-4 rounded-lg bg-[#E0E0E0] dark:bg-[#1C1D24] 
                            border border-gray-300 dark:border-gray-600 
                            focus:ring-2 focus:ring-red-500 focus:border-transparent
                            resize-none"
                  placeholder="Type your message here..."
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={loading || !message.trim()}
                className={`w-full py-2 rounded-lg font-semibold transition-all duration-300
                          ${loading || !message.trim() 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-[#1C1D24]  dark:bg-[#E0E0E0] text-white dark:text-black hover:bg-opacity-80'
                          }`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>Your message will be sent anonymously.</p>
              <p className='text-red-500'>Backend not yet implemented!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
