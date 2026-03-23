"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SkillsService, Skill } from "@/lib/api/skillsServices";
import TechnicalSkills from "./TechnicalSkills";

export default function Skills() {
  const [softSkills, setSoftSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await SkillsService.getSkills();
        console.log("All skills from backend:", data);

        const soft = data.filter(
          (s: Skill) => s.category === "soft" || s.percentage === 0,
        );

        setSoftSkills(soft);
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

  return (
    <section id="skills" className="section3">
      <div className="container">
        <h2>Skills & Expertise</h2>
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
            <p
              style={{
                textAlign: "center",
                gridColumn: "1/-1",
                color: "#9ca3af",
                padding: "40px",
              }}
            >
              No soft skills added yet. Add them in admin panel.
            </p>
          )}
        </div>
        <TechnicalSkills />
      </div>
    </section>
  );
}
