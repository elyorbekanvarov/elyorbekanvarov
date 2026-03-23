"use client";

import { useEffect, useState } from "react";
<<<<<<< HEAD
import { ProjectsService, Project } from "@/lib/api/projectsServices";
=======
import { ProjectsService } from "@/lib/api/projectsServices";
import { Project } from "@/types/projects";
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
import { projects as mockProjects } from "@/data/projects";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProjectsService.getProjects();
<<<<<<< HEAD
        console.log("Fetched projects:", data);
=======
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
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
<<<<<<< HEAD
    return project.image_url || (typeof project.image === "string" ? project.image : null);
  };

  // Linklarni to'g'ri olish: frontend field -> backend field
=======
    return (
      project.image_url ||
      (typeof project.image === "string" ? project.image : null)
    );
  };

>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
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
<<<<<<< HEAD
                {/* Rasm */}
=======
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={project.title}
<<<<<<< HEAD
                    style={{ width: "100%", height: "260px", objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const placeholder = document.createElement("div");
                        placeholder.style.cssText = "width:100%;height:260px;display:flex;align-items:center;justify-content:center;background:#1a1a2e";
                        placeholder.innerHTML = '<span style="font-size:48px;color:#7c3aed">🚀</span>';
                        parent.insertBefore(placeholder, e.currentTarget);
                        e.currentTarget.remove();
                      }
                    }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "260px", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a2e" }}>
                    <span style={{ fontSize: "48px", color: "#7c3aed" }}>🚀</span>
                  </div>
                )}

                {/* Content */}
=======
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "351px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#1a1a2e",
                    }}
                  >
                    <span style={{ fontSize: "48px", color: "#7c3aed" }}>
                      🚀
                    </span>
                  </div>
                )}
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
                <div className="section4-card-title">
                  <span>{project.title}</span>
                  <p>{project.description}</p>
                  <div className="p">
                    {project.technologies?.split(",").map((tech, idx) => (
                      <p key={idx}>{tech.trim()}</p>
                    ))}
                  </div>
                  <div className="section4-card-btns">
<<<<<<< HEAD
                    {liveLink ? (
                      <a href={liveLink} target="_blank" rel="noopener noreferrer">
                        <span>🔗</span>
                        Live Demo
                      </a>
                    ) : (
                      <a href="#" style={{ opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" }}>
                        <span>🔗</span>
                        Live Demo
                      </a>
                    )}
                    {githubLink ? (
                      <a href={githubLink} target="_blank" rel="noopener noreferrer">
                        <span>🐙</span>
                        GitHub
                      </a>
                    ) : (
                      <a href="#" style={{ opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" }}>
                        <span>🐙</span>
                        GitHub
                      </a>
                    )}
=======
                    <a href={liveLink || "#"} target="_blank" rel="noreferrer">
                      <span>🔗</span>
                      Live Demo
                    </a>
                    <a
                      href={githubLink || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>🐙</span>
                      GitHub
                    </a>
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
