export interface ExperienceItem {
  id: number;
  year: string;
  position: string;
  company: string;
  description: string;
  side: "left" | "right";
  icon: string;
}

export type ExperienceData = ExperienceItem[];