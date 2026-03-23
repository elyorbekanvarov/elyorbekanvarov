import api from "../axios";

export interface About {
  id?: number;
  name: string;
  role?: string;
  bio: string;
<<<<<<< HEAD
  image?: File | string | null;
  image_url?: string;
  cv_link?: string;
  order?: number;
}

export interface AboutCard {
  id: number;
  name: string;
  bio: string;
  image?: string;
}

export interface AboutStat {
  id: number;
  number: string;
  label: string;
}

export interface AboutData {
  title: string;
  description: string[];
  cards: AboutCard[];
  techStack: string[];
  stats: AboutStat[];
=======
  image?: string;
  image_url?: string;
  cv_link?: string;
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
}

export const AboutService = {
  getAbout: async (): Promise<About[]> => {
    const res = await api.get("about/");
    return res.data.results || res.data;
  },
<<<<<<< HEAD
=======

>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
  getAboutById: async (id: number): Promise<About> => {
    const res = await api.get(`about/${id}/`);
    return res.data;
  },
<<<<<<< HEAD
  postAbout: async (data: Partial<About>) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof About];
      if (value !== undefined && value !== null && value !== "") {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else if (typeof value === "string") {
          formData.append(key, value);
        }
      }
    });
    const res = await api.post("about/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  putAbout: async (id: number, data: Partial<About>) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof About];
      if (value !== undefined && value !== null && value !== "") {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else if (typeof value === "string") {
          formData.append(key, value);
        }
      }
    });
    const res = await api.put(`about/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  deleteAbout: async (id: number): Promise<void> => {
    await api.delete(`about/${id}/`);
  },
};

export const aboutData = {
  name: "Elyorbek Anvarov",
  role: "Frontend Developer",
  bio: "I'm a passionate Frontend Developer with a strong focus on creating beautiful, functional, and user-friendly web experiences.",
  image: "/images/png/about.png",
};
=======

  postAbout: async (data: Partial<About>) => {
    const res = await api.post("about/", data);
    return res.data;
  },

  putAbout: async (id: number, data: Partial<About>): Promise<About> => {
    const res = await api.put(`about/${id}/`, data);
    return res.data;
  },

  deleteAbout: async (id: number): Promise<void> => {
    await api.delete(`about/${id}/`);
  },
};
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
