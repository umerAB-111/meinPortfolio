import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative px-6"
    >
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-accent-cyan font-mono text-sm tracking-wider">
            {"<Hello />"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6"
        >
          I'm a <span className="text-gradient">Full Stack</span>
          <br />
          Developer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Crafting exceptional digital experiences with cutting-edge
          technologies. Specialized in React, Node.js, and cloud architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-accent-cyan text-bg-primary font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-cyan/30 transition-all duration-300 hover:-translate-y-1"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-accent-purple text-accent-purple font-semibold rounded-lg hover:bg-accent-purple/10 transition-all duration-300 hover:-translate-y-1"
          >
            Get In Info
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="text-accent-cyan" size={32} />
      </motion.div>
    </section>
  );
}

export default HeroSection;
