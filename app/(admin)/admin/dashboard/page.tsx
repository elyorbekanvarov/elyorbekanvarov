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
        const [projects, skills, experiences, contacts, about] =
          await Promise.all([
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
    {
      title: "Total Projects",
      value: stats.projects,
      icon: "📁",
      color: "#4f46e5",
      bg: "#eef2ff",
      gradient: "linear-gradient(135deg, #4f46e5, #6366f1)",
    },
    {
      title: "Tech Skills",
      value: stats.skills,
      icon: "💻",
      color: "#10b981",
      bg: "#ecfdf5",
      gradient: "linear-gradient(135deg, #10b981, #34d399)",
    },
    {
      title: "Experience",
      value: stats.experiences,
      icon: "🎓",
      color: "#f59e0b",
      bg: "#fffbeb",
      gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    },
    {
      title: "Contact Messages",
      value: stats.contacts,
      icon: "✉️",
      color: "#ef4444",
      bg: "#fef2f2",
      gradient: "linear-gradient(135deg, #ef4444, #f87171)",
    },
    {
      title: "About Sections",
      value: stats.about,
      icon: "👤",
      color: "#8b5cf6",
      bg: "#f5f3ff",
      gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
        <style jsx>{`
          .dashboard-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            gap: 16px;
          }
          .loading-spinner {
            width: 48px;
            height: 48px;
            border: 3px solid #e2e8f0;
            border-top-color: #4f46e5;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's an overview of your portfolio.</p>
      </div>

      <div className="stats-grid">
        {cards.map((card) => (
          <div key={card.title} className="stat-card">
            <div className="stat-icon" style={{ background: card.bg }}>
              <span style={{ fontSize: "32px" }}>{card.icon}</span>
            </div>
            <div className="stat-info">
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
            <div className="stat-trend">
              <span className="trend-up">↑</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .dashboard {
          padding: 8px;
        }
        .dashboard-header {
          margin-bottom: 32px;
        }
        .dashboard-header h1 {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #1e293b, #334155);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }
        .dashboard-header p {
          color: #64748b;
          font-size: 14px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }
        .stat-card {
          background: white;
          border-radius: 24px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
          box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.05),
            0 1px 2px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.1);
          border-color: #e2e8f0;
        }
        .stat-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-info {
          flex: 1;
        }
        .stat-info h3 {
          font-size: 32px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
        }
        .stat-info p {
          font-size: 14px;
          color: #64748b;
          margin-top: 4px;
        }
        .stat-trend {
          align-self: flex-start;
        }
        .trend-up {
          display: inline-block;
          padding: 4px 8px;
          background: #ecfdf5;
          color: #10b981;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        @media (max-width: 640px) {
          .stats-grid {
            gap: 16px;
          }
          .stat-card {
            padding: 20px;
          }
          .stat-icon {
            width: 52px;
            height: 52px;
          }
          .stat-info h3 {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}
