import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-2xl">Shadow Work AI</span>
        </Link>
        <nav className="ml-auto flex gap-2">
          {user ? (
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="soft" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center lg:items-start space-y-4 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none max-w-3xl">
                Begin Your Journey of Self-Discovery
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Explore your shadow self with the guidance of AI. Journal, set intentions, and grow with personalized insights.
              </p>
              {!user && (
                <div className="flex gap-4 mt-8">
                  <Button size="3" asChild>
                    <Link href="/signup">Start Your Journey</Link>
                  </Button>
                  <Button size="3" variant="soft" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">AI-Guided Journaling</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive thoughtful prompts and questions to guide your self-reflection journey.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Personal Growth Tracking</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Set intentions, track your progress, and celebrate your growth milestones.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Safe & Private</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Your journey is personal. All your data is encrypted and private.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Shadow Work AI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
