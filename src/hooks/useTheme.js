import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Remembers light/dark mode and applies it to the <html> tag
export function useTheme() {
  const [theme, setTheme] = useLocalStorage('theme', getSystemTheme())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}