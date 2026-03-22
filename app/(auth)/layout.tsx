"use client"
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
        {children}
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
            padding: 32px 24px;
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
            padding: 24px 20px;
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
            padding: 20px 16px;
          }
        }
      `}</style>
    </div>
  );
}