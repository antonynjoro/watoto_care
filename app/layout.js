import './globals.css'
import { Inter } from 'next/font/google'
import Provider from './context/AuthContext'
import ToasterContext from './context/ToasterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Watoto.Care',
  description: 'Find the best care for your child - choose from a wide range of child care providers in your area.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        <Provider>
          <ToasterContext />
        {children}
        </Provider>
      </body>
    </html>
  )
}
