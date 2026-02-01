import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  enhancedDescription?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Featured Projects
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            A selection of my recent work
          </p>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-md"
            >
              {/* Mobile-friendly card layout */}
              <div className="p-4 sm:p-6">
                {/* Header with icon */}
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-chart-4/20 sm:size-12">
                    <FolderGit2 className="size-5 text-primary sm:size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold sm:text-lg">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {project.enhancedDescription || project.description}
                    </p>
                  </div>
                </div>

                {/* Tech stack */}
                {project.techStack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                {(project.liveUrl || project.githubUrl) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="size-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="size-4" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
