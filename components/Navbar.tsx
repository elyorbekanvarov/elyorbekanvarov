import Link from "next/link";
export default function Navbar() {
  return (
    <nav>
      <div className="nav container">
        <div className="logo">
          <span>Elyorbek</span>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="hire-me">
          <Link href={"login"}>Hire Me</Link>
        </div>
      </div>
    </nav>
  );
}
