export interface Project {
  id?: number;
  title: string;
  description: string;
  technologies: string;
  image?: File | string | null;
  image_url?: string;
  githubLink?: string;
  liveLink?: string;
  demo_link?: string;
  repo_link?: string;
  created_at?: string;
}

export type ProjectsData = Project[];
