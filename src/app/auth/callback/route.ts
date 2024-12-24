import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = createClient()

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth error:', error.message)
        return NextResponse.redirect(`${origin}/auth-error?error=${encodeURIComponent(error.message)}`)
      }

      if (data.session) {
        // Successfully authenticated, redirect to dashboard
        return NextResponse.redirect(`${origin}/dashboard`)
      }
    } catch (error) {
      console.error('Callback error:', error)
      return NextResponse.redirect(`${origin}/auth-error?error=Unknown error occurred`)
    }
  }

  // No code provided
  return NextResponse.redirect(`${origin}/auth-error?error=No code provided`)
} 