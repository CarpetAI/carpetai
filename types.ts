export interface Project {
  name: string;
  createdAt: number;
  id: string;
}

export interface ProjectDetail {
  id: string;
  name: string;
  publicApiKey: string;
  createdAt: number;
}

export interface ActionId {
  id: string;
  count: number;
}

export interface GeneralInsight {
  id: string;
  title: string;
  description: string;
}