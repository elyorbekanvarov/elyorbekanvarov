"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthService } from "@/lib/api/authServices";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);

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
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <div
        style={{
          width: collapsed ? "80px" : "280px",
          height: "100vh",
          background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
          color: "white",
          position: "fixed",
          left: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            padding: collapsed ? "24px 0" : "24px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          {!collapsed && (
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "600",
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
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
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
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
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>
        {user && (
          <div
            style={{
              padding: collapsed ? "20px 0" : "20px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              textAlign: collapsed ? "center" : "left",
            }}
          >
            <div
              style={{
                width: collapsed ? "48px" : "56px",
                height: collapsed ? "48px" : "56px",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: collapsed ? "0 auto" : "0 0 12px 0",
                fontSize: collapsed ? "20px" : "24px",
                boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)",
              }}
            >
              {user.name?.charAt(0) || user.email?.charAt(0) || "A"}
            </div>
            {!collapsed && (
              <>
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    marginBottom: "4px",
                  }}
                >
                  {user.name || user.email}
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                  {user.email}
                </div>
              </>
            )}
          </div>
        )}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: collapsed ? "16px 0" : "16px",
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
                onClick={() => router.push(item.path)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: collapsed ? "center" : "flex-start",
                  gap: collapsed ? 0 : "12px",
                  padding: collapsed ? "12px" : "12px 16px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  marginBottom: "4px",
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
                <span style={{ fontSize: collapsed ? "22px" : "20px" }}>
                  {isActive ? item.iconActive || item.icon : item.icon}
                </span>
                {!collapsed && (
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: isActive ? "500" : "400",
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div
          style={{
            padding: collapsed ? "16px 0" : "16px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? 0 : "12px",
              padding: collapsed ? "12px" : "12px 16px",
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
            <span style={{ fontSize: collapsed ? "20px" : "18px" }}>🔓</span>
            {!collapsed && (
              <span style={{ fontSize: "14px", fontWeight: "500" }}>
                Logout
              </span>
            )}
          </button>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          marginLeft: collapsed ? "80px" : "280px",
          padding: "32px",
          background: "#f8fafc",
          minHeight: "100vh",
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
