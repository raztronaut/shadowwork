'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { getAIResponse } from '@/lib/claude'

export async function saveJournalEntry(data: {
  title: string
  content: string
  mood?: string
  tags: string[]
  userId: string
}) {
  const supabase = createClient()
  
  await supabase.from('journal_entries').insert({
    ...data,
    userId: data.userId,
  })

  revalidatePath('/dashboard/journal')
}

export async function saveGoal(data: {
  title: string
  description: string
  dueDate?: string
  reflections: string[]
  userId: string
}) {
  console.log('Saving goal with data:', data)
  const supabase = createClient()
  
  const { data: result, error } = await supabase
    .from('goals')
    .insert({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      reflections: data.reflections,
      userId: data.userId,
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving goal:', error)
    throw new Error(`Failed to save goal: ${error.message}`)
  }

  console.log('Goal saved successfully:', result)
  revalidatePath('/dashboard/goals')
  return result
}

export async function toggleGoalStatus(goalId: string, currentStatus: string) {
  const supabase = createClient()
  const newStatus = currentStatus === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED'
  
  const { error } = await supabase
    .from('goals')
    .update({ status: newStatus })
    .eq('id', goalId)

  if (error) {
    console.error('Error toggling goal status:', error)
    throw new Error(`Failed to toggle goal status: ${error.message}`)
  }

  revalidatePath('/dashboard/goals')
}

export async function getAIResponseAction(message: string) {
  try {
    const response = await getAIResponse(message)
    return { success: true, response }
  } catch (error) {
    console.error('Error getting AI response:', error)
    return { 
      success: false, 
      response: 'I apologize, but I was unable to process your message. Please try again.' 
    }
  }
} 