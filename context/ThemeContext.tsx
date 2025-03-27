'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface ThemeContextType {
  theme: 'light' | 'dark'
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({
  children,
  geistSans,
  geistMono,
}: {
  children: React.ReactNode
  geistSans: NextFontWithVariable
  geistMono: NextFontWithVariable
}) => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark')
  const [mounted, setMounted] = useState(false)

  // Set mounted to true on client to avoid SSR/client mismatch.
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </ThemeContext.Provider>
    )

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${theme}`}
      >
        {children}
      </body>
    </ThemeContext.Provider>
  )
}

// Custom hook for easier access
export const useThemeProvider = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('Unknown Theme Context')
  }
  return context
}
