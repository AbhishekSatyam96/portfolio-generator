"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  HeroSection,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  FooterSection,
} from "@/components/portfolio";
import {
  ArrowLeft,
  Edit3,
  Globe,
  Monitor,
  Smartphone,
  Copy,
  Check,
  Share2,
  Loader2,
  Eye,
  Sparkles,
} from "lucide-react";

// Mock data - In production, this would come from your state management or API
const mockPortfolioData = {
  personalInfo: {
    fullName: "Alex Johnson",
    title: "Senior Full Stack Developer",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedinUrl: "https://linkedin.com/in/alexjohnson",
    githubUrl: "https://github.com/alexjohnson",
    summary: "",
  },
  generatedBio:
    "Alex Johnson is a Senior Full Stack Developer based in San Francisco with over 6 years of experience building scalable web applications. Specializing in React, Node.js, and cloud technologies, Alex has led development teams at fast-growing startups and delivered products used by millions of users. Passionate about clean code, performance optimization, and mentoring junior developers.",
  experiences: [
    {
      id: "1",
      company: "TechCorp Inc.",
      role: "Senior Full Stack Developer",
      startDate: "2022-01",
      endDate: "",
      isCurrent: true,
      description: "Leading development of core platform features",
      enhancedDescription:
        "Spearheading the development of core platform features serving 2M+ active users. Architected a microservices migration that improved system reliability by 40% and reduced deployment time by 60%. Mentoring a team of 5 developers and establishing engineering best practices.",
    },
    {
      id: "2",
      company: "StartupXYZ",
      role: "Full Stack Developer",
      startDate: "2019-06",
      endDate: "2021-12",
      isCurrent: false,
      description: "Built and maintained web applications",
      enhancedDescription:
        "Developed and maintained multiple customer-facing applications using React and Node.js. Implemented real-time features using WebSockets, improving user engagement by 35%. Collaborated with product and design teams to deliver features that increased user retention by 25%.",
    },
    {
      id: "3",
      company: "Digital Agency Co.",
      role: "Frontend Developer",
      startDate: "2018-01",
      endDate: "2019-05",
      isCurrent: false,
      description: "Created responsive web interfaces",
      enhancedDescription:
        "Created responsive, accessible web interfaces for Fortune 500 clients. Introduced component-based architecture using React, reducing development time by 30%. Optimized frontend performance achieving 95+ Lighthouse scores across all projects.",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "REST APIs",
    "Git",
    "CI/CD",
    "Agile",
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory",
      enhancedDescription:
        "Architected and developed a full-stack e-commerce platform handling 10,000+ daily transactions. Implemented real-time inventory management, reducing overselling incidents by 99%. Built with Next.js, Stripe integration, and PostgreSQL for robust data management.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis"],
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/alexjohnson/ecommerce",
    },
    {
      id: "2",
      title: "Task Management App",
      description: "Collaborative project management tool",
      enhancedDescription:
        "Built a real-time collaborative task management application used by 50+ teams. Features include drag-and-drop kanban boards, time tracking, and automated reporting. Achieved 99.9% uptime with optimized WebSocket connections.",
      techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Docker"],
      liveUrl: "https://example-tasks.com",
      githubUrl: "https://github.com/alexjohnson/taskapp",
    },
    {
      id: "3",
      title: "AI Content Generator",
      description: "ML-powered content creation tool",
      enhancedDescription:
        "Developed an AI-powered content generation platform integrating GPT models for marketing copy and blog posts. Implemented usage-based billing and rate limiting. Serves 1,000+ monthly active users with 98% satisfaction rate.",
      techStack: ["Python", "FastAPI", "React", "OpenAI", "AWS"],
      liveUrl: "https://example-ai.com",
      githubUrl: "",
    },
    {
      id: "4",
      title: "Developer Portfolio Template",
      description: "Open-source portfolio generator",
      enhancedDescription:
        "Created an open-source portfolio generator with AI-powered bio generation. Features customizable themes, SEO optimization, and one-click deployment. Garnered 500+ GitHub stars and active community contributions.",
      techStack: ["Next.js", "Tailwind CSS", "Vercel", "MDX"],
      liveUrl: "",
      githubUrl: "https://github.com/alexjohnson/portfolio",
    },
  ],
  isPublished: false,
  username: "alexjohnson",
};

type ViewMode = "desktop" | "mobile";

export default function PreviewPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const portfolioUrl = `portfoliogen.com/p/${mockPortfolioData.username}`;

  const handlePublish = async () => {
    setIsPublishing(true);
    // TODO: Implement publish API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsPublishing(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${portfolioUrl}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Control Bar */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Left: Back & Edit */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/create">
                <ArrowLeft className="size-4" />
                Back to Editor
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/create">
                <Edit3 className="size-4" />
                Edit
              </Link>
            </Button>
          </div>

          {/* Center: View Toggle */}
          <div className="hidden items-center gap-1 rounded-lg border border-border bg-muted/50 p-1 sm:flex">
            <button
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "desktop"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Monitor className="size-4" />
              Desktop
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "mobile"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone className="size-4" />
              Mobile
            </button>
          </div>

          {/* Right: Publish & Share */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              {isCopied ? (
                <Check className="size-4 text-green-500" />
              ) : (
                <Copy className="size-4" />
              )}
              {isCopied ? "Copied!" : "Copy Link"}
            </Button>
            <Button
              size="sm"
              onClick={handlePublish}
              disabled={isPublishing}
              className="shadow-lg shadow-primary/25"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Globe className="size-4" />
                  Publish
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Info Bar */}
      <div className="border-b border-border/50 bg-muted/30">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-2 text-sm">
          <div className="flex items-center gap-2">
            <Eye className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Preview Mode</span>
          </div>
          <span className="text-border">|</span>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-muted-foreground">
              AI-enhanced content applied
            </span>
          </div>
          <span className="text-border">|</span>
          <span className="font-medium text-foreground">{portfolioUrl}</span>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="py-8">
        <div
          className={`mx-auto transition-all duration-300 ${
            viewMode === "mobile"
              ? "max-w-sm rounded-3xl border border-border shadow-2xl"
              : "max-w-none"
          }`}
        >
          {/* Mobile frame decoration */}
          {viewMode === "mobile" && (
            <div className="flex justify-center py-2">
              <div className="h-1 w-20 rounded-full bg-border" />
            </div>
          )}

          {/* Portfolio Content */}
          <div className={viewMode === "mobile" ? "overflow-hidden rounded-b-3xl" : ""}>
            <HeroSection
              fullName={mockPortfolioData.personalInfo.fullName}
              title={mockPortfolioData.personalInfo.title}
              location={mockPortfolioData.personalInfo.location}
              email={mockPortfolioData.personalInfo.email}
              linkedinUrl={mockPortfolioData.personalInfo.linkedinUrl}
              githubUrl={mockPortfolioData.personalInfo.githubUrl}
              bio={mockPortfolioData.generatedBio}
            />

            <ExperienceSection experiences={mockPortfolioData.experiences} />

            <SkillsSection skills={mockPortfolioData.skills} />

            <ProjectsSection projects={mockPortfolioData.projects} />

            <FooterSection fullName={mockPortfolioData.personalInfo.fullName} />
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar (for unpublished) */}
      {!mockPortfolioData.isPublished && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-background/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div>
              <p className="font-medium">Ready to go live?</p>
              <p className="text-sm text-muted-foreground">
                Your portfolio will be available at{" "}
                <span className="font-medium text-foreground">{portfolioUrl}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/create">
                  <Edit3 className="size-4" />
                  Make Changes
                </Link>
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isPublishing}
                className="shadow-lg shadow-primary/25"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Globe className="size-4" />
                    Publish Portfolio
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
