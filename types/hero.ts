export interface SocialLink {
  id: number;
  icon: string;
  link: string;
}

export interface HeroImage {
  src: string;
  alt: string;
}

export interface HeroButton {
  text: string;
  link: string;
}

export interface HeroData {
  badge: string;
  title: string;
  description: string;
  buttons?: HeroButton[];
  socials: SocialLink[];
  image: HeroImage;
  scrollIcon: string;
}
