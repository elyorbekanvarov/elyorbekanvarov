import React from "react";

interface AuthFormProps {
  title: string;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
  error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  buttonText,
  error,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: "400px",
        padding: "40px",
        borderRadius: "20px",
        background: "#fff",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "10px", fontSize: "28px", color: "#1f2937" }}>
        {title}
      </h2>

      {error && (
        <div
          style={{
            padding: "12px",
            borderRadius: "10px",
            background: "#fee2e2",
            color: "#dc2626",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "14px 16px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          outline: "none",
          fontSize: "14px",
          transition: "all 0.2s",
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = "#4f46e5"}
        onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "14px 16px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          outline: "none",
          fontSize: "14px",
          transition: "all 0.2s",
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = "#4f46e5"}
        onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
        required
      />

      <button
        type="submit"
        style={{
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
          color: "white",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;