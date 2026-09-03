import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GST Souss-Massa',
  description: 'Portail du GST Souss-Massa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="/assets/index-DsSqZW0z.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
