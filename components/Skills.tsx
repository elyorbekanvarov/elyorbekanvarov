"use client";

import Image from "next/image";
import { skills as softSkillsMock } from "@/data/skills";
import TechnicalSkills from "./TechnicalSkills";

export default function Skills() {
  return (
    <section id="skills" className="section3">
      <div className="container">
        <h2>Skills & Expertise</h2>
        <div className="skills">
          {softSkillsMock.map((item) => (
            <div className="skill" key={item.id}>
              <div className="skill-icon">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={28}
                  height={28}
                />
              </div>
              <span>{item.title}</span>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
        <TechnicalSkills />
      </div>
    </section>
  );
}
