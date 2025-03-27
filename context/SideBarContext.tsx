'use client'
import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface SideBarContextType {
  isSideBarOpen: boolean
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBarContext = createContext<SideBarContextType | undefined>(undefined)

export const SideBarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isSideBarOpen, setIsSideBarOpen] = useLocalStorage<boolean>(
    'sidebar',
    true
  )

  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </SideBarContext.Provider>
  )
}

// Custom hook for easier access
export const useSideBarProvider = (): SideBarContextType => {
  const context = useContext(SideBarContext)
  if (!context) {
    throw new Error('useSharedState must be used within SharedStateProvider')
  }
  return context
}
