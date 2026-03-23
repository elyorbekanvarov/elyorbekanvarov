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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📁</span>
          <h3>No projects yet</h3>
          <p>Create your first project to showcase your work</p>
          <button className="btn-primary create-btn" onClick={() => router.push("/admin/projects/create")}>
            + Create Project
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="projects-table-container desktop-view">
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

          {/* Mobile Card View */}
          <div className="mobile-card-view">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="card-image">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} />
                  ) : (
                    <div className="card-no-image">📷</div>
                  )}
                </div>
                <div className="card-content">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-description">
                    {project.description.length > 100 
                      ? `${project.description.substring(0, 100)}...` 
                      : project.description}
                  </p>
                  <div className="card-tech">
                    {project.technologies?.split(",").slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech.trim()}</span>
                    ))}
                  </div>
                  <div className="card-actions">
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
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
          width: 100%;
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
          font-size: clamp(24px, 5vw, 28px);
          font-weight: 700;
          background: linear-gradient(135deg, #1e293b, #334155);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
        }

        .page-header p {
          color: #64748b;
          font-size: clamp(12px, 3vw, 14px);
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
          font-size: 14px;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
        }

        .empty-icon {
          font-size: 64px;
          display: block;
          margin-bottom: 16px;
        }

        .empty-state h3 {
          font-size: 20px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .empty-state p {
          color: #64748b;
          margin-bottom: 24px;
        }

        .create-btn {
          display: inline-flex;
          margin: 0 auto;
        }

        /* Desktop Table View */
        .desktop-view {
          display: block;
        }

        .mobile-card-view {
          display: none;
        }

        .projects-table-container {
          background: white;
          border-radius: 24px;
          overflow-x: auto;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid #f1f5f9;
        }

        .projects-table {
          width: 100%;
          min-width: 600px;
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
          border: none;
        }

        .btn-edit {
          background: #fef3c7;
          color: #d97706;
        }

        .btn-edit:hover {
          background: #fde68a;
        }

        .btn-delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .btn-delete:hover {
          background: #fecaca;
        }

        /* Mobile Card Styles */
        .project-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 16px;
          border: 1px solid #f1f5f9;
          transition: all 0.2s;
        }

        .card-image {
          width: 100%;
          height: 160px;
          background: #f1f5f9;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-no-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          background: #f1f5f9;
        }

        .card-content {
          padding: 16px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .card-description {
          font-size: 13px;
          color: #475569;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .card-actions {
          display: flex;
          gap: 12px;
        }

        .card-actions .btn-edit,
        .card-actions .btn-delete {
          flex: 1;
          text-align: center;
          padding: 8px;
        }

        /* Modal Styles */
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
          padding: 16px;
        }

        .modal {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 400px;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .projects-table th,
          .projects-table td {
            padding: 12px 16px;
          }

          .tech-tag {
            font-size: 10px;
            padding: 3px 8px;
          }
        }

        @media (max-width: 768px) {
          .desktop-view {
            display: none;
          }

          .mobile-card-view {
            display: block;
          }

          .page-header {
            margin-bottom: 24px;
          }

          .btn-primary {
            padding: 8px 16px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .projects-page {
            padding: 4px;
          }

          .card-title {
            font-size: 16px;
          }

          .card-description {
            font-size: 12px;
          }

          .modal {
            margin: 16px;
          }

          .modal-header h2 {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}