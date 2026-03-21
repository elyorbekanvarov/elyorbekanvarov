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
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-panel">
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
                    placeholder="hello@example.com"
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
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="demo-card">
              <div className="demo-header">
                <span>🎯</span>
                <p>Demo credentials</p>
              </div>
              <div className="demo-details">
                <div className="demo-row">
                  <span className="demo-label">Email</span>
                  <code>E0275king@gmail.com</code>
                </div>
                <div className="demo-row">
                  <span className="demo-label">Password</span>
                  <code>admin123</code>
                </div>
              </div>
            </div>

            <div className="auth-footer">
              <p>
                Don't have an account? <Link href="/register">Create account</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="auth-decoration">
          <div className="decoration-content">
            <div className="quote">
              <span className="quote-icon">"</span>
              <p>Build something amazing with your portfolio</p>
              <span className="quote-author">— Admin Panel</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .auth-wrapper {
          max-width: 1280px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border-radius: 48px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .auth-panel {
          background: white;
          padding: 48px;
          border-radius: 48px 0 0 48px;
        }
        .auth-brand {
          text-align: center;
          margin-bottom: 40px;
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
        .auth-content {
          max-width: 380px;
          margin: 0 auto;
        }
        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .auth-header h1 {
          font-size: 32px;
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
        .alert-success {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #16a34a;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .input-group label {
          font-size: 13px;
          font-weight: 500;
          color: #334155;
          letter-spacing: 0.3px;
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
        .demo-card {
          background: #f8fafc;
          border-radius: 20px;
          padding: 20px;
          margin: 32px 0 24px;
          border: 1px solid #e2e8f0;
        }
        .demo-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .demo-header span {
          font-size: 18px;
        }
        .demo-header p {
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .demo-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .demo-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
        }
        .demo-label {
          color: #64748b;
        }
        .demo-row code {
          background: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-family: monospace;
          font-size: 12px;
          color: #4f46e5;
          border: 1px solid #e2e8f0;
        }
        .auth-footer {
          text-align: center;
          padding-top: 8px;
        }
        .auth-footer p {
          font-size: 13px;
          color: #64748b;
        }
        .auth-footer a {
          color: #4f46e5;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .auth-footer a:hover {
          color: #7c3aed;
        }
        .auth-decoration {
          background: linear-gradient(135deg, #1e1b4b, #0f172a);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
        }
        .decoration-content {
          text-align: center;
        }
        .quote {
          max-width: 320px;
        }
        .quote-icon {
          font-size: 64px;
          color: rgba(79, 70, 229, 0.4);
          line-height: 1;
        }
        .quote p {
          font-size: 20px;
          font-weight: 500;
          color: white;
          line-height: 1.4;
          margin: 16px 0 12px;
        }
        .quote-author {
          font-size: 14px;
          color: #94a3b8;
        }

        @media (max-width: 900px) {
          .auth-wrapper {
            grid-template-columns: 1fr;
          }
          .auth-panel {
            border-radius: 48px;
          }
          .auth-decoration {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .auth-panel {
            padding: 32px 24px;
          }
          .auth-header h1 {
            font-size: 28px;
          }
          .input-icon input {
            padding: 12px 12px 12px 0;
          }
        }
      `}</style>
    </div>
  );
}