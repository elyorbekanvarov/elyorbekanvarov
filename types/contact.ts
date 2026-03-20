export interface ContactInfoItem {
  icon: string;
  title: string;
  text: string;
}

export interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

export interface ContactItem {
  id: number;
  name: string;
  email: string;
  message: string;
}

export interface ContactData {
  count?: number;
  results: ContactItem[];
}