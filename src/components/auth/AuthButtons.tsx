'use client'

import { useState } from 'react'
import { Button, TextField } from '@radix-ui/themes'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function AuthButtons() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      setError('Invalid email or password')
      console.error('Error signing in:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <TextField.Root>
        <TextField.Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </TextField.Root>

      <TextField.Root>
        <TextField.Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </TextField.Root>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        Sign In
      </Button>
    </form>
  )
}

export function StartJourneyButton() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      setError('Error creating account')
      console.error('Error signing up:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <TextField.Root>
        <TextField.Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </TextField.Root>

      <TextField.Root>
        <TextField.Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </TextField.Root>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        Start Your Journey
      </Button>
    </form>
  )
} 