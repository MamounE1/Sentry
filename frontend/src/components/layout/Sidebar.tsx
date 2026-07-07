import type { Theme } from '../../hooks/useTheme'

interface NavItem {
  label: string
  active: boolean
}

const navItems: NavItem[] = [{ label: 'Dashboard', active: true }]

interface SidebarProps {
  theme: Theme
  onToggleTheme: () => void
}

export function Sidebar({ theme, onToggleTheme }: SidebarProps) {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="px-6 py-5">
        <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">Sentry</span>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
              item.active
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400'
                : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-3 dark:border-gray-800">
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm9-6a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 13a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2H4Zm14.95-6.36a1 1 0 0 1 0 1.41l-.7.71a1 1 0 1 1-1.42-1.41l.71-.71a1 1 0 0 1 1.41 0ZM7.17 17.24a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.7-.71a1 1 0 0 1 1.42 0ZM12 20a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm6.24-2.76a1 1 0 0 1 1.41 0l.71.7a1 1 0 1 1-1.41 1.42l-.71-.71a1 1 0 0 1 0-1.41ZM5.05 6.64a1 1 0 0 1 1.41 0l.71.71a1 1 0 0 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.273c-4.508 0-8.16-3.653-8.16-8.16 0-1.084.212-2.118.598-3.062a.75.75 0 0 0-.92-.99A9.968 9.968 0 0 0 2 12c0 5.523 4.477 10 10 10a9.968 9.968 0 0 0 8.894-5.183.75.75 0 0 0-.152-.972.75.75 0 0 0-.998.2Z" />
            </svg>
          )}
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </aside>
  )
}
