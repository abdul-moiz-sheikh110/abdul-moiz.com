export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  capabilities: string[];
  href: string | null;
  visual: "academy" | "teleco" | "solutions" | "lms";
  image?: string;
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    slug: "crest-view-academy",
    title: "Crest View Academy",
    category: "Education website",
    description:
      "A warm, clear school website designed to help parents understand the academy's programmes, values, and admissions journey.",
    capabilities: [
      "Responsive website design",
      "Programme and admissions content",
      "Mobile-friendly enquiry journey",
    ],
    href: "https://crestviewacademy.pk/",
    visual: "academy",
    image: "/project-previews/crest-view-academy.png",
    imageAlt: "Crest View Academy website homepage",
  },
  {
    slug: "teleco-solutions",
    title: "Teleco Solutions",
    category: "Corporate ICT website",
    description:
      "A service-led corporate presence for an ICT provider, presenting connectivity, infrastructure, software, cloud, and managed services.",
    capabilities: [
      "Structured service catalogue",
      "Corporate brand presentation",
      "Lead generation touchpoints",
    ],
    href: "https://www.teleco-solutions.com/",
    visual: "teleco",
    image: "/project-previews/teleco-solutions.png",
    imageAlt: "Teleco Solutions website homepage",
  },
  {
    slug: "110-solutions",
    title: "110 Solutions",
    category: "Digital and technology services website",
    description:
      "A professional website that presents digital and technology services for organisations with evolving delivery needs.",
    capabilities: [
      "Website design",
      "Web development",
      "Business systems",
    ],
    href: "https://www.110solutions.com.au/",
    visual: "solutions",
    image: "/project-previews/110-solutions.png",
    imageAlt: "110 Solutions website homepage",
  },
  {
    slug: "school-lms",
    title: "School LMS",
    category: "Custom school management system",
    description:
      "A comprehensive administration dashboard that brings school operations into one clear system for everyday management.",
    capabilities: [
      "Students, staff, and attendance",
      "Fees, exams, and timetables",
      "Roles, permissions, and reports",
    ],
    href: null,
    visual: "lms",
    image: "/school-lms-dashboard.png",
    imageAlt: "School management dashboard showing users, staff, attendance, fees, and reports",
  },
];
