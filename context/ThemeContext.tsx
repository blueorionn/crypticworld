'use client'
import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface ThemeContextType {
  theme: 'light' | 'dark'
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
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
