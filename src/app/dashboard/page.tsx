import { createClient } from '@/lib/supabase/server'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { BookOpen, Target, Plus } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  // Fetch recent journal entries
  const { data: recentEntries } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('userId', session?.user?.id)
    .order('createdAt', { ascending: false })
    .limit(3)

  // Fetch recent goals
  const { data: recentGoals } = await supabase
    .from('goals')
    .select('*')
    .eq('userId', session?.user?.id)
    .order('createdAt', { ascending: false })
    .limit(3)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Continue your journey of self-discovery
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Journal Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Journal Entries</h2>
            <Button asChild variant="soft">
              <Link href="/dashboard/journal">
                <Plus className="w-4 h-4 mr-2" />
                New Entry
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {recentEntries?.length ? (
              recentEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2"
                >
                  <h3 className="font-medium">{entry.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {entry.content}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                    {entry.mood && (
                      <>
                        <span>•</span>
                        <span>Mood: {entry.mood}</span>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">No journal entries yet</p>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard/journal">Start Journaling</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Goals Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Goals</h2>
            <Button asChild variant="soft">
              <Link href="/dashboard/goals">
                <Plus className="w-4 h-4 mr-2" />
                New Goal
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {recentGoals?.length ? (
              recentGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2"
                >
                  <h3 className="font-medium">{goal.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {goal.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Status: {goal.status}</span>
                    {goal.dueDate && (
                      <>
                        <span>•</span>
                        <span>Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Target className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">No goals set yet</p>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard/goals">Set Your First Goal</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 