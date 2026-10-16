import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

// Small logo: a rising training curve inside a rounded square
function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <rect width="32" height="32" rx="9" className="fill-accent" />
      <path
        d="M7 22 L13 16 L17 19 L25 9"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-on-accent"
      />
      <circle cx="25" cy="9" r="2.2" className="fill-on-accent" />
    </svg>
  )
}

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5 font-semibold">
          <Logo />
          <span>ML Experiment Tracker</span>
        </a>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface/70 text-muted transition-colors hover:border-accent hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
      </nav>
    </header>
  )
}

export default Navbar