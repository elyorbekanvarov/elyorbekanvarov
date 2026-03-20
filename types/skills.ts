export interface Skill {
  id: number;
  icon: string;
  title: string;
  desc: string;
}
export interface TechSkill {
  id?: number;
  name: string;
  percentage: number;
  category?: string;
}
export type SkillsData = Skill[];
export type TechSkillsData = TechSkill[];