import type { ReactNode } from 'react'
import type { Theme } from '../../hooks/useTheme'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  theme: Theme
  onToggleTheme: () => void
  children: ReactNode
}

export function Layout({ theme, onToggleTheme, children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar theme={theme} onToggleTheme={onToggleTheme} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}
