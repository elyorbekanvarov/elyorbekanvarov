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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px 0",
      }}
    >
      <div>
        {user && (
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            marginBottom: "20px",
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              background: "#4f46e5",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "12px",
              fontSize: "20px",
            }}>
              {user.name?.charAt(0) || "A"}
            </div>
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>{user.name}</div>
            <div style={{ fontSize: "11px", color: "#9ca3af" }}>{user.email}</div>
          </div>
        )}
        <div style={{ padding: "0 16px" }}>
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
                  padding: "12px 16px",
                  textDecoration: "none",
                  color: isActive ? "#fff" : "#9ca3af",
                  backgroundColor: isActive ? "#4f46e5" : "transparent",
                  borderRadius: "10px",
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div style={{ padding: "0 20px 20px 20px" }}>
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "#dc2626",
            color: "white",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          🔓 Logout
        </button>
      </div>
    </div>
  );
}