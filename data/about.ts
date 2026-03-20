import { AboutData } from "@/types/about";

export const aboutData: AboutData = {
  title: "About Me",

  description: [
    "I'm a passionate Frontend Developer with a strong focus on creating beautiful, functional, and user-friendly web experiences. With expertise in modern web technologies, I transform ideas into reality.",
    "My journey in web development started with a curiosity for how things work on the web, and it has evolved into a career where I get to solve problems and build amazing products every day.",
    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or learning about the latest design trends."
  ],

  cards: [
    {
      id: 1,
      icon: "code",
      title: "Clean Code",
      description: "Writing maintainable and scalable code"
    },
    {
      id: 2,
      icon: "focus",
      title: "UI/UX Focus",
      description: "Pixel-perfect designs with attention to detail"
    },
    {
      id: 3,
      icon: "perfomance",
      title: "Performance",
      description: "Optimized and fast web applications"
    },
    {
      id: 4,
      icon: "collaboration",
      title: "Collaboration",
      description: "Team player with strong communication"
    }
  ],

  techStack: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Tailwind",
    "Figma",
    "TypeScript",
    "Git"
  ],

  stats: [
    {
      id: 1,
      number: "3+",
      label: "Years Exp."
    },
    {
      id: 2,
      number: "50+",
      label: "Projects"
    },
    {
      id: 3,
      number: "20+",
      label: "Happy Clients"
    }
  ]
};