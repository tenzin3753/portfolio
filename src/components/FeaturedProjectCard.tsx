import React from "react";
import { motion } from "framer-motion";

type Project = {
  id: number;
  title: string;
  desc: string;
  tech: string;
  repo?: string;
  featured?: boolean;
};

const GITHUB = "https://github.com/tenzin3753";

const FeaturedProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <motion.article
    whileHover={{ y: -8 }}
    className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-indigo-700/40 to-pink-700/30 shadow-2xl border border-white/10"
  >
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

export default FeaturedProjectCard;
