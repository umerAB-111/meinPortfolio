import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import SkillsSection from '../components/sections/SkillsSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import ContactSection from '../components/sections/ContactSection'

function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-accent-cyan border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </motion.div>
  )
}

export default Home