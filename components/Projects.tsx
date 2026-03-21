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
                {/* Rasm qismi - aspect-ratio bilan */}
                <div className="project-image-container">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="project-image"
                      onError={(e) => {
                        console.error("Image failed to load:", imageUrl);
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="image-placeholder">
                              <span>🚀</span>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span>🚀</span>
                    </div>
                  )}
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech">
                    {project.technologies?.split(",").map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="project-buttons">
                    {liveLink && (
                      <a
                        href={liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-live"
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
                        className="btn-github"
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

      <style jsx>{`
        .section4-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }
        .section4-card {
          background: #1a1a2e;
          border-radius: 20px;
          overflow: hidden;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
          border: 1px solid rgba(124, 58, 237, 0.2);
        }
        .section4-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px -12px rgba(124, 58, 237, 0.3);
          border-color: #7c3aed;
        }
        .project-image-container {
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: linear-gradient(135deg, #0f0f1e, #1a1a2e);
          position: relative;
        }
        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .section4-card:hover .project-image {
          transform: scale(1.05);
        }
        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a1a2e, #0f0f1e);
        }
        .image-placeholder span {
          font-size: 48px;
          color: #7c3aed;
        }
        .project-content {
          padding: 24px;
        }
        .project-title {
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .project-description {
          font-size: 14px;
          color: #9ca3af;
          line-height: 1.6;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        .tech-tag {
          font-size: 11px;
          background: rgba(124, 58, 237, 0.15);
          color: #a78bfa;
          padding: 5px 12px;
          border-radius: 30px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .tech-tag:hover {
          background: rgba(124, 58, 237, 0.3);
        }
        .project-buttons {
          display: flex;
          gap: 12px;
        }
        .btn-live,
        .btn-github {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .btn-live {
          background: linear-gradient(90deg, #7c3aed, #9333ea);
          color: white;
        }
        .btn-live:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        .btn-github {
          background: white;
          color: #7c3aed;
          border: 1px solid #7c3aed;
        }
        .btn-github:hover {
          background: #f3f4f6;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .section4-cards {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .project-content {
            padding: 20px;
          }
          .project-title {
            font-size: 18px;
          }
        }
      `}</style>
    </section>
  );
}
