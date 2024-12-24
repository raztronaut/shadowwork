'use client'

import { useState } from 'react'
import { Button, TextArea } from '@radix-ui/themes'
import { CalendarIcon, AlertCircle } from 'lucide-react'
import { saveGoal } from '@/app/actions'

interface GoalFormProps {
  userId?: string
}

export function GoalForm({ userId }: GoalFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [reflectionInput, setReflectionInput] = useState('')
  const [reflections, setReflections] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleAddReflection = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newReflection = reflectionInput.trim()
      if (newReflection && !reflections.includes(newReflection)) {
        setReflections([...reflections, newReflection])
        setReflectionInput('')
      }
    }
  }

  const handleRemoveReflection = (reflectionToRemove: string) => {
    setReflections(reflections.filter(reflection => reflection !== reflectionToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim() || isSubmitting || !userId) {
      setError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      console.log('Submitting goal:', { title, description, dueDate, reflections, userId })
      const result = await saveGoal({
        title,
        description,
        dueDate: dueDate || undefined,
        reflections,
        userId,
      })
      
      console.log('Goal saved successfully:', result)
      setSuccess(true)
      
      // Reset form
      setTitle('')
      setDescription('')
      setDueDate('')
      setReflections([])
    } catch (error) {
      console.error('Error saving goal:', error)
      setError(error instanceof Error ? error.message : 'Failed to save goal')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-200 p-4 rounded-lg">
          <p className="text-sm">Goal saved successfully!</p>
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="Give your goal a title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg font-medium focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/20 outline-none transition-all"
        />
      </div>

      <TextArea
        placeholder="Describe your goal and what you hope to achieve..."
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="min-h-[120px] resize-y"
        required
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/20 outline-none transition-all"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Add reflection (press Enter)"
            value={reflectionInput}
            onChange={e => setReflectionInput(e.target.value)}
            onKeyDown={handleAddReflection}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/20 outline-none transition-all"
          />
        </div>
      </div>

      {reflections.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {reflections.map((reflection, index) => (
            <div
              key={index}
              className="bg-violet-100 dark:bg-violet-900/50 text-violet-900 dark:text-violet-100 px-3 py-1.5 rounded-full text-sm flex items-center gap-2 group"
            >
              <span>{reflection}</span>
              <button
                type="button"
                onClick={() => handleRemoveReflection(reflection)}
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
        {isSubmitting ? 'Saving...' : 'Create Goal'}
      </Button>
    </form>
  )
} 