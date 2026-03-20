export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <img
          src="/images/jpg/bgc.jpg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}