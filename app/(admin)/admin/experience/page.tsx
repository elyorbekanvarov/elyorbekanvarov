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
      alert(
        "Please fill all required fields (Role, Company, Description, Start Date)",
      );
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
      alert(
        `Error: ${error.response?.data?.message || "Please check all fields"}`,
      );
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
      <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Experience</h1>
        <button
          onClick={() => {
            setEditing(null);
            setForm({
              role: "",
              company: "",
              description: "",
              start_date: "",
              end_date: "",
            });
            setShowModal(true);
          }}
          style={{
            padding: "12px 24px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          + Add Experience
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {item.role}
              </h3>
              <p style={{ color: "#6b7280" }}>
                {item.company} • {item.start_date}{" "}
                {item.end_date ? `- ${item.end_date}` : ""}
              </p>
              <p style={{ marginTop: "8px", color: "#374151" }}>
                {item.description}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
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
                style={{
                  padding: "6px 12px",
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id!)}
                style={{
                  padding: "6px 12px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          style={{
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
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
              {editing ? "Edit Experience" : "Add Experience"}
            </h2>

            <input
              placeholder="Role * (e.g., Full Stack Developer)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
              required
            />

            <input
              placeholder="Company *"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
              required
            />

            <input
              placeholder="Start Date * (e.g., 2020 or Jan 2020)"
              value={form.start_date}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
              required
            />

            <input
              placeholder="End Date (e.g., 2023 or Present)"
              value={form.end_date}
              onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            />

            <textarea
              placeholder="Description *"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
              required
            />

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "10px 20px",
                  background: "#e5e7eb",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: "10px 20px",
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
