import { useState } from 'react'
import { motion } from 'framer-motion'
import { MdSend, MdClose, MdEdit } from 'react-icons/md'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface WriteMessageModalProps {
  onSubmit: (message: string) => Promise<void>
  loading: boolean
}

export const WriteMessageModal = ({ onSubmit, loading }: WriteMessageModalProps) => {
  const [message, setMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const MAX_MESSAGE_LENGTH = 250

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    await onSubmit(message.trim())
    setMessage('')
    setIsOpen(false)
  }

  const handleClearMessage = () => {
    setMessage('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="relative">
          <MdEdit className="mr-2" size={16} />
          Write me something anonymously!
        </Button>
      </DialogTrigger>

      <DialogContent className="md:w-max w-[350px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MdEdit className="text-teal-500" size={20} />
            Write Anonymous Message
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
              className="w-full h-32 p-4 rounded-lg bg-[#E0E0E0] dark:bg-[#1C1D24] 
                        border border-gray-300 dark:border-gray-600 
                        focus:ring-2 focus:ring-teal-500 focus:border-transparent
                        resize-none transition-all duration-300"
              placeholder="Type your anonymous message here..."
              required
              disabled={loading}
              maxLength={MAX_MESSAGE_LENGTH}
            />
            {message && (
              <button
                type="button"
                onClick={handleClearMessage}
                className="absolute top-2 right-2 p-1 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
              >
                <MdClose size={16} />
              </button>
            )}
            <div className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
              {message.length}/{MAX_MESSAGE_LENGTH}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !message.trim()}
              className="flex-1 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send <MdSend size={16} />
                </>
              )}
            </Button>
          </div>
        </form>
        
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Your message will be sent anonymously and cannot be edited after sending.
        </p>
      </DialogContent>
    </Dialog>
  )
}