"use client";

<<<<<<< HEAD
import { useEffect, useState } from "react";
import Image from "next/image";
import { SkillsService, Skill } from "@/lib/api/skillsServices";

export default function Skills() {
  const [softSkills, setSoftSkills] = useState<Skill[]>([]);
  const [techSkills, setTechSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await SkillsService.getSkills();
        console.log("All skills from backend:", data);
        
        // Soft skills: category === "soft" YOKI percentage === 0
        const soft = data.filter((s: Skill) => s.category === "soft" || s.percentage === 0);
        // Technical skills: category !== "soft" VA percentage > 0
        const tech = data.filter((s: Skill) => s.category !== "soft" && (s.percentage || 0) > 0);
        
        setSoftSkills(soft);
        setTechSkills(tech);
      } catch (err) {
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "#9ca3af" }}>
        Loading skills...
      </div>
    );
  }

=======
import Image from "next/image";
import { skills as softSkillsMock } from "@/data/skills";
import TechnicalSkills from "./TechnicalSkills";

export default function Skills() {
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
  return (
    <section id="skills" className="section3">
      <div className="container">
        <h2>Skills & Expertise</h2>
<<<<<<< HEAD
        
        {/* Soft Skills - Card View */}
        <div className="skills">
          {softSkills.length > 0 ? (
            softSkills.map((skill) => (
              <div className="skill" key={skill.id}>
                <div className="skill-icon">
                  {skill.image_url ? (
                    <Image
                      src={skill.image_url}
                      alt={skill.name}
                      width={28}
                      height={28}
                    />
                  ) : (
                    <div style={{ fontSize: "24px" }}>✨</div>
                  )}
                </div>
                <span>{skill.name}</span>
                <p>{skill.description || "No description"}</p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1/-1", color: "#9ca3af", padding: "40px" }}>
              No soft skills added yet. Add them in admin panel.
            </p>
          )}
        </div>

        {/* Technical Skills - Progress Bar */}
        {techSkills.length > 0 && (
          <div className="technical">
            <h3>Technical Proficiency</h3>
            <div className="tech-grid">
              {techSkills.map((skill) => (
                <div className="tech-item" key={skill.id}>
                  <div className="tech-info">
                    <span>{skill.name}</span>
                    <span id="foiz">{skill.percentage || 0}%</span>
                  </div>
                  <div className="progress">
                    <div
                      className="bar"
                      style={{ width: `${skill.percentage || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
=======
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
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
