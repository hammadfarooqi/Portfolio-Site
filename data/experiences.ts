export interface Experience {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  caption: string;
}

export const experiences: Experience[] = [
  {
    title: "Hammad Farooqi",
    date: "Princeton '27 Undergrad",
    description: "Princeton University undergraduate, passionate about building meaningful digital experiences.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    caption: "About Me"
  },
  {
    title: "E-Commerce Platform",
    date: "2024",
    description: "A full-stack e-commerce solution with payment integration and inventory management.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    caption: "Built with Next.js & Stripe"
  },
  {
    title: "Task Management App",
    date: "2023",
    description: "Collaborative task management tool with real-time updates and team workspaces.",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    caption: "React & Firebase"
  },
  {
    title: "Weather Dashboard",
    date: "2023",
    description: "Real-time weather visualization with interactive maps and forecast predictions.",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
    caption: "Vue.js & OpenWeather API"
  },
  {
    title: "Social Media Analytics",
    date: "2022",
    description: "Analytics dashboard for tracking social media engagement and performance metrics.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    caption: "Python & D3.js"
  },
  {
    title: "Portfolio Website",
    date: "2022",
    description: "Personal portfolio showcasing projects and skills with smooth animations.",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    caption: "HTML, CSS & JavaScript"
  }
];

