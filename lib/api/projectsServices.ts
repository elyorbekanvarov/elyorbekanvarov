import api from "../axios";

export interface Project {
  id?: number;
  title: string;
  description: string;
  technologies: string;
  image?: File | string | null;
  image_url?: string;
  githubLink?: string;
  liveLink?: string;
}

export const ProjectsService = {
  getProjects: async (): Promise<Project[]> => {
    const res = await api.get("projects/");
    return res.data.results || res.data;
  },

  getProjectById: async (id: number): Promise<Project> => {
    const res = await api.get(`projects/${id}/`);
    return res.data;
  },

  postProject: async (payload: Partial<Project>) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      const value = payload[key as keyof Project];
      if (value !== undefined && value !== null && value !== "") {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else if (typeof value === 'string') {
          formData.append(key, value);
        }
      }
    });
    const { data } = await api.post("projects/", formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  putProject: async (id: number, payload: Partial<Project>) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      const value = payload[key as keyof Project];
      if (value !== undefined && value !== null && value !== "") {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else if (typeof value === 'string') {
          formData.append(key, value);
        }
      }
    });
    const { data } = await api.put(`projects/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  deleteProject: async (id: number) => {
    await api.delete(`projects/${id}/`);
  },
};