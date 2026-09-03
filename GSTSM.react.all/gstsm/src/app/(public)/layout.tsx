import type { Metadata } from 'next'
import '../globals.css'
import Header from '@/components/Header'
import SideRail from '@/components/SideRail'
import Footer from '@/components/Footer'

import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Groupement Sanitaire Territorial de la Région Souss-Massa',
  description: 'Portail officiel du GST Souss-Massa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
          <div className="app">
            <Header />
            <SideRail />
            <div className="chatbot">
              <button className="chat-launch" aria-label="Ouvrir l’assistant">
                <i>✦</i>
                <span>
                  <b>Besoin d’aide ?</b>
                  <small>Assistant GST</small>
                </span>
              </button>
            </div>
            {children}
            <Footer />
          </div>
        <Script src="/assets/site-interactive.js" strategy="afterInteractive" />
      </>
  )
}
