import api from "../axios";

export const AuthService = {
  login: async (data: { email: string; password: string }) => {
    try {
      const res = await api.post("/api/token/", {
        email: data.email,
        password: data.password,
      });
      
      if (res.data.access) {
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem("user", JSON.stringify(res.data.user || { 
          email: data.email,
          name: data.email.split("@")[0]
        }));
      }
      
      return res.data;
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      throw new Error(error.response?.data?.detail || "Login failed");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
  },

  getToken: () => localStorage.getItem("token"),
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: () => !!localStorage.getItem("token"),
};