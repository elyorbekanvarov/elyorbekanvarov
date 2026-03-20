"use client";

import { useEffect, useState } from "react";
import { AboutService, About } from "@/lib/api/aboutServices";

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", bio: "" });

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
    try {
      if (about?.id) {
        // PUT so'rovi
        const result = await AboutService.putAbout(about.id, {
          name: form.name,
          role: form.role,
          bio: form.bio,
        });
        console.log("Update result:", result);
        alert("Saved successfully!");
      } else {
        // POST so'rovi
        const result = await AboutService.postAbout({
          name: form.name,
          role: form.role,
          bio: form.bio,
        });
        console.log("Create result:", result);
        alert("Created successfully!");
      }
      fetchAbout();
    } catch (error: any) {
      console.error("Error saving about:", error);
      console.error("Error response:", error.response?.data);
      alert(`Error: ${error.response?.data?.message || "Please try again."}`);
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
            }}
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
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
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
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}