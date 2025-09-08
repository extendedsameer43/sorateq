import { Inter } from 'next/font/google'
import './globals.css'
import WebGLBackground from '@/components/WebGLBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SORATEQ - AI Research Lab',
  description: 'H is an AI Research Lab and Product Company. Agentic AI isn\'t just another tool. It\'s the next generation of intelligent automation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebGLBackground />
        {children}
      </body>
    </html>
  )
}
