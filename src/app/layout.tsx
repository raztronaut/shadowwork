import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shadow Work AI',
  description: 'Your AI-powered companion for shadow work and personal growth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Theme accentColor="violet" grayColor="slate" radius="medium">
            {children}
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
