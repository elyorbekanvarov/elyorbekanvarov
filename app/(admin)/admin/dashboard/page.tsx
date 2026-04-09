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
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
      title: "Projects",
      value: stats.projects,
      icon: "🚀",
      iconBg: "linear-gradient(135deg, #4f46e5, #6366f1)",
      iconColor: "#fff",
      bg: "#eef2ff",
      borderColor: "#4f46e5",
      trend: "+12%",
      trendUp: true,
      subtitle: "Total portfolio projects",
    },
    {
      title: "Skills",
      value: stats.skills,
      icon: "⚡",
      iconBg: "linear-gradient(135deg, #10b981, #34d399)",
      iconColor: "#fff",
      bg: "#ecfdf5",
      borderColor: "#10b981",
      trend: "+8%",
      trendUp: true,
      subtitle: "Technical & soft skills",
    },
    {
      title: "Experience",
      value: stats.experiences,
      icon: "💼",
      iconBg: "linear-gradient(135deg, #f59e0b, #fbbf24)",
      iconColor: "#fff",
      bg: "#fffbeb",
      borderColor: "#f59e0b",
      trend: "+3",
      trendUp: true,
      subtitle: "Years of experience",
    },
    {
      title: "Messages",
      value: stats.contacts,
      icon: "💬",
      iconBg: "linear-gradient(135deg, #ef4444, #f87171)",
      iconColor: "#fff",
      bg: "#fef2f2",
      borderColor: "#ef4444",
      trend: "+5",
      trendUp: true,
      subtitle: "Unread messages",
    },
    {
      title: "About",
      value: stats.about,
      icon: "👤",
      iconBg: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
      iconColor: "#fff",
      bg: "#f5f3ff",
      borderColor: "#8b5cf6",
      trend: "Updated",
      trendUp: true,
      subtitle: "Profile sections",
    },
  ];

  const totalItems = stats.projects + stats.skills + stats.experiences + stats.contacts + stats.about;
  const completionRate = Math.round((totalItems / 100) * 100);

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
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="greeting-chip">
            <span className="greeting-emoji">👋</span>
            <span>{greeting}!</span>
          </div>
          <h1>
            Welcome to your <span className="gradient-text">Portfolio</span>
          </h1>
          <p>Track, manage, and grow your professional presence</p>
        </div>
        <div className="time-card">
          <div className="time-icon">🕐</div>
          <div className="time-info">
            <div className="time-value">{currentTime}</div>
            <div className="time-date">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {cards.map((card, index) => (
          <div 
            key={card.title} 
            className="stat-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="stat-card-header">
              <div className="stat-icon-wrapper" style={{ background: card.iconBg }}>
                <span className="stat-icon">{card.icon}</span>
              </div>
              <div className="stat-trend">
                <span className={`trend-badge ${card.trendUp ? 'up' : 'down'}`}>
                  {card.trendUp ? '↑' : '↓'} {card.trend}
                </span>
              </div>
            </div>
            <div className="stat-card-body">
              <h3 className="stat-value">{card.value}</h3>
              <p className="stat-title">{card.title}</p>
              <p className="stat-subtitle">{card.subtitle}</p>
            </div>
            <div className="stat-card-footer">
              <div className="stat-progress-bar">
                <div 
                  className="stat-progress-fill" 
                  style={{ 
                    width: `${Math.min((card.value / 20) * 100, 100)}%`,
                    background: card.iconBg 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="overview-card">
          <div className="overview-header">
            <h3>Portfolio Overview</h3>
            <span className="overview-badge">Live</span>
          </div>
          <div className="overview-stats">
            <div className="overview-stat">
              <span className="overview-stat-value">{totalItems}</span>
              <span className="overview-stat-label">Total Items</span>
            </div>
            <div className="overview-stat">
              <span className="overview-stat-value">{completionRate}%</span>
              <span className="overview-stat-label">Completion</span>
            </div>
            <div className="overview-stat">
              <span className="overview-stat-value">5</span>
              <span className="overview-stat-label">Categories</span>
            </div>
          </div>
          <div className="overview-progress">
            <div className="overview-progress-bar">
              <div 
                className="overview-progress-fill" 
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="overview-progress-text">Your portfolio is {completionRate}% complete</p>
          </div>
        </div>

        <div className="tips-card">
          <div className="tips-header">
            <span className="tips-icon">💡</span>
            <h3>Quick Tips</h3>
          </div>
          <ul className="tips-list">
            <li>✨ Keep your projects up to date</li>
            <li>📊 Add detailed descriptions to skills</li>
            <li>📝 Respond to contact messages promptly</li>
            <li>🎨 Update your profile regularly</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          padding: 24px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          min-height: calc(100vh - 80px);
          border-radius: 32px;
        }

        /* Hero Section */
        .hero-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .hero-content {
          flex: 1;
        }

        .greeting-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: white;
          border-radius: 40px;
          margin-bottom: 20px;
          font-weight: 600;
          color: #4f46e5;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(79, 70, 229, 0.2);
        }

        .greeting-emoji {
          font-size: 18px;
        }

        .hero-content h1 {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #4f46e5, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-content p {
          color: #64748b;
          font-size: 16px;
        }

        .time-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 24px;
          background: white;
          border-radius: 28px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(226, 232, 240, 0.6);
        }

        .time-icon {
          font-size: 32px;
        }

        .time-info {
          text-align: right;
        }

        .time-value {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          font-family: monospace;
        }

        .time-date {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border-radius: 28px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.15);
          border-color: #e2e8f0;
        }

        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .stat-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          font-size: 28px;
        }

        .trend-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .trend-badge.up {
          background: #ecfdf5;
          color: #10b981;
        }

        .trend-badge.down {
          background: #fef2f2;
          color: #ef4444;
        }

        .stat-card-body {
          margin-bottom: 20px;
        }

        .stat-value {
          font-size: 40px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .stat-title {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .stat-subtitle {
          font-size: 12px;
          color: #94a3b8;
        }

        .stat-card-footer {
          border-top: 1px solid #f1f5f9;
          padding-top: 16px;
        }

        .stat-progress-bar {
          height: 4px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
        }

        .stat-progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s ease;
        }

        /* Bottom Section */
        .bottom-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .overview-card, .tips-card {
          background: white;
          border-radius: 28px;
          padding: 24px;
          border: 1px solid #f1f5f9;
          transition: all 0.3s;
        }

        .overview-card:hover, .tips-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.1);
        }

        .overview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .overview-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
        }

        .overview-badge {
          padding: 4px 12px;
          background: #d1fae5;
          color: #059669;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .overview-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 24px;
        }

        .overview-stat {
          text-align: center;
        }

        .overview-stat-value {
          display: block;
          font-size: 28px;
          font-weight: 800;
          color: #4f46e5;
          margin-bottom: 6px;
        }

        .overview-stat-label {
          font-size: 12px;
          color: #64748b;
        }

        .overview-progress {
          margin-top: 16px;
        }

        .overview-progress-bar {
          height: 8px;
          background: #f1f5f9;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .overview-progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #4f46e5, #06b6d4);
          border-radius: 8px;
          transition: width 0.6s ease;
        }

        .overview-progress-text {
          font-size: 12px;
          color: #64748b;
          text-align: center;
        }

        .tips-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .tips-icon {
          font-size: 24px;
        }

        .tips-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tips-list li {
          padding: 10px 0;
          color: #475569;
          font-size: 14px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tips-list li:last-child {
          border-bottom: none;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .dashboard {
            padding: 20px;
          }
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 16px;
          }

          .hero-section {
            flex-direction: column;
            align-items: flex-start;
          }

          .time-card {
            width: 100%;
            justify-content: space-between;
          }

          .time-info {
            text-align: left;
          }

          .stats-grid {
            gap: 16px;
          }

          .bottom-section {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .stat-value {
            font-size: 32px;
          }
        }

        @media (max-width: 480px) {
          .dashboard {
            padding: 12px;
          }

          .stat-icon-wrapper {
            width: 48px;
            height: 48px;
          }

          .stat-icon {
            font-size: 24px;
          }

          .stat-value {
            font-size: 28px;
          }

          .overview-stats {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}