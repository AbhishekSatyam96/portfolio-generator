import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  PersonalInfo,
  Experience,
  Project,
  Portfolio,
} from "@/types";

const initialPersonalInfo: PersonalInfo = {
  fullName: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedinUrl: "",
  githubUrl: "",
  summary: "",
};

interface PortfolioState {
  // Data
  personalInfo: PersonalInfo;
  experiences: Experience[];
  skills: string[];
  projects: Project[];
  generatedBio: string;
  isPublished: boolean;
  username: string;

  // UI State
  currentStep: number;
  isGenerating: boolean;
  isSaving: boolean;

  // Actions
  setPersonalInfo: (info: PersonalInfo) => void;
  setExperiences: (experiences: Experience[]) => void;
  setSkills: (skills: string[]) => void;
  setProjects: (projects: Project[]) => void;
  setGeneratedBio: (bio: string) => void;
  setCurrentStep: (step: number) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  setIsPublished: (isPublished: boolean) => void;
  setUsername: (username: string) => void;

  // Bulk update for loading from API
  loadPortfolio: (portfolio: Partial<Portfolio>) => void;

  // Reset
  resetPortfolio: () => void;

  // Computed
  getPortfolio: () => Portfolio;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      // Initial data state
      personalInfo: initialPersonalInfo,
      experiences: [],
      skills: [],
      projects: [],
      generatedBio: "",
      isPublished: false,
      username: "",

      // Initial UI state
      currentStep: 1,
      isGenerating: false,
      isSaving: false,

      // Actions
      setPersonalInfo: (info) => set({ personalInfo: info }),
      setExperiences: (experiences) => set({ experiences }),
      setSkills: (skills) => set({ skills }),
      setProjects: (projects) => set({ projects }),
      setGeneratedBio: (bio) => set({ generatedBio: bio }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setIsSaving: (isSaving) => set({ isSaving }),
      setIsPublished: (isPublished) => set({ isPublished }),
      setUsername: (username) => set({ username }),

      loadPortfolio: (portfolio) =>
        set({
          personalInfo: portfolio.personalInfo ?? initialPersonalInfo,
          experiences: portfolio.experiences ?? [],
          skills: portfolio.skills ?? [],
          projects: portfolio.projects ?? [],
          generatedBio: portfolio.generatedBio ?? "",
          isPublished: portfolio.isPublished ?? false,
          username: portfolio.username ?? "",
        }),

      resetPortfolio: () =>
        set({
          personalInfo: initialPersonalInfo,
          experiences: [],
          skills: [],
          projects: [],
          generatedBio: "",
          isPublished: false,
          username: "",
          currentStep: 1,
        }),

      getPortfolio: () => {
        const state = get();
        return {
          personalInfo: state.personalInfo,
          experiences: state.experiences,
          skills: state.skills,
          projects: state.projects,
          generatedBio: state.generatedBio,
          isPublished: state.isPublished,
          username: state.username,
        };
      },
    }),
    {
      name: "portfolio-storage",
      partialize: (state) => ({
        personalInfo: state.personalInfo,
        experiences: state.experiences,
        skills: state.skills,
        projects: state.projects,
        generatedBio: state.generatedBio,
        isPublished: state.isPublished,
        username: state.username,
        currentStep: state.currentStep,
      }),
    }
  )
);
