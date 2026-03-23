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
            width: 40px;
            height: 40px;
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
      <div className="page-header">
        <div>
          <h1>Experience</h1>
          <p>Manage your professional journey</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <span>+</span> Add Experience
        </button>
      </div>

      <div className="timeline-container">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="experience-header">
                <div>
                  <h3>{item.role}</h3>
                  <p className="company">{item.company}</p>
                </div>
                <div className="experience-actions">
                  <button
                    className="btn-edit"
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
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.id!)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="date">
                {item.start_date}{" "}
                {item.end_date ? `— ${item.end_date}` : "— Present"}
              </div>
              <p className="description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? "Edit Experience" : "Add Experience"}</h2>
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
                  Role <span>*</span>
                </label>
                <input
                  placeholder="Full Stack Developer"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>
                  Company <span>*</span>
                </label>
                <input
                  placeholder="Company Name"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>
                  Start Date <span>*</span>
                </label>
                <input
                  placeholder="Jan 2020"
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  placeholder="Present or Dec 2023"
                  value={form.end_date}
                  onChange={(e) =>
                    setForm({ ...form, end_date: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>
                  Description <span>*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your role and achievements..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .experience-page {
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
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #1e293b, #334155);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 4px;
        }
        .page-header p {
          color: #64748b;
          font-size: 14px;
        }
        .btn-primary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
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
          width: 2px;
          background: linear-gradient(180deg, #4f46e5, #818cf8);
          transform: translateX(-50%);
        }
        .timeline-item {
          position: relative;
          margin-bottom: 40px;
          width: 50%;
        }
        .timeline-item.left {
          left: 0;
          padding-right: 40px;
        }
        .timeline-item.right {
          left: 50%;
          padding-left: 40px;
        }
        .timeline-dot {
          position: absolute;
          top: 0;
          width: 12px;
          height: 12px;
          background: #4f46e5;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2);
        }
        .timeline-item.left .timeline-dot {
          right: -6px;
        }
        .timeline-item.right .timeline-dot {
          left: -6px;
        }
        .timeline-content {
          background: white;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
          transition: all 0.2s;
        }
        .timeline-content:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1);
        }
        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .experience-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .company {
          font-size: 14px;
          color: #4f46e5;
          font-weight: 500;
        }
        .date {
          font-size: 12px;
          color: #94a3b8;
          margin-bottom: 12px;
          display: inline-block;
          padding: 2px 8px;
          background: #f1f5f9;
          border-radius: 20px;
        }
        .description {
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
        }
        .experience-actions {
          display: flex;
          gap: 8px;
        }
        .btn-edit,
        .btn-delete {
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
        }
        .btn-edit {
          background: #fef3c7;
          color: #d97706;
          border: none;
        }
        .btn-edit:hover {
          background: #fde68a;
        }
        .btn-delete {
          background: #fee2e2;
          color: #dc2626;
          border: none;
        }
        .btn-delete:hover {
          background: #fecaca;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          border-radius: 24px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
        }
        .modal-header h2 {
          font-size: 20px;
          font-weight: 600;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }
        .modal-body {
          padding: 24px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #334155;
          margin-bottom: 6px;
        }
        .form-group label span {
          color: #ef4444;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4f46e5;
        }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 16px 24px;
          border-top: 1px solid #e2e8f0;
        }
        .btn-secondary {
          padding: 10px 20px;
          background: #f1f5f9;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .timeline-container::before {
            left: 24px;
          }
          .timeline-item {
            width: 100%;
            left: 0 !important;
            padding-left: 48px !important;
            padding-right: 0 !important;
          }
          .timeline-item.left .timeline-dot,
          .timeline-item.right .timeline-dot {
            left: 18px;
            right: auto;
          }
        }
      `}</style>
    </div>
  );
}
