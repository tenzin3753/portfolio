import React from "react";
import { motion } from "framer-motion";

const SkillCategory: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
    <h3 className="text-lg font-semibold mb-3 text-indigo-300">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {items.map((skill, i) => (
        <span key={i} className="px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/6 text-sm font-medium">{skill}</span>
      ))}
    </div>
  </motion.div>
);

export default SkillCategory;
