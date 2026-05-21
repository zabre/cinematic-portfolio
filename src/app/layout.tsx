import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Abderrazak — Portfolio',
  description: 'Ultra-premium interactive portfolio — Full-Stack · Data · AI',
  openGraph: {
    title: 'Abderrazak — Portfolio',
    description: 'Interactive web applications gallery',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#04040a] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
