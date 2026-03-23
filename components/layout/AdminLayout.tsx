"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthService } from "@/lib/api/authServices";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = AuthService.getToken();
      const userData = AuthService.getUser();

      if (!token || !userData) {
        router.replace("/login");
      } else {
        setUser(userData);
        setLoading(false);
      }
    };
    checkAuth();

    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" && !e.newValue) {
        router.replace("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    const handleBeforeUnload = () => {
      AuthService.logout();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  const handleLogout = () => {
    AuthService.logout();
    router.replace("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "📊",
      iconActive: "📈",
    },
    { name: "Projects", path: "/admin/projects", icon: "📁", iconActive: "📂" },
    { name: "Skills", path: "/admin/skills", icon: "💻", iconActive: "⚡" },
    {
      name: "Experience",
      path: "/admin/experience",
      icon: "🎓",
      iconActive: "🏆",
    },
    { name: "Contact", path: "/admin/contact", icon: "✉️", iconActive: "💬" },
    { name: "About", path: "/admin/about", icon: "👤", iconActive: "✨" },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid rgba(79, 70, 229, 0.3)",
            borderTopColor: "#4f46e5",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
        position: "relative",
      }}
    >
      {/* Overlay (mobil uchun) */}
      {sidebarOpen && isMobile && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.3s ease",
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          width: "280px",
          height: "100vh",
          background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
          color: "white",
          position: "fixed",
          left: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          transform:
            isMobile && !sidebarOpen ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "600",
                background: "linear-gradient(135deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Portfolio
            </h2>
            <p
              style={{
                fontSize: "11px",
                color: "#64748b",
                margin: "4px 0 0",
              }}
            >
              Admin Panel
            </p>
          </div>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "8px",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
                fontSize: "20px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
              }
            >
              ✕
            </button>
          )}
        </div>

        {/* User Info */}
        {user && (
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
                fontSize: "24px",
                boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)",
              }}
            >
              {user.name?.charAt(0) || user.email?.charAt(0) || "A"}
            </div>
            <div
              style={{
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "4px",
                wordBreak: "break-word",
              }}
            >
              {user.name || user.email?.split("@")[0] || "Admin"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#94a3b8",
                wordBreak: "break-word",
              }}
            >
              {user.email}
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <div
                key={item.name}
                onClick={() => {
                  router.push(item.path);
                  if (isMobile) setSidebarOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  background: isActive
                    ? "linear-gradient(135deg, #4f46e5, #6366f1)"
                    : "transparent",
                  color: isActive ? "white" : "#94a3b8",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#94a3b8";
                  }
                }}
              >
                <span style={{ fontSize: "20px" }}>
                  {isActive ? item.iconActive || item.icon : item.icon}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: isActive ? "500" : "400",
                  }}
                >
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              background: "rgba(220, 38, 38, 0.15)",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              color: "#f87171",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(220, 38, 38, 0.25)";
              e.currentTarget.style.color = "#fecaca";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(220, 38, 38, 0.15)";
              e.currentTarget.style.color = "#f87171";
            }}
          >
            <span style={{ fontSize: "18px" }}>🔓</span>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: isMobile ? 0 : "280px",
          padding: isMobile ? "16px" : "32px",
          background: "#f8fafc",
          minHeight: "100vh",
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "100%",
        }}
      >
        {/* Mobile Header */}
        {isMobile && (
          <div
            style={{
              background: "white",
              padding: "12px 16px",
              borderRadius: "16px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
              }}
            >
              ☰
            </button>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                Portfolio Admin
              </h3>
            </div>
            <div style={{ width: "40px" }} />
          </div>
        )}

        {/* Page Content */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {children}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          div[style*="padding: 16px"] {
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
