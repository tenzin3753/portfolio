import React from "react";
import { motion } from "framer-motion";

const ThemeToggle: React.FC<{ theme: string; setTheme: (t: string) => void }> = ({ theme, setTheme }) => (
  <button
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    aria-label="Toggle theme"
    className="relative w-14 h-8 rounded-full p-1 bg-gray-200 dark:bg-gray-700 flex items-center"
  >
    <motion.div
      layout
      initial={false}
      animate={{ x: theme === "dark" ? 0 : 26 }}
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
      className="w-6 h-6 rounded-full bg-white shadow-md"
    />
  </button>
);

export default ThemeToggle;
