export type Project = { id: number; title: string; desc: string; tech: string; repo?: string; featured?: boolean };

export const projectsInitial: Project[] = [
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
