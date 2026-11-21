import { Project, Skill, Experience } from "@/types";

export const SKILLS_CATEGORIES = [
  {
    name: "Frontend Development",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    name: "Backend Development",
    skills: [
      "Node.js",
      "Express.js",
      "REST API Development",
      "Authentication and Authorization",
      "API Integration",
    ],
  },
  {
    name: "Databases and ORM",
    skills: [
      "MySQL",
      "PostgreSQL",
      "Supabase",
      "Drizzle ORM",
      "SQL",
    ],
  },
  {
    name: "Testing and Development Tools",
    skills: [
      "Playwright",
      "Git",
      "GitHub",
      "VS Code",
      "Bun",
      "Postman",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "lensconnect",
    title: "LensConnect",
    category: "Full-Stack Web Application",
    description:
      "LensConnect is a photography marketplace built to connect clients with photographers. The platform allows photographers to showcase their portfolios while helping clients discover photographers based on their preferences. I developed the application with a focus on authentication, role-based access, API development, database integration, and responsive user experiences.",
    tech_stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Drizzle ORM",
      "REST APIs",
      "JWT Authentication",
    ],
    features: [
      "Separate authentication experiences for clients and photographers",
      "Role-based authentication and authorization",
      "Photographer profiles and portfolio management",
      "Photographer discovery and search",
      "Database integration and management",
      "REST API development",
      "Secure authentication using JWT and HTTP-only cookies",
      "Responsive user interfaces",
    ],
    image_url: "/lensconnect.png",
    live_url: "https://lesnconnect.vercel.app/",
    github_url: "https://github.com/LensConnect/lensconnect",
    featured: true,
  },
  {
    id: "carrentify",
    title: "CarRentify",
    category: "Full-Stack Web Application",
    description:
      "A car rental platform built with Next.js and Firebase, featuring real-time vehicle booking, user authentication, and responsive user interfaces.",
    tech_stack: ["Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Firebase", "REST APIs"],
    features: [
      "Real-time vehicle discovery and reservation workflow",
      "User authentication and profile management",
      "Interactive vehicle catalog with filtering and search",
      "Responsive, mobile-first design",
    ],
    image_url: "/carrentify.png",
    live_url: "https://car-rentify-six.vercel.app/",
    github_url: "https://github.com/izzymony/carRentify/tree/cars",
    featured: true,
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Frontend Developer",
    company: "Aquila Cyber",
    period: "Nov 2025 — Present",
    description:
      "Responsible for building responsive, accessible web applications and collaborating across cross-functional teams with designers, backend engineers, and product managers. Built performant UI architectures that improved user engagement by 30%, optimized loading times by 50%, and integrated REST APIs to power real-time data flows and seamless digital experiences.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Node.js", "Agile"],
  },
  {
    role: "Frontend Developer (Intern) & QA Tester",
    company: "Myinstashop",
    period: "Apr 2025 — Present",
    description:
      "Assisted in developing user-facing web features while ensuring product quality and stability through systematic testing. Built modular components with Next.js and TypeScript, translated Figma designs into accessible code, identified and tracked bugs, and performed regression, API integration, and manual/functional testing before releases.",
    skills: ["Next.js", "Tailwind CSS", "TypeScript", "Playwright", "QA Testing", "Figma"],
  },
  {
    role: "Frontend Developer (Intern)",
    company: "Tverza",
    period: "Jan 2025 — Apr 2025",
    description:
      "Contributed to building and optimizing digital interfaces for enterprise commerce workflows. Collaborated with designers to deliver responsive UI/UX solutions using Next.js, TypeScript, and Tailwind CSS, integrated backend REST APIs, and participated in rigorous code reviews to maintain engineering quality.",
    skills: ["Next.js", "JavaScript", "TypeScript", "REST APIs", "Tailwind CSS", "Git"],
  },
];
