"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProjectsService } from "@/lib/api/projectsServices";

export default function CreateProject() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ title: "", description: "", technologies: "", githubLink: "", liveLink: "" });

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImage = (e: any) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    await ProjectsService.postProject({ ...form, image: file });
    router.push("/admin/projects");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}>Create Project</h1>
      <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: "20px", padding: "30px" }}>
        <div style={{ marginBottom: "20px" }}><label>Title *</label><input name="title" onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "12px", marginTop: "8px" }} /></div>
        <div style={{ marginBottom: "20px" }}><label>Description *</label><textarea name="description" rows={4} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "12px", marginTop: "8px" }} /></div>
        <div style={{ marginBottom: "20px" }}><label>Technologies *</label><input name="technologies" onChange={handleChange} placeholder="React, TypeScript" required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "12px", marginTop: "8px" }} /></div>
        <div style={{ marginBottom: "20px" }}><label>Image</label><input type="file" ref={fileRef} onChange={handleImage} accept="image/*" style={{ display: "none" }} />
          {!preview ? <div onClick={() => fileRef.current?.click()} style={{ border: "2px dashed #e5e7eb", borderRadius: "12px", padding: "40px", textAlign: "center", cursor: "pointer", marginTop: "8px" }}>📷 Click to upload</div> : <img src={preview} style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "12px", marginTop: "8px" }} />}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button type="button" onClick={() => router.push("/admin/projects")} style={{ padding: "12px 24px", background: "#f3f4f6", border: "none", borderRadius: "12px", cursor: "pointer" }}>Cancel</button>
          <button type="submit" disabled={loading} style={{ padding: "12px 24px", background: "#4f46e5", color: "white", border: "none", borderRadius: "12px", cursor: "pointer" }}>{loading ? "Creating..." : "Create"}</button>
        </div>
      </form>
    </div>
  );
}