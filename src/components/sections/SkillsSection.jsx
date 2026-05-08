import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React / Next.js", level: 75 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 70 },
      { name: "Three.js / WebGL", level: 65 },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Python", level: 85 },
      { name: "C++", level: 60 },
      { name: "PostgreSQL", level: 88 },
      { name: "GraphQL", level: 82 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 70 },
      { name: "Docker / K8s", level: 55 },
      { name: "CI/CD Pipelines", level: 82 },
      { name: "Terraform", level: 55 },
    ],
  },
  {
    title: "Design & Tools",
    skills: [
      { name: "Figma", level: 70 },
      { name: "Git", level: 75 },
      { name: "Agile/Scrum", level: 60 },
      { name: "Testing", level: 60 },
    ],
  },
];

function SkillCard({ category, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-bg-secondary/50 border border-white/5 rounded-xl p-6 hover:border-accent-purple/30 transition-colors duration-300"
    >
      <h3 className="text-lg font-heading font-semibold mb-6 text-accent-cyan">
        {category.title}
      </h3>
      <div className="space-y-4">
        {category.skills.map((skill, skillIndex) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-2">
              <span className="text-text-secondary">{skill.name}</span>
              <span className="text-accent-pink font-mono text-sm">
                {skill.level}%
              </span>
            </div>
            <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 0.8, delay: 0.2 + skillIndex * 0.1 }}
                className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-6 bg-bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-accent-pink font-mono text-sm tracking-widest uppercase">
            What I Know
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4">
            Technical Skills
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
