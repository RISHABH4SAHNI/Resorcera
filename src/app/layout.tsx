import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Resorcera - Upskill, Unlock, Upgrade',
  description: 'Practical, engaging courses for growth & career advancement.',
  keywords: ['courses', 'education', 'career advancement', 'learning', 'SQL'],
  authors: [{ name: 'Resorcera Team' }],
  openGraph: {
    title: 'Resorcera - Upskill, Unlock, Upgrade',
    description: 'Practical, engaging courses for growth & career advancement.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-resorcera-cream min-h-screen`}>
        {children}
      </body>
    </html>
  )
}