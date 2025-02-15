export const metadata = {
  title: 'EventureArts',
  description: 'Generated by create next app',
}
import './globals.css'
import Provider from './provider'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <Provider>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
