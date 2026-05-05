import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { setMobileMenuOpen, toggleTheme } from '../../store/slices/uiSlice'
import { Menu, X, Sun, Moon } from 'lucide-react'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

function Navbar() {
  const dispatch = useDispatch()
  const { mobileMenuOpen, theme } = useSelector((state) => state.ui)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    dispatch(setMobileMenuOpen(false))
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-glass py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-heading font-bold text-gradient"
        >
          EP.
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-accent-cyan transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <button
          onClick={() => dispatch(setMobileMenuOpen(!mobileMenuOpen))}
          className="md:hidden text-text-primary p-2"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-lg bg-bg-secondary border border-white/10 hover:border-accent-cyan/50 transition-colors"
          aria-label="Toggle theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-bg-secondary border-t border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-text-secondary hover:text-accent-cyan transition-colors duration-300 text-lg"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar