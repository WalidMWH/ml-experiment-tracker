import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <HomePage />
      </div>
      <footer className="border-t border-line py-6 text-center text-sm text-muted">
        Built by Walid Halabi with React, Vite and Tailwind CSS
      </footer>
    </div>
  )
}

export default App