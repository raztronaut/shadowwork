'use client'

import { useState } from 'react'
import { Button, TextArea } from '@radix-ui/themes'
import { Tag, Smile, Hash } from 'lucide-react'
import { saveJournalEntry } from '@/app/actions'

interface JournalEntryFormProps {
  userId?: string
}

export function JournalEntryForm({ userId }: JournalEntryFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const newTag = tagInput.trim()
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag])
        setTagInput('')
      }
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || isSubmitting || !userId) return

    setIsSubmitting(true)
    try {
      await saveJournalEntry({
        title,
        content,
        mood: mood || undefined,
        tags,
        userId,
      })
      
      // Reset form
      setTitle('')
      setContent('')
      setMood('')
      setTags([])
    } catch (error) {
      console.error('Error saving journal entry:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          placeholder="Give your entry a title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg font-medium focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/20 outline-none transition-all"
        />
      </div>

      <TextArea
        placeholder="Write your thoughts, feelings, and reflections..."
        value={content}
        onChange={e => setContent(e.target.value)}
        className="min-h-[200px] resize-y"
        required
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <Smile className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="How are you feeling?"
            value={mood}
            onChange={e => setMood(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/20 outline-none transition-all"
          />
        </div>

        <div className="relative">
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Add tags (press Enter)"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/20 outline-none transition-all"
          />
        </div>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <div
              key={tag}
              className="bg-violet-100 dark:bg-violet-900/50 text-violet-900 dark:text-violet-100 px-3 py-1.5 rounded-full text-sm flex items-center gap-2 group"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-violet-700 dark:hover:text-violet-300 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-lg font-medium transition-colors"
      >
        {isSubmitting ? 'Saving...' : 'Save Entry'}
      </Button>
    </form>
  )
} 