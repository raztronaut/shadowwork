import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { StartJourneyButton } from '@/components/auth/AuthButtons'
import Link from 'next/link'

export default async function SignUpPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-2xl">Shadow Work AI</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Begin your journey of self-discovery
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
            <StartJourneyButton />
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-violet-500 hover:text-violet-600">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 