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
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveLink: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend fieldlariga moslashtirish: liveLink -> demo_link, githubLink -> repo_link
      const payload = {
        title: form.title,
        description: form.description,
        technologies: form.technologies,
        demo_link: form.liveLink, // liveLink -> demo_link
        repo_link: form.githubLink,
        image: file,
      };
      await ProjectsService.postProject(payload);
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px",
          }}
        >
          Create New Project
        </h1>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          Add a new project to your portfolio
        </p>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "24px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <form onSubmit={handleSubmit} style={{ padding: "32px" }}>
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Project Title{" "}
              <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "14px",
                boxSizing: "border-box",
                backgroundColor: "#fafafa",
              }}
              placeholder="e.g., E-Commerce Platform"
              required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#4f46e5";
                e.currentTarget.style.backgroundColor = "white";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.backgroundColor = "#fafafa";
              }}
            />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Description{" "}
              <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "14px",
                boxSizing: "border-box",
                backgroundColor: "#fafafa",
                resize: "vertical",
                fontFamily: "inherit",
              }}
              placeholder="Describe your project..."
              required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#4f46e5";
                e.currentTarget.style.backgroundColor = "white";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.backgroundColor = "#fafafa";
              }}
            />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Technologies{" "}
              <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
            </label>
            <input
              type="text"
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "14px",
                boxSizing: "border-box",
                backgroundColor: "#fafafa",
              }}
              placeholder="React, TypeScript, Tailwind CSS"
              required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#4f46e5";
                e.currentTarget.style.backgroundColor = "white";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.backgroundColor = "#fafafa";
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                GitHub Link
              </label>
              <input
                type="url"
                name="githubLink"
                value={form.githubLink}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  backgroundColor: "#fafafa",
                }}
                placeholder="https://github.com/username/repo"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#4f46e5";
                  e.currentTarget.style.backgroundColor = "white";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.backgroundColor = "#fafafa";
                }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Live Demo Link
              </label>
              <input
                type="url"
                name="liveLink"
                value={form.liveLink}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  backgroundColor: "#fafafa",
                }}
                placeholder="https://example.com"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#4f46e5";
                  e.currentTarget.style.backgroundColor = "white";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.backgroundColor = "#fafafa";
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Project Image
            </label>
            <input
              type="file"
              ref={fileRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            {!preview ? (
              <div
                style={{
                  border: "2px dashed #e5e7eb",
                  borderRadius: "16px",
                  padding: "32px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backgroundColor: "#fafafa",
                }}
                onClick={() => fileRef.current?.click()}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#4f46e5";
                  e.currentTarget.style.backgroundColor = "#eef2ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.backgroundColor = "#fafafa";
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>🖼️</div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  Click to upload an image
                </div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>
                  PNG, JPG, WEBP (Max 5MB)
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    position: "relative",
                    marginTop: "16px",
                    display: "inline-block",
                  }}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      border: "2px solid #e5e7eb",
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "28px",
                      height: "28px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                    }}
                    onClick={() => {
                      setPreview(null);
                      setFile(null);
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#dc2626")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#ef4444")
                    }
                  >
                    ✕
                  </button>
                </div>
                <div
                  style={{
                    border: "2px dashed #e5e7eb",
                    borderRadius: "16px",
                    padding: "16px",
                    textAlign: "center",
                    cursor: "pointer",
                    marginTop: "16px",
                    backgroundColor: "#fafafa",
                  }}
                  onClick={() => fileRef.current?.click()}
                >
                  <span style={{ fontSize: "14px" }}>📷 Change Image</span>
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "32px",
              paddingTop: "16px",
              borderTop: "1px solid #f3f4f6",
            }}
          >
            <button
              type="button"
              style={{
                flex: 1,
                padding: "12px 24px",
                background: "#f3f4f6",
                color: "#374151",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "14px",
              }}
              onClick={() => router.push("/admin/projects")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e5e7eb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f3f4f6")
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: "12px 24px",
                background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "14px",
                boxShadow: "0 2px 8px rgba(79, 70, 229, 0.3)",
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(79, 70, 229, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(79, 70, 229, 0.3)";
              }}
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
