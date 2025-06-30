import axios from 'axios';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_URL } from './constants';
import { Project } from '@/types';
import { ProjectDetail } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getSessionReplayIds = async (projectId: string): Promise<any[]> => {
  try {
    console.log('API_URL', API_URL);
    const response = await axios.get(`${API_URL}/api/session-ids`, {
      params: { project_id: projectId },
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
    return response.data.sessions;
  } catch (error) {
    console.error('Error fetching session replay ids:', error);
    return [];
  }
};

export const getSessionReplayEvents = async (sessionId: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/sessions/${sessionId}/events`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
    return response.data.events || [];
  } catch (error) {
    console.error('Error fetching session replay events:', error);
    return [];
  }
};

export async function getRagAnswer(question: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/api/rag/query`, { question });
    return response.data?.context || '';
  } catch (error) {
    console.error('Error fetching RAG answer:', error);
    return '';
  }
}

export const getUserProjects = async (userId: string): Promise<Project[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/projects`, {
      params: { user_id: userId },
    });
    return response.data.projects || [];
  } catch (error) {
    console.error('Error fetching user projects:', error);
    return [];
  }
};

export const createProject = async (name: string, userId: string): Promise<{project: {id: string, name: string, publicApiKey: string}}> => {
  try {
    const response = await axios.post(`${API_URL}/api/projects`, {
      name,
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const getProjectDetail = async (projectId: string): Promise<ProjectDetail> => {
  try {
    const response = await axios.get(`${API_URL}/api/projects/${projectId}`);
    return response.data.project;
  } catch (error) {
    console.error('Error fetching project detail:', error);
    throw error;
  }
};