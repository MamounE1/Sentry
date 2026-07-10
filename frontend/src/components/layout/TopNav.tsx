import { useEffect, useRef, useState } from 'react'

interface TopNavProps {
  title: string
  userEmail: string | null
  onSignOut: () => void
}

const disabledItems = ['Profile', 'Account Settings']

export function TopNav({ title, userEmail, onSignOut }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const avatarLetter = (userEmail?.[0] ?? '?').toUpperCase()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-8 dark:border-neutral-800 dark:bg-neutral-950">
      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</span>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-800 text-xs font-semibold text-white dark:bg-navy-300 dark:text-navy-900"
        >
          {avatarLetter}
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-9 w-56 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
            {userEmail && (
              <div className="border-b border-neutral-100 px-3 py-2 dark:border-neutral-800">
                <p className="text-xs text-neutral-400 dark:text-neutral-500">Signed in as</p>
                <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {userEmail}
                </p>
              </div>
            )}

            {disabledItems.map((item) => (
              <button
                key={item}
                type="button"
                disabled
                title="Coming soon"
                className="w-full cursor-not-allowed px-3 py-2 text-left text-sm text-neutral-400 dark:text-neutral-600"
              >
                {item}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                onSignOut()
              }}
              className="w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
