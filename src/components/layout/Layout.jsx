import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../navigation/Navbar'
import ThreeEnvironment from '../three/ThreeEnvironment'

function Layout() {
  const { theme } = useSelector((state) => state.ui)

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
      <ThreeEnvironment />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout