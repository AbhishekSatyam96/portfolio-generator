// Personal Info
export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  summary: string;
}

// Experience
export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  enhancedDescription?: string;
}

// Project
export interface Project {
  id: string;
  title: string;
  description: string;
  enhancedDescription?: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl?: string;
}

// Complete Portfolio
export interface Portfolio {
  id?: string;
  userId?: string;
  username?: string;
  personalInfo: PersonalInfo;
  generatedBio?: string;
  skills: string[];
  experiences: Experience[];
  projects: Project[];
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Form State (for multi-step form)
export interface FormState {
  currentStep: number;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  skills: string[];
  projects: Project[];
  isGenerating: boolean;
  generatedBio?: string;
}

// AI Generation Request/Response Types
export interface GenerateBioRequest {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  skills: string[];
}

export interface GenerateBioResponse {
  bio: string;
  success: boolean;
  error?: string;
}

export interface EnhanceProjectRequest {
  project: Project;
  context: {
    userTitle: string;
    skills: string[];
  };
}

export interface EnhanceProjectResponse {
  enhancedDescription: string;
  success: boolean;
  error?: string;
}

export interface EnhanceExperienceRequest {
  experience: Experience;
  context: {
    userTitle: string;
    skills: string[];
  };
}

export interface EnhanceExperienceResponse {
  enhancedDescription: string;
  success: boolean;
  error?: string;
}
