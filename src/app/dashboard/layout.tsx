import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Target } from 'lucide-react'
import { SignOutButton } from '@/components/dashboard/SignOutButton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 dark:bg-gray-800 p-4">
        <div className="flex flex-col h-full">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-8">
              <span className="font-bold text-xl">Shadow Work AI</span>
            </div>
            
            <nav className="space-y-2">
              <Link href="/dashboard/journal" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <BookOpen className="w-5 h-5" />
                <span>Journal</span>
              </Link>
              <Link href="/dashboard/goals" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Target className="w-5 h-5" />
                <span>Goals</span>
              </Link>
            </nav>
          </div>

          <div className="mt-auto">
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-sm">
                    <div className="font-medium">{session.user.email}</div>
                  </div>
                </div>
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
} 