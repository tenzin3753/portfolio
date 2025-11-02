import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type Project = { id: number; title: string; desc: string; tech: string; repo?: string; featured?: boolean };
type Dot = { x: number; y: number };

const NAME = "Tenzin Choeyang";
const EMAIL = "tenzinchoeyang3753@gmail.com";
const GITHUB = "https://github.com/tenzin3753";
const LINKEDIN = "https://www.linkedin.com/in/tenzin-1-choeyang/";


const projectsInitial: Project[] = [
  {
    id: 1,
    title: "Fitness Anatomy Guide",
    desc: "Interactive anatomy-based fitness web app.",
    tech: "React, TypeScript, Framer Motion",
    repo: "https://github.com/tenzin3753/fitness-anatomy-guide",
  },
  {
    id: 2,
    title: "SpidyType",
    desc: "Typing speed tool with WPM and accuracy metrics.",
    tech: "HTML, CSS, JavaScript",
    repo: "https://github.com/tenzin3753/spidytype",
  },
  {
    id: 3,
    title: "Ticket App",
    desc: "A Flutter-based ticket booking application with modern UI and barcode integration.",
    tech: "Flutter, Dart, Material Design",
    repo: "https://github.com/tenzin3753/ticket_app",
    featured: true,
  },
];

const TAIL_LENGTH = 9;

const PortfolioApp: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => (typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark"));
  const [showMenu, setShowMenu] = useState(false);
  const [projects] = useState<Project[]>(projectsInitial);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove(theme === "dark" ? "light" : "dark");
    html.classList.add(theme);
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    document.title = `${NAME} • Portfolio`;
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    (metaDesc as HTMLMetaElement).name = 'description';
    (metaDesc as HTMLMetaElement).content = 'Portfolio showcasing React, Flutter and full-stack projects by Tenzin Choeyang.';
    if (!document.querySelector('meta[name="description"]')) document.head.appendChild(metaDesc as Node);
    const og = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    (og as HTMLMetaElement).setAttribute('property', 'og:title');
    (og as HTMLMetaElement).content = `${NAME} | Portfolio`;
    if (!document.querySelector('meta[property="og:title"]')) document.head.appendChild(og as Node);
  }, []);

  // Mouse tail / custom cursor
  const [dots, setDots] = useState<Dot[]>(Array.from({ length: TAIL_LENGTH }, () => ({ x: -100, y: -100 })));
  const rafRef = useRef<number | null>(null);
  const hoverEnabledRef = useRef<boolean>(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setDots((prev) => {
        const copy = prev.slice();
        copy[0] = { x, y };
        for (let i = 1; i < copy.length; i++) {
          copy[i] = {
            x: copy[i].x + (copy[i - 1].x - copy[i].x) * 0.35,
            y: copy[i].y + (copy[i - 1].y - copy[i].y) * 0.35,
          };
        }
        return copy;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      setDots((prev) => {
        const copy = prev.slice();
        for (let i = 1; i < copy.length; i++) {
          copy[i] = {
            x: copy[i].x + (copy[i - 1].x - copy[i].x) * 0.2,
            y: copy[i].y + (copy[i - 1].y - copy[i].y) * 0.2,
          };
        }
        return copy;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Scroll progress
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / (h || 1)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, scrolled)));
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLFormElement & { name?: HTMLInputElement; message?: HTMLTextAreaElement };
    const name = target.name?.value || '';
    const message = target.message?.value || '';
    const subject = encodeURIComponent(`${name} — Portfolio contact`);
    const body = encodeURIComponent(message + "\n\nSent from portfolio contact form.");
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>

        <div className="fixed inset-0 -z-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 opacity-60" />

        <div className="fixed top-0 left-0 right-0 h-1 z-50">
          <div className="h-1 bg-indigo-400/40 w-full" />
          <div className="h-1 bg-indigo-400" style={{ width: `${scrollProgress}%` }} />
        </div>

        <div className="pointer-events-none fixed inset-0 z-[60]">
          {dots.map((d, i) => (
            <span
              key={i}
              style={{ left: `${d.x - 6}px`, top: `${d.y - 6}px`, opacity: 1 - i / dots.length }}
              className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-indigo-400' : 'bg-pink-400'} blur-sm transform-gpu`}
            />
          ))}
        </div>

        <header
          className={`w-full z-50 sticky top-0 ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          } transition-colors duration-300 shadow-sm`}
        >
          <div className="max-w-6xl mx-auto p-4 flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xl font-extrabold tracking-tight">PORTFOLIO</div>
              <div className="hidden sm:block text-sm opacity-70">{NAME}</div>
            </div>

            {/* Hamburger for small screens */}
            <button
              className="sm:hidden p-2 rounded-md border border-gray-500/20"
              onClick={() => setShowMenu(!showMenu)}
            >
              ☰
            </button>

            <nav
              className={`${
                showMenu ? "flex" : "hidden sm:flex"
              } w-full sm:w-auto flex-col sm:flex-row items-start sm:items-center 
              gap-4 sm:gap-6 mt-4 sm:mt-0 
              ${theme === "dark" ? "bg-gray-900" : "bg-white"} 
              sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none transition-all duration-300`}
            >
              <a href="#projects" className="block text-sm py-2 sm:py-0 hover:underline">Projects</a>
              <a href="#contact" className="block text-sm py-2 sm:py-0 hover:underline">Contact</a>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="block text-sm py-2 sm:py-0 underline">GitHub</a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="block text-sm py-2 sm:py-0 underline">LinkedIn</a>

              <button
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                className="mt-3 sm:mt-0 p-2 rounded-md bg-gray-200 dark:bg-gray-800/60 sm:w-auto w-full text-center"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            </nav>
          </div>
        </header>


        <main className="max-w-6xl mx-auto p-6 z-10">

          <section className="grid md:grid-cols-2 gap-8 items-center py-12">
            <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 80 }} viewport={{ once: true }}>
              <h1 className="text-4xl font-bold mb-3">Hi, I’m {NAME}.</h1>
              <p className="mb-4 max-w-xl opacity-80">Motivated B.Tech Computer Science student with hands-on experience in full-stack development. I build interactive web apps focused on usability, performance, and polished UI/UX.</p>

              <div className="flex gap-3 items-center">
                <a href="/TENZIN_CHOEYANG.pdf" download className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:scale-[1.01] transition-transform">Download Resume</a>
                <a href={GITHUB} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md border">View GitHub</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center md:justify-end items-center z-30"
            >
              <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
                {/* Gradient Glow Behind */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center -z-10"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 via-pink-500 to-purple-500 blur-[100px] opacity-80"></div>
                </motion.div>

                {/* Profile Image */}
                <img
                  src={`${import.meta.env.BASE_URL}profile.jpg`}
                  alt="Tenzin Choeyang"
                  className="w-full h-full rounded-full shadow-2xl object-cover border-4 border-indigo-300 relative z-20"
                />
              </div>
            </motion.div>




          </section>

          <motion.section id="projects" className="py-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-semibold mb-6">Projects</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((p) => (
                p.featured ? (
                  <FeaturedProjectCard key={p.id} project={p} />
                ) : (
                  <motion.article key={p.id} whileHover={{ y: -6 }} className="p-4 rounded-2xl bg-white/5 backdrop-blur-md shadow-md border border-white/5">
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="text-sm opacity-80 mt-2">{p.desc}</p>
                    <div className="text-xs mt-3 opacity-70">{p.tech}</div>
                    <div className="mt-4 flex gap-2">
                      <a href={p.repo || GITHUB} target="_blank" rel="noreferrer" className="text-sm px-3 py-1 rounded-md border hover:bg-white/5">GitHub</a>
                    </div>
                  </motion.article>
                )
              ))}
            </div>
          </motion.section>

          <section id="skills" className="py-12">
            <h2 className="text-2xl font-semibold mb-6">Skills</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Programming Languages", items: ["JavaScript", "Python", "Dart"] },
                { title: "Frontend Technologies", items: ["HTML", "CSS", "React", "Tailwind CSS"] },
                { title: "Backend & Database", items: ["Node.js", "Express.js", "MongoDB", "Firebase"] },
                { title: "Mobile Development", items: ["Flutter"] },
                { title: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "Postman"] },
              ].map((cat, i) => (
                <SkillCategory key={i} title={cat.title} items={cat.items} />
              ))}
            </div>

          </section>

          <motion.section id="contact" className="py-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-semibold mb-6">Contact</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.form onSubmit={handleContact} initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md shadow-md">
                <label className="block mb-2 text-sm">Your Name</label>
                <input name="name" className="w-full p-2 rounded-md mb-3 bg-transparent border" placeholder="Your name" />

                <label className="block mb-2 text-sm">Message</label>
                <textarea name="message" rows={6} className="w-full p-2 rounded-md mb-3 bg-transparent border" placeholder="Write your message..."></textarea>

                <div className="flex gap-3 items-center">
                  <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white">Send via Email</button>
                  <a href={`mailto:${EMAIL}`} className="text-sm opacity-80">Or open email client</a>
                </div>
              </motion.form>

              <motion.div initial={{ scale: 0.98, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="p-6 rounded-2xl bg-gradient-to-br from-gray-700/40 to-gray-500/10">
                <h3 className="font-semibold">Get in touch</h3>
                <p className="text-sm opacity-80 mt-2">Email: <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a></p>
                <p className="text-sm opacity-80 mt-2">Location: Kullu, HP</p>

                <div className="flex gap-3 mt-6">
                  <a href={GITHUB} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md border">GitHub</a>
                  <a href={LINKEDIN} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md border">LinkedIn</a>
                </div>
              </motion.div>
            </div>
          </motion.section>

        </main>

        <footer className="border-t mt-12 py-6">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm opacity-80">
            <div>© {new Date().getFullYear()} {NAME} — Built with React + Tailwind</div>
            <div>Made with ❤️ — <a href={GITHUB} target="_blank" rel="noreferrer" className="underline">GitHub</a></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioApp;

function ThemeToggle({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="relative w-14 h-8 rounded-full p-1 bg-gray-200 dark:bg-gray-700 flex items-center"
    >
      <motion.div
        layout
        initial={false}
        animate={{ x: theme === 'dark' ? 0 : 26 }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className="w-6 h-6 rounded-full bg-white shadow-md"
      />
    </button>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <motion.article whileHover={{ y: -8 }} className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-indigo-700/40 to-pink-700/30 shadow-2xl border border-white/10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/3 rounded-xl overflow-hidden bg-gray-800/30 flex items-center justify-center h-48">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Ticket App Logo"
            className="object-contain w-32 h-32 md:w-40 md:h-40 p-2"
          />
        </div>


        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <div className="text-xs opacity-80">Featured</div>
          </div>

          <p className="mt-3 opacity-80">{project.desc}</p>
          <div className="mt-4 text-sm opacity-70">{project.tech}</div>

          <div className="mt-6 flex gap-3">
            <a href={project.repo} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md bg-white/5 border">View Code</a>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md border">More on GitHub</a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SkillCategory({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
      <h3 className="text-lg font-semibold mb-3 text-indigo-300">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {items.map((skill, i) => (
          <span key={i} className="px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/6 text-sm font-medium">{skill}</span>
        ))}
      </div>
    </motion.div>
  );
}

function Skill({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="text-sm">{name}</div>
        <div className="text-xs opacity-80">{level}%</div>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
        <div className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-pink-400" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}
