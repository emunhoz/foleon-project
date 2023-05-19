import { AuthContextProvider } from '@/context/auth-context'
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Foleon project',
  description: 'Search your Foleon project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </AuthContextProvider>
    </html>
  )
}
