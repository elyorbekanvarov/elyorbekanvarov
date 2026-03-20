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
}