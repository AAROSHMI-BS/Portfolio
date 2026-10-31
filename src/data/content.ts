/**
 * All portfolio content lives in this single source of truth file.
 * Editable by the user without modifying UI component code.
 */

export interface GalleryItem {
  id: string;
  src: string;
  event: string;
  category: 'campus-arena-2026' | 'future-6-0-srtn-2026' | 'codesprint-26' | 'capextreme' | 'capestart-internship' | 'dream-kanniyakumari' | 'activities';
  caption: string;
  alt: string;
  type: 'Prize' | 'Certificate' | 'On stage';
  date?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  tags: string[];
  description: string;
  badge?: string;
  githubUrl?: string; // renders ONLY if set and not placeholder
  liveUrl?: string;   // renders ONLY if set and not placeholder
  accentColor: string;
  // Deep Case Study Detail Modal fields
  problem: string;
  role: string;
  architecture: string[];
  techUsed: string[];
  learnings: string;
  challenges?: string;
  unknowns?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organizer: string;
  date: string;
  description: string;
  badge: string;
  isFirstPrize?: boolean;
  coverImage?: string; // path to cover photo if available
  eventId: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  points: string[];
  certificateImage?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  role: string;
  description: string;
  badge?: string;
  coverImage?: string;
}

export const PORTFOLIO_CONTENT = {
  meta: {
    siteTitle: 'Aaroshmi B S | Software Developer Portfolio',
    description: 'Portfolio of Aaroshmi B S, a pre-final year Computer Science student exploring AI/ML, Python, Django, and full-stack software development.',
    author: 'Aaroshmi B S',
    year: '2026',
    edition: 'Editorial Kinetic Edition',
    location: 'Kanyakumari, Tamil Nadu, India',
    geoLabel: 'KANYAKUMARI, IN',
    roleLabel: 'SOFTWARE DEVELOPER / AI-ML',
  },

  hero: {
    badgeTop: "HELLO, I'M",
    firstName: "AAROSHMI",
    lastNameSubtitle: "B S, building with code and curiosity.",
    headline: "Pursuing BE (Hons) Computer Science and Engineering | Hackathon Enthusiast",
    subLinePrefix: "Building reliable, user-focused software with ",
    rotatingWords: ["Python", "Django", "AI/ML", "Full-stack"],
    subLineSuffix: ".",
    profileImage: "/profile.jpg",
    linkedinUrl: "https://www.linkedin.com/in/aaroshmi-b-s",
    email: "aaroshmibs@gmail.com",
    githubUrl: "https://github.com/YOUR-USERNAME", // Hidden while placeholder
    resumePath: "/resume.pdf",
    ctas: {
      viewProjects: "View Projects",
      downloadResume: "Download Resume",
      contactMe: "Contact Me",
    },
    rotatingRingText: "AAROSHMI · PORTFOLIO · 2026 · COMPUTER SCIENCE · AI/ML · ",
  },

  about: {
    heading: "About",
    index: "01",
    lead: "Pre-final year B.E. Computer Science and Engineering student with a keen interest in Artificial Intelligence, Machine Learning and Software Development.",
    bio: "I am a pre-final year B.E. Computer Science and Engineering student with a keen interest in Artificial Intelligence, Machine Learning and Software Development. I enjoy learning new technologies, building projects, and participating in hackathons that challenge me to think creatively and solve real-world problems. I believe in continuous learning and am always looking for opportunities to expand my technical skills while collaborating with others. Currently, I am exploring AI, Data Science, Python, and full-stack development, with the goal of building impactful solutions and growing as a software engineer.",
    highlights: [
      { label: "Focus Areas", value: "Python, Django, AI/ML Pipelines & Modern Frontend" },
      { label: "Degree Path", value: "B.E. (Hons) Computer Science & Engineering (2024–2028)" },
      { label: "Current Mindset", value: "Hands-on Hackathons & Production-Ready Code" },
    ]
  },

  education: [
    {
      id: "edu-1",
      degree: "B.E. Computer Science and Engineering",
      institution: "St. Xavier's Catholic College of Engineering",
      period: "2024 – 2028",
      details: "Pre-final year undergraduate coursework focusing on software development, data structures, algorithms, and applied machine learning.",
    },
    {
      id: "edu-2",
      degree: "Higher Secondary Education (Mathematics & Computer Science)",
      institution: "Kendriya Vidyalaya (CBSE)",
      period: "Aug 2022 – Apr 2024",
      details: "Strong foundations in mathematics, algorithmic thinking, and core computational principles.",
    },
    {
      id: "edu-3",
      degree: "Primary & Secondary Education",
      institution: "Adarsh Vidya Kendra (CBSE)",
      period: "Jun 2011 – May 2022",
      details: "Schooling with active participation in science exhibitions, academic competitions, and club activities.",
    },
  ] as EducationItem[],

  experience: [
    {
      id: "exp-1",
      role: "Student Intern, AI & Data Science",
      organization: "CapeStart",
      period: "Jun 2026 – Jul 2026",
      location: "Nagercoil, Tamil Nadu",
      type: "On-site",
      points: [
        "Learned and applied Python and Django through project-based development.",
        "Worked on a Vehicle Parking Management System involving application logic, database integration, and CRUD operations.",
        "Explored an AI/ML text-classification workflow, including text preprocessing, feature extraction, model training, and evaluation.",
        "Learned to integrate machine-learning functionality into a Django application.",
      ],
      certificateImage: undefined, // Add path once user attaches scan (e.g. /src/assets/events/capestart-internship/capestart-certificate.jpg)
    },
    {
      id: "exp-2",
      role: "Web Development Intern",
      organization: "AK Infopark",
      period: "Dec 2025 (1 month)",
      location: "Kanyakumari, Tamil Nadu",
      type: "On-site",
      points: [
        "Worked on frontend-focused web projects using HTML, CSS, JavaScript, and Bootstrap.",
        "Built responsive web layouts and enhanced user interface responsiveness across screen form factors.",
      ],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "proj-1",
      title: "Vehicle Parking Management System",
      subtitle: "Internship Capstone · CapeStart",
      tags: ["Python", "Django", "SQLite", "HTML5/CSS3", "Bootstrap 5"],
      description: "Developed internship project functionality for managing parking-related records, with database integration and CRUD operations.",
      badge: "Internship Capstone",
      accentColor: "#6C2BD9",
      problem: "Traditional parking facilities rely on manual paper logbooks or disparate spreadsheets, resulting in slow vehicle check-ins, untracked slot occupancy, lost billing slips, and revenue leakage during peak hours.",
      role: "Backend & Full-Stack Developer Intern. Engineered relational SQLite database schemas in Django, built CRUD view endpoints for entry/exit logging, automated parking slot status transitions, and developed responsive operator dashboards.",
      architecture: [
        "Django MVT (Model-View-Template) architectural separation",
        "SQLite relational database with custom timestamp and bay allocation tables",
        "Role-based operator authentication & security session middleware",
        "Automated billing engine calculating duration tariffs upon checkout"
      ],
      techUsed: [
        "Python 3.10+",
        "Django Web Framework (ORM, Auth, Forms)",
        "SQLite3 Relational DB",
        "HTML5 Semantic Templates",
        "Bootstrap 5 Responsive Grid & Components",
        "Git & GitHub Version Control"
      ],
      learnings: "Mastered Django's ORM relationship handling (ForeignKey & OneToOne), CSRF token validation, atomic transaction management for slot allocation, and building maintainable enterprise CRUD workflows from scratch.",
      challenges: "Handling rapid concurrency when multiple vehicles checkout simultaneously to prevent double-billing and slot race conditions.",
      unknowns: [
        "TODO: Measure exact production peak vehicle throughput per hour under live load",
        "TODO: Connect hardware RFID or ANPR camera input stream if physical barrier gate is provisioned"
      ]
    },
    {
      id: "proj-2",
      title: "Text Classification System",
      subtitle: "AI/ML Pipeline Exploration · CapeStart",
      tags: ["Python", "Scikit-learn", "Pandas", "NumPy", "Django", "NLP"],
      description: "Explored a machine-learning pipeline covering text preprocessing, feature extraction, model training/evaluation, and integration into a Django application.",
      badge: "Machine Learning",
      accentColor: "#E11D8F",
      problem: "Unstructured natural text documents and customer support logs arrive in high volumes with varying formats, requiring automated sentiment, intent, and category triage to eliminate manual review bottlenecks.",
      role: "AI/ML Developer & Pipeline Architect. Authored text cleansing scripts, engineered TF-IDF n-gram feature representations, benchmarked classification estimators, evaluated precision/recall tradeoffs, and deployed the trained model via a Django API endpoint.",
      architecture: [
        "Text Preprocessing Pipeline (regex sanitization, tokenization, stopword filtering, lemmatization)",
        "Feature Representation Layer (TF-IDF vectorizer with unigram/bigram vocabulary)",
        "Model Estimation & Hyperparameter Tuning (Multinomial Naive Bayes & Logistic Regression)",
        "Django Web Inference Service (model serialization via Joblib, POST request scoring)"
      ],
      techUsed: [
        "Python (NLP & Data Science stack)",
        "Scikit-learn (Pipelines, Estimators, Metrics)",
        "Pandas & NumPy (Dataset structuring & vector operations)",
        "Joblib (Model serialization & artifact caching)",
        "Django (REST API view endpoints for inference scoring)"
      ],
      learnings: "Deepened practical intuition around the bias-variance tradeoff in NLP, the criticality of rigorous text cleaning before tokenization, and techniques for serving serialized Scikit-learn pipelines with minimal latency in web backends.",
      challenges: "Mitigating class imbalance across rare target labels without overfitting common vocabulary terms.",
      unknowns: [
        "TODO: Benchmark test set F1-score percentage across all stratified categories",
        "TODO: Evaluate latency comparison when scaling to larger transformer embeddings"
      ]
    },
    {
      id: "proj-3",
      title: "CampusMate AI",
      subtitle: "Hackathon Project · 5th Prize Winner",
      tags: ["Python", "Django", "AI Assistant", "Student Portal", "SQLite"],
      description: "An AI-based campus assistant concept that brings important campus information and an AI-powered mentor into one platform, making campus services easier for students to access.",
      badge: "5th Prize @ CodeSprint'26",
      accentColor: "#2DD4BF",
      problem: "Undergraduate campus information is deeply fragmented across disparate notice boards, emailed circulars, unofficial chat channels, and academic portals, leaving students confused about exam schedules, policies, and mentorship guidance.",
      role: "Team Lead & Core Backend Architect. Directed product scope during the hackathon, designed the centralized student portal schema, created the student dashboard UI, and developed the AI query answering & campus resource retrieval module.",
      architecture: [
        "Unified Student Hub: Centralized timetable notices, faculty directories, and circulars",
        "AI Campus Mentor Engine: Intent recognition and keyword indexing for instant FAQ answers",
        "Interactive Student Dashboard: Personalized deadlines, grade calculators, and event feeds",
        "Django Backend: Modular apps for notices, student auth, and mentor interactions"
      ],
      techUsed: [
        "Python & Django Framework",
        "JavaScript (ES6+) for dynamic UI interactions",
        "SQLite Database with normalized student & announcement schemas",
        "CSS3 & Tailwind CSS for modern campus UI styling",
        "Responsive Mobile-First Layouts"
      ],
      learnings: "Accelerated rapid product prototyping under strict hackathon time constraints, honed technical pitch presentation skills under panel cross-examination, and secured 5th prize among top competitive college engineering teams.",
      challenges: "Synthesizing diverse, unstructured campus circular formats into a reliable quick-retrieval index within the 24-hour hackathon window.",
      unknowns: [
        "TODO: Aggregate user satisfaction ratings from post-demo student trial cohort",
        "TODO: Deploy real-time WebSocket push notifications for urgent circular broadcasts"
      ]
    },
    {
      id: "proj-4",
      title: "SIGNBRIDGE",
      subtitle: "Accessibility Track · National Finalist",
      tags: ["Indian Sign Language", "Accessibility", "Computer Vision Concept", "Assistive AI"],
      description: "A concept built around 'Indian Sign Language for All': reducing communication barriers for people with hearing impairment through Indian Sign Language-oriented public-service access and text/visual communication.",
      badge: "Future 6.0 National Finalist",
      accentColor: "#FF6B4A",
      problem: "Deaf and hard-of-hearing citizens encounter substantial linguistic barriers when attempting to access essential public services—including transit counters, healthcare desks, and civic offices—due to widespread unfamiliarity with Indian Sign Language (ISL).",
      role: "Concept Co-Creator, Lead Researcher & Stage Presenter. Formulated the two-way assistive communication architecture, researched ISL gesture tokenization pipelines, structured the technical feasibility proposal, and presented before StartupTN evaluators through regional and national stages.",
      architecture: [
        "Two-Way Communication Pipeline: ISL gesture recognition to text/speech, and speech/text input back to visual animated ISL signs",
        "Edge-Ready Public Kiosk Blueprint: Low-latency camera input processing designed for public transit and hospital information desks",
        "High-Contrast Accessibility Interface: Tactile visual feedback, large touch targets, and assistive visual sign confirmation"
      ],
      techUsed: [
        "Indian Sign Language (ISL) Gesture Reference Datasets",
        "Computer Vision & Landmark Detection concepts (MediaPipe/OpenCV pipelines)",
        "Python & Web Accessibility Standards (WCAG 2.1 AAA design principles)",
        "Text-to-Speech (TTS) & Speech Recognition APIs",
        "Figma & Interactive UI Prototyping"
      ],
      learnings: "Gained profound appreciation for inclusive, barrier-free design engineering, validated product-market fit against rigorous startup evaluation criteria, and earned a prestigious National Finalist spot at Future 6.0 SRTN in Hosur.",
      challenges: "Accounting for rapid gesture variations, lighting differences in public transit environments, and dialectal nuances within Indian Sign Language.",
      unknowns: [
        "TODO: Target edge inferencing inference time (ms) on budget embedded hardware",
        "TODO: Establish partnership with certified ISL linguistic trainers for official dictionary validation"
      ]
    },
  ] as ProjectItem[],

  skills: {
    heading: "Technical Skills",
    index: "04",
    categories: [
      {
        name: "Programming",
        skills: ["Python", "Java", "C"],
        color: "#6C2BD9",
      },
      {
        name: "Web Development",
        skills: ["Django", "HTML", "CSS", "JavaScript", "Bootstrap"],
        color: "#E11D8F",
      },
      {
        name: "Databases & APIs",
        skills: ["SQLite", "MySQL (basic)", "CRUD operations", "REST API fundamentals"],
        color: "#2DD4BF",
      },
      {
        name: "AI/ML",
        skills: [
          "Text preprocessing",
          "Feature extraction",
          "Classification",
          "Model training & evaluation",
          "Scikit-learn",
          "Pandas",
          "NumPy"
        ],
        color: "#FF6B4A",
      },
      {
        name: "Tools & Core Concepts",
        skills: ["Git", "GitHub", "Object-Oriented Programming", "Data Structures (basic)"],
        color: "#FFD166",
      },
      {
        name: "Soft Skills",
        skills: [
          "Problem-solving",
          "Team collaboration",
          "Communication",
          "Time management",
          "Adaptability & quick learning",
          "Leadership",
          "Presentation"
        ],
        color: "#6C2BD9",
      },
    ],
    marqueeList: [
      "PYTHON", "DJANGO", "AI/ML", "HACKATHONS", "FULL-STACK", "SCIKIT-LEARN",
      "PANDAS", "ACCESSIBILITY", "CAMPUSMATE AI", "SIGNBRIDGE", "SQLITE", "LEADERSHIP"
    ],
  },

  achievements: [
    {
      id: "ach-1",
      title: "Campus Arena 2026 (Karka Infini AI)",
      organizer: "CII-Yi Yuva & Karka Academy @ St. Xavier's Catholic College of Engineering",
      date: "2026",
      badge: "First Prize",
      isFirstPrize: true,
      description: "First Prize in the Paper Presentation event, organised by CII-Yi Yuva and Karka Academy at St. Xavier's Catholic College of Engineering. Selected for the Inter-College Final Round. My first first-place win in a technical competition.",
      eventId: "campus-arena-2026",
      coverImage: undefined, // Attached later by user
    },
    {
      id: "ach-2",
      title: "Future 6.0, SRTN National Finale 2026",
      organizer: "StartupTN (Hosur, 11–12 Sept 2026)",
      date: "Sept 2026",
      badge: "National Finalist",
      description: "Shortlisted at the Kanyakumari City Round (7 Sept 2026) and reached the national finale with SIGNBRIDGE in the Accessibility track.",
      eventId: "future-6-0-srtn-2026",
      coverImage: undefined,
    },
    {
      id: "ach-3",
      title: "CodeSprint'26 Intra-College Technical Hackathon",
      organizer: "SXCCE Hackathon Cell",
      date: "2026",
      badge: "5th Prize",
      description: "5th Prize with CampusMate AI, my first podium finish in an intra-college technical hackathon.",
      eventId: "codesprint-26",
      coverImage: undefined,
    },
    {
      id: "ach-4",
      title: "Smart India Hackathon",
      organizer: "Internal Selection Round",
      date: "2025–2026",
      badge: "Shortlisted",
      description: "Shortlisted in the internal college evaluation round among competitive multi-disciplinary problem statements.",
      eventId: "smart-india-hackathon",
      coverImage: undefined,
    },
    {
      id: "ach-5",
      title: "CapExtreme 24-Hour Hackathon",
      organizer: "SXCCE in association with CapeStart",
      date: "2026",
      badge: "24-Hour Hackathon",
      description: "Participated in a 24-hour national-level hackathon hosted by SXCCE in association with CapeStart, building prototypes under continuous sprint conditions.",
      eventId: "capextreme",
      coverImage: undefined,
    },
  ] as AchievementItem[],

  /** Event Gallery */
  gallery: [
    {
      id: 'campus-arena-infini-1',
      src: '/assets/aistudio/campus-arena-2026/infini1.jpeg',
      event: 'Campus Arena 2026',
      category: 'campus-arena-2026',
      caption: 'Presentation stage and event moment.',
      alt: 'Two participants presenting at Campus Arena 2026',
      type: 'On stage',
      date: '2026',
    },
    {
      id: 'campus-arena-karka-2',
      src: '/assets/aistudio/campus-arena-2026/karka2.jpeg',
      event: 'Campus Arena 2026',
      category: 'campus-arena-2026',
      caption: 'Campus Arena event presentation.',
      alt: 'Participant presenting at Campus Arena 2026',
      type: 'On stage',
      date: '2026',
    },
    {
      id: 'campus-arena-karka-3',
      src: '/assets/aistudio/campus-arena-2026/karka3.jpeg',
      event: 'Campus Arena 2026',
      category: 'campus-arena-2026',
      caption: 'Event activity at Campus Arena 2026.',
      alt: 'Participants and judges at Campus Arena 2026',
      type: 'On stage',
      date: '2026',
    },
    {
      id: 'campus-arena-karka-4',
      src: '/assets/aistudio/campus-arena-2026/karka4.jpeg',
      event: 'Campus Arena 2026',
      category: 'campus-arena-2026',
      caption: 'First prize trophy from Campus Arena 2026.',
      alt: 'First prize trophy from Karka Infini AI PaperPulse 2026',
      type: 'Prize',
      date: '2026',
    },
    {
      id: 'future-hosur-1',
      src: '/assets/aistudio/future-6-0-srtn-2026/hosur1.jpeg',
      event: 'Future 6.0 SRTN 2026',
      category: 'future-6-0-srtn-2026',
      caption: 'Event moment from Future 6.0 SRTN 2026.',
      alt: 'Participants at Future 6.0 SRTN 2026',
      type: 'On stage',
      date: '2026',
    },
    {
      id: 'future-hosur-2',
      src: '/assets/aistudio/future-6-0-srtn-2026/hosur2.jpeg',
      event: 'Future 6.0 SRTN 2026',
      category: 'future-6-0-srtn-2026',
      caption: 'Event moment from Future 6.0 SRTN 2026.',
      alt: 'Future 6.0 SRTN 2026 event photo',
      type: 'On stage',
      date: '2026',
    },
    {
      id: 'future-hosur-3',
      src: '/assets/aistudio/future-6-0-srtn-2026/hosur3.jpeg',
      event: 'Future 6.0 SRTN 2026',
      category: 'future-6-0-srtn-2026',
      caption: 'Event moment from Future 6.0 SRTN 2026.',
      alt: 'Future 6.0 SRTN 2026 event photo',
      type: 'On stage',
      date: '2026',
    },
    {
      id: 'future-hosur-4',
      src: '/assets/aistudio/future-6-0-srtn-2026/hosur4.jpeg',
      event: 'Future 6.0 SRTN 2026',
      category: 'future-6-0-srtn-2026',
      caption: 'Event moment from Future 6.0 SRTN 2026.',
      alt: 'Future 6.0 SRTN 2026 event photo',
      type: 'On stage',
      date: '2026',
    },
    {
      id: 'future-hosur-5',
      src: '/assets/aistudio/future-6-0-srtn-2026/hosur5.jpeg',
      event: 'Future 6.0 SRTN 2026',
      category: 'future-6-0-srtn-2026',
      caption: 'Event moment from Future 6.0 SRTN 2026.',
      alt: 'Future 6.0 SRTN 2026 event photo',
      type: 'On stage',
      date: '2026',
    },
    {
      id: 'future-hosur-6',
      src: '/assets/aistudio/future-6-0-srtn-2026/hosur6.jpeg',
      event: 'Future 6.0 SRTN 2026',
      category: 'future-6-0-srtn-2026',
      caption: 'Event moment from Future 6.0 SRTN 2026.',
      alt: 'Future 6.0 SRTN 2026 event photo',
      type: 'On stage',
      date: '2026',
    },
    {
      id: 'codesprint-1', src: '/assets/aistudio/codesprint-26/codes1.jpeg',
      event: "CodeSprint'26", category: 'codesprint-26',
      caption: 'Event activity at CodeSprint 2026.', alt: 'CodeSprint 2026 event photo',
      type: 'On stage', date: '2026',
    },
    {
      id: 'codesprint-2', src: '/assets/aistudio/codesprint-26/codes2.jpeg',
      event: "CodeSprint'26", category: 'codesprint-26',
      caption: 'Event activity at CodeSprint 2026.', alt: 'CodeSprint 2026 event photo',
      type: 'On stage', date: '2026',
    },
    {
      id: 'codesprint-3', src: '/assets/aistudio/codesprint-26/codes3.jpeg',
      event: "CodeSprint'26", category: 'codesprint-26',
      caption: 'Event activity at CodeSprint 2026.', alt: 'CodeSprint 2026 event photo',
      type: 'On stage', date: '2026',
    },
    {
      id: 'codesprint-4', src: '/assets/aistudio/codesprint-26/codes4.jpeg',
      event: "CodeSprint'26", category: 'codesprint-26',
      caption: 'Event activity at CodeSprint 2026.', alt: 'CodeSprint 2026 event photo',
      type: 'On stage', date: '2026',
    },
    {
      id: 'capextreme-1', src: '/assets/aistudio/capextreme/cape1.jpeg',
      event: 'CapExtreme', category: 'capextreme',
      caption: 'Hackathon workspace at CapExtreme.', alt: 'Participant working at CapExtreme',
      type: 'On stage', date: '2026',
    },
    {
      id: 'capextreme-2', src: '/assets/aistudio/capextreme/cape2.jpeg',
      event: 'CapExtreme', category: 'capextreme',
      caption: 'Hackathon activity at CapExtreme.', alt: 'CapExtreme hackathon event photo',
      type: 'On stage', date: '2026',
    },
    {
      id: 'capextreme-3', src: '/assets/aistudio/capextreme/cape3.jpeg',
      event: 'CapExtreme', category: 'capextreme',
      caption: 'Team working at the CapExtreme hackathon.', alt: 'CapExtreme team working session',
      type: 'On stage', date: '2026',
    },
    {
      id: 'capestart-1', src: '/assets/aistudio/capestart-internship/ci.jpeg',
      event: 'CapeStart Internship', category: 'capestart-internship',
      caption: 'Internship work and project activity at CapeStart.', alt: 'Coding work during CapeStart internship',
      type: 'On stage', date: '2026',
    },
    {
      id: 'capestart-2', src: '/assets/aistudio/capestart-internship/ci2.jpeg',
      event: 'CapeStart Internship', category: 'capestart-internship',
      caption: 'Internship work and project activity at CapeStart.', alt: 'CapeStart internship event photo',
      type: 'On stage', date: '2026',
    },
    {
      id: 'capestart-3', src: '/assets/aistudio/capestart-internship/ci3.jpeg',
      event: 'CapeStart Internship', category: 'capestart-internship',
      caption: 'Internship work and project activity at CapeStart.', alt: 'CapeStart internship event photo',
      type: 'On stage', date: '2026',
    },
    {
      id: 'dream-kanniyakumari-1', src: '/assets/aistudio/dream-kanniyakumari/dream1.jpeg',
      event: 'Dream Kanniyakumari', category: 'dream-kanniyakumari',
      caption: 'Dream Kanniyakumari presentation moment.', alt: 'Presentation at Dream Kanniyakumari',
      type: 'On stage', date: '2026',
    },
    {
      id: 'dream-kanniyakumari-2', src: '/assets/aistudio/dream-kanniyakumari/dream2.jpeg',
      event: 'Dream Kanniyakumari', category: 'dream-kanniyakumari',
      caption: 'Dream Kanniyakumari presentation moment.', alt: 'Dream Kanniyakumari event photo',
      type: 'On stage', date: '2026',
    },
    {
      id: 'dream-kanniyakumari-3', src: '/assets/aistudio/dream-kanniyakumari/dream3.jpeg',
      event: 'Dream Kanniyakumari', category: 'dream-kanniyakumari',
      caption: 'Dream Kanniyakumari presentation moment.', alt: 'Dream Kanniyakumari event photo',
      type: 'On stage', date: '2026',
    },
    {
      id: 'dream-kanniyakumari-4', src: '/assets/aistudio/dream-kanniyakumari/dream4.jpeg',
      event: 'Dream Kanniyakumari', category: 'dream-kanniyakumari',
      caption: 'Dream Kanniyakumari presentation moment.', alt: 'Dream Kanniyakumari event photo',
      type: 'On stage', date: '2026',
    },
  ] as GalleryItem[],

  galleryCategories: [
    { id: 'all', label: 'All' },
    { id: 'campus-arena-2026', label: 'Campus Arena 2026' },
    { id: 'future-6-0-srtn-2026', label: 'Future 6.0' },
    { id: 'codesprint-26', label: "CodeSprint'26" },
    { id: 'capextreme', label: 'CapExtreme' },
    { id: 'capestart-internship', label: 'CapeStart' },
    { id: 'dream-kanniyakumari', label: 'Dream Kanniyakumari' },
    { id: 'activities', label: 'Activities' },
  ],

  activities: [
    {
      id: "act-1",
      title: "NSS Volunteer",
      role: "National Service Scheme Volunteer",
      description: "National Service Scheme volunteer for 2 years, participating in community engagement, campus cleanliness initiatives, and social outreach.",
      badge: "2 Years Service",
    },
    {
      id: "act-2",
      title: "Computer Society of India (CSI) Club",
      role: "Club Representative",
      description: "Currently participating and serving as club representative, organizing technical workshops, peer coding sessions, and event communications.",
      badge: "Club Representative",
    },
    {
      id: "act-3",
      title: "Drone Club",
      role: "Active Member",
      description: "Currently participating in club workshops exploring drone mechanics, electronics, and autonomous flight fundamentals.",
      badge: "Technical Club",
    },
    {
      id: "act-4",
      title: "Dream Kanniyakumari (StartupTN)",
      role: "Team Leader",
      description: "Team Leader. Presented our poster pitch and represented our ideas on stage; strengthened my leadership, presentation and problem-solving skills.",
      badge: "Team Leader",
    },
  ] as ActivityItem[],

  stats: [
    { number: "04", label: "Core Projects Built" },
    { number: "05", label: "Hackathons & Honours" },
    { number: "02", label: "Industry Internships" },
    { number: "3rd", label: "Year B.E. CSE Student" },
  ],

  contact: {
    heading: "Contact",
    index: "08",
    tagline: "Open to internships and collaboration. Let's talk.",
    email: "aaroshmibs@gmail.com",
    linkedin: "https://www.linkedin.com/in/aaroshmi-b-s",
    github: "https://github.com/YOUR-USERNAME", // Hidden while placeholder
    location: "Kanyakumari, Tamil Nadu, India",
    responseTime: "Typically responds within 24 hours",
    footerText: "© 2026 Aaroshmi B S. Built with care, editorial kinetic typography & Aurora Bloom palette.",
  },
};
