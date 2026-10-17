import type { Project } from '../types';

export const mlResearchProjects: Project[] = [
  {
    id: 1,
    title: ["FLOOD", "GUARD"],
    client: "Port City International University (CSE Dept)",
    categories: ["Machine Learning", "Climate", "Prediction"],
    imageUrl: '/research/flood-guard/flood-guard-thumbnail.png',
    repoUrl: '/research/flood-guard/Flood Guard REPORT.pdf'
  },
  {
    id: 2,
    title: ["CROSS-DOMAIN", "TRANSFER", "LEARNING"],
    client: "Research Paper",
    categories: ["Transfer Learning", "Detection", "Weather"],
    imageUrl: '',
    repoUrl: '#'
  },
  {
    id: 3,
    title: ["UNSUPERVISED", "DOMAIN", "ADAPTATION"],
    client: "IEEE Conference Paper",
    categories: ["Domain Adaptation", "CycleGAN", "Medical Imaging"],
    imageUrl: '',
    repoUrl: '#'
  },
];
