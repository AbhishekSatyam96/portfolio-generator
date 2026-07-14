"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HeroSection,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  FooterSection,
} from "@/components/portfolio";
import { usePortfolioStore } from "@/lib/store";
import {
  ArrowLeft,
  Edit3,
  Globe,
  Monitor,
  Smartphone,
  Copy,
  Check,
  Loader2,
  Eye,
  Sparkles,
} from "lucide-react";

type ViewMode = "desktop" | "mobile";

export default function PreviewPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Get data from store
  const {
    personalInfo,
    experiences,
    skills,
    projects,
    generatedBio,
    isPublished,
    username,
    setIsPublished,
  } = usePortfolioStore();

  // Generate username from name if not set
  const displayUsername =
    username || personalInfo.fullName.toLowerCase().replace(/\s+/g, "") || "user";
  const portfolioUrl = `portfoliogen.com/p/${displayUsername}`;

  const handlePublish = async () => {
    setIsPublishing(true);
    // TODO: Implement publish API call to save to database
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsPublished(true);
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
              fullName={personalInfo.fullName}
              title={personalInfo.title}
              location={personalInfo.location}
              email={personalInfo.email}
              linkedinUrl={personalInfo.linkedinUrl}
              githubUrl={personalInfo.githubUrl}
              bio={generatedBio || personalInfo.summary}
            />

            <ExperienceSection experiences={experiences} />

            <SkillsSection skills={skills} />

            <ProjectsSection projects={projects} />

            <FooterSection fullName={personalInfo.fullName} />
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar (for unpublished) */}
      {!isPublished && (
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
