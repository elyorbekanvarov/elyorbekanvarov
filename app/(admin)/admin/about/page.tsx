"use client";

import { useEffect, useState } from "react";
import { AboutService, About } from "@/lib/api/aboutServices";

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", bio: "" });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchAbout = async () => {
    try {
      const data = await AboutService.getAbout();
      if (data && data.length > 0) {
        const item = data[0];
        setAbout(item);
        setForm({
          name: item.name || "",
          role: item.role || "",
          bio: item.bio || "",
        });
      }
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
      
      // Formani tozalash
      setForm({ name: "", role: "", bio: "" });
      
      // Ma'lumotlarni qayta yuklash
      await fetchAbout();
      
      // 3 sekunddan keyin xabarni o'chirish
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error saving about:", error);
      setMessage({ type: "error", text: "Error saving. Please try again." });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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
              resize: "vertical",
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
    </div>
  );
}