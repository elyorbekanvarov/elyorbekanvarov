"use client";

import Image from "next/image";
import { heroData } from "@/data/hero";

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section1 container">
      <div className="section1-two-divs">
        <div className="section1-title">
          <div className="hello-title">
            <span>{heroData.badge}</span>
          </div>
          <h1>{heroData.title}</h1>
          <p>{heroData.description}</p>

          <div className="section1-btns">
            <button onClick={scrollToProjects}>View My Work</button>
            <button onClick={scrollToContact}>Contact Me</button>
          </div>

          <div className="section1-links">
            {heroData.socials.map((social) => (
              <a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={social.icon} alt="icon" width={24} height={24} />
              </a>
            ))}
          </div>
        </div>

        <div className="section1-img">
          <Image
            src={heroData.image.src}
            alt={heroData.image.alt}
            width={506}
            height={504}
            priority
            loading="eager"
          />
        </div>
      </div>

      <a className="section1-bottom" href="#about">
        <Image
          src={heroData.scrollIcon}
          alt="bottom icon"
          width={24}
          height={24}
        />
      </a>
    </section>
  );
}