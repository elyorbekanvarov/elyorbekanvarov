"use client";

import { useEffect, useState } from "react";
import { ProjectsService } from "@/lib/api/projectsServices";
import { Project } from "@/types/projects";
import { projects as mockProjects } from "@/data/projects";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProjectsService.getProjects();
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(mockProjects);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  const getImageUrl = (project: Project) => {
    if (project.image_url) return project.image_url;
    if (project.image && typeof project.image === "string")
      return project.image;
    return null;
  };
  const getLiveLink = (project: Project) => {
    return project.liveLink || project.demo_link || null;
  };

  const getGithubLink = (project: Project) => {
    return project.githubLink || project.repo_link || null;
  };

  return (
    <section id="projects" className="section4">
      <div className="container">
        <h2>Featured Projects</h2>
        <p>Some of my recent works showcasing my skills.</p>

        <div className="section4-cards">
          {projects.map((project) => {
            const imageUrl = getImageUrl(project);
            const liveLink = getLiveLink(project);
            const githubLink = getGithubLink(project);

            return (
              <div key={project.id} className="section4-card">
                <div
                  style={{
                    width: "100%",
                    height: "220px",
                    overflow: "hidden",
                    backgroundColor: "#1a1a2e",
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(e) => {
                        console.error("Image failed to load:", imageUrl);
                        e.currentTarget.style.display = "none";
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML =
                            '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;color:#7c3aed;background:#1a1a2e;">🚀</div>';
                        }
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "48px",
                        color: "#7c3aed",
                        backgroundColor: "#1a1a2e",
                      }}
                    >
                      🚀
                    </div>
                  )}
                </div>
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "500",
                      marginBottom: "8px",
                      color: "#fff",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#9ca3af",
                      lineHeight: "1.5",
                      marginBottom: "12px",
                    }}
                  >
                    {project.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    {project.technologies?.split(",").map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: "11px",
                          background: "rgba(124,58,237,0.15)",
                          color: "#a78bfa",
                          padding: "4px 10px",
                          borderRadius: "20px",
                        }}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    {liveLink && (
                      <a
                        href={liveLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          padding: "8px 16px",
                          background:
                            "linear-gradient(90deg, #7c3aed, #9333ea)",
                          color: "white",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "500",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "0.9";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "1";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <span>🔗</span>
                        Live Demo
                      </a>
                    )}

                    {githubLink && (
                      <a
                        href={githubLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          padding: "8px 16px",
                          background: "white",
                          color: "#7c3aed",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "500",
                          textDecoration: "none",
                          border: "1px solid #7c3aed",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f3f4f6";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "white";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <span>🐙</span>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
