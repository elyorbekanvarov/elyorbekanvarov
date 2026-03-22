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
      const payload = {
        name: form.name,
        description: form.description || "",
        percentage: form.percentage,
      };
      if (editing) {
        await SkillsService.putSkill(editing.id!, payload);
      } else {
        await SkillsService.postSkill(payload);
      }
      fetchSkills();
      setShowModal(false);
      setEditing(null);
      setForm({ name: "", description: "", percentage: 50 });
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
        <div>
          <h1>Skills Library</h1>
          <p>Organize and manage your technical expertise</p>
        </div>
        <button className="btn-create" onClick={() => setShowModal(true)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Skill
        </button>
      </div>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <div className="skill-card-header">
              <div className="skill-icon-wrapper">
                <span className="skill-icon">💻</span>
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
                <div className="skill-level">
                  <div className="level-bar">
                    <div
                      className="level-fill"
                      style={{ width: `${skill.percentage || 0}%` }}
                    ></div>
                  </div>
                  <span className="level-value">{skill.percentage || 0}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? "Edit Skill" : "Create New Skill"}</h2>
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
                  placeholder="e.g., React, Leadership"
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
                  placeholder="Describe the skill..."
                />
              </div>
              <div className="form-group range-group">
                <label>
                  Proficiency Level: <strong>{form.percentage}%</strong>
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
                  <span>Expert</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={handleSave}>
                Save Skill
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .skills-page {
          padding: 8px;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .page-header h1 {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #0f172a, #334155);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }
        .page-header p {
          color: #64748b;
          font-size: 14px;
        }
        .btn-create {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
        }
        .btn-create:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.35);
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .skill-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.3s;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
        }
        .skill-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.1);
          border-color: #e2e8f0;
        }
        .skill-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 20px 20px 0 20px;
        }
        .skill-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
        }
        .skill-icon {
          font-size: 28px;
        }
        .skill-actions {
          display: flex;
          gap: 8px;
        }
        .action-edit,
        .action-delete {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          border: none;
        }
        .action-edit {
          color: #f59e0b;
        }
        .action-edit:hover {
          background: #fef3c7;
          transform: scale(1.05);
        }
        .action-delete {
          color: #ef4444;
        }
        .action-delete:hover {
          background: #fee2e2;
          transform: scale(1.05);
        }
        .skill-card-body {
          padding: 16px 20px 20px 20px;
        }
        .skill-name {
          font-size: 18px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .skill-description {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .skill-meta {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .skill-level {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .level-bar {
          flex: 1;
          height: 8px;
          background: #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }
        .level-fill {
          height: 100%;
          background: linear-gradient(90deg, #4f46e5, #818cf8);
          border-radius: 10px;
          transition: width 0.3s;
        }
        .level-value {
          font-size: 12px;
          font-weight: 600;
          color: #4f46e5;
          min-width: 40px;
          text-align: right;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          border-radius: 32px;
          width: 90%;
          max-width: 520px;
          max-height: 90vh;
          overflow: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: modalFadeIn 0.2s ease;
        }
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 28px;
          border-bottom: 1px solid #f1f5f9;
        }
        .modal-header h2 {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #94a3b8;
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .modal-close:hover {
          background: #f1f5f9;
          color: #475569;
        }
        .modal-body {
          padding: 28px;
        }
        .form-group {
          margin-bottom: 24px;
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
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          font-size: 14px;
          transition: all 0.2s;
          background: #fafcff;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
          background: white;
        }
        .range-group {
          margin-top: 8px;
        }
        .range-group input {
          padding: 0;
          margin: 12px 0;
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
          padding: 20px 28px;
          border-top: 1px solid #f1f5f9;
        }
        .btn-cancel {
          padding: 10px 24px;
          background: #f1f5f9;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s;
        }
        .btn-cancel:hover {
          background: #e2e8f0;
        }
        .btn-save {
          padding: 10px 28px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
        }
        .btn-save:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
          .modal-body {
            padding: 20px;
          }
          .modal-header {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
