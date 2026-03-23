export interface FooterLink {
  id: number;
  icon: string;
  url: string;
}

export interface FooterData {
  text: string;
  links: FooterLink[];
}