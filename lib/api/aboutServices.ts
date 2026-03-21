import api from "../axios";

export interface About {
  id?: number;
  name: string;
  role?: string;
  bio: string;
  image?: string;
  image_url?: string;
  cv_link?: string;
}

export const AboutService = {
  getAbout: async (): Promise<About[]> => {
    const res = await api.get("about/");
    return res.data.results || res.data;
  },

  getAboutById: async (id: number): Promise<About> => {
    const res = await api.get(`about/${id}/`);
    return res.data;
  },

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