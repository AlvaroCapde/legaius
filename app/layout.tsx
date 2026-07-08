import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LEGAIUS — Legal Intelligence Platform',
  description:
    'LEGAIUS is an award-winning 3D portfolio showcasing next-generation legal technology solutions.',
  openGraph: {
    title: 'LEGAIUS — Legal Intelligence Platform',
    description: 'Next-generation legal technology solutions.',
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
