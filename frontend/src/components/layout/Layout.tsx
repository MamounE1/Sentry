import type { ReactNode } from 'react'
import type { Theme } from '../../hooks/useTheme'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'

interface LayoutProps {
  theme: Theme
  onToggleTheme: () => void
  title: string
  children: ReactNode
}

export function Layout({ theme, onToggleTheme, title, children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950">
      <Sidebar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="flex flex-1 flex-col">
        <TopNav title={title} />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  )
}
