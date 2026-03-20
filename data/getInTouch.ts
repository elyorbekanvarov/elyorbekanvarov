import { ContactInfoItem, SocialLink } from "@/types/contact";

export const contactInfo: ContactInfoItem[] = [
  {
    icon: "/images/svg/email.svg",
    title: "Email",
    text: "elyorbek@example.com",
  },
  {
    icon: "/images/svg/phone.svg",
    title: "Phone",
    text: "+998 (95) 252-05-09",
  },
  {
    icon: "/images/svg/location.svg",
    title: "Location",
    text: "Ferghana, Uzbekistan",
  },
];

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com",
    icon: "/images/svg/github.svg",
    label: "GitHub",
  },
  {
    href: "https://linkedin.com",
    icon: "/images/svg/linkedin.svg",
    label: "LinkedIn",
  },
  {
    href: "https://t.me/anvarov_elyor",
    icon: "/images/svg/telegram.svg",
    label: "Telegram",
  },
];