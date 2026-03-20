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
      <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
        Loading messages...
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827" }}>
          Contact Messages
        </h1>
        <p style={{ color: "#6b7280", marginTop: "8px" }}>
          Messages sent from the contact form on your portfolio
        </p>
      </div>

      {contacts.length === 0 ? (
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "60px",
          textAlign: "center",
          color: "#6b7280"
        }}>
          📭 No messages yet. Messages from your portfolio contact form will appear here.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {contacts.map((msg) => (
            <div
              key={msg.id}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "12px",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <strong style={{ fontSize: "16px", color: "#111827" }}>{msg.name}</strong>
                    <span style={{ color: "#6b7280", fontSize: "14px" }}>&lt;{msg.email}&gt;</span>
                    <span style={{
                      fontSize: "12px",
                      background: "#f3f4f6",
                      padding: "2px 8px",
                      borderRadius: "20px",
                      color: "#4b5563"
                    }}>
                      {msg.created_at ? new Date(msg.created_at).toLocaleString() : "Just now"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setDeleteId(msg.id!)}
                  style={{
                    padding: "6px 12px",
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#dc2626"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#ef4444"}
                >
                  Delete
                </button>
              </div>
              <p style={{
                color: "#374151",
                lineHeight: "1.6",
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid #f3f4f6",
                whiteSpace: "pre-wrap",
              }}>
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px",
            maxWidth: "400px",
            width: "90%",
          }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px" }}>
              Delete Message
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              Are you sure you want to delete this message? This action cannot be undone.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  padding: "8px 20px",
                  background: "#e5e7eb",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                style={{
                  padding: "8px 20px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}