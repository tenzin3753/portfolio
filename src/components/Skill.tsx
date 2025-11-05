import React from "react";

const Skill: React.FC<{ name: string; level: number }> = ({ name, level }) => (
  <div>
    <div className="flex justify-between mb-1 text-sm">
      <span>{name}</span>
      <span>{level}%</span>
    </div>
    <div className="w-full bg-white/5 rounded-full h-2">
      <div className="h-2 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full" style={{ width: `${level}%` }} />
    </div>
  </div>
);

export default Skill;
