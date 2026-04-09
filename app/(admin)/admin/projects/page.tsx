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
            width: 48px;
            height: 48px;
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
      {/* Header Section */}
      <div className="page-header">
        <div className="header-left">
          <div className="title-badge">
            <span className="badge-icon">🚀</span>
            <span>Projects Portfolio</span>
          </div>
          <h1>Manage Your <span className="gradient-text">Projects</span></h1>
          <p>Showcase your best work and impress your audience</p>
        </div>
        <button className="btn-create" onClick={() => router.push("/admin/projects/create")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>New Project</span>
        </button>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18M18 9l-4-4-4 4-4-4" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{projects.length}</h3>
            <p>Total Projects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{projects.filter(p => p.technologies).length}</h3>
            <p>With Tech Stack</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Active</h3>
            <p>Live Projects</p>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-animation">📁</div>
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
                  <th>Preview</th>
                  <th>Project Details</th>
                  <th>Tech Stack</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="image-cell">
                      {project.image_url ? (
                        <div className="project-image-wrapper">
                          <img src={project.image_url} alt={project.title} />
                          <div className="image-overlay">
                            <span>🔍</span>
                          </div>
                        </div>
                      ) : (
                        <div className="no-image">🎨</div>
                      )}
                    </td>
                    <td className="details-cell">
                      <div className="project-details">
                        <h4>{project.title}</h4>
                        <p>{project.description.length > 50 ? `${project.description.substring(0, 50)}...` : project.description}</p>
                        <div className="project-meta">
                          <span className="meta-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            Updated recently
                          </span>
                        </div>
                      </div>
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
                    <td className="status-cell">
                      <span className="status-badge active">Published</span>
                    </td>
                    <td className="actions-cell">
                      <div className="actions">
                        <button 
                          className="btn-edit" 
                          onClick={() => router.push(`/admin/projects/edit/${project.id}`)}
                          title="Edit project"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3l4 4-7 7H10v-4l7-7z"/>
                            <path d="M4 20h16"/>
                          </svg>
                        </button>
                        <button 
                          className="btn-delete" 
                          onClick={() => setDeleteId(project.id!)}
                          title="Delete project"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                          </svg>
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
                    <div className="card-no-image">🎨</div>
                  )}
                  <div className="card-status">Published</div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-description">
                    {project.description.length > 80 
                      ? `${project.description.substring(0, 80)}...` 
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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 3l4 4-7 7H10v-4l7-7z"/>
                        <path d="M4 20h16"/>
                      </svg>
                      Edit
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => setDeleteId(project.id!)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                      </svg>
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
            <div className="modal-icon">⚠️</div>
            <div className="modal-header">
              <h2>Delete Project</h2>
              <button className="modal-close" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{projects.find(p => p.id === deleteId)?.title}</strong>?</p>
              <p className="warning">This action cannot be undone. All data will be permanently removed.</p>
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
          padding: 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: calc(100vh - 80px);
          border-radius: 32px;
        }

        /* Header Section */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 24px;
        }

        .header-left {
          flex: 1;
        }

        .title-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border-radius: 40px;
          margin-bottom: 16px;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
        }

        .badge-icon {
          font-size: 14px;
        }

        .title-badge span:last-child {
          font-size: 12px;
          font-weight: 600;
          color: white;
          letter-spacing: 0.5px;
        }

        .page-header h1 {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #4f46e5, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-header p {
          color: #64748b;
          font-size: 16px;
          font-weight: 500;
        }

        /* Create Button */
        .btn-create {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          border: none;
          border-radius: 60px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .btn-create:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          background: linear-gradient(135deg, #1e293b, #334155);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border-radius: 24px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(226, 232, 240, 0.6);
          transition: all 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.blue {
          background: linear-gradient(135deg, #dbeafe, #eff6ff);
          color: #2563eb;
        }

        .stat-icon.purple {
          background: linear-gradient(135deg, #e0e7ff, #f3e8ff);
          color: #7c3aed;
        }

        .stat-icon.green {
          background: linear-gradient(135deg, #d1fae5, #ecfdf5);
          color: #059669;
        }

        .stat-info h3 {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .stat-info p {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 80px 40px;
          background: white;
          border-radius: 32px;
          border: 1px solid #f1f5f9;
        }

        .empty-animation {
          font-size: 80px;
          margin-bottom: 24px;
        }

        .empty-state h3 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .empty-state p {
          color: #64748b;
          margin-bottom: 32px;
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
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
        }

        .projects-table {
          width: 100%;
          min-width: 800px;
          border-collapse: collapse;
        }

        .projects-table th {
          text-align: left;
          padding: 20px 24px;
          background: #f8fafc;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e2e8f0;
        }

        .projects-table td {
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .projects-table tr:hover {
          background: #fafcff;
        }

        /* Image Cell */
        .image-cell {
          width: 80px;
        }

        .project-image-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
        }

        .project-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .project-image-wrapper:hover .image-overlay {
          opacity: 1;
        }

        .no-image {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        /* Details Cell */
        .project-details h4 {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .project-details p {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 8px;
        }

        .project-meta {
          display: flex;
          gap: 12px;
        }

        .meta-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #94a3b8;
        }

        /* Tech Tags */
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-tag {
          display: inline-block;
          padding: 4px 12px;
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

        /* Status Badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge.active {
          background: #d1fae5;
          color: #059669;
        }

        /* Actions */
        .actions {
          display: flex;
          gap: 8px;
        }

        .btn-edit, .btn-delete {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
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
          transform: scale(1.05);
        }

        .btn-delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .btn-delete:hover {
          background: #fecaca;
          transform: scale(1.05);
        }

        /* Mobile Card View */
        .project-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 20px;
          border: 1px solid #f1f5f9;
          transition: all 0.3s;
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 30px -12px rgba(0,0,0,0.1);
        }

        .card-image {
          position: relative;
          width: 100%;
          height: 180px;
          background: #f1f5f9;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-status {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 12px;
          background: #059669;
          color: white;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
        }

        .card-no-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 56px;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
        }

        .card-content {
          padding: 20px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .card-description {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .card-actions {
          display: flex;
          gap: 12px;
        }

        .card-actions .btn-edit,
        .card-actions .btn-delete {
          flex: 1;
          width: auto;
          padding: 10px;
          gap: 8px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
        }

        .modal {
          background: white;
          border-radius: 32px;
          width: 100%;
          max-width: 420px;
          text-align: center;
          animation: modalFadeIn 0.3s ease;
        }

        .modal-icon {
          font-size: 48px;
          margin-top: -24px;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 28px 0;
        }

        .modal-header h2 {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
        }

        .modal-close {
          background: #f1f5f9;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #64748b;
          width: 36px;
          height: 36px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-body {
          padding: 20px 28px;
        }

        .modal-body p {
          font-size: 14px;
          color: #334155;
        }

        .modal-body .warning {
          font-size: 12px;
          color: #ef4444;
          margin-top: 8px;
        }

        .modal-footer {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 0 28px 28px;
        }

        .btn-secondary {
          padding: 10px 24px;
          background: #f1f5f9;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
        }

        .btn-danger {
          padding: 10px 24px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .projects-page {
            padding: 20px;
          }
        }

        @media (max-width: 768px) {
          .projects-page {
            padding: 16px;
          }

          .desktop-view {
            display: none;
          }

          .mobile-card-view {
            display: block;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-create {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .projects-page {
            padding: 12px;
          }

          .card-title {
            font-size: 16px;
          }

          .modal {
            margin: 16px;
          }
        }
      `}</style>
    </div>
  );
}