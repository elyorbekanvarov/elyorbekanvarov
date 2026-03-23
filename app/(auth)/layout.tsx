<<<<<<< HEAD
"use client";

import Link from "next/link";

=======
"use client"
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      <div className="auth-image">
        <img
          src="/images/jpg/bgc.jpg"
          alt="Background"
        />
      </div>
      <div className="auth-form-container">
<<<<<<< HEAD
        <div className="auth-content">
          <Link href="/" className="back-home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H9v8H4a2 2 0 0 1-2-2z" />
              <path d="M9 22v-8h6v8" />
            </svg>
            Back to home
          </Link>
          {children}
        </div>
=======
        {children}
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
      </div>

      <style jsx>{`
        .auth-layout {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }
        .auth-image {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        .auth-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }
        .auth-form-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%);
          padding: 24px;
        }
<<<<<<< HEAD
        .auth-content {
          position: relative;
          width: 100%;
          max-width: 480px;
        }
        .back-home {
          position: absolute;
          top: -60px;
          left: 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          border-radius: 40px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .back-home:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(-4px);
        }
        .back-home svg {
          transition: transform 0.3s ease;
        }
        .back-home:hover svg {
          transform: translateX(-2px);
        }
=======
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b

        /* Responsive */
        @media (max-width: 900px) {
          .auth-layout {
            flex-direction: column;
          }
          .auth-image {
            flex: 0 0 200px;
            min-height: 200px;
          }
          .auth-image img {
            position: relative;
            height: 200px;
            object-fit: cover;
          }
          .auth-form-container {
            flex: 1;
<<<<<<< HEAD
            padding: 48px 24px 32px;
          }
          .back-home {
            top: -40px;
=======
            padding: 32px 24px;
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
          }
        }

        @media (max-width: 640px) {
          .auth-image {
            flex: 0 0 150px;
            min-height: 150px;
          }
          .auth-image img {
            height: 150px;
          }
          .auth-form-container {
<<<<<<< HEAD
            padding: 40px 20px 24px;
          }
          .back-home {
            top: -35px;
            padding: 6px 12px;
            font-size: 12px;
=======
            padding: 24px 20px;
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
          }
        }

        @media (max-width: 480px) {
          .auth-image {
            flex: 0 0 120px;
            min-height: 120px;
          }
          .auth-image img {
            height: 120px;
          }
          .auth-form-container {
<<<<<<< HEAD
            padding: 32px 16px 20px;
          }
          .back-home {
            top: -30px;
=======
            padding: 20px 16px;
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
          }
        }
      `}</style>
    </div>
  );
}