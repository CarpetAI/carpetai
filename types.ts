export interface Project {
  name: string;
  createdAt: number; // timestamp in seconds since epoch
  id: string;
}

export interface ProjectDetail {
  id: string;
  name: string;
  publicApiKey: string;
  createdAt: number;
}