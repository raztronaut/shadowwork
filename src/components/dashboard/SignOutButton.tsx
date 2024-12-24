'use client'

import { Button } from '@radix-ui/themes'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <Button variant="soft" onClick={handleSignOut}>
      <LogOut className="w-4 h-4" />
    </Button>
  )
} 