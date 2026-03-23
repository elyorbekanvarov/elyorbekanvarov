"use client";

import { useEffect, useState } from "react";
import { ProjectsService, Project } from "@/lib/api/projectsServices";
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
    return project.image_url || (typeof project.image === "string" ? project.image : null);
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
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={project.title}
                    style={{ width: "100%", height: "260px", objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "260px", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a2e" }}>
                    <span style={{ fontSize: "48px", color: "#7c3aed" }}>🚀</span>
                  </div>
                )}
                <div className="section4-card-title">
                  <span>{project.title}</span>
                  <p>{project.description}</p>
                  <div className="p">
                    {project.technologies?.split(",").map((tech, idx) => (
                      <p key={idx}>{tech.trim()}</p>
                    ))}
                  </div>
                  <div className="section4-card-btns">
                    {liveLink && (
                      <a href={liveLink} target="_blank" rel="noopener noreferrer">
                        <span>🔗</span>
                        Live Demo
                      </a>
                    )}
                    {githubLink && (
                      <a href={githubLink} target="_blank" rel="noopener noreferrer">
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