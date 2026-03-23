"use client";

import { useEffect, useState } from "react";
import { AboutService, About } from "@/lib/api/aboutServices";

export default function AboutPage() {
<<<<<<< HEAD
  const [aboutList, setAboutList] = useState<About[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<About | null>(null);
  const [form, setForm] = useState({ name: "", role: "", bio: "" });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
=======
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", bio: "" });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b

  const fetchAbout = async () => {
    try {
      const data = await AboutService.getAbout();
<<<<<<< HEAD
      setAboutList(data);
=======
      if (data && data.length > 0) {
        const item = data[0];
        setAbout(item);
        setForm({
          name: item.name || "",
          role: item.role || "",
          bio: item.bio || "",
        });
      }
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
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
<<<<<<< HEAD
    setMessage(null);
    try {
      const payload: Partial<About> = {
        name: form.name,
        role: form.role,
        bio: form.bio,
      };
      
      if (editing) {
        await AboutService.putAbout(editing.id!, payload);
        setMessage({ type: "success", text: "Updated successfully!" });
      } else {
        await AboutService.postAbout(payload);
        setMessage({ type: "success", text: "Created successfully!" });
      }
      fetchAbout();
      setShowModal(false);
      setEditing(null);
      setForm({ name: "", role: "", bio: "" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error("Error saving about:", error);
      setMessage({ type: "error", text: error.response?.data?.message || "Error saving. Please try again." });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await AboutService.deleteAbout(id);
      fetchAbout();
      setDeleteId(null);
      setMessage({ type: "success", text: "Deleted successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error deleting about:", error);
      setMessage({ type: "error", text: "Error deleting. Please try again." });
      setTimeout(() => setMessage(null), 3000);
=======
    setSaving(true);
    setMessage(null);
    
    try {
      if (about?.id) {
        await AboutService.putAbout(about.id, {
          name: form.name,
          role: form.role,
          bio: form.bio,
        });
        setMessage({ type: "success", text: "Saved successfully!" });
      } else {
        await AboutService.postAbout({
          name: form.name,
          role: form.role,
          bio: form.bio,
        });
        setMessage({ type: "success", text: "Created successfully!" });
      }
      setForm({ name: "", role: "", bio: "" });
      await fetchAbout();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error saving about:", error);
      setMessage({ type: "error", text: "Error saving. Please try again." });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
    }
  };

  if (loading) {
<<<<<<< HEAD
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <div className="loading-spinner"></div>
        <style jsx>{`
          .loading-spinner {
            width: 48px;
            height: 48px;
            border: 3px solid #e2e8f0;
            border-top-color: #4f46e5;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="about-admin">
      <div className="page-header">
        <div>
          <h1>About Cards</h1>
          <p>Manage multiple about me cards for your portfolio</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditing(null); setForm({ name: "", role: "", bio: "" }); setShowModal(true); }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add New Card
        </button>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          <span>{message.type === "success" ? "✓" : "⚠️"}</span>
          {message.text}
        </div>
      )}

      <div className="about-grid">
        {aboutList.map((item) => (
          <div key={item.id} className="about-card-admin">
            <div className="card-header">
              <div className="card-icon">
                <div className="icon-placeholder">👤</div>
              </div>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => { 
                  setEditing(item); 
                  setForm({ name: item.name, role: item.role || "", bio: item.bio });
                  setShowModal(true); 
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 3l4 4-7 7H10v-4l7-7z" />
                    <path d="M4 20h16" />
                  </svg>
                </button>
                <button className="btn-delete" onClick={() => setDeleteId(item.id!)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="card-body">
              <h3 className="card-name">{item.name}</h3>
              {item.role && <p className="card-role">{item.role}</p>}
              <p className="card-bio">{item.bio.length > 100 ? item.bio.substring(0, 100) + "..." : item.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? "Edit About Card" : "Add New About Card"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name <span>*</span></label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Role / Title</label>
                <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g., Frontend Developer" />
              </div>
              <div className="form-group">
                <label>Bio <span>*</span></label>
                <textarea rows={6} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Write something about yourself..." required />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSave}>Save Card</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Card</h2>
              <button className="modal-close" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this about card? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .about-admin {
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
          background: linear-gradient(135deg, #1e293b, #334155);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }
        .page-header p {
          color: #64748b;
          font-size: 14px;
        }
        .btn-primary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
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
        .alert {
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .alert-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .alert-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }
        .about-card-admin {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid #f1f5f9;
        }
        .about-card-admin:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 20px 20px 0 20px;
        }
        .card-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-placeholder {
          font-size: 32px;
        }
        .card-actions {
          display: flex;
          gap: 8px;
        }
        .btn-edit, .btn-delete {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          border: none;
        }
        .btn-edit {
          color: #f59e0b;
        }
        .btn-edit:hover {
          background: #fef3c7;
        }
        .btn-delete {
          color: #ef4444;
        }
        .btn-delete:hover {
          background: #fee2e2;
        }
        .card-body {
          padding: 20px;
        }
        .card-name {
          font-size: 20px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .card-role {
          font-size: 13px;
          color: #4f46e5;
          margin-bottom: 12px;
        }
        .card-bio {
          font-size: 14px;
          color: #475569;
          line-height: 1.5;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          border-radius: 24px;
          width: 90%;
          max-width: 520px;
          max-height: 90vh;
          overflow: auto;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }
        .modal-small {
          max-width: 400px;
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
          color: #0f172a;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #94a3b8;
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
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.2s;
        }
        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
        }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 16px 24px;
          border-top: 1px solid #e2e8f0;
        }
        .btn-cancel {
          padding: 10px 20px;
          background: #f1f5f9;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 500;
        }
        .btn-save, .btn-danger {
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 500;
          color: white;
        }
        .btn-save {
          background: #4f46e5;
        }
        .btn-save:hover {
          background: #4338ca;
        }
        .btn-danger {
          background: #ef4444;
        }
        .btn-danger:hover {
          background: #dc2626;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
=======
    return <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}>
        About Me
      </h1>
      
      {message && (
        <div style={{
          padding: "12px 16px",
          borderRadius: "12px",
          marginBottom: "20px",
          backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
          color: message.type === "success" ? "#155724" : "#721c24",
          border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
        }}>
          {message.text}
        </div>
      )}
      
      <div style={{ background: "white", borderRadius: "20px", padding: "30px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            Name
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxSizing: "border-box",
            }}
            placeholder="Enter your name"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            Role / Title
          </label>
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="e.g., Full Stack Developer"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            Bio
          </label>
          <textarea
            rows={8}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Write something about yourself..."
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxSizing: "border-box",
              resize: "none",
              fontFamily: "inherit",
            }}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: "12px 24px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "500",
            opacity: saving ? 0.7 : 1,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!saving) e.currentTarget.style.background = "#4338ca";
          }}
          onMouseLeave={(e) => {
            if (!saving) e.currentTarget.style.background = "#4f46e5";
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
    </div>
  );
}