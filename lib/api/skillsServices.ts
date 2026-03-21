import api from "../axios";

export interface Skill {
  id?: number;
  name: string;
  description?: string;
  percentage?: number;
  category?: string;
  image_url?: string;
}

export const SkillsService = {
  getSkills: async (): Promise<Skill[]> => {
    const res = await api.get("skills/");
    return res.data.results || res.data;
  },

  getSkillById: async (id: number): Promise<Skill> => {
    const { data } = await api.get(`skills/${id}/`);
    return data;
  },

  postSkill: async (payload: Partial<Skill>) => {
    const { data } = await api.post("skills/", payload);
    return data;
  },

  putSkill: async (id: number, payload: Partial<Skill>) => {
    const { data } = await api.put(`skills/${id}/`, payload);
    return data;
  },

  deleteSkill: async (id: number) => {
    await api.delete(`skills/${id}/`);
  },
};