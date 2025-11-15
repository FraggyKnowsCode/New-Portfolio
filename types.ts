export type Project = {
  id: number;
  title: string[];
  client: string;
  categories: string[];
  imageUrl: string;
  repoUrl: string; // <-- ADD THIS LINE
};