import { createClient } from '@/lib/supabase/server'
import { GoalForm } from '@/components/goals/GoalForm'
import { Button } from '@radix-ui/themes'
import { Target, CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import { saveGoal, toggleGoalStatus } from '@/app/actions'

export default async function GoalsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: goals, error } = await supabase
    .from('goals')
    .select('*')
    .eq('userId', user?.id)
    .order('createdAt', { ascending: false })

  if (error) {
    console.error('Error fetching goals:', error)
    return (
      <div className="max-w-4xl mx-auto space-y-8 px-4">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p>Failed to load goals. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Goals & Intentions</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Set meaningful goals and track your progress on your shadow work journey.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold mb-4">Create New Goal</h2>
          <GoalForm userId={user?.id} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Your Goals</h2>
          <div className="space-y-4">
            {goals?.length === 0 ? (
              <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Target className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">No goals set yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Create your first goal to start tracking your progress
                </p>
              </div>
            ) : (
              goals?.map((goal) => (
                <div
                  key={goal.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-2 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{goal.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {goal.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => toggleGoalStatus(goal.id, goal.status)}
                    >
                      {goal.status === 'COMPLETED' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </Button>
                  </div>

                  {goal.dueDate && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Due: {new Date(goal.dueDate).toLocaleDateString()}
                    </p>
                  )}

                  {goal.reflections?.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                      <h4 className="text-sm font-medium mb-2">Reflections</h4>
                      <div className="space-y-1">
                        {goal.reflections.map((reflection, index) => (
                          <p key={index} className="text-sm text-gray-600 dark:text-gray-300">
                            {reflection}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 