type Skill= {
   name: string;
   icon: string;
   level: number;
   category:'frontend'  | 'tooling' | 'design';

}

type Project = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
    github: string;
    featured?: boolean;
}

type Experience = {
  company: string;
  position: string;
  duration: string;
  description: string[];
  logo?: string;
  skills: string[];
}

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  link?: string;
}

export const SKILLS: Skill[] = [
     {
    name: 'TypeScript',
    icon: 'SiTypescript',
    level: 6,
    category: 'frontend'
  },   
  
  {
    name: 'Next.js',
    icon: 'SiNextdotjs',
    level: 9,
    category: 'frontend'
  },

  {
    name: 'Tailwind CSS',
    icon: 'SiTailwindcss',
    level: 8,
    category: 'frontend'
  },

  {
    name: 'Git',
    icon: 'FaGitAlt',
    level: 8,
    category: 'tooling'
  },


]

export const PROJECT: Project[] = [
      {
           id: 'portfolio-v2',
    title: 'Interactive Portfolio',
    description: 'A performant portfolio with 3D elements and smooth animations built with Next.js and Framer Motion.',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    image: '/images/projects/portfolio.jpg',
    link: 'https://yourportfolio.com',
    github: 'https://github.com/yourname/portfolio',
    featured: true     
      },
       {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce solution with Stripe integration, product filtering, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: '/images/projects/ecommerce.jpg',
    link: 'https://store.example.com',
    github: 'https://github.com/yourname/ecommerce',
    featured: true
  },
  
  {
    id: 'task-manager',
    title: 'Task Manager App',
    description: 'Kanban-style task management application with drag-and-drop functionality and real-time updates.',
    tags: ['React', 'Firebase', 'DnD Kit', 'Tailwind'],
    image: '/images/projects/taskmanager.jpg',
    link: 'https://tasks.example.com',
    github: 'https://github.com/yourname/task-manager'
  },
      
]

export const EXPERIENCES: Experience[] = [
  {
    company: 'Tech Solutions Inc.',
    position: 'Frontend Developer',
    duration: 'Jan 2022 - Present',
    description: [
      'Developed responsive web applications using React and Next.js.',
      'Collaborated with designers to implement UI/UX best practices.',
      'Optimized application performance and SEO.'
    ],
    logo: '/images/companies/techsolutions.png',
    skills: ['React', 'Next.js', 'Tailwind CSS']
  },
  {
    company: 'Creative Agency',
    position: 'Web Developer',
    duration: 'Jun 2020 - Dec 2021',
    description: [
      'Built custom websites for clients using WordPress and custom themes.',
      'Managed client communications and project timelines.'
    ],
    logo: '/images/companies/creativeagency.png',
    skills: ['WordPress', 'HTML', 'CSS']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'CEO',
    company: 'Tech Innovations',
    content: 'An exceptional developer who consistently delivers high-quality work.',
    avatar: '/images/testimonials/johndoe.jpg',
    link: 'https://linkedin.com/in/johndoe'
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'CTO',
    company: 'Creative Solutions',
    content: 'A pleasure to work with, always brings innovative ideas to the table.',
    avatar: '/images/testimonials/janesmith.jpg'
  }
];


export const SKILLS_CATEGORIES = [
  {
    name: 'Frontend',
    items: SKILLS.filter(skill => skill.category === 'frontend')
  },
 ]
