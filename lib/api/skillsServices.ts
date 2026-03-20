import api from "../axios";

export interface Skill {
  id?: number;
  name: string;
  description?: string;
  percentage?: number;
  category?: string;
  image?: File | string | null;
  image_url?: string;
}

export const SkillsService = {
  // Get all skills
  getSkills: async (): Promise<Skill[]> => {
    const res = await api.get("skills/");
    return res.data.results || res.data;
  },

  // Get skill by id
  getSkillById: async (id: number): Promise<Skill> => {
    const { data } = await api.get(`skills/${id}/`);
    return data;
  },

  // Create new skill
  postSkill: async (payload: Partial<Skill>) => {
    const formData = new FormData();
    
    Object.keys(payload).forEach((key) => {
      const value = payload[key as keyof Skill];
      if (value !== undefined && value !== null && value !== "") {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else if (typeof value === 'string' || typeof value === 'number') {
          formData.append(key, String(value));
        }
      }
    });
    
    const { data } = await api.post("skills/", formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  // Update skill
  putSkill: async (id: number, payload: Partial<Skill>) => {
    const formData = new FormData();
    
    Object.keys(payload).forEach((key) => {
      const value = payload[key as keyof Skill];
      if (value !== undefined && value !== null && value !== "") {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else if (typeof value === 'string' || typeof value === 'number') {
          formData.append(key, String(value));
        }
      }
    });
    
    const { data } = await api.put(`skills/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  // Delete skill
  deleteSkill: async (id: number) => {
    await api.delete(`skills/${id}/`);
  },
};