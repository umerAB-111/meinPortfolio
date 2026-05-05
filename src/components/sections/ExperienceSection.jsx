import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const experiences = [
  {
    company: 'Tech Innovators Inc.',
    role: 'Senior Full Stack Developer',
    period: '2022 - Present',
    description: 'Leading a team of 5 developers building enterprise SaaS solutions. Architecting microservices on AWS, implementing CI/CD pipelines, and mentoring junior developers.',
    tech: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker'],
  },
  {
    company: 'Digital Solutions Ltd.',
    role: 'Full Stack Developer',
    period: '2020 - 2022',
    description: 'Built and maintained multiple client-facing web applications. Reduced page load times by 60% through optimization and caching strategies.',
    tech: ['Next.js', 'Python', 'MongoDB', 'Redis'],
  },
  {
    company: 'StartupHub',
    role: 'Frontend Developer',
    period: '2018 - 2020',
    description: 'Developed responsive UIs for 15+ client projects. Created a component library that was adopted across multiple teams.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    company: 'WebCraft Agency',
    role: 'Junior Web Developer',
    period: '2016 - 2018',
    description: 'Started my professional journey building WordPress sites and progressively took on more complex JavaScript projects.',
    tech: ['JavaScript', 'PHP', 'WordPress', 'MySQL'],
  },
]

function ExperienceCard({ experience, index }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 border-l-2 border-accent-cyan/30"
    >
      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] bg-accent-cyan rounded-full border-4 border-bg-primary" />

      <div className="bg-bg-secondary/50 border border-white/5 rounded-xl p-6 mb-8 hover:border-accent-cyan/30 transition-colors duration-300">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-heading font-semibold text-accent-cyan">
              {experience.role}
            </h3>
            <p className="text-text-primary font-medium mt-1">{experience.company}</p>
          </div>
          <span className="px-3 py-1 bg-accent-purple/20 text-accent-purple text-sm rounded-full font-mono">
            {experience.period}
          </span>
        </div>

        <p className="text-text-secondary text-sm mb-4">{experience.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {experience.tech.map((t) => (
            <span key={t} className="px-3 py-1 bg-bg-tertiary text-accent-cyan text-xs rounded-full">
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors text-sm"
        >
          {expanded ? 'Show Less' : 'Show More'}
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </motion.div>
  )
}

function ExperienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase">
            Career Path
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4">
            Work Experience
          </h2>
        </motion.div>

        <div>
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection