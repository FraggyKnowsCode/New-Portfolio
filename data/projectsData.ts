import type { Project } from '../types';
import reFoodImg from '../images/ReFood.png';
import homieImg from '../images/Homie.png';
import agriHelp from '../images/agri-help.png';
import songsCover from '../images/songs-cover.png';
import landMine from '../images/land-mine-detector.jpg';
import adezyImg from '../images/adezy.png';

export const projects: Project[] = [
  {
    id: 1,
    title: ["HOMIE"],
    client: "UNIVERSITY PROJECT",
    categories: ["Flat", "House", "Rental"],
    imageUrl: homieImg,
    repoUrl: 'https://github.com/FraggyKnowsCode/Homie_Project',
    websiteUrl: 'https://homie-beta-kohl.vercel.app/'
  },
  {
    id: 2,
    title: ["ADEZY"],
    client: "UNIVERSITY PROJECT",
    categories: ["Advertising", "Platform", "Web"],
    imageUrl: adezyImg,
    repoUrl: 'https://github.com/FraggyKnowsCode/AdEzy',
    websiteUrl: 'https://adezy.vercel.app/'
  },
  {
    id: 3,
    title: ["AGRIHELP", "AI", "BOT"],
    client: "Krishok Bhai",
    categories: ["AI", "Farmer", "Help"],
    imageUrl: agriHelp,
    repoUrl: 'https://v0-web-app-chatbot-integration.vercel.app/'
  },
  {
    id: 4,
    title: ["REFOOD"],
    client: "UNIVERSITY PROJECT",
    categories: ["Waste", "Management", "Clean"],
    imageUrl: reFoodImg,
    repoUrl: 'https://github.com/FraggyKnowsCode/FoodWasteManagementSystem',
    websiteUrl: 'https://refood-hazel.vercel.app/'
  },
  {
    id: 5,
    title: ["LAND", "MINE", "DETECTOR"],
    client: "UNIVERSITY HARDWARE PROJECT",
    categories: ["LandMine", "CPI", "Robotics"],
    imageUrl: landMine,
    repoUrl: 'https://github.com/FraggyKnowsCode/Land-Mine-Detector'
  },
  {
    id: 6,
    title: ["MY", "COVERED", "SONGS"],
    client: "My Music Covers",
    categories: ["Songs", "Covers", "Music"],
    imageUrl: songsCover,
    repoUrl: 'https://github.com/your-username/web-conf-repo'
  },
];
