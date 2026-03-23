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

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await ProjectsService.deleteProject(id);
      await fetchProjects();
      setDeleteId(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #e2e8f0;
            border-top-color: #4f46e5;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p>Manage your portfolio projects</p>
        </div>
        <button className="btn-primary" onClick={() => router.push("/admin/projects/create")}>
          <span>+</span> Create Project
        </button>
      </div>

      <div className="projects-table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Technologies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="image-cell">
                  {project.image_url ? (
                    <div className="project-image">
                      <img src={project.image_url} alt={project.title} />
                    </div>
                  ) : (
                    <div className="no-image">📷</div>
                  )}
                </td>
                <td className="title-cell">
                  <span className="project-title">{project.title}</span>
                </td>
                <td className="desc-cell">
                  <span className="project-desc">
                    {project.description.length > 60 
                      ? `${project.description.substring(0, 60)}...` 
                      : project.description}
                  </span>
                </td>
                <td className="tech-cell">
                  <div className="tech-tags">
                    {project.technologies?.split(",").slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech.trim()}</span>
                    ))}
                    {project.technologies?.split(",").length > 3 && (
                      <span className="tech-tag more">+{project.technologies.split(",").length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="actions-cell">
                  <div className="actions">
                    <button 
                      className="btn-edit" 
                      onClick={() => router.push(`/admin/projects/edit/${project.id}`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => setDeleteId(project.id!)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Project</h2>
              <button className="modal-close" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{projects.find(p => p.id === deleteId)?.title}</strong>?</p>
              <p className="warning">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Delete Project</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .projects-page {
          padding: 8px;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .page-header h1 {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #1e293b, #334155);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 4px;
        }
        .page-header p {
          color: #64748b;
          font-size: 14px;
        }
        .btn-primary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }
        .projects-table-container {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid #f1f5f9;
        }
        .projects-table {
          width: 100%;
          border-collapse: collapse;
        }
        .projects-table th {
          text-align: left;
          padding: 16px 20px;
          background: #f8fafc;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e2e8f0;
        }
        .projects-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }
        .projects-table tr:hover {
          background: #fafcff;
        }
        .image-cell {
          width: 70px;
        }
        .project-image {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          overflow: hidden;
          background: #f1f5f9;
        }
        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .no-image {
          width: 50px;
          height: 50px;
          background: #f1f5f9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        .title-cell .project-title {
          font-weight: 600;
          color: #0f172a;
          font-size: 14px;
        }
        .desc-cell .project-desc {
          font-size: 13px;
          color: #475569;
          line-height: 1.5;
        }
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tech-tag {
          display: inline-block;
          padding: 4px 10px;
          background: #f1f5f9;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          color: #475569;
        }
        .tech-tag.more {
          background: #e2e8f0;
          color: #64748b;
        }
        .actions {
          display: flex;
          gap: 8px;
        }
        .btn-edit, .btn-delete {
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-edit {
          background: #fef3c7;
          color: #d97706;
          border: none;
        }
        .btn-edit:hover {
          background: #fde68a;
        }
        .btn-delete {
          background: #fee2e2;
          color: #dc2626;
          border: none;
        }
        .btn-delete:hover {
          background: #fecaca;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          border-radius: 24px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
        }
        .modal-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #0f172a;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #94a3b8;
        }
        .modal-body {
          padding: 24px;
        }
        .modal-body p {
          font-size: 14px;
          color: #334155;
          margin-bottom: 8px;
        }
        .modal-body .warning {
          font-size: 12px;
          color: #ef4444;
        }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 16px 24px;
          border-top: 1px solid #e2e8f0;
        }
        .btn-secondary {
          padding: 8px 18px;
          background: #f1f5f9;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
        }
        .btn-danger {
          padding: 8px 18px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
        }
        .btn-danger:hover {
          background: #dc2626;
        }
        @media (max-width: 768px) {
          .projects-table th, .projects-table td {
            padding: 12px 16px;
          }
          .tech-tag {
            font-size: 10px;
            padding: 3px 8px;
          }
          .desc-cell .project-desc {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}