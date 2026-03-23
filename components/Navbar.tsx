<<<<<<< HEAD
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav>
        <div className="nav container">
          <div className="logo">
            <span>Elyorbek</span>
          </div>

          <ul className="nav-links">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>

          <div className="hire-me">
            <Link href="/login">Login</Link>
          </div>

          <button
            className="menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} onClick={handleLinkClick}>
                  {item.name}
                </a>
              </li>
            ))}
            <li className="mobile-login">
              <Link href="/login" onClick={handleLinkClick}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <style jsx>{`
        .menu-btn {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 24px;
          color: white;
          z-index: 100;
          transition: all 0.3s ease;
        }
        .menu-btn:hover {
          color: #7c3aed;
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(15, 15, 30, 0.98);
          backdrop-filter: blur(10px);
          transform: translateY(-100%);
          transition: transform 0.4s ease;
          z-index: 99;
          padding: 80px 20px 40px;
          border-bottom: 1px solid rgba(124, 58, 237, 0.2);
        }
        .mobile-menu.open {
          transform: translateY(0);
        }
        .mobile-menu ul {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 0;
          margin: 0;
        }
        .mobile-menu li {
          width: 100%;
          text-align: center;
        }
        .mobile-menu li a {
          display: block;
          padding: 12px 20px;
          font-size: 18px;
          font-weight: 500;
          color: #d1d5dc;
          text-decoration: none;
          transition: all 0.3s ease;
          border-radius: 12px;
        }
        .mobile-menu li a:hover {
          background: rgba(124, 58, 237, 0.15);
          color: #7c3aed;
        }
        .mobile-login a {
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          color: white !important;
          margin-top: 16px;
          padding: 14px 24px;
          border-radius: 40px;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .menu-btn {
            display: block;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none;
          }
        }
      `}</style>
    </>
=======
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
          <Link href={"login"}>Login</Link>
        </div>
      </div>
    </nav>
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
  );
}
