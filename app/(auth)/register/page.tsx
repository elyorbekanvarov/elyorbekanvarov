"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // localStorage dan userlarni olish yoki yangi array
  const getUsers = () => {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: any[]) => {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  };

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

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      setLoading(false);
      return;
    }

    const existingUsers = getUsers();
    
    // Email mavjudligini tekshirish
    if (existingUsers.some((user: any) => user.email === email)) {
      setError("Email already exists");
      setLoading(false);
      return;
    }

    // Yangi user qo'shish
    const newUser = {
      email,
      password,
      name: fullName,
      role: "user",
      registeredAt: new Date().toISOString()
    };

    existingUsers.push(newUser);
    saveUsers(existingUsers);

    setSuccess("Account created successfully! You can now login.");
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    formContainer: {
      background: "white",
      borderRadius: "24px",
      padding: "40px",
      width: "100%",
      maxWidth: "420px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    },
    logo: {
      textAlign: "center" as const,
      marginBottom: "32px",
    },
    logoText: {
      fontSize: "28px",
      fontWeight: "bold",
      background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1f2937",
      textAlign: "center" as const,
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#6b7280",
      textAlign: "center" as const,
      marginBottom: "32px",
    },
    error: {
      padding: "12px",
      borderRadius: "12px",
      background: "#fee2e2",
      color: "#dc2626",
      fontSize: "14px",
      textAlign: "center" as const,
      marginBottom: "20px",
    },
    success: {
      padding: "12px",
      borderRadius: "12px",
      background: "#dcfce7",
      color: "#166534",
      fontSize: "14px",
      textAlign: "center" as const,
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      fontSize: "14px",
      transition: "all 0.2s",
      boxSizing: "border-box" as const,
    },
    button: {
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
      marginTop: "8px",
    },
    footer: {
      textAlign: "center" as const,
      marginTop: "24px",
      fontSize: "14px",
      color: "#6b7280",
    },
    link: {
      color: "#4f46e5",
      textDecoration: "none",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.logo}>
          <span style={styles.logoText}>Portfolio Admin</span>
        </div>
        
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Sign up to get started</p>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={styles.input}
              placeholder="John Doe"
              required
              onFocus={(e) => e.currentTarget.style.borderColor = "#4f46e5"}
              onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="admin@example.com"
              required
              onFocus={(e) => e.currentTarget.style.borderColor = "#4f46e5"}
              onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
              onFocus={(e) => e.currentTarget.style.borderColor = "#4f46e5"}
              onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
              onFocus={(e) => e.currentTarget.style.borderColor = "#4f46e5"}
              onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div style={styles.footer}>
          Already have an account?{" "}
          <Link href="/login" style={styles.link}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}