"use client";

import { useEffect, useState } from "react";
import { SkillsService, Skill } from "@/lib/api/skillsServices";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    percentage: 50,
    skillType: "technical",
  });

  const fetchSkills = async () => {
    try {
      const data = await SkillsService.getSkills();
      setSkills(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSave = async () => {
    try {
      const payload: Partial<Skill> = {
        name: form.name,
        description: form.description || "",
        category: form.skillType,
      };

      if (form.skillType === "technical") {
        payload.percentage = form.percentage;
      } else {
        payload.percentage = 0;
      }

      if (editing) {
        await SkillsService.putSkill(editing.id!, payload);
      } else {
        await SkillsService.postSkill(payload);
      }
      fetchSkills();
      setShowModal(false);
      setEditing(null);
      setForm({
        name: "",
        description: "",
        percentage: 50,
        skillType: "technical",
      });
    } catch (error: any) {
      console.error("Error saving skill:", error);
      alert("Error saving skill");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this skill?")) {
      await SkillsService.deleteSkill(id);
      fetchSkills();
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
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
    <div className="skills-page">
      <div className="page-header">
        <div className="header-title-section">
          <div className="title-badge">
            <span className="badge-icon">🎯</span>
            <span className="badge-text">Skills Library</span>
          </div>
          <h1>
            Master Your <span className="gradient-text">Craft</span>
          </h1>
          <p>Manage and showcase your professional expertise</p>
        </div>
        <button className="btn-create" onClick={() => setShowModal(true)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add New Skill
        </button>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon technical-icon">💻</div>
          <div className="stat-info">
            <h3>{skills.filter((s) => s.category === "technical").length}</h3>
            <p>Technical Skills</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon soft-icon">✨</div>
          <div className="stat-info">
            <h3>{skills.filter((s) => s.category === "soft").length}</h3>
            <p>Soft Skills</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total-icon">📊</div>
          <div className="stat-info">
            <h3>{skills.length}</h3>
            <p>Total Skills</p>
          </div>
        </div>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className={`skill-card ${skill.category === "soft" ? "soft" : "tech"} animate-in`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="card-glow"></div>
            <div className="skill-card-header">
              <div className="skill-icon-wrapper">
                <span className="skill-icon">
                  {skill.category === "soft" ? "✨" : "⚡"}
                </span>
              </div>
              <div className="skill-actions">
                <button
                  className="action-edit"
                  onClick={() => {
                    setEditing(skill);
                    setForm({
                      name: skill.name,
                      description: skill.description || "",
                      percentage: skill.percentage || 50,
                      skillType:
                        skill.category === "soft" ? "soft" : "technical",
                    });
                    setShowModal(true);
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 3l4 4-7 7H10v-4l7-7z" />
                    <path d="M4 20h16" />
                  </svg>
                </button>
                <button
                  className="action-delete"
                  onClick={() => handleDelete(skill.id!)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="skill-card-body">
              <h3 className="skill-name">{skill.name}</h3>
              {skill.description && (
                <p className="skill-description">{skill.description}</p>
              )}
              <div className="skill-meta">
                <div className="skill-badge-wrapper">
                  <span
                    className={`skill-badge ${skill.category === "soft" ? "soft" : "tech"}`}
                  >
                    <span className="badge-dot"></span>
                    {skill.category === "soft"
                      ? "Soft Skill"
                      : "Technical Skill"}
                  </span>
                </div>
                {skill.category !== "soft" && (
                  <div className="skill-level">
                    <div className="level-header">
                      <span className="level-label">Proficiency</span>
                      <span className="level-value">
                        {skill.percentage || 0}%
                      </span>
                    </div>
                    <div className="level-bar">
                      <div
                        className="level-fill"
                        style={{ width: `${skill.percentage || 0}%` }}
                      >
                        <div className="level-shine"></div>
                      </div>
                    </div>
                  </div>
                )}
                {skill.category === "soft" && (
                  <div className="soft-badge">
                    <span>🏆</span>
                    <span>Card View</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-badge">
                  {editing ? "✏️ Edit" : "✨ New"}
                </div>
                <h2>{editing ? "Edit Skill" : "Create New Skill"}</h2>
              </div>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>
                  Skill Name <span>*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g., React, Leadership, Communication"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe the skill in detail..."
                />
              </div>
              <div className="form-group">
                <label>Skill Type</label>
                <div className="type-selector">
                  <button
                    className={`type-option ${form.skillType === "technical" ? "active-tech" : ""}`}
                    onClick={() => setForm({ ...form, skillType: "technical" })}
                  >
                    <span>⚡</span>
                    <span>Technical</span>
                  </button>
                  <button
                    className={`type-option ${form.skillType === "soft" ? "active-soft" : ""}`}
                    onClick={() => setForm({ ...form, skillType: "soft" })}
                  >
                    <span>✨</span>
                    <span>Soft Skill</span>
                  </button>
                </div>
              </div>
              {form.skillType === "technical" && (
                <div className="form-group range-group">
                  <label>
                    Proficiency Level:{" "}
                    <strong className="range-value">{form.percentage}%</strong>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={form.percentage}
                    onChange={(e) =>
                      setForm({ ...form, percentage: parseInt(e.target.value) })
                    }
                  />
                  <div className="range-marks">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                    <span>Expert</span>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={handleSave}>
                <span>{editing ? "Update" : "Create"} Skill</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .skills-page {
          padding: 8px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: calc(100vh - 100px);
        }

        /* Header Section */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 24px;
        }

        .header-title-section {
          flex: 1;
        }

        .title-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border-radius: 40px;
          margin-bottom: 16px;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
        }

        .badge-icon {
          font-size: 14px;
        }

        .badge-text {
          font-size: 12px;
          font-weight: 600;
          color: white;
          letter-spacing: 0.5px;
        }

        .page-header h1 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #4f46e5, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-header p {
          color: #64748b;
          font-size: 16px;
          font-weight: 500;
        }

        /* Create Button */
        .btn-create {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          border: none;
          border-radius: 60px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .btn-create:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          background: linear-gradient(135deg, #1e293b, #334155);
        }

        /* Stats Cards */
        .stats-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 48px;
        }

        .stat-card {
          background: white;
          border-radius: 24px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(226, 232, 240, 0.6);
          transition: all 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .technical-icon {
          background: linear-gradient(135deg, #dbeafe, #eff6ff);
        }

        .soft-icon {
          background: linear-gradient(135deg, #fef3c7, #fffbeb);
        }

        .total-icon {
          background: linear-gradient(135deg, #e0e7ff, #f3e8ff);
        }

        .stat-info h3 {
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .stat-info p {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        /* Skills Grid */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 28px;
        }

        .skill-card {
          position: relative;
          background: white;
          border-radius: 28px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .skill-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.15);
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4f46e5, #c084fc, #4f46e5);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .skill-card:hover .card-glow {
          opacity: 1;
        }

        .skill-card.tech .card-glow {
          background: linear-gradient(90deg, #4f46e5, #818cf8);
        }

        .skill-card.soft .card-glow {
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
        }

        .skill-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px 24px 0 24px;
        }

        .skill-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }

        .skill-card.soft .skill-icon-wrapper {
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
        }

        .skill-icon {
          font-size: 32px;
        }

        .skill-actions {
          display: flex;
          gap: 8px;
        }

        .action-edit,
        .action-delete {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .action-edit {
          color: #f59e0b;
        }

        .action-edit:hover {
          background: #fef3c7;
          transform: scale(1.05);
          border-color: #f59e0b;
        }

        .action-delete {
          color: #ef4444;
        }

        .action-delete:hover {
          background: #fee2e2;
          transform: scale(1.05);
          border-color: #ef4444;
        }

        .skill-card-body {
          padding: 20px 24px 24px 24px;
        }

        .skill-name {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .skill-description {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .skill-meta {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .skill-badge-wrapper {
          display: inline-block;
        }

        .skill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 40px;
          font-size: 12px;
          font-weight: 600;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .skill-badge.soft {
          background: linear-gradient(135deg, #fef3c7, #fffbeb);
          color: #d97706;
        }

        .skill-badge.tech {
          background: linear-gradient(135deg, #eff6ff, #dbeafe);
          color: #2563eb;
        }

        .skill-level {
          margin-top: 4px;
        }

        .level-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .level-label {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .level-value {
          font-size: 13px;
          font-weight: 700;
          color: #4f46e5;
        }

        .level-bar {
          height: 8px;
          background: #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .level-fill {
          height: 100%;
          background: linear-gradient(90deg, #4f46e5, #818cf8);
          border-radius: 10px;
          position: relative;
          transition: width 0.6s ease;
        }

        .level-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shine 2s infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .soft-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: linear-gradient(135deg, #fef3c7, #fffbeb);
          border-radius: 40px;
          font-size: 12px;
          font-weight: 500;
          color: #d97706;
          width: fit-content;
        }

        /* Animation */
        .animate-in {
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

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          border-radius: 36px;
          width: 90%;
          max-width: 560px;
          max-height: 90vh;
          overflow: auto;
          box-shadow: 0 50px 70px -20px rgba(0, 0, 0, 0.3);
          animation: modalFadeIn 0.3s ease;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 28px 32px;
          border-bottom: 1px solid #f1f5f9;
        }

        .modal-badge {
          display: inline-block;
          padding: 4px 12px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .modal-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
        }

        .modal-close {
          background: #f1f5f9;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #64748b;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .modal-body {
          padding: 32px;
        }

        .form-group {
          margin-bottom: 28px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
        }

        .form-group label span {
          color: #ef4444;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e2e8f0;
          border-radius: 20px;
          font-size: 14px;
          transition: all 0.2s;
          background: #fafcff;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
          background: white;
        }

        /* Type Selector */
        .type-selector {
          display: flex;
          gap: 12px;
        }

        .type-option {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
        }

        .type-option.active-tech {
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border-color: #4f46e5;
          color: white;
        }

        .type-option.active-soft {
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          border-color: #f59e0b;
          color: white;
        }

        .range-group {
          margin-top: 8px;
        }

        .range-value {
          color: #4f46e5;
          font-size: 16px;
        }

        .range-group input {
          padding: 0;
          margin: 12px 0;
          accent-color: #4f46e5;
        }

        .range-marks {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #94a3b8;
          padding: 0 4px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px 32px 32px;
          border-top: 1px solid #f1f5f9;
        }

        .btn-cancel {
          padding: 12px 28px;
          background: #f1f5f9;
          border: none;
          border-radius: 60px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          background: #e2e8f0;
        }

        .btn-save {
          padding: 12px 32px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          border: none;
          border-radius: 60px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
        }

        .btn-save:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .stats-cards {
            grid-template-columns: 1fr;
          }

          .modal-body {
            padding: 24px;
          }

          .modal-header {
            padding: 24px;
          }

          .type-selector {
            flex-direction: column;
          }

          .page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-create {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .skill-card-header {
            padding: 20px 20px 0 20px;
          }

          .skill-card-body {
            padding: 16px 20px 20px;
          }

          .skill-name {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
