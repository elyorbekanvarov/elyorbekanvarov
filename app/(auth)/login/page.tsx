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
    <div className="auth-card">
      {/* Back to home button */}
      <Link href="/" className="back-home">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H9v8H4a2 2 0 0 1-2-2z" />
          <path d="M9 22v-8h6v8" />
        </svg>
        Back to home
      </Link>

      <div className="auth-brand">
        <div className="brand-icon">✨</div>
        <h2>Portfolio Login</h2>
        <p>Manage your creative work</p>
      </div>

      <div className="auth-content">
        <div className="auth-header">
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email address</label>
            <div className="input-icon">
              <span>📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-icon">
              <span>🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? <span className="loading-spinner"></span> : "Sign in"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link href="/register">Create account</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .auth-card {
          width: 100%;
          max-width: 480px;
          background: white;
          border-radius: 32px;
          padding: 48px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          position: relative;
        }
        .back-home {
          position: absolute;
          top: 24px;
          left: 24px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #f1f5f9;
          border-radius: 40px;
          color: #475569;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .back-home:hover {
          background: #e2e8f0;
          transform: translateX(-2px);
        }
        .back-home svg {
          transition: transform 0.2s ease;
        }
        .back-home:hover svg {
          transform: translateX(-2px);
        }
        .auth-brand {
          text-align: center;
          margin-bottom: 40px;
          margin-top: 20px;
        }
        .brand-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin: 0 auto 16px;
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }
        .auth-brand h2 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }
        .auth-brand p {
          font-size: 14px;
          color: #64748b;
        }
        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .auth-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .auth-header p {
          font-size: 14px;
          color: #64748b;
        }
        .alert {
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }
        .alert-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
        }
        .input-group {
          margin-bottom: 20px;
        }
        .input-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #334155;
          margin-bottom: 8px;
        }
        .input-icon {
          display: flex;
          align-items: center;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          transition: all 0.2s;
        }
        .input-icon:focus-within {
          border-color: #4f46e5;
          background: white;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }
        .input-icon span {
          padding: 0 14px;
          font-size: 18px;
          opacity: 0.6;
        }
        .input-icon input {
          flex: 1;
          padding: 14px 14px 14px 0;
          border: none;
          background: transparent;
          font-size: 14px;
          outline: none;
          color: #0f172a;
        }
        .input-icon input::placeholder {
          color: #94a3b8;
        }
        .auth-button {
          width: 100%;
          margin-top: 8px;
          padding: 14px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .auth-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
        }
        .auth-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .auth-footer {
          text-align: center;
          margin-top: 32px;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }
        .auth-footer p {
          font-size: 13px;
          color: #64748b;
        }
        .auth-footer a {
          color: #4f46e5;
          text-decoration: none;
          font-weight: 600;
        }
        .auth-footer a:hover {
          color: #7c3aed;
        }

        @media (max-width: 640px) {
          .auth-card {
            padding: 40px 24px;
          }
          .back-home {
            top: 16px;
            left: 16px;
            padding: 5px 10px;
            font-size: 12px;
          }
          .auth-brand {
            margin-top: 16px;
          }
          .auth-brand h2 {
            font-size: 22px;
          }
          .auth-header h1 {
            font-size: 24px;
          }
          .input-icon input {
            padding: 12px 12px 12px 0;
          }
          .auth-button {
            padding: 12px;
          }
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 32px 20px;
          }
          .back-home {
            top: 12px;
            left: 12px;
          }
          .brand-icon {
            width: 48px;
            height: 48px;
            font-size: 24px;
          }
          .auth-brand h2 {
            font-size: 20px;
          }
          .auth-header h1 {
            font-size: 22px;
          }
          .input-group label {
            font-size: 12px;
          }
          .input-icon span {
            font-size: 16px;
            padding: 0 10px;
          }
          .input-icon input {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}