interface LogoMarkProps {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 8 5 5 7 5 7 7 9 7 12 3 15 7 17 7 17 5 19 5 19 8 18 14 12 21 6 14Z" />
    </svg>
  )
}
