'use client'

import { useState } from 'react'
import { Button, TextArea } from '@radix-ui/themes'
import { Send, Bot, User } from 'lucide-react'
import { getAIResponseAction } from '@/app/actions'

export function AIChatBox() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    setIsLoading(true)
    setConversation(prev => [...prev, { role: 'user', content: message }])
    
    try {
      const { success, response } = await getAIResponseAction(message)
      if (success) {
        setConversation(prev => [...prev, { role: 'ai', content: response }])
      } else {
        setConversation(prev => [...prev, { role: 'ai', content: 'I apologize, but I was unable to process your message. Please try again.' }])
      }
    } catch (error) {
      console.error('Error getting AI response:', error)
      setConversation(prev => [...prev, { role: 'ai', content: 'An error occurred. Please try again.' }])
    } finally {
      setMessage('')
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="h-[400px] overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
        {conversation.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 space-y-3">
            <Bot className="w-12 h-12 text-violet-500" />
            <div>
              <p className="font-medium">Your AI Companion</p>
              <p className="text-sm">Ask me anything about your journal entry or shadow work journey.</p>
            </div>
          </div>
        ) : (
          conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' 
                  ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-900 dark:text-violet-100'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}>
                {msg.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div className={`flex-1 p-4 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-900 dark:text-violet-100 rounded-tr-none'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <TextArea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Ask me anything about your journal entry..."
          className="flex-1 min-h-[80px] max-h-[160px] resize-y"
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="self-end bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-lg transition-colors"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
} 