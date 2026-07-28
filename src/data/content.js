/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL SITE COPY LIVES HERE.
 *  Edit this file to update the site — no component changes needed.
 *  Layout, camera path and 3D props are wired up in `src/data/stations.js`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Karan Sandhu",
  first: "Karan",
  last: "Sandhu",
  tagline: "Beyond Limits",
  role: "Software Developer",
  blurb:
    "I build software that has to work the first time — flight optimization tools at Airbus, and a B2B SaaS I founded that runs a 40-person field operation every day.",
  location: "Hamilton / Waterloo, ON",
  email: "sandhk20@mcmaster.ca",
  website: "https://www.karansandhu.com",
  // Add `phone: "(905) 872-1595"` here if you want it listed publicly on the site.
  socials: [
    { label: "GitHub", handle: "sandhukaran", href: "https://github.com/sandhukaran" },
    {
      label: "LinkedIn",
      handle: "in/sandhukaran",
      href: "https://www.linkedin.com/in/sandhukaran",
    },
    { label: "Email", handle: "sandhk20@mcmaster.ca", href: "mailto:sandhk20@mcmaster.ca" },
  ],
};

export const highlights = [
  {
    stat: "Airbus",
    label: "Flight optimization",
    body: "Software developer contributing to flight optimization and UI work across C++, C#, .NET and Vue.js.",
  },
  {
    stat: "700+",
    label: "Users on TrackMyLawn",
    body: "Founded and scaled TrackMyLawn Inc. into a B2B SaaS with three enterprise contracts, 40 employees and 700 active users.",
  },
  {
    stat: "3.9",
    label: "GPA / 4.0",
    body: "Computer Science Co-op at McMaster, plus two years as a TA for Software Engineering and Computer Science.",
  },
  {
    stat: "2×",
    label: "Shipped side projects",
    body: "A computer-vision foosball tracker running in a real office, and a production-grade library system built on Next.js and Neon.",
  },
];

export const about = {
  heading: "About",
  kicker: "Station 01",
  paragraphs: [
    "I'm a Computer Science co-op student at McMaster University who spends most of his time somewhere between low-level systems and the browser. At Airbus I maintain a flight optimization tool with a C++ core and a C# .NET frontend, and contribute to an internal Vue.js UI library used across teams.",
    "Outside of that I founded TrackMyLawn Inc., a Next.js B2B SaaS that went from a one-year beta to three enterprise contracts. It handles role-based access, real-time job delegation, photo verification and in-app chat for 40 employees and 700 users.",
    "I also teach — two years as a TA covering everything from React and TypeScript to C, shell scripting and UNIX internals.",
  ],
};

export const experience = [
  {
    role: "Software Developer Intern",
    org: "Airbus",
    place: "Waterloo, ON",
    period: "Present",
    tags: ["C++", "C#", ".NET", "Vue.js"],
    points: [
      "Maintain a flight optimization tool as part of Airbus's software development team, working across a C++ backend and a C# .NET frontend.",
      "Contribute to internal UI library development in Vue.js with cross-functional teams, supporting digital transformation in aviation operations.",
    ],
  },
  {
    role: "Founder & Developer",
    org: "TrackMyLawn Inc.",
    place: "Ontario",
    period: "Aug 2024 — Present",
    tags: ["Next.js", "PostgreSQL", "SaaS"],
    points: [
      "Architected a full-stack Next.js B2B SaaS platform supporting daily operations for 40 employees and 700 users.",
      "Engineered role-based access featuring real-time job delegation, photo verification and universal in-app chat.",
      "Incorporated the business and scaled from a one-year beta to enterprise contracts with three commercial partners.",
    ],
  },
  {
    role: "Teaching Assistant — Software Eng & Computer Science",
    org: "McMaster University",
    place: "Hamilton, ON",
    period: "2023 — Present",
    tags: ["React", "TypeScript", "C", "UNIX"],
    points: [
      "Lead tutorials on modern frameworks (React, TypeScript, Bootstrap, jQuery) and core back-end concepts, promoting full-stack competency.",
      "Provide hands-on guidance with UNIX-like systems, C programming, shell scripting, and the use of pipes and filters.",
    ],
  },
];

export const earlierExperience = [
  { role: "Web Administrator & Operations Manager", org: "GNW Landscaping, Georgetown" },
  { role: "Food Services Assistant", org: "McMaster University" },
];

export const projects = [
  {
    title: "Foosgoos",
    subtitle: "Computer vision foosball tracker",
    period: "Year-long intern project",
    featured: true,
    points: [
      "Directed development of an automated foosball tracking system built on a wired, local laptop-processing architecture.",
      "Engineered an ML pipeline processing overhead camera feeds to track high-speed ball movement and automate real-time scorekeeping.",
      "Scaled the prototype into a permanent office tool that aggregates match data into monthly performance reports and leaderboards.",
    ],
    tags: ["Python", "OpenCV", "Machine Learning", "Data Analytics", "Hardware"],
    href: null,
  },
  {
    title: "BookHive",
    subtitle: "University library management system",
    period: "Jan 2025",
    featured: true,
    points: [
      "Built a production-grade library system with a public-facing app and an admin interface, featuring automated borrowing reminders, digital receipts and secure ID uploads.",
      "Implemented Next.js, TypeScript, Drizzle ORM and Neon (PostgreSQL) for a secure, scalable, high-performance backend.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Neon",
      "Drizzle ORM",
      "Upstash",
      "ImageKit",
      "Resend",
      "Tailwind",
    ],
    href: null,
  },
  {
    title: "TravelEase",
    subtitle: "Route & schedule optimizer",
    period: "2024",
    points: [
      "App that optimizes employee schedules using Node.js, React and the Maps API to calculate the most efficient routes.",
    ],
    tags: ["Node.js", "React", "Maps API"],
    href: null,
  },
  {
    title: "LinearLab",
    subtitle: "Linear algebra visualiser",
    period: "2024",
    points: [
      "Interactive visual interface for understanding matrix transformations, eigenvectors and other linear algebra concepts.",
    ],
    tags: ["JavaScript", "Canvas", "Math"],
    href: null,
  },
  {
    title: "GNW Website",
    subtitle: "Responsive marketing site",
    period: "2023",
    points: [
      "Responsive, user-friendly site to showcase services, improve customer engagement and streamline the company's online presence.",
    ],
    tags: ["React", "CSS"],
    href: null,
  },
];

export const skills = [
  {
    group: "Languages & Markup",
    items: ["Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    group: "Frameworks & Libraries",
    items: [
      "Next.js",
      "React.js",
      "Vue.js",
      ".NET",
      "Node.js",
      "Express.js",
      "Three.js",
      "OpenGL",
      "Drizzle ORM",
      "Tailwind CSS",
      "jQuery",
    ],
  },
  {
    group: "Tools & Technologies",
    items: [
      "Linux",
      "Shell Scripting",
      "Git",
      "GitHub Actions",
      "Upstash (Redis + QStash)",
      "Resend",
      "ImageKit",
    ],
  },
  { group: "Databases", items: ["PostgreSQL (Neon)", "MySQL", "MongoDB"] },
];

export const extracurriculars = [
  {
    role: "Chief Technical Officer",
    org: "Lexingworth — McMaster University",
    points: [
      "Oversee the design, development and deployment of the club's website, ensuring a seamless user experience.",
      "Collaborate with club leadership to drive technology initiatives and implement best practices for system maintenance and security.",
    ],
  },
  {
    role: "Linux Tutor",
    org: "Private tutoring",
    points: [
      "Hands-on guidance in Linux command-line usage, system administration and shell scripting.",
    ],
  },
  {
    role: "McMaster Start Coding",
    org: "McMaster University",
    points: ["Taught functional programming with visual tools to elementary school students."],
  },
  {
    role: "sciFUNdamentals",
    org: "McMaster University",
    points: [
      "Designed demo kits for volunteer teachers presenting science demos to elementary school students.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Applied Science, Computer Science (Co-op)",
  school: "McMaster University",
  place: "Hamilton, ON",
  gpa: "3.9 / 4.0",
  courses: [
    "Data Structures & Algorithms",
    "Concurrent Systems",
    "Databases",
    "Software Testing",
    "Computer Architecture",
  ],
};

export const contact = {
  heading: "Thanks for making the trip",
  body: "I'm open to new grad and internship roles, and I'm always happy to talk about graphics, systems or anything that ships.",
};
