import api from "../axios";

export interface Experience {
  id?: number;
  role: string;
  company: string;
  description: string;
  start_date: string;
  end_date?: string;
}

export const ExperiencesService = {
  getExperiences: async (): Promise<Experience[]> => {
    const { data } = await api.get("experiences/");
    return data.results || data;
  },

  getExperienceById: async (id: number): Promise<Experience> => {
    const { data } = await api.get(`experiences/${id}/`);
    return data;
  },

  postExperience: async (payload: Partial<Experience>): Promise<Experience> => {
    const dataToSend = {
      role: payload.role,
      company: payload.company,
      description: payload.description,
      start_date: payload.start_date,
      end_date: payload.end_date || "",
    };
    const { data } = await api.post("experiences/", dataToSend);
    return data;
  },

  putExperience: async (id: number, payload: Partial<Experience>): Promise<Experience> => {
    const { data } = await api.put(`experiences/${id}/`, payload);
    return data;
  },

  deleteExperience: async (id: number): Promise<void> => {
    await api.delete(`experiences/${id}/`);
  },
};