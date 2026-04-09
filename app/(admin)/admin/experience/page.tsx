"use client";

import { useEffect, useState } from "react";
import { ExperiencesService, Experience } from "@/lib/api/experiencesServices";

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState({
    role: "",
    company: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const fetchData = async () => {
    try {
      const data = await ExperiencesService.getExperiences();
      setItems(data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!form.role || !form.company || !form.description || !form.start_date) {
      alert("Please fill all required fields");
      return;
    }
    try {
      if (editing) {
        await ExperiencesService.putExperience(editing.id!, form);
      } else {
        await ExperiencesService.postExperience(form);
      }
      fetchData();
      setShowModal(false);
      setEditing(null);
      setForm({
        role: "",
        company: "",
        description: "",
        start_date: "",
        end_date: "",
      });
    } catch (error: any) {
      console.error("Error saving experience:", error);
      alert("Error saving experience");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this experience?")) {
      await ExperiencesService.deleteExperience(id);
      fetchData();
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
    <div className="experience-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-left">
          <div className="title-badge">
            <span className="badge-icon">💼</span>
            <span>Career Journey</span>
          </div>
          <h1>Professional <span className="gradient-text">Experience</span></h1>
          <p>Showcase your work history and achievements</p>
        </div>
        <button className="btn-create" onClick={() => setShowModal(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>Add Experience</span>
        </button>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 13.5A3.5 3.5 0 0 0 17.5 10h-5.5L8 21h3.5l4.5-7h3.5a3.5 3.5 0 0 0 1.5-6.5Z" />
              <path d="M12 3v4" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{items.length}</h3>
            <p>Total Positions</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{items.filter(i => !i.end_date).length}</h3>
            <p>Current Position</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9-4-18-3 9H2" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Years</h3>
            <p>Of Experience</p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-wrapper">
        <div className="timeline-container">
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-animation">📋</div>
              <h3>No experience yet</h3>
              <p>Add your professional experience to showcase your career journey</p>
              <button className="btn-primary" onClick={() => setShowModal(true)}>
                + Add Experience
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={item.id}
                className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              >
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-line"></div>
                </div>
                <div className="timeline-content">
                  <div className="experience-card">
                    <div className="card-header">
                      <div className="company-icon">
                        <span>🏢</span>
                      </div>
                      <div className="company-info">
                        <h3>{item.role}</h3>
                        <p className="company-name">{item.company}</p>
                      </div>
                      <div className="card-actions">
                        <button
                          className="action-edit"
                          onClick={() => {
                            setEditing(item);
                            setForm({
                              role: item.role,
                              company: item.company,
                              description: item.description,
                              start_date: item.start_date,
                              end_date: item.end_date || "",
                            });
                            setShowModal(true);
                          }}
                          title="Edit"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3l4 4-7 7H10v-4l7-7z" />
                            <path d="M4 20h16" />
                          </svg>
                        </button>
                        <button
                          className="action-delete"
                          onClick={() => handleDelete(item.id!)}
                          title="Delete"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="date-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{item.start_date}</span>
                        <span>—</span>
                        <span>{item.end_date || "Present"}</span>
                      </div>
                      <p className="description">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-badge">{editing ? "✏️ Edit" : "✨ New"}</div>
                <h2>{editing ? "Edit Experience" : "Add Experience"}</h2>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Job Title <span>*</span></label>
                <input
                  placeholder="e.g., Senior Frontend Developer"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Company <span>*</span></label>
                <input
                  placeholder="e.g., Google, Microsoft"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Start Date <span>*</span></label>
                  <input
                    placeholder="Jan 2020"
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  />
                </div>
                <div className="form-group half">
                  <label>End Date</label>
                  <input
                    placeholder="Present or Dec 2023"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description <span>*</span></label>
                <textarea
                  rows={5}
                  placeholder="Describe your responsibilities, achievements, and technologies used..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSave}>
                {editing ? "Update" : "Create"} Experience
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .experience-page {
          padding: 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: calc(100vh - 80px);
          border-radius: 32px;
        }

        /* Header Section */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 24px;
        }

        .header-left {
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

        .title-badge span:last-child {
          font-size: 12px;
          font-weight: 600;
          color: white;
          letter-spacing: 0.5px;
        }

        .page-header h1 {
          font-size: clamp(28px, 4vw, 40px);
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
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .btn-create:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          background: linear-gradient(135deg, #1e293b, #334155);
        }

        /* Stats Grid */
        .stats-grid {
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
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.purple {
          background: linear-gradient(135deg, #e0e7ff, #f3e8ff);
          color: #7c3aed;
        }

        .stat-icon.blue {
          background: linear-gradient(135deg, #dbeafe, #eff6ff);
          color: #2563eb;
        }

        .stat-icon.green {
          background: linear-gradient(135deg, #d1fae5, #ecfdf5);
          color: #059669;
        }

        .stat-info h3 {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .stat-info p {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 80px 40px;
          background: white;
          border-radius: 32px;
          border: 1px solid #f1f5f9;
        }

        .empty-animation {
          font-size: 80px;
          margin-bottom: 24px;
        }

        .empty-state h3 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .empty-state p {
          color: #64748b;
          margin-bottom: 32px;
        }

        /* Timeline */
        .timeline-wrapper {
          position: relative;
        }

        .timeline-container {
          position: relative;
          padding: 20px 0;
        }

        .timeline-container::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #4f46e5, #c084fc, #4f46e5);
          transform: translateX(-50%);
          border-radius: 3px;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 48px;
          width: 50%;
        }

        .timeline-item.left {
          left: 0;
          padding-right: 48px;
        }

        .timeline-item.right {
          left: 50%;
          padding-left: 48px;
        }

        .timeline-marker {
          position: absolute;
          top: 24px;
          width: 100%;
        }

        .timeline-item.left .timeline-marker {
          right: -6px;
        }

        .timeline-item.right .timeline-marker {
          left: -6px;
        }

        .marker-dot {
          width: 16px;
          height: 16px;
          background: #4f46e5;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2), 0 0 0 8px rgba(79, 70, 229, 0.1);
          position: absolute;
          top: 0;
        }

        .timeline-item.left .marker-dot {
          right: -8px;
        }

        .timeline-item.right .marker-dot {
          left: -8px;
        }

        .timeline-content {
          animation: fadeInUp 0.5s ease forwards;
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

        .experience-card {
          background: white;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
          transition: all 0.3s;
        }

        .experience-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.1);
          border-color: #e2e8f0;
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }

        .company-icon {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }

        .company-info {
          flex: 1;
        }

        .company-info h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .company-name {
          font-size: 14px;
          color: #4f46e5;
          font-weight: 500;
        }

        .card-actions {
          display: flex;
          gap: 8px;
        }

        .action-edit, .action-delete {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .action-edit {
          background: #fef3c7;
          color: #d97706;
        }

        .action-edit:hover {
          background: #fde68a;
          transform: scale(1.05);
        }

        .action-delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .action-delete:hover {
          background: #fecaca;
          transform: scale(1.05);
        }

        .card-body {
          padding-left: 68px;
        }

        .date-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: #f1f5f9;
          border-radius: 40px;
          font-size: 12px;
          font-weight: 500;
          color: #475569;
          margin-bottom: 16px;
        }

        .description {
          font-size: 14px;
          color: #475569;
          line-height: 1.7;
        }

        /* Modal */
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
          padding: 16px;
        }

        .modal {
          background: white;
          border-radius: 32px;
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow: auto;
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
        }

        .modal-body {
          padding: 32px;
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

        .form-group input, .form-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .form-row {
          display: flex;
          gap: 16px;
        }

        .form-group.half {
          flex: 1;
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
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .experience-page {
            padding: 20px;
          }
        }

        @media (max-width: 768px) {
          .experience-page {
            padding: 16px;
          }

          .timeline-container::before {
            left: 24px;
          }

          .timeline-item {
            width: 100%;
            left: 0 !important;
            padding-left: 56px !important;
            padding-right: 0 !important;
          }

          .timeline-item.left .marker-dot,
          .timeline-item.right .marker-dot {
            left: 16px;
            right: auto;
          }

          .card-body {
            padding-left: 0;
            margin-top: 16px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-create {
            justify-content: center;
          }

          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }

        @media (max-width: 480px) {
          .experience-page {
            padding: 12px;
          }

          .card-header {
            flex-wrap: wrap;
          }

          .company-info h3 {
            font-size: 16px;
          }

          .modal-body {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}