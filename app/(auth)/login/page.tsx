"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "40px",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{ fontSize: "28px", marginBottom: "20px", color: "#1f2937" }}
        >
          Portfolio Admin
        </h1>
        <button
          onClick={() => router.push("/admin/dashboard")}
          style={{
            padding: "12px 24px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#4338ca")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#4f46e5")}
        >
          Enter Admin Panel
        </button>
        <p style={{ marginTop: "20px", fontSize: "12px", color: "#9ca3af" }}>
          Click to continue (no login required)
        </p>
      </div>
    </div>
  );
}
