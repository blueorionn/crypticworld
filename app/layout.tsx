import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const title = 'Crypticworld - Text Encrypter'
const description =
  'Crypticworld is a lightweight web application built using Flask that allows users to hash any given text using a wide variety of hashing algorithms. This application encodes all input data using UTF-8 encoding before generating the hash.'

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    images: ['https://crypticworld.functionbasket.com/favicon.ico'],
  },
  twitter: {
    title: title,
    description: description,
    images: ['https://crypticworld.functionbasket.com/favicon.ico'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <ThemeProvider geistMono={geistMono} geistSans={geistSans}>
        {children}
      </ThemeProvider>
    </html>
  )
}
