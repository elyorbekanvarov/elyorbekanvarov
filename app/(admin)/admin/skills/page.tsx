"use client";

import { useEffect, useState, useRef } from "react";
import { SkillsService, Skill } from "@/lib/api/skillsServices";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    percentage: 50,
    category: "frontend",
  });

  const fetchSkills = async () => {
    try {
      const data = await SkillsService.getSkills();
      setSkills(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        image: imageFile,
      };
      if (editing) {
        await SkillsService.putSkill(editing.id!, payload);
      } else {
        await SkillsService.postSkill(payload);
      }
      fetchSkills();
      setShowModal(false);
      setEditing(null);
      setForm({ name: "", description: "", percentage: 50, category: "frontend" });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Error saving skill");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this skill?")) {
      await SkillsService.deleteSkill(id);
      fetchSkills();
    }
  };

  const categoryColors: any = {
    soft: { bg: "#fef9c3", color: "#854d0e" },
    frontend: { bg: "#dbeafe", color: "#1e40af" },
    backend: { bg: "#dcfce7", color: "#166534" },
    database: { bg: "#fed7aa", color: "#9a3412" },
    devops: { bg: "#e9d5ff", color: "#6b21a5" },
  };

  if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Skills</h1>
        <button
          onClick={() => {
            setEditing(null);
            setForm({ name: "", description: "", percentage: 50, category: "frontend" });
            setImageFile(null);
            setImagePreview(null);
            setShowModal(true);
          }}
          style={{ padding: "12px 24px", background: "#4f46e5", color: "white", border: "none", borderRadius: "12px", cursor: "pointer" }}
        >
          + Add Skill
        </button>
      </div>

      <div style={{ background: "white", borderRadius: "20px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: "16px", textAlign: "left" }}>Image</th>
              <th style={{ padding: "16px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "16px", textAlign: "left" }}>Category</th>
              <th style={{ padding: "16px", textAlign: "left" }}>Level</th>
              <th style={{ padding: "16px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "16px" }}>
                  {skill.image_url ? (
                    <img src={skill.image_url} alt={skill.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "8px" }} />
                  ) : (
                    <div style={{ width: "40px", height: "40px", background: "#f3f4f6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>📷</div>
                  )}
                </td>
                <td style={{ padding: "16px", fontWeight: "500" }}>{skill.name}</td>
                <td style={{ padding: "16px" }}>
                  <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "12px", ...categoryColors[skill.category || "frontend"] }}>
                    {skill.category}
                  </span>
                </td>
                <td style={{ padding: "16px" }}>
                  {skill.category === "soft" ? (
                    <span style={{ color: "#6b7280" }}>Card View</span>
                  ) : (
                    <div style={{ width: "120px", background: "#e5e7eb", borderRadius: "10px", overflow: "hidden" }}>
                      <div style={{ width: `${skill.percentage}%`, background: "#4f46e5", padding: "4px", color: "white", fontSize: "10px", textAlign: "center" }}>{skill.percentage}%</div>
                    </div>
                  )}
                </td>
                <td style={{ padding: "16px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => {
                        setEditing(skill);
                        setForm({
                          name: skill.name,
                          description: skill.description || "",
                          percentage: skill.percentage || 50,
                          category: skill.category || "frontend",
                        });
                        setImagePreview(skill.image_url || null);
                        setImageFile(null);
                        setShowModal(true);
                      }}
                      style={{ padding: "6px 12px", background: "#f59e0b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(skill.id!)} style={{ padding: "6px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "20px", padding: "30px", width: "90%", maxWidth: "500px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>{editing ? "Edit Skill" : "Add Skill"}</h2>
            
            <input
              type="text"
              placeholder="Skill name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "12px" }}
            />
            
            <textarea
              placeholder="Description (for soft skills)"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "12px" }}
            />
            
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "12px" }}
            >
              <option value="soft">Soft Skill (Card View)</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
              <option value="devops">DevOps</option>
            </select>
            
            {form.category !== "soft" && (
              <>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={form.percentage}
                  onChange={(e) => setForm({ ...form, percentage: parseInt(e.target.value) })}
                  style={{ width: "100%", marginBottom: "12px" }}
                />
                <p style={{ textAlign: "center", marginBottom: "12px" }}>{form.percentage}%</p>
              </>
            )}
            
            <div>
              <label style={{ display: "block", marginBottom: "8px" }}>Image</label>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ marginBottom: "12px" }} />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
              )}
            </div>
            
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "20px" }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "10px 20px", background: "#e5e7eb", border: "none", borderRadius: "8px", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: "10px 20px", background: "#4f46e5", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}