import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, selectFilteredProjects } from '../../store/slices/projectsSlice'
import { ExternalLink, Github } from 'lucide-react'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'devops', label: 'DevOps' },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-bg-secondary/50 border border-white/5 rounded-xl overflow-hidden hover:border-accent-cyan/30 transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.link}
            className="p-3 bg-accent-cyan text-bg-primary rounded-full hover:scale-110 transition-transform"
          >
            <ExternalLink size={20} />
          </a>
          <a
            href={project.github}
            className="p-3 bg-bg-tertiary text-text-primary rounded-full hover:scale-110 transition-transform"
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      <div className="p-6">
        <span className="text-xs font-mono text-accent-purple uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="text-xl font-heading font-semibold mt-2 mb-3 group-hover:text-accent-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-bg-tertiary text-accent-cyan text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const dispatch = useDispatch()
  const { filter } = useSelector((state) => state.projects)
  const filteredProjects = useSelector(selectFilteredProjects)

  return (
    <section id="projects" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4">
            Featured Projects
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => dispatch(setFilter(f.key))}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === f.key
                  ? 'bg-accent-cyan text-bg-primary'
                  : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection