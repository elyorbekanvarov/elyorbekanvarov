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
    { title: "Projects", value: stats.projects, icon: "🚀", iconBg: "linear-gradient(135deg, #4f46e5, #6366f1)", trend: "+12%", trendUp: true, subtitle: "Total projects" },
    { title: "Skills", value: stats.skills, icon: "⚡", iconBg: "linear-gradient(135deg, #10b981, #34d399)", trend: "+8%", trendUp: true, subtitle: "Technical & soft" },
    { title: "Experience", value: stats.experiences, icon: "💼", iconBg: "linear-gradient(135deg, #f59e0b, #fbbf24)", trend: "+3", trendUp: true, subtitle: "Work positions" },
    { title: "Messages", value: stats.contacts, icon: "💬", iconBg: "linear-gradient(135deg, #ef4444, #f87171)", trend: "+5", trendUp: true, subtitle: "Contact messages" },
    { title: "About", value: stats.about, icon: "👤", iconBg: "linear-gradient(135deg, #8b5cf6, #a78bfa)", trend: "Updated", trendUp: true, subtitle: "Profile cards" },
  ];

  const totalItems = stats.projects + stats.skills + stats.experiences + stats.contacts + stats.about;
  const completionRate = Math.min(Math.round((totalItems / 50) * 100), 100);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="greeting-chip">
            <span>👋</span>
            <span>{greeting}!</span>
          </div>
          <h1>Welcome to your <span>Portfolio</span></h1>
          <p>Track, manage, and grow your professional presence</p>
        </div>
        <div className="time-card">
          <div className="time-icon">🕐</div>
          <div className="time-info">
            <div className="time-value">{currentTime}</div>
            <div className="time-date">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {cards.map((card, index) => (
          <div key={card.title} className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon-wrapper" style={{ background: card.iconBg }}>
                <span>{card.icon}</span>
              </div>
              <div className="stat-trend">
                <span className={`trend-badge ${card.trendUp ? 'up' : 'down'}`}>
                  {card.trendUp ? '↑' : '↓'} {card.trend}
                </span>
              </div>
            </div>
            <div className="stat-card-body">
              <h3>{card.value}</h3>
              <p className="stat-title">{card.title}</p>
              <p className="stat-subtitle">{card.subtitle}</p>
            </div>
            <div className="stat-card-footer">
              <div className="stat-progress-bar">
                <div className="stat-progress-fill" style={{ width: `${Math.min((card.value / 20) * 100, 100)}%`, background: card.iconBg }} />
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
              <div className="overview-progress-fill" style={{ width: `${completionRate}%` }} />
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
          padding: 16px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          min-height: calc(100vh - 80px);
          width: 100%;
          overflow-x: hidden;
        }

        /* Loading */
        .loading-container {
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
          to { transform: rotate(360deg); }
        }

        /* Hero Section */
        .hero-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .hero-content {
          flex: 1;
          min-width: 200px;
        }

        .greeting-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: white;
          border-radius: 40px;
          margin-bottom: 16px;
          font-weight: 600;
          color: #4f46e5;
          font-size: 14px;
          border: 1px solid rgba(79, 70, 229, 0.2);
        }

        .hero-content h1 {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .hero-content h1 span {
          background: linear-gradient(135deg, #4f46e5, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-content p {
          color: #64748b;
          font-size: 14px;
        }

        .time-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .time-icon {
          font-size: 28px;
        }

        .time-value {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
        }

        .time-date {
          font-size: 11px;
          color: #64748b;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: white;
          border-radius: 20px;
          padding: 20px;
          transition: all 0.3s;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.1);
        }

        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .trend-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .trend-badge.up {
          background: #ecfdf5;
          color: #10b981;
        }

        .stat-card-body h3 {
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .stat-title {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .stat-subtitle {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 4px;
        }

        .stat-card-footer {
          border-top: 1px solid #f1f5f9;
          padding-top: 14px;
          margin-top: 14px;
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
          gap: 16px;
        }

        .overview-card, .tips-card {
          background: white;
          border-radius: 20px;
          padding: 20px;
          border: 1px solid #f1f5f9;
        }

        .overview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .overview-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }

        .overview-badge {
          padding: 4px 10px;
          background: #d1fae5;
          color: #059669;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
        }

        .overview-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .overview-stat {
          text-align: center;
          flex: 1;
          min-width: 70px;
        }

        .overview-stat-value {
          display: block;
          font-size: 24px;
          font-weight: 800;
          color: #4f46e5;
          margin-bottom: 4px;
        }

        .overview-stat-label {
          font-size: 11px;
          color: #64748b;
        }

        .overview-progress-bar {
          height: 6px;
          background: #f1f5f9;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .overview-progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #4f46e5, #06b6d4);
          border-radius: 6px;
          transition: width 0.6s ease;
        }

        .overview-progress-text {
          font-size: 11px;
          color: #64748b;
          text-align: center;
        }

        .tips-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .tips-icon {
          font-size: 22px;
        }

        .tips-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tips-list li {
          padding: 8px 0;
          color: #475569;
          font-size: 13px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 8px;
          word-break: break-word;
        }

        .tips-list li:last-child {
          border-bottom: none;
        }

        /* Responsive Breakpoints */
        @media (min-width: 1200px) {
          .dashboard {
            padding: 24px;
          }
          .stats-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }
          .stat-card-body h3 {
            font-size: 36px;
          }
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 12px;
          }

          .hero-section {
            flex-direction: column;
            align-items: flex-start;
          }

          .time-card {
            width: 100%;
            justify-content: space-between;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .bottom-section {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .stat-card {
            padding: 16px;
          }

          .stat-card-body h3 {
            font-size: 28px;
          }

          .stat-icon-wrapper {
            width: 44px;
            height: 44px;
            font-size: 22px;
          }

          .overview-stats {
            justify-content: space-between;
          }
        }

        @media (max-width: 480px) {
          .dashboard {
            padding: 8px;
          }

          .hero-content h1 {
            font-size: 20px;
          }

          .greeting-chip {
            padding: 4px 12px;
            font-size: 12px;
          }

          .time-card {
            padding: 10px 16px;
          }

          .time-icon {
            font-size: 24px;
          }

          .time-value {
            font-size: 16px;
          }

          .stat-card {
            padding: 14px;
          }

          .stat-card-body h3 {
            font-size: 24px;
          }

          .stat-title {
            font-size: 13px;
          }

          .stat-icon-wrapper {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .trend-badge {
            font-size: 10px;
            padding: 3px 8px;
          }

          .overview-card, .tips-card {
            padding: 16px;
          }

          .overview-stat-value {
            font-size: 20px;
          }

          .tips-list li {
            font-size: 12px;
            padding: 6px 0;
          }
        }

        @media (max-width: 360px) {
          .stat-card-header {
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .overview-stats {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          
          .overview-stat {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}