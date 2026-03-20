"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Projects", path: "/admin/projects", icon: "📁" },
    { name: "Skills", path: "/admin/skills", icon: "💻" },
    { name: "Experience", path: "/admin/experience", icon: "🎓" },
    { name: "Contact", path: "/admin/contact", icon: "✉️" },
    { name: "About", path: "/admin/about", icon: "👤" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{
        width: "260px",
        height: "100vh",
        background: "linear-gradient(180deg, #1f2937 0%, #111827 100%)",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px 0",
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2>Portfolio Admin</h2>
        </div>
        
        <div style={{ padding: "0 16px" }}>
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => router.push(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "10px",
                cursor: "pointer",
                marginBottom: "4px",
                color: "#9ca3af",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(79,70,229,0.2)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <span>{item.icon}</span>
              {item.name}
            </div>
          ))}
        </div>
        
        <div style={{ padding: "20px" }}>
          <button
            onClick={() => router.push("/login")}
            style={{
              width: "100%",
              padding: "12px",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      <div style={{ flex: 1, marginLeft: "260px", padding: "30px", background: "#f3f4f6" }}>
        {children}
      </div>
    </div>
  );
}