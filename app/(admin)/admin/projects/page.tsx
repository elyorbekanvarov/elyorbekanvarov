"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectsService, Project } from "@/lib/api/projectsServices";

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await ProjectsService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: number) => {
    try {
      await ProjectsService.deleteProject(id);
      await fetchProjects();
      setDeleteId(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Projects</h1>
        <button onClick={() => router.push("/admin/projects/create")} style={{ padding: "12px 24px", background: "#4f46e5", color: "white", border: "none", borderRadius: "12px", cursor: "pointer" }}>+ Create Project</button>
      </div>

      <div style={{ background: "white", borderRadius: "20px", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: "16px", textAlign: "left" }}>Image</th><th style={{ padding: "16px", textAlign: "left" }}>Title</th><th style={{ padding: "16px", textAlign: "left" }}>Description</th><th style={{ padding: "16px", textAlign: "left" }}>Technologies</th><th style={{ padding: "16px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "16px" }}>{p.image_url ? <img src={p.image_url} alt={p.title} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }} /> : <div style={{ width: "50px", height: "50px", background: "#f3f4f6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>📷</div>}</td>
                <td style={{ padding: "16px", fontWeight: "500" }}>{p.title}</td>
                <td style={{ padding: "16px" }}>{p.description.length > 50 ? p.description.substring(0, 50) + "..." : p.description}</td>
                <td style={{ padding: "16px" }}><span style={{ background: "#f3f4f6", padding: "4px 8px", borderRadius: "6px", fontSize: "12px" }}>{p.technologies}</span></td>
                <td style={{ padding: "16px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => router.push(`/admin/projects/edit/${p.id}`)} style={{ padding: "6px 12px", background: "#f59e0b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => setDeleteId(p.id!)} style={{ padding: "6px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "20px", padding: "24px", maxWidth: "400px" }}>
            <h3>Delete Project</h3><p>Are you sure?</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "20px" }}>
              <button onClick={() => setDeleteId(null)} style={{ padding: "8px 20px", background: "#e5e7eb", border: "none", borderRadius: "8px", cursor: "pointer" }}>Cancel</button>
              <button onClick={() => handleDelete(deleteId)} style={{ padding: "8px 20px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}