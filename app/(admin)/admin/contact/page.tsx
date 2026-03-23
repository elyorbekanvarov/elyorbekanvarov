"use client";

import { useEffect, useState } from "react";
import { ContactService, Contact } from "@/lib/api/contactServices";

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchContacts = async () => {
    try {
      const data = await ContactService.getContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await ContactService.deleteContact(id);
      await fetchContacts();
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <style jsx>{`
          .loading-container { display: flex; justify-content: center; align-items: center; min-height: 400px; }
          .loading-spinner { width: 40px; height: 40px; border: 3px solid #e2e8f0; border-top-color: #4f46e5; border-radius: 50%; animation: spin 1s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="page-header">
        <div>
          <h1>Contact Messages</h1>
          <p>Messages from your portfolio visitors</p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <h3>No messages yet</h3>
          <p>Messages from your contact form will appear here</p>
        </div>
      ) : (
        <div className="messages-grid">
          {contacts.map((msg) => (
            <div key={msg.id} className="message-card">
              <div className="message-header">
                <div className="sender-info">
                  <div className="sender-avatar">{msg.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <h4>{msg.name}</h4>
                    <p>{msg.email}</p>
                  </div>
                </div>
                <button className="delete-btn" onClick={() => setDeleteId(msg.id!)}>
                  🗑️
                </button>
              </div>
              <div className="message-body">
                <p>{msg.message}</p>
              </div>
              <div className="message-footer">
                <span className="message-date">{msg.created_at ? new Date(msg.created_at).toLocaleString() : "Just now"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Message</h2>
              <button className="modal-close" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this message? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .contact-page { padding: 8px; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #1e293b, #334155); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 4px; }
        .page-header p { color: #64748b; font-size: 14px; }
        .empty-state { text-align: center; padding: 60px 20px; background: white; border-radius: 24px; border: 1px solid #f1f5f9; }
        .empty-icon { font-size: 64px; display: block; margin-bottom: 16px; }
        .empty-state h3 { font-size: 20px; font-weight: 600; color: #0f172a; margin-bottom: 8px; }
        .empty-state p { color: #64748b; }
        .messages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 20px; }
        .message-card { background: white; border-radius: 20px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; transition: all 0.2s; }
        .message-card:hover { transform: translateY(-2px); box-shadow: 0 12px 24px -8px rgba(0,0,0,0.1); }
        .message-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .sender-info { display: flex; align-items: center; gap: 12px; }
        .sender-avatar { width: 48px; height: 48px; background: linear-gradient(135deg, #4f46e5, #6366f1); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 600; color: white; }
        .sender-info h4 { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px; }
        .sender-info p { font-size: 12px; color: #94a3b8; }
        .delete-btn { background: none; border: none; font-size: 20px; cursor: pointer; padding: 8px; border-radius: 8px; transition: all 0.2s; }
        .delete-btn:hover { background: #fee2e2; }
        .message-body { margin-bottom: 16px; padding: 12px 0; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; }
        .message-body p { font-size: 14px; color: #334155; line-height: 1.6; }
        .message-footer { display: flex; justify-content: flex-end; }
        .message-date { font-size: 11px; color: #94a3b8; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal { background: white; border-radius: 24px; width: 90%; max-width: 400px; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #e2e8f0; }
        .modal-header h2 { font-size: 20px; font-weight: 600; }
        .modal-close { background: none; border: none; font-size: 24px; cursor: pointer; }
        .modal-body { padding: 24px; }
        .modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding: 16px 24px; border-top: 1px solid #e2e8f0; }
        .btn-secondary { padding: 10px 20px; background: #f1f5f9; border: none; border-radius: 10px; cursor: pointer; }
        .btn-danger { padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 10px; cursor: pointer; }
        @media (max-width: 640px) {
          .messages-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}