"use client";

import { useEffect, useState } from "react";
import { ProjectsService } from "@/lib/api/projectsServices";
import { Project } from "@/types/projects";
import Image from "next/image";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProjectsService.getProjects();
        console.log("Projects data:", data);
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section id="projects" className="section4">
      <div className="container">
        <h2>Featured Projects</h2>
        <p>Some of my recent works showcasing my skills.</p>

        <div className="section4-cards">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="section4-card">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                  />
                ) : (
                  <div style={{ 
                    width: "100%", 
                    height: "200px", 
                    background: "#f3f4f6", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}>
                    📷 No Image
                  </div>
                )}
                
                <div className="section4-card-title">
                  <span>{project.title}</span>
                  <p>{project.description}</p>
                  <div className="p">
                    {project.technologies?.split(",").map((tech, index) => (
                      <p key={index}>{tech.trim()}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>
    </section>
  );
} 