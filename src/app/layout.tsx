import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
      title: 'WiseBill - Find your ideal mobile plan',
      description: 'Smart savings advisor for Canadian mobile plans',
}

export default function RootLayout({
      children,
}: {
      children: React.ReactNode
}) {
      return (
              <html lang="en">
                    <body className={inter.className}>{children}</body>body>
              </html>html>
            )
}
</html>
