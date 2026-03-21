"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthService } from "@/lib/api/authServices";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await AuthService.login({ username: email, password });
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

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
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1f2937" }}>
            Portfolio Login
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
            Sign in to manage your portfolio
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              borderRadius: "12px",
              background: "#fee2e2",
              color: "#dc2626",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "14px",
                boxSizing: "border-box",
                transition: "all 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
              required
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "14px",
                boxSizing: "border-box",
                transition: "all 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "transform 0.2s",
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <div
            style={{
              padding: "16px",
              background: "#f3f4f6",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            <p style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "8px", color: "#374151" }}>
              Demo Account
            </p>
            <p style={{ fontSize: "12px", color: "#6b7280" }}>
              Email: E0275king@gmail.com<br />
              Password: admin123
            </p>
          </div>

          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Don't have an account?{" "}
            <Link
              href="/register"
              style={{
                color: "#4f46e5",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#4338ca")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4f46e5")}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}