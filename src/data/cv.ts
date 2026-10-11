/**
 * Single source of truth for all portfolio content.
 * Update this file to change anything shown on the site.
 */

export const profile = {
  name: "Md. Al-Amin",
  shortName: "Al-Amin",
  initials: "MA",
  title: "Front-End Developer",
  roles: [
    "Front-End Developer",
    "Angular Specialist",
    "React & Next.js Engineer",
    "WordPress Expert",
    "API Integration Pro",
  ],
  summary:
    "Front-End Developer with 7+ years of experience building responsive web applications using Angular, React, Next.js, JavaScript, HTML5, CSS3, WordPress, and API integrations. Experienced in delivering client projects and leading front-end development workflows.",
  location: "Turag, Dhaka, Bangladesh",
  phones: ["+880 1772956364", "+880 1676790690"],
  /** Used by the contact form to open a pre-filled WhatsApp chat. Digits only. */
  whatsapp: "8801772956364",
  /** Add your email here to show it in the contact section (optional). */
  email: "",
  // TODO: replace with your real profile URLs
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
  /** Drop your PDF into /public with this file name to enable the download button. */
  cvFile: "/Md-Al-Amin-CV.pdf",
  available: true,
};

export const stats = [
  { value: 7, suffix: "+", label: "Years of experience" },
  { value: 35, suffix: "", label: "RESTful APIs engineered" },
  { value: 45, suffix: "%", label: "Faster prototyping with AI" },
  { value: 30, suffix: "%", label: "Page load time reduced" },
];

export type Role = {
  title: string;
  period: string;
  description?: string;
  achievements: { text: string; highlight?: string }[];
  tags: string[];
};

export const experience = {
  company: "Efficient Software Solutions Ltd",
  type: "Full-time",
  description:
    "Experienced in front-end and full-stack web development, working on client projects, API integration, responsive interfaces, WordPress solutions, and modern JavaScript frameworks.",
  roles: [
    {
      title: "Front-End Developer",
      period: "Mar 2021 – Present",
      description:
        "Develop and maintain web applications and client projects using Angular, React, Next.js, Node.js, NestJS, JavaScript, HTML5, CSS3, PHP, WordPress, and API integrations.",
      achievements: [
        {
          text: "Worked as the sole Front-End Engineer on a 6-member development team, taking full ownership of UI design, frontend architecture, feature development, and API integration to deliver complete user-facing functionality.",
          highlight: "sole Front-End Engineer",
        },
        {
          text: "Improved system reliability by 20% through architectural hardening of event-driven services (Transactional Outbox, retries, idempotency).",
          highlight: "system reliability by 20%",
        },
        {
          text: "Accelerated prototyping by 45% by integrating AI-assisted development (Claude Code, Copilot, Antigravity) into Agile sprints while maintaining code quality standards.",
          highlight: "45%",
        },
      ],
      tags: ["Angular", "React", "Next.js", "NestJS", "WordPress", "AI Tooling"],
    },
    {
      title: "Front-End Developer",
      period: "Dec 2019 – Present",
      achievements: [
        {
          text: "Delivered critical feature enhancements and bug resolutions across the ERP, contributing to a measurable increase in sprint velocity.",
          highlight: "increase in sprint velocity",
        },
        {
          text: "Built real-time notification features with SignalR and automated PDF generation pipelines.",
          highlight: "SignalR",
        },
      ],
      tags: ["ERP", "SignalR", "PDF Pipelines", "Angular"],
    },
    {
      title: "Front-End Developer",
      period: "Oct 2019 – 2020",
      achievements: [
        {
          text: "Cut page load times by 30% across enterprise applications via Redis caching, Elasticsearch query optimization, and Angular lazy loading.",
          highlight: "30%",
        },
        {
          text: "Engineered 35 RESTful APIs powering order, inventory, and notification workflows across the ERP and OMS platforms.",
          highlight: "35 RESTful APIs",
        },
        {
          text: "Introduced xUnit test suites for critical business modules, establishing the team's automated testing practice.",
          highlight: "xUnit test suites",
        },
      ],
      tags: ["Redis", "Elasticsearch", "REST APIs", "xUnit"],
    },
  ] satisfies Role[],
};

export const skillGroups = [
  { title: "Front-End Frameworks", icon: "layers", items: ["Angular", "Next.js"] },
  { title: "Front-End Libraries", icon: "atom", items: ["React", "JavaScript", "jQuery"] },
  { title: "Backend Development", icon: "server", items: ["Node.js", "NestJS"] },
  {
    title: "Web Technologies",
    icon: "code",
    items: ["HTML5", "CSS3", "JavaScript", "PHP", "SASS", "LESS", "WordPress"],
  },
  {
    title: "Development",
    icon: "spark",
    items: [
      "API Integration",
      "Responsive Design",
      "PSD-to-HTML",
      "Cross-browser Compatibility",
      "W3C Validation",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "tool",
    items: ["WordPress", "ThemeForest", "Plugin Integration", "Git"],
  },
] as const;

export const clientPlatforms = [
  "QSmart",
  "Material Direct",
  "Smart Lotto",
  "churchfieldhomeservices",
  "sll.ie",
];

export const techMarquee = [
  "Angular",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "NestJS",
  "HTML5",
  "CSS3",
  "SASS",
  "LESS",
  "PHP",
  "WordPress",
  "jQuery",
  "SignalR",
  "Redis",
  "Elasticsearch",
  "Git",
  ".NET 8",
];

export const projects = [
  {
    title: "QSmart ERP Dashboard",
    category: "Enterprise · Data Visualization",
    description:
      "Developed and maintained interactive ERP dashboard charts and data visualizations using Angular, integrating APIs to display business metrics and performance data in a responsive and user-friendly interface.",
    image: "/qsmart-erp.jpg",
    tags: ["Angular", "Charts", "REST API", "Responsive UI"],
  },
  {
    title: "ScheduleBookingApi",
    category: "Backend · Scheduling",
    description:
      "Scheduling API in .NET 8 with code-first migrations, booking workflows, and resource availability management.",
    image: "/schedule-booking.jpg",
    tags: [".NET 8", "EF Core", "Code-first", "Booking Workflows"],
  },
];

export const education = [
  {
    degree: "Master of Business Administration (MBA)",
    school: "Southeast University of Bangladesh",
    period: "Running",
    detail: "Business",
  },
  {
    degree: "Bachelor of Business Administration (BBA)",
    school: "Asian University of Bangladesh",
    period: "2019",
    detail: "GPA 3.028 / 4.00",
  },
  {
    degree: "Higher Secondary Certificate (H.S.C)",
    school: "Safiuddin Sarker Academy and College",
    period: "2014",
    detail: "GPA 4.60 / 5.00",
  },
  {
    degree: "Secondary School Certificate (S.S.C)",
    school: "Kamar Para School & College",
    period: "2012",
    detail: "GPA 3.90 / 5.00 · Dhaka Board",
  },
];

export const softSkills = [
  "Creative problem solving",
  "Handling workload",
  "Teamwork",
  "Communication",
  "Leadership",
];

export const languages = [
  { name: "Bengali", level: "Native", value: 100 },
  { name: "English", level: "Working proficiency", value: 75 },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
