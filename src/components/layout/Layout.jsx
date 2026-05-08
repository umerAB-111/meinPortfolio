import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../navigation/Navbar'
import ThreeEnvironment from '../three/ThreeEnvironment'
import ErrorBoundary from '../ui/ErrorBoundary'

function Layout() {
  const { theme } = useSelector((state) => state.ui)

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }, [theme])

  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
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