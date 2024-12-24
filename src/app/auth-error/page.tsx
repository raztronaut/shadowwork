import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="mt-6 text-3xl font-bold">Authentication Error</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {searchParams.error || 'An error occurred during authentication.'}
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 