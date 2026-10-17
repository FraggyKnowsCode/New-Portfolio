// ============================================================
// portfolioData.ts - Single Source of Truth for ALL portfolio content.
// Update any metric, text or URL in this file and every section
// that references it will reflect the change automatically.
// ============================================================
import homieImg from '../images/Homie.png';
import adezyImg from '../images/adezy.png';
import agriHelpImg from '../images/agri-help.png';
import refoodImg from '../images/ReFood.png';
import landMineImg from '../images/land-mine-detector.jpg';

// ─── Social Links ────────────────────────────────────────────
export const socialLinks = {
  facebook: 'https://www.facebook.com/FSikder.25/',
  instagram: 'https://www.instagram.com/ig.fraggy',
  linkedin: 'https://www.linkedin.com/in/fsikder25/',
  github: 'https://github.com/FraggyKnowsCode',
  email: 'fahadsikder29@gmail.com',
};

// ─── Hero Identity Pillars ───────────────────────────────────
export const heroPillars = [
  'FULL-STACK ENGINEERING (PYTHON / DJANGO)',
  'APPLIED MACHINE LEARNING (CV / NLP / GANs)',
  'ROBOTICS & HARDWARE (ARDUINO / CPI)',
  'CHITTAGONG, BANGLADESH',
];

// ─── Section 01: Impact Numbers (Authentic Engineering & Research) ─
export const impactMetrics = {
  primary: {
    value: 8,
    suffix: '+',
    headline: 'End-to-end university systems & ML research studies engineered.',
    description:
      'Built from the ground up at Port City International University, spanning 5 full-stack web, conversational AI and Arduino robotics prototypes alongside 3 deep learning research works tackling real-world challenges in Bangladesh and beyond.',
    ctaText: 'Explore the projects & architectures',
    ctaTarget: '#work',
  },
  secondary: [
    {
      value: 3,
      suffix: '',
      title: 'Deep Learning Research Studies (1 IEEE Accepted)',
      badge: 'IEEE ACCEPTED',
      description:
        'Highlighted by an IEEE Conference-accepted paper on CycleGAN medical imaging (presentation completed, DOI pending), alongside adverse-weather transfer learning and flood prediction.',
    },
    {
      value: 3,
      suffix: '×',
      title: 'Campus Sports Disciplines Led',
      description:
        'Serving as University Sports Forum Lead, organizing university-wide competitive Cricket, Football and Chess tournaments for the student body.',
    },
  ],
  pullQuote: [
    { text: 'Study the problem deeply.', italic: false },
    { text: 'Engineer a clean solution.', italic: false },
    { text: 'Lead with purpose on and off the screen.', italic: true },
  ],
  editorialHeadline: {
    line1: 'Theory sparks the idea.',
    line2: 'Engineering makes it real.',
  },
  editorialTagline:
    'From university lab prototypes and IEEE-accepted deep learning research to campus-wide sports leadership, every build starts with a real problem worth solving.',
};

// ─── Section 02: About Bento Grid ───────────────────────────
export const aboutBio =
  "I am a Computer Science & Engineering student at Port City International University and a software developer who loves combining artificial intelligence with clean full-stack web architecture. Whether I'm training deep learning models, building Django systems or organizing university-wide athletic tournaments, I thrive on turning complex problems into working realities.";

export const bentoGrid = [
  {
    id: '01',
    microLabel: '01 / ARTIFICIAL INTELLIGENCE',
    title: 'Machine Learning & Deep Learning',
    badges: ['Computer Vision', 'NLP', 'CycleGAN', 'Transfer Learning', 'Hyperparameter Tuning'],
    content:
      'Exploring cross-domain object detection, unpaired medical image translation, climate flood prediction and conversational AI assistants for local farmers.',
  },
  {
    id: '02',
    microLabel: '02 / SOFTWARE & HARDWARE',
    title: 'Full-Stack Web & Robotics',
    badges: ['Python', 'Django', 'REST APIs', 'JavaScript', 'Arduino / CPI Robotics'],
    content:
      'Architecting clean, scalable full-stack web applications and integrating sensor-driven Arduino hardware rovers for real-world safety and utility.',
  },
  {
    id: '03',
    microLabel: '03 / ACADEMIC FOUNDATION & IEEE RESEARCH',
    title: 'Port City International University',
    badges: ['B.Sc. in CSE', 'IEEE Accepted Author', 'Chittagong, BD'],
    content:
      'Computer Science & Engineering undergraduate and machine learning researcher, author of an IEEE Conference-accepted study on CycleGAN medical imaging (presentation completed, awaiting DOI), alongside research in flood prediction and adverse-weather computer vision.',
  },
  {
    id: '04',
    microLabel: '04 / CAMPUS LEADERSHIP',
    title: 'University Sports Forum Lead',
    badges: ['Cricket', 'Football', 'Chess', 'Student Governance'],
    content:
      'Leading the university sports forum, planning, managing and executing large-scale competitive cricket, football and chess tournaments for the entire student body.',
  },
  {
    id: '05',
    microLabel: '05 / COMPETITIVE ENGINEERING',
    title: 'Hackathons & Algorithmic Problem Solving',
    badges: ['Team Builds', 'Algorithms', 'Rapid Prototyping'],
    content:
      'Thriving in collaborative and competitive environments, tackling algorithmic challenges, competing in hackathons and rallying teams to ship reliable systems under pressure.',
  },
  {
    id: '06',
    microLabel: '06 / BEYOND THE SCREEN',
    title: 'Photography, Esports & Exploration',
    badges: ['Visual Storytelling', 'Competitive Esports', 'Travel'],
    content:
      'Capturing street and landscape photography, competing in tactical esports titles and exploring new places for creative inspiration.',
  },
];

// ─── Section 03: Projects with Metric Strips (Real Engineering Specs) ─
export interface ProjectData {
  id: number;
  title: string[];
  client: string;
  categoryTag: string;
  categories: string[];
  summary: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  imageUrl: string;
  repoUrl: string;
  websiteUrl?: string;
}

export const projectsDataEnhanced: ProjectData[] = [
  {
    id: 1,
    title: ['HOMIE'],
    client: 'UNIVERSITY PROJECT',
    categoryTag: '> UNIVERSITY PROJECT (Flat • House • Rental)',
    categories: ['Flat', 'House', 'Rental'],
    summary:
      'Full-stack real estate discovery and rental prototype built as a university capstone to solve property verification and house-hunting friction in Bangladesh.',
    metrics: [
      { label: 'DJANGO ARCHITECTURE', value: 'Full-Stack' },
      { label: 'PROPERTY SEARCH ENGINE', value: 'Multi-Filter' },
      { label: 'LISTING & TENANT WORKFLOW', value: 'Verified' },
    ],
    techStack: ['Python', 'Django', 'Full-Stack Web', 'Search & Filtering'],
    imageUrl: homieImg,
    repoUrl: 'https://github.com/FraggyKnowsCode/Homie_Project',
    websiteUrl: 'https://homie-beta-kohl.vercel.app/',
  },
  {
    id: 2,
    title: ['ADEZY'],
    client: 'UNIVERSITY PROJECT',
    categoryTag: '> UNIVERSITY PROJECT (Advertising • Platform • Web)',
    categories: ['Advertising', 'Platform', 'Web'],
    summary:
      'All-in-one digital agency and brand service management web prototype designed to streamline service catalogs, product orders and client workflows.',
    metrics: [
      { label: 'SERVICE & PRODUCT HUB', value: 'All-in-One' },
      { label: 'CAMPAIGN WORKFLOW UI', value: '360°' },
      { label: 'MODERN WEB ARCHITECTURE', value: 'Responsive' },
    ],
    techStack: ['Python', 'Django', 'Responsive UI', 'Analytics'],
    imageUrl: adezyImg,
    repoUrl: 'https://github.com/FraggyKnowsCode/AdEzy',
    websiteUrl: 'https://adezy.vercel.app/',
  },
  {
    id: 3,
    title: ['AGRIHELP', 'AI', 'BOT'],
    client: 'Krishok Bhai',
    categoryTag: '> Krishok Bhai • AI PROJECT (AI • Farmer • Help)',
    categories: ['AI', 'Farmer', 'Help'],
    summary:
      'Conversational AI assistant ("Krishok Bhai") engineered to give Bangladeshi farmers accessible crop health, pest and weather guidance.',
    metrics: [
      { label: 'INTENT & QUERY PIPELINE', value: 'NLP' },
      { label: 'AUTOMATED FARMER ADVISORY', value: '24/7' },
      { label: 'ACCESSIBLE CHAT INTERFACE', value: 'Bilingual' },
    ],
    techStack: ['Python', 'NLP', 'Conversational AI', 'AgriTech'],
    imageUrl: agriHelpImg,
    repoUrl: 'https://v0-web-app-chatbot-integration.vercel.app/',
  },
  {
    id: 4,
    title: ['REFOOD'],
    client: 'UNIVERSITY PROJECT',
    categoryTag: '> UNIVERSITY PROJECT (Waste • Management • Clean)',
    categories: ['Waste', 'Management', 'Clean'],
    summary:
      'Community food-waste recovery and donation management web system designed to connect surplus food sources with local distribution drives.',
    metrics: [
      { label: 'FOOD, EVENT & DONATION ENGINE', value: '3-Module' },
      { label: 'IMPACT & AUDIT DASHBOARD', value: 'Real-Time' },
      { label: 'COMMUNITY RECOVERY FLOW', value: 'Zero-Waste' },
    ],
    techStack: ['Python', 'Django', 'Dashboard UI', 'Impact Tracking'],
    imageUrl: refoodImg,
    repoUrl: 'https://github.com/FraggyKnowsCode/FoodWasteManagementSystem',
    websiteUrl: 'https://refood-hazel.vercel.app/',
  },
  {
    id: 5,
    title: ['LAND', 'MINE', 'DETECTOR'],
    client: 'UNIVERSITY HARDWARE PROJECT',
    categoryTag: '> UNIVERSITY HARDWARE PROJECT (LandMine • CPI • Robotics)',
    categories: ['LandMine', 'CPI', 'Robotics'],
    summary:
      'Custom multi-wheeled Arduino robotic rover hardware prototype engineered for remote surface sweeping and inductive land-mine detection.',
    metrics: [
      { label: 'MULTI-WHEEL ROVER CHASSIS', value: 'Arduino' },
      { label: 'REAL-TIME SENSOR SWEEP', value: 'Inductive' },
      { label: 'REMOTE SAFETY PROTOTYPE', value: 'Hardware' },
    ],
    techStack: ['Arduino', 'Embedded C/C++', 'Robotics CPI', 'Hardware Sensors'],
    imageUrl: landMineImg,
    repoUrl: 'https://github.com/FraggyKnowsCode/Land-Mine-Detector',
  },
];

// ─── Section 04: Research Cards (IEEE Conference Acceptance & Studies) ─
export interface ResearchProject {
  id: number;
  title: string[];
  client: string;
  categoryTag: string;
  categories: string[];
  paperTitle: string;
  status: string;
  summary?: string;
  metadata: { label: string; value: string }[];
  abstract?: {
    problem: string;
    architecture: string;
    focus: string[];
  };
  imageUrl: string;
  repoUrl: string;
  hasPipeline?: boolean;
  pipelineSteps?: string[];
}

export const researchProjects: ResearchProject[] = [
  {
    id: 1,
    title: ['FLOOD', 'GUARD'],
    client: 'Port City International University',
    categoryTag: '> UNIVERSITY RESEARCH • CSE DEPT',
    categories: ['Machine Learning', 'Climate', 'Prediction'],
    paperTitle: 'Flood-Guard: Predicts Flood Possibilities in Bangladesh',
    status: 'COMPLETED UNIVERSITY RESEARCH • PRESENTED',
    metadata: [
      { label: 'Institution', value: 'Port City International University (Dept. of CSE)' },
      { label: 'Supervisor', value: 'Mrs. Manoara Begum, Chairman, Dept. of CSE' },
      { label: 'Research Team', value: 'MD Fahad Sikder (Lead), Sharmin Akter, Sabikun Newaz Chy, Sakil Uddin' },
      { label: 'Methodology', value: 'Supervised ML Classification, Feature Engineering & Hyperparameter Tuning on Bangladesh Meteorological/Hydrological Data' },
    ],
    imageUrl: '/research/flood-guard/flood-guard-thumbnail.png',
    repoUrl: '/research/flood-guard/Flood Guard REPORT.pdf',
    hasPipeline: true,
    pipelineSteps: [
      'Historical Rainfall & River Level Data',
      'Preprocessing & Feature Scaling',
      'Hyperparameter-Tuned ML Classifier',
      'Flood Risk Probability Alert',
    ],
  },
  {
    id: 2,
    title: ['CROSS-DOMAIN', 'TRANSFER', 'LEARNING'],
    client: 'Research Paper',
    categoryTag: '> ADVANCED ML RESEARCH',
    categories: ['Transfer Learning', 'Detection', 'Weather'],
    paperTitle: 'Cross-Domain Transfer Learning for Robust Object Detection in Adverse Weather',
    status: 'ACTIVE RESEARCH • MANUSCRIPT IN PROGRESS',
    metadata: [],
    abstract: {
      problem:
        'Standard computer vision detectors suffer severe accuracy drops under heavy rain, fog and low-light domain shifts.',
      architecture:
        'Cross-domain feature alignment and transfer learning bridging clear-weather source datasets to adverse-weather target domains.',
      focus: ['Domain Shift Mitigation', 'Feature Representation', 'Computer Vision Robustness'],
    },
    imageUrl: '',
    repoUrl: '#',
  },
  {
    id: 3,
    title: ['UNSUPERVISED', 'DOMAIN', 'ADAPTATION'],
    client: 'IEEE Conference Paper',
    categoryTag: '> IEEE Conference Paper',
    categories: ['Domain Adaptation', 'CycleGAN', 'Medical Imaging'],
    paperTitle: 'Unsupervised Domain Adaptation via CycleGAN for Cross-Modality Medical Imaging',
    status: 'ACCEPTED AT IEEE CONFERENCE • PRESENTED (DOI PENDING)',
    summary:
      'Investigates unsupervised domain adaptation using Cycle-Consistent Adversarial Networks (CycleGAN) to bridge domain shifts across multi-modal medical imaging without requiring paired clinical ground-truth annotations. Officially accepted at an IEEE Conference following successful completion of the presentation phase; currently awaiting IEEE Xplore DOI assignment.',
    metadata: [
      { label: 'Publication Venue', value: 'IEEE Conference (Accepted)' },
      { label: 'Current Milestone', value: 'Conference Presentation Completed • Awaiting Official DOI' },
      { label: 'Core Architecture', value: 'CycleGAN (Unpaired Image-to-Image Translation)' },
      { label: 'Target Domain', value: 'Cross-Modality Medical Image Synthesis & Adaptation' },
    ],
    abstract: {
      problem:
        'Clinical deep learning models fail when deployed across different hospital scanners or imaging modalities without paired ground-truth labels.',
      architecture:
        'Unpaired image-to-image translation and cycle-consistent adversarial networks (CycleGAN) for unsupervised domain alignment.',
      focus: ['Cycle-Consistency Loss', 'Unpaired Medical Synthesis', 'Diagnostic Generalization', 'Cross-Modality'],
    },
    hasPipeline: true,
    pipelineSteps: [
      'Multi-Modal Source Scans (CT / MRI)',
      'CycleGAN Generator Network G: S → T',
      'Cycle-Consistency & Adversarial Loss',
      'Normalized Cross-Modality Inference',
    ],
    imageUrl: '',
    repoUrl: '#',
  },
];

// ─── Contact Info ────────────────────────────────────────────
export const contactInfo = {
  heading: 'I WOULD LOVE TO HEAR FROM YOU.',
  subtext: 'Feel free to reach out if you want to collaborate with me or simply have a chat.',
  email: 'fahadsikder29@gmail.com',
  address: {
    line1: '7 no Building, Govt CGS Colony,',
    line2: 'Agrabad Access Road, Chittagong, Bangladesh',
    registered: 'Registered in Chittagong, Bangladesh',
  },
  copyright: '© MD FAHAD SIKDER All rights reserved',
};

// ─── Navigation ──────────────────────────────────────────────
export const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Impact', href: '#impact' },
  { label: 'Research', href: '#ml-research' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const footerNavItems = ['WORK', 'IMPACT', 'RESEARCH', 'ABOUT', 'CONTACT'];
