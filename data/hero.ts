import { HeroData } from "@/types/hero";

export const heroData: HeroData = {
  badge: "👋 Hello, I'm Elyorbek",
  title: "Frontend Developer",
  description: "I build interactive and responsive web experiences.",
  socials: [
    { id: 1, icon: "/images/svg/github.svg", link: "https://github.com/" },
    { id: 2, icon: "/images/svg/linkedin.svg", link: "https://www.linkedin.com/feed/" },
    { id: 3, icon: "/images/svg/telegram.svg", link: "https://t.me/anvarov_elyor" },
  ],
  image: { src: "/images/png/hero.png", alt: "hero profile image" },
  scrollIcon: "/images/png/bottom.png",
};