export const metadata = {
  title: 'EventureArts',
  description: 'Generated by create next app',
}
import './globals.css'
import Provider from './provider'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Script from 'next/script'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <Script
          strategy="afterInteractive"
          src="https://connect.facebook.net/en_US/sdk.js"
        />
      </head>
      <body>
        <Provider>
          <Header/>
          {children}
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}