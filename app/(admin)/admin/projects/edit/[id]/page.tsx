"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProjectsService } from "@/lib/api/projectsServices";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [existing, setExisting] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", technologies: "", githubLink: "", liveLink: "" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await ProjectsService.getProjectById(Number(params.id));
      setForm({ title: data.title, description: data.description, technologies: data.technologies, githubLink: data.githubLink || "", liveLink: data.liveLink || "" });
      if (data.image_url) setExisting(data.image_url);
      setLoading(false);
    };
    fetchData();
  }, [params.id]);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImage = (e: any) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setExisting(null); setPreview(URL.createObjectURL(f)); }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault(); setSaving(true);
    await ProjectsService.putProject(Number(params.id), { ...form, image: file });
    router.push("/admin/projects");
  };

  if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}>Edit Project</h1>
      <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: "20px", padding: "30px" }}>
        <div style={{ marginBottom: "20px" }}><label>Title *</label><input name="title" value={form.title} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "12px", marginTop: "8px" }} /></div>
        <div style={{ marginBottom: "20px" }}><label>Description *</label><textarea name="description" rows={4} value={form.description} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "12px", marginTop: "8px" }} /></div>
        <div style={{ marginBottom: "20px" }}><label>Technologies *</label><input name="technologies" value={form.technologies} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "12px", marginTop: "8px" }} /></div>
        <div style={{ marginBottom: "20px" }}><label>Image</label><input type="file" ref={fileRef} onChange={handleImage} accept="image/*" style={{ display: "none" }} />
          {!preview && existing && <img src={existing} style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "12px", marginTop: "8px" }} />}
          {preview && <img src={preview} style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "12px", marginTop: "8px" }} />}
          <div onClick={() => fileRef.current?.click()} style={{ border: "2px dashed #e5e7eb", borderRadius: "12px", padding: "12px", textAlign: "center", cursor: "pointer", marginTop: "12px" }}>📷 Change Image</div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button type="button" onClick={() => router.push("/admin/projects")} style={{ padding: "12px 24px", background: "#f3f4f6", border: "none", borderRadius: "12px", cursor: "pointer" }}>Cancel</button>
          <button type="submit" disabled={saving} style={{ padding: "12px 24px", background: "#4f46e5", color: "white", border: "none", borderRadius: "12px", cursor: "pointer" }}>{saving ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
}