import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdMail, MdReply } from 'react-icons/md'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IoMdMailOpen } from 'react-icons/io'

interface Message {
  id: number
  content: string
  timestamp: string
  reply?: string
  replyTimestamp?: string
}

interface EnvelopeCardProps {
  message: Message
  index: number
}

export const EnvelopeCard = ({ message, index }: EnvelopeCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="relative bg-[#EFEFEF] dark:bg-[#1C1C1C] p-6 rounded-lg shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:border-teal-500">
            {/* Envelope Design */}
            <div className="relative">
              {/* Mail Icon */}
              <div className="flex items-center justify-between mb-3">
                <motion.div
                  animate={{
                    rotate: isHovered ? 10 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isHovered ? (
                    <IoMdMailOpen className="text-teal-500" size={24} />
                  ) : (
                    <MdMail className="text-gray-600 dark:text-gray-400" size={24} />
                  )}
                </motion.div>
                
                {message.reply && (
                  <div className="flex items-center gap-1 text-xs text-teal-500">
                    <MdReply size={14} />
                    <span>Replied</span>
                  </div>
                )}
              </div>

              {/* Message Preview */}
              <div className="space-y-2">
                <p className="text-sm text-black dark:text-white line-clamp-2 leading-relaxed">
                  {message.content.length > 80 
                    ? `${message.content.substring(0, 80)}...` 
                    : message.content
                  }
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {message.timestamp}
                  </span>
                  
                  <motion.span
                    className="text-xs text-teal-500 opacity-0"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Click to read
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="md:w-max w-[350px] rounded-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IoMdMailOpen className="text-teal-500" size={20} />
            Anonymous Message
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Original Message */}
          <div className="bg-[#EFEFEF] dark:bg-[#1C1C1C] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 font-medium">
              Received: {message.timestamp}
            </p>
          </div>

          {/* Admin Reply */}
          {message.reply && (
            <div className="bg-[#E0E0E0] dark:bg-[#121212] p-4 rounded-lg border border-teal-500">
              <div className="flex items-start gap-2 mb-2">
                <MdReply className="text-teal-500 mt-1 flex-shrink-0" size={16} />
                <h4 className="text-sm font-semibold text-teal-500 mb-1">
                  Arifian replied:
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap ml-6">
                {message.reply}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 font-medium ml-6">
                Replied: {message.replyTimestamp}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}