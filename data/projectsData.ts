import type { Project } from '../types';
import fwmsImg from '../images/fwms.jpg';
import homieLogo from '../images/homie-logo.jpg';
import agriHelp from '../images/agri-help.png';
import songsCover from '../images/songs-cover.png';
import landMine from '../images/land-mine-detector.jpg';

export const projects: Project[] = [
  {
    id: 1,
    title: ["FOOD WASTE", "MANAGEMENT", "SYSTEM"],
    client: "OWN PROJECT",
    categories: ["Waste", "Management", "Clean"],
    imageUrl: fwmsImg,
    repoUrl: 'https://github.com/FraggyKnowsCode/FoodWasteManagementSystem'
  },
  {
    id: 2,
    title: ["HOMIE", "RENTAL", "APPLICATION"],
    client: "OWN PROJECT",
    categories: ["Flat", "House", "Rental"],
    imageUrl: homieLogo,
    repoUrl: 'https://github.com/FraggyKnowsCode/Homie_Project'
  },
  {
    id: 3,
    title: ["AGRI HELP", "AI", "CHATBOT"],
    client: "Own Project",
    categories: ["AI", "Farmer", "Help"],
    imageUrl: agriHelp,
    repoUrl: 'https://v0-web-app-chatbot-integration.vercel.app/'
  },
  {
    id: 4,
    title: ["MY", "COVERED", "SONGS"],
    client: "My Music Covers",
    categories: ["Songs", "Covers", "Music"],
    imageUrl: songsCover,
    repoUrl: 'https://github.com/your-username/web-conf-repo'
  },
  {
    id: 5,
    title: ["LAND", "MINE", "DETECTOR"],
    client: "OWN PROJECT",
    categories: ["LandMine", "CPI", "Robotics"],
    imageUrl: landMine,
    repoUrl: 'https://github.com/FraggyKnowsCode/Land-Mine-Detector'
  },
];
