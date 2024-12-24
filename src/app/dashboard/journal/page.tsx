import { createClient } from '@/lib/supabase/server'
import { JournalEntryForm } from '@/components/journal/JournalEntryForm'
import { AIChatBox } from '@/components/journal/AIChatBox'
import { generateJournalPrompt } from '@/lib/claude'
import { Button } from '@radix-ui/themes'
import { Sparkles, BookOpen, MessageSquare } from 'lucide-react'

export default async function JournalPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const prompt = generateJournalPrompt()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Journal Your Journey</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Take a moment to reflect on your thoughts, feelings, and experiences. Your journal is a safe space for self-discovery.
        </p>
      </div>

      <div className="bg-gradient-to-r from-violet-100 to-violet-50 dark:from-violet-900/20 dark:to-violet-800/10 p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-4 text-violet-900 dark:text-violet-100">
          <Sparkles className="w-6 h-6" />
          <div>
            <h2 className="font-semibold mb-1">Today's Reflection Prompt</h2>
            <p className="text-violet-800 dark:text-violet-200">{prompt}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-4">
            <BookOpen className="w-5 h-5 text-violet-500" />
            <h2 className="text-xl font-semibold">Write Your Entry</h2>
          </div>
          <JournalEntryForm userId={user?.id} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-4">
            <MessageSquare className="w-5 h-5 text-violet-500" />
            <h2 className="text-xl font-semibold">AI Companion</h2>
          </div>
          <AIChatBox />
        </div>
      </div>
    </div>
  )
} 