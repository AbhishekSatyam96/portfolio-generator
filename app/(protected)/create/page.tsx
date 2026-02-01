"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/ui/step-indicator";
import {
  PersonalInfoForm,
  type PersonalInfo,
} from "@/components/forms/personal-info-form";
import {
  ExperienceForm,
  type Experience,
} from "@/components/forms/experience-form";
import { SkillsForm } from "@/components/forms/skills-form";
import { ProjectsForm, type Project } from "@/components/forms/projects-form";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Save,
  Eye,
  Loader2,
} from "lucide-react";

const STEPS = [
  { id: 1, name: "Personal", description: "Basic info" },
  { id: 2, name: "Experience", description: "Work history" },
  { id: 3, name: "Skills", description: "Your expertise" },
  { id: 4, name: "Projects", description: "Your work" },
];

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

export default function CreatePortfolioPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfo>(initialPersonalInfo);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return personalInfo.fullName && personalInfo.title && personalInfo.email;
      case 2:
        return true; // Experience is optional
      case 3:
        return skills.length > 0;
      case 4:
        return true; // Projects are optional but recommended
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    // Only allow going back or to completed steps
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const handleGenerateAndPreview = async () => {
    setIsGenerating(true);
    // TODO: Implement AI generation API calls
    // This will call /api/ai/generate-bio and /api/ai/enhance-project
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
    setIsGenerating(false);
    router.push("/preview");
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    // TODO: Implement save to database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm data={personalInfo} onChange={setPersonalInfo} />
        );
      case 2:
        return <ExperienceForm data={experiences} onChange={setExperiences} />;
      case 3:
        return <SkillsForm data={skills} onChange={setSkills} />;
      case 4:
        return <ProjectsForm data={projects} onChange={setProjects} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <span>/</span>
          <span>Create Portfolio</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Create Your Portfolio
        </h1>
        <p className="text-muted-foreground">
          Fill in your details and let our AI craft your professional portfolio.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="rounded-xl border border-border/50 bg-card p-6">
        <StepIndicator
          steps={STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Form Content */}
      <div className="rounded-2xl border border-border/50 bg-card">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-chart-2/5 blur-3xl" />
        </div>

        <div className="relative p-6 sm:p-8">{renderStepContent()}</div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="size-4" />
            Previous
          </Button>
          <Button
            variant="ghost"
            onClick={handleSaveDraft}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Save Draft
          </Button>
        </div>

        <div className="flex gap-2">
          {currentStep < STEPS.length ? (
            <Button onClick={handleNext} disabled={!canGoNext()}>
              Next
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.push("/preview")}
              >
                <Eye className="size-4" />
                Preview
              </Button>
              <Button
                onClick={handleGenerateAndPreview}
                disabled={isGenerating}
                className="shadow-lg shadow-primary/25"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Generate with AI
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Your progress is automatically saved.{" "}
          <Link href="/dashboard" className="text-primary hover:underline">
            Return to dashboard
          </Link>{" "}
          anytime.
        </p>
      </div>
    </div>
  );
}
