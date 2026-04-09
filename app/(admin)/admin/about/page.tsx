"use client";

import { useEffect, useState } from "react";
import { AboutService, About } from "@/lib/api/aboutServices";

export default function AboutPage() {
  const [aboutList, setAboutList] = useState<About[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<About | null>(null);
  const [form, setForm] = useState({ name: "", role: "", bio: "" });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchAbout = async () => {
    try {
      const data = await AboutService.getAbout();
      setAboutList(data);
    } catch (error) {
      console.error("Error fetching about:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleSave = async () => {
    setMessage(null);
    try {
      const payload: Partial<About> = {
        name: form.name,
        role: form.role,
        bio: form.bio,
      };

      if (editing) {
        await AboutService.putAbout(editing.id!, payload);
        setMessage({ type: "success", text: "✨ Updated successfully!" });
      } else {
        await AboutService.postAbout(payload);
        setMessage({ type: "success", text: "🎉 Created successfully!" });
      }
      fetchAbout();
      setShowModal(false);
      setEditing(null);
      setForm({ name: "", role: "", bio: "" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error("Error saving about:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message || "❌ Error saving. Please try again.",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await AboutService.deleteAbout(id);
      fetchAbout();
      setDeleteId(null);
      setMessage({ type: "success", text: "🗑️ Deleted successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error deleting about:", error);
      setMessage({
        type: "error",
        text: "❌ Error deleting. Please try again.",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing content...</p>
        <style jsx>{`
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
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="floating-badge">
            <span className="badge-pulse"></span>
            <span>✨ About Cards</span>
          </div>
          <h1>
            Meet the <span className="gradient-text">Team</span>
          </h1>
          <p>Create and manage professional profiles for your portfolio</p>
        </div>
        <button
          className="floating-btn"
          onClick={() => {
            setEditing(null);
            setForm({ name: "", role: "", bio: "" });
            setShowModal(true);
          }}
        >
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
          <span>Add New Card</span>
        </button>
      </div>

      {/* Alert Toast */}
      {message && (
        <div className={`toast toast-${message.type}`}>
          <div className="toast-icon">
            {message.type === "success" ? "🎉" : "⚠️"}
          </div>
          <div className="toast-content">
            <p>{message.text}</p>
          </div>
          <button className="toast-close" onClick={() => setMessage(null)}>
            ×
          </button>
        </div>
      )}

      {/* Stats Section */}
      <div className="stats-wrapper">
        <div className="stat-item">
          <div className="stat-circle purple">
            <span>📇</span>
          </div>
          <div className="stat-data">
            <h3>{aboutList.length}</h3>
            <p>Total Cards</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-circle blue">
            <span>💼</span>
          </div>
          <div className="stat-data">
            <h3>{aboutList.filter((a) => a.role).length}</h3>
            <p>With Roles</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-circle green">
            <span>📝</span>
          </div>
          <div className="stat-data">
            <h3>
              {aboutList.reduce((sum, a) => sum + (a.bio?.length || 0), 0)}
            </h3>
            <p>Total Chars</p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      {aboutList.length === 0 ? (
        <div className="empty-hero">
          <div className="empty-illustration">🎨</div>
          <h3>No cards created yet</h3>
          <p>Start building your team by creating your first about card</p>
          <button
            className="empty-btn"
            onClick={() => {
              setEditing(null);
              setForm({ name: "", role: "", bio: "" });
              setShowModal(true);
            }}
          >
            ✨ Create First Card
          </button>
        </div>
      ) : (
        <div className="cards-grid">
          {aboutList.map((item, index) => (
            <div
              key={item.id}
              className="glass-card"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Decorative elements */}
              <div className="card-shine"></div>
              <div className="card-border"></div>

              {/* Header */}
              <div className="card-header">
                <div className="avatar-wrapper">
                  <div className="avatar-ring"></div>
                  <div className="avatar">
                    <span>{item.name?.charAt(0).toUpperCase() || "?"}</span>
                  </div>
                </div>
                <div className="action-buttons">
                  <button
                    className="icon-btn edit"
                    onClick={() => {
                      setEditing(item);
                      setForm({
                        name: item.name,
                        role: item.role || "",
                        bio: item.bio,
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
                    className="icon-btn delete"
                    onClick={() => setDeleteId(item.id!)}
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

              {/* Body */}
              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                {item.role && (
                  <div className="role-chip">
                    <span>💼</span>
                    <span>{item.role}</span>
                  </div>
                )}
                <p className="card-description">
                  {item.bio?.length > 120
                    ? item.bio.substring(0, 120) + "..."
                    : item.bio}
                </p>
              </div>

              {/* Footer */}
              <div className="card-footer">
                <div className="footer-item">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Profile Card</span>
                </div>
                <div className="footer-item">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <div className="modal-badge">{editing ? "✏️" : "✨"}</div>
                <h2>{editing ? "Edit Profile" : "Create Profile"}</h2>
              </div>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g., Sarah Johnson"
                />
              </div>
              <div className="input-group">
                <label>Role / Title</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g., Creative Director"
                />
              </div>
              <div className="input-group">
                <label>Bio / Description</label>
                <textarea
                  rows={5}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell your story..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                {editing ? "Update Card" : "Create Card"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div
            className="modal-glass delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-icon">🗑️</div>
            <h3>Delete Card?</h3>
            <p>
              This action cannot be undone. All data will be permanently
              removed.
            </p>
            <div className="delete-actions">
              <button
                className="cancel-delete"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="confirm-delete"
                onClick={() => handleDelete(deleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .about-page {
          padding: 28px;
          background: radial-gradient(
            circle at 0% 0%,
            #f8fafc 0%,
            #eef2ff 100%
          );
          min-height: calc(100vh - 80px);
        }

        /* Hero Section */
        .hero-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 24px;
        }

        .hero-content {
          flex: 1;
        }

        .floating-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(79, 70, 229, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 40px;
          margin-bottom: 20px;
          border: 1px solid rgba(79, 70, 229, 0.2);
          position: relative;
        }

        .badge-pulse {
          width: 8px;
          height: 8px;
          background: #4f46e5;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        .hero-content h1 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #4f46e5, #c084fc, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-content p {
          color: #64748b;
          font-size: 16px;
        }

        .floating-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          border: none;
          border-radius: 60px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .floating-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
        }

        /* Toast */
        .toast {
          position: fixed;
          top: 100px;
          right: 28px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.1);
          z-index: 1001;
          animation: slideInRight 0.3s ease;
          border-left: 4px solid;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .toast-success {
          border-left-color: #10b981;
        }

        .toast-error {
          border-left-color: #ef4444;
        }

        .toast-icon {
          font-size: 20px;
        }

        .toast-content p {
          font-size: 14px;
          font-weight: 500;
        }

        .toast-close {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #94a3b8;
        }

        /* Stats */
        .stats-wrapper {
          display: flex;
          gap: 20px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .stat-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: white;
          border-radius: 28px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(226, 232, 240, 0.6);
          transition: all 0.3s;
        }

        .stat-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.1);
        }

        .stat-circle {
          width: 56px;
          height: 56px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .stat-circle.purple {
          background: linear-gradient(135deg, #e0e7ff, #ede9fe);
        }

        .stat-circle.blue {
          background: linear-gradient(135deg, #dbeafe, #eff6ff);
        }

        .stat-circle.green {
          background: linear-gradient(135deg, #d1fae5, #ecfdf5);
        }

        .stat-data h3 {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
        }

        .stat-data p {
          font-size: 13px;
          color: #64748b;
        }

        /* Cards Grid */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 28px;
        }

        .glass-card {
          position: relative;
          background: white;
          border-radius: 32px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 40px -20px rgba(0, 0, 0, 0.2);
        }

        .card-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.6s;
        }

        .glass-card:hover .card-shine {
          left: 100%;
        }

        .card-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4f46e5, #c084fc, #f472b6);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .glass-card:hover .card-border {
          opacity: 1;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 28px 28px 0 28px;
        }

        .avatar-wrapper {
          position: relative;
        }

        .avatar-ring {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4f46e5, #c084fc);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .glass-card:hover .avatar-ring {
          opacity: 1;
        }

        .avatar {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          color: white;
          position: relative;
          z-index: 1;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .icon-btn.edit {
          background: #fef3c7;
          color: #d97706;
        }

        .icon-btn.edit:hover {
          background: #fde68a;
          transform: scale(1.05);
        }

        .icon-btn.delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .icon-btn.delete:hover {
          background: #fecaca;
          transform: scale(1.05);
        }

        .card-body {
          padding: 20px 28px;
        }

        .card-title {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .role-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: #f1f5f9;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 500;
          color: #4f46e5;
          margin-bottom: 16px;
        }

        .card-description {
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          padding: 16px 28px 24px;
          border-top: 1px solid #f1f5f9;
        }

        .footer-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #94a3b8;
        }

        /* Empty State */
        .empty-hero {
          text-align: center;
          padding: 80px 40px;
          background: white;
          border-radius: 48px;
          border: 2px dashed #e2e8f0;
        }

        .empty-illustration {
          font-size: 80px;
          margin-bottom: 24px;
        }

        .empty-hero h3 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .empty-hero p {
          color: #64748b;
          margin-bottom: 32px;
        }

        .empty-btn {
          padding: 12px 28px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-glass {
          background: white;
          border-radius: 40px;
          width: 100%;
          max-width: 540px;
          max-height: 90vh;
          overflow: auto;
          animation: modalPop 0.3s ease;
        }

        @keyframes modalPop {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .delete-modal {
          text-align: center;
          max-width: 400px;
          padding: 32px;
        }

        .delete-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .delete-modal h3 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .delete-modal p {
          color: #64748b;
          margin-bottom: 24px;
        }

        .delete-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .cancel-delete {
          padding: 10px 24px;
          background: #f1f5f9;
          border: none;
          border-radius: 40px;
          cursor: pointer;
        }

        .confirm-delete {
          padding: 10px 24px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 32px;
          border-bottom: 1px solid #f1f5f9;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .modal-badge {
          font-size: 28px;
        }

        .modal-title h2 {
          font-size: 24px;
          font-weight: 700;
        }

        .modal-close {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          background: #f1f5f9;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .modal-body {
          padding: 32px;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
        }

        .input-group input,
        .input-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e2e8f0;
          border-radius: 20px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .input-group input:focus,
        .input-group textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px 32px 32px;
          border-top: 1px solid #f1f5f9;
        }

        .cancel-btn {
          padding: 12px 28px;
          background: #f1f5f9;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
        }

        .save-btn {
          padding: 12px 32px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .about-page {
            padding: 20px;
          }

          .stats-wrapper {
            flex-direction: column;
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }

          .hero-section {
            flex-direction: column;
            align-items: flex-start;
          }

          .floating-btn {
            width: 100%;
            justify-content: center;
          }

          .toast {
            top: auto;
            bottom: 20px;
            right: 20px;
            left: 20px;
          }
        }
      `}</style>
    </div>
  );
}
