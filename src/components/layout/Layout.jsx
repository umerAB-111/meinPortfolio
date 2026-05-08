import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../navigation/Navbar'
import ThreeEnvironment from '../three/ThreeEnvironment'
import ErrorBoundary from '../ui/ErrorBoundary'

function Layout() {
  const { theme } = useSelector((state) => state.ui)

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <div className="min-h-screen bg-bg-primary relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>
      <ErrorBoundary>
        <ThreeEnvironment />
      </ErrorBoundary>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout