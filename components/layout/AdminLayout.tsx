"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/api/authServices";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

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
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Projects", path: "/admin/projects", icon: "📁" },
    { name: "Skills", path: "/admin/skills", icon: "💻" },
    { name: "Experience", path: "/admin/experience", icon: "🎓" },
    { name: "Contact", path: "/admin/contact", icon: "✉️" },
    { name: "About", path: "/admin/about", icon: "👤" },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f3f4f6",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          width: "260px",
          height: "100vh",
          background: "linear-gradient(180deg, #1f2937 0%, #111827 100%)",
          color: "white",
          position: "fixed",
          left: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "24px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "20px" }}>Portfolio Admin</h2>
          {user && (
            <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "8px" }}>
              {user.email}
            </p>
          )}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => router.push(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "4px",
                color: "#9ca3af",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(79,70,229,0.2)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span style={{ fontSize: "14px" }}>{item.name}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
          >
            🔓 Logout
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          marginLeft: "260px",
          padding: "30px",
          background: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
}
