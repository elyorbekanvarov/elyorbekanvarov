import api from "../axios";

export const AuthService = {
  login: async (data: { username: string; password: string }) => {
    try {
      const res = await api.post("token/", {
        email: data.username,
        password: data.password,
      });

      if (res.data.access) {
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: data.username,
            name: data.username,
            role: "admin",
          }),
        );
      }

      return res.data;
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      const errorMsg =
        error.response?.data?.detail || "Invalid email or password";
      throw new Error(errorMsg);
    }
  },

  register: async (data: {
    email: string;
    password: string;
    full_name?: string;
  }) => {
    try {
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

      if (users.find((u: any) => u.email === data.email)) {
        throw new Error("Email already exists");
      }

      const newUser = {
        email: data.email,
        password: data.password,
        name: data.full_name || data.email.split("@")[0],
        role: "user",
      };

      users.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(users));

      const fakeToken = "fake-token-" + Date.now();
      localStorage.setItem("token", fakeToken);
      localStorage.setItem("user", JSON.stringify(newUser));

      return { access: fakeToken, user: newUser };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  logout: () => {
    const oldToken = localStorage.getItem("token");

    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    localStorage.removeItem("registeredUsers");
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "token",
        newValue: null,
        oldValue: oldToken,
      }),
    );
  },

  getToken: () => localStorage.getItem("token"),

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => !!localStorage.getItem("token"),
};
