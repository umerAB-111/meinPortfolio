import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

const stats = [
  { number: "2+", label: "Years Experience" },
  { number: "5+", label: "Projects Completed" },
  { number: "10+", label: "Happy Clients" },
  { number: "15+", label: "Technologies" },
];

function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent-cyan font-mono text-sm tracking-wider">
            01. About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              I'm a passionate Full Stack Developer with over 2 years of
              experience building scalable web applications and digital
              products. My expertise spans from beautiful frontend interfaces to
              robust backend systems.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              I believe in writing clean, maintainable code and following best
              practices. When I'm not coding, you'll find me exploring new
              technologies, contributing to open-source projects, or mentoring
              aspiring developers.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              My goal is to transform complex problems into elegant solutions
              that deliver real value to users and businesses alike.
            </p>

            <div className="pt-4">
              <h3 className="text-xl font-heading font-semibold mb-4 text-accent-cyan">
                What I Do
              </h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent-cyan rounded-full" />
                  Frontend Development with React & Next.js
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent-purple rounded-full" />
                  Backend APIs & Microservices
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent-pink rounded-full" />
                  Cloud Architecture & DevOps
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent-cyan rounded-full" />
                  UI/UX Design & Implementation
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="bg-bg-secondary/50 border border-white/5 rounded-xl p-6 text-center hover:border-accent-cyan/30 transition-colors duration-300"
              >
                <div className="text-4xl font-heading font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
