import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormData,
  submitForm,
  submitFormSuccess,
  submitFormError,
  resetForm,
} from "../../store/slices/contactSlice";
import emailjs from "@emailjs/browser";
import {
  Send,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const dispatch = useDispatch();
  const { formData, status } = useSelector((state) => state.contact);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(submitForm());

      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => dispatch(submitFormSuccess()),
          (error) => dispatch(submitFormError(error.text))
        );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-accent-pink font-mono text-sm tracking-widest uppercase">
            Let's Talk
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4">
            Contact Me
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-bg-secondary/50 border border-white/5 rounded-xl p-8">
              <h3 className="text-xl font-heading font-semibold mb-6 text-accent-cyan">
                Send a Message
              </h3>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-accent-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-accent-cyan" size={36} />
                  </div>
                  <h4 className="text-2xl font-heading font-semibold mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-text-secondary mb-6">
                    I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => dispatch(resetForm())}
                    className="text-accent-cyan hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
                      Failed to send. Please try again or email me directly.
                    </div>
                  )}
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-bg-tertiary border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors ${
                        errors.name ? "border-red-500" : "border-white/10"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-bg-tertiary border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors ${
                        errors.email ? "border-red-500" : "border-white/10"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full bg-bg-tertiary border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors resize-none ${
                        errors.message ? "border-red-500" : "border-white/10"
                      }`}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 bg-accent-cyan text-bg-primary font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-cyan/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <div className="w-5 h-5 border-2 border-bg-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-bg-secondary/50 border border-white/5 rounded-xl p-8">
              <h3 className="text-xl font-heading font-semibold mb-6 text-accent-cyan">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-cyan/10 rounded-lg flex items-center justify-center">
                    <Mail className="text-accent-cyan" size={20} />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Email</p>
                    <p className="text-text-primary">
                      abdellaomer165@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-purple/10 rounded-lg flex items-center justify-center">
                    <Phone className="text-accent-purple" size={20} />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Phone</p>
                    <p className="text-text-primary">+491638306796</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-pink/10 rounded-lg flex items-center justify-center">
                    <MapPin className="text-accent-pink" size={20} />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Location</p>
                    <p className="text-text-primary">Germany, Russelsheim</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary/50 border border-white/5 rounded-xl p-8">
              <h3 className="text-xl font-heading font-semibold mb-6 text-accent-cyan">
                Connect
              </h3>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-14 h-14 bg-bg-tertiary border border-white/10 rounded-lg flex items-center justify-center hover:border-accent-cyan/50 hover:bg-accent-cyan/10 transition-all duration-300"
                  >
                    <social.icon
                      className="text-text-secondary hover:text-accent-cyan"
                      size={22}
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 border border-accent-cyan/20 rounded-xl p-8 text-center">
              <h3 className="text-xl font-heading font-semibold mb-2">
                Open for Opportunities
              </h3>
              <p className="text-text-secondary text-sm">
                Currently looking for new challenges. Let's create something
                amazing together!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
