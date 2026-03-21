"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthService } from "@/lib/api/authServices";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const result = await AuthService.register({
        email,
        password,
        full_name: fullName,
      });

      if (result.access) {
        setSuccess("Account created successfully! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1000);
      } else {
        setError("Registration failed");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message);
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
          <h1
            style={{ fontSize: "28px", fontWeight: "bold", color: "#1f2937" }}
          >
            Portfolio Register
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
            Create your account
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

        {success && (
          <div
            style={{
              padding: "12px",
              borderRadius: "12px",
              background: "#dcfce7",
              color: "#166534",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {success}
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
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
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
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
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
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
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
              if (!loading)
                e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#4f46e5",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#4338ca")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4f46e5")}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
