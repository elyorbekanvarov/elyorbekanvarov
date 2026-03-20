"use client";

import { useEffect, useState } from "react";
import { ProjectsService } from "@/lib/api/projectsServices";
import { SkillsService } from "@/lib/api/skillsServices";
import { ExperiencesService } from "@/lib/api/experiencesServices";
import { ContactService } from "@/lib/api/contactServices";
import { AboutService } from "@/lib/api/aboutServices";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    contacts: 0,
    about: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills, experiences, contacts, about] = await Promise.all([
          ProjectsService.getProjects(),
          SkillsService.getSkills(),
          ExperiencesService.getExperiences(),
          ContactService.getContacts(),
          AboutService.getAbout(),
        ]);

        setStats({
          projects: projects.length,
          skills: skills.length,
          experiences: experiences.length,
          contacts: contacts.length,
          about: about.length,
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Total Projects", value: stats.projects, icon: "📁", color: "#4f46e5" },
    { title: "Tech Skills", value: stats.skills, icon: "💻", color: "#10b981" },
    { title: "Experience", value: stats.experiences, icon: "🎓", color: "#f59e0b" },
    { title: "Contact Messages", value: stats.contacts, icon: "✉️", color: "#ef4444" },
    { title: "About Sections", value: stats.about, icon: "👤", color: "#8b5cf6" },
  ];

  if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}>Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
        {cards.map((card) => (
          <div key={card.title} style={{ background: "white", borderRadius: "20px", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div>
              <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>{card.value}</h2>
              <p style={{ color: "#6b7280", marginTop: "8px" }}>{card.title}</p>
            </div>
            <div style={{ fontSize: "40px" }}>{card.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}