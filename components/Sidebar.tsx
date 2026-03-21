"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  onLogout: () => void;
  user?: any;
}

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
  { name: "Projects", path: "/admin/projects", icon: "📁" },
  { name: "Skills", path: "/admin/skills", icon: "💻" },
  { name: "Experience", path: "/admin/experience", icon: "🎓" },
  { name: "Contact", path: "/admin/contact", icon: "✉️" },
  { name: "About", path: "/admin/about", icon: "👤" },
];

export default function Sidebar({ onLogout, user }: SidebarProps) {
  const pathname = usePathname();

  return (
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
      <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>Portfolio Admin</h2>
      </div>
      {user && (
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            background: "#4f46e5",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
            fontSize: "18px",
          }}>
            {user.name?.charAt(0) || user.email?.charAt(0) || "A"}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>{user.name || user.email}</div>
          <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>{user.email}</div>
        </div>
      )}
      <div style={{ 
        flex: 1,
        overflowY: "auto",
        padding: "16px",
      }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                textDecoration: "none",
                color: isActive ? "#fff" : "#9ca3af",
                backgroundColor: isActive ? "#4f46e5" : "transparent",
                borderRadius: "8px",
                fontSize: "14px",
                marginBottom: "4px",
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </div>
      <div style={{ 
        padding: "16px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}>
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#dc2626",
            color: "white",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          🔓 Logout
        </button>
      </div>
    </div>
  );
}