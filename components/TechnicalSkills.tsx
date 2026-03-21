"use client";
import { useEffect, useState } from "react";
import { SkillsService, Skill } from "@/lib/api/skillsServices";
export default function TechnicalSkills() {
  const [techSkills, setTechSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechSkills = async () => {
      try {
        const data = await SkillsService.getSkills();
        const tech = data.filter((s: Skill) => s.category !== "soft");
        setTechSkills(tech);
      } catch (err) {
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTechSkills();
  }, []);

  if (loading) {
    return <p>Loading technical skills...</p>;
  }
  return (
    <div className="technical">
      <h3>Technical Proficiency</h3>
      <div className="tech-grid">
        {techSkills.length > 0 ? (
          techSkills.map((skill) => (
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
          ))
        ) : (
          <p>No technical skills found. Add them in admin panel.</p>
        )}
      </div>
    </div>
  );
}
