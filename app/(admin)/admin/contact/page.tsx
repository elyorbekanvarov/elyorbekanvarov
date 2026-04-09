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
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="contact-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-left">
          <div className="title-badge">
            <span className="badge-icon">💬</span>
            <span>Messages</span>
          </div>
          <h1>Contact <span className="gradient-text">Messages</span></h1>
          <p>Messages from your portfolio visitors</p>
        </div>
        <div className="stats-badge">
          <div className="stats-icon">📬</div>
          <div className="stats-info">
            <span className="stats-count">{contacts.length}</span>
            <span className="stats-text">Total Messages</span>
          </div>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-animation">📭</div>
          <h3>No messages yet</h3>
          <p>Messages from your contact form will appear here</p>
        </div>
      ) : (
        <>
          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-value">{contacts.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {contacts.filter(c => {
                  const date = new Date(c.created_at || '');
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && 
                         date.getFullYear() === now.getFullYear();
                }).length}
              </span>
              <span className="stat-label">This Month</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {contacts.filter(c => {
                  const date = new Date(c.created_at || '');
                  const now = new Date();
                  const diffTime = Math.abs(now.getTime() - date.getTime());
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}
              </span>
              <span className="stat-label">Last 7 Days</span>
            </div>
          </div>

          {/* Messages Grid */}
          <div className="messages-grid">
            {contacts.map((msg, index) => (
              <div 
                key={msg.id} 
                className="message-card"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="card-glow"></div>
                <div className="message-header">
                  <div className="sender-info">
                    <div className="sender-avatar">
                      <span>{msg.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="sender-details">
                      <h4>{msg.name}</h4>
                      <p className="sender-email">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        {msg.email}
                      </p>
                    </div>
                  </div>
                  <button className="delete-btn" onClick={() => setDeleteId(msg.id!)} title="Delete message">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
                <div className="message-body">
                  <p>{msg.message}</p>
                </div>
                <div className="message-footer">
                  <div className="message-date">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {msg.created_at 
                      ? new Date(msg.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : "Just now"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🗑️</div>
            <div className="modal-header">
              <h2>Delete Message</h2>
              <button className="modal-close" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this message?</p>
              <p className="warning">This action cannot be undone. All data will be permanently removed.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Delete Message</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .contact-page {
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
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 20px;
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
          font-size: clamp(28px, 4vw, 36px);
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
          font-size: 15px;
        }

        .stats-badge {
          display: flex;
          align-items: center;
          gap: 16px;
          background: white;
          padding: 12px 24px;
          border-radius: 60px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .stats-icon {
          font-size: 28px;
        }

        .stats-info {
          display: flex;
          flex-direction: column;
        }

        .stats-count {
          font-size: 24px;
          font-weight: 800;
          color: #4f46e5;
          line-height: 1.2;
        }

        .stats-text {
          font-size: 12px;
          color: #64748b;
        }

        /* Stats Row */
        .stats-row {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-item {
          flex: 1;
          background: white;
          padding: 16px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid #f1f5f9;
          transition: all 0.3s;
        }

        .stat-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.1);
        }

        .stat-value {
          display: block;
          font-size: 28px;
          font-weight: 800;
          color: #4f46e5;
        }

        .stat-label {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
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
        }

        /* Messages Grid */
        .messages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 24px;
        }

        .message-card {
          position: relative;
          background: white;
          border-radius: 24px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

        .message-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.15);
          border-color: #e2e8f0;
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #4f46e5, #c084fc, #4f46e5);
          border-radius: 24px 24px 0 0;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .message-card:hover .card-glow {
          opacity: 1;
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          gap: 12px;
        }

        .sender-info {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
          min-width: 0;
        }

        .sender-avatar {
          position: relative;
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 8px 16px -4px rgba(79, 70, 229, 0.3);
        }

        .sender-details {
          flex: 1;
          min-width: 0;
        }

        .sender-details h4 {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .sender-email {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #94a3b8;
          word-break: break-all;
          background: #f8fafc;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .delete-btn {
          background: #f8fafc;
          border: none;
          cursor: pointer;
          padding: 10px;
          border-radius: 14px;
          transition: all 0.2s;
          color: #94a3b8;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .delete-btn:hover {
          background: #fee2e2;
          color: #dc2626;
          transform: scale(1.05);
        }

        .message-body {
          margin-bottom: 20px;
          padding: 16px 0;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
        }

        .message-body p {
          font-size: 14px;
          color: #334155;
          line-height: 1.7;
          word-break: break-word;
        }

        .message-footer {
          display: flex;
          justify-content: flex-end;
        }

        .message-date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #94a3b8;
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
          max-width: 420px;
          text-align: center;
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

        .modal-icon {
          font-size: 56px;
          margin-top: -28px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 28px 0;
        }

        .modal-header h2 {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
        }

        .modal-close {
          background: #f1f5f9;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #64748b;
          width: 36px;
          height: 36px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-body {
          padding: 20px 28px;
        }

        .modal-body p {
          font-size: 14px;
          color: #334155;
        }

        .modal-body .warning {
          font-size: 12px;
          color: #ef4444;
          margin-top: 12px;
        }

        .modal-footer {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 0 28px 28px;
        }

        .btn-secondary {
          padding: 12px 28px;
          background: #f1f5f9;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
        }

        .btn-danger {
          padding: 12px 28px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
        }

        .btn-danger:hover {
          background: #dc2626;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .contact-page {
            padding: 20px;
          }

          .messages-grid {
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .contact-page {
            padding: 16px;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .stats-badge {
            width: 100%;
            justify-content: center;
          }

          .stats-row {
            gap: 12px;
          }

          .stat-item {
            padding: 12px;
          }

          .stat-value {
            font-size: 22px;
          }

          .messages-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .message-card {
            padding: 20px;
          }

          .sender-avatar {
            width: 44px;
            height: 44px;
            font-size: 18px;
            border-radius: 14px;
          }
        }

        @media (max-width: 480px) {
          .contact-page {
            padding: 12px;
          }

          .stats-row {
            flex-direction: column;
          }

          .message-header {
            flex-wrap: wrap;
          }

          .modal {
            margin: 16px;
          }
        }
      `}</style>
    </div>
  );
}