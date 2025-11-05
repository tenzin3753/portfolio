import React from "react";

type HeaderProps = {
  theme: string;
  setTheme: (t: string) => void;
  showMenu: boolean;
  setShowMenu: (s: boolean) => void;
};

const GITHUB = "https://github.com/tenzin3753";
const LINKEDIN = "https://www.linkedin.com/in/tenzin-1-choeyang/";

const Header: React.FC<HeaderProps> = ({ theme, setTheme, showMenu, setShowMenu }) => (
  <header className="sticky top-0 z-50 bg-gray-900 text-white">
    <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
      <div className="text-xl font-bold">PORTFOLIO</div>
      <button className="sm:hidden p-2 border" onClick={() => setShowMenu(!showMenu)}>☰</button>
      <nav className={`${showMenu ? "flex" : "hidden sm:flex"} gap-4`}>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "☀️" : "🌙"}</button>
      </nav>
    </div>
  </header>
);

export default Header;
