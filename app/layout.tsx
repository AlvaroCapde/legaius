import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LEGAIUS — AI Industry Disruptor',
  description:
    'LEGAIUS  - AI Industry Disruptor',
  openGraph: {
    title: 'LEGAIUS',
    description: 'Next-generation technology solutions.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full antialiased overflow-hidden">{children}</body>
    </html>
  )
}
