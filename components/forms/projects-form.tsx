"use client";

import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Trash2,
  FolderGit2,
  ExternalLink,
  Github,
  X,
  GripVertical,
} from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const emptyProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  techStack: [],
  liveUrl: "",
  githubUrl: "",
};

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const addProject = () => {
    const newProject: Project = {
      ...emptyProject,
      id: crypto.randomUUID(),
    };
    onChange([...data, newProject]);
  };

  const updateProject = (
    id: string,
    field: keyof Project,
    value: string | string[]
  ) => {
    onChange(
      data.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const removeProject = (id: string) => {
    onChange(data.filter((project) => project.id !== id));
    const newTechInputs = { ...techInputs };
    delete newTechInputs[id];
    setTechInputs(newTechInputs);
  };

  const addTech = (projectId: string, tech: string) => {
    const trimmedTech = tech.trim();
    const project = data.find((p) => p.id === projectId);
    if (project && trimmedTech && !project.techStack.includes(trimmedTech)) {
      updateProject(projectId, "techStack", [...project.techStack, trimmedTech]);
    }
    setTechInputs((prev) => ({ ...prev, [projectId]: "" }));
  };

  const removeTech = (projectId: string, tech: string) => {
    const project = data.find((p) => p.id === projectId);
    if (project) {
      updateProject(
        projectId,
        "techStack",
        project.techStack.filter((t) => t !== tech)
      );
    }
  };

  const handleTechKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    projectId: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech(projectId, techInputs[projectId] || "");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <p className="text-muted-foreground">
          Showcase your best work. Our AI will enhance your project descriptions.
        </p>
      </div>

      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <FolderGit2 className="mx-auto size-10 text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">
              No projects added yet. Add your first project to showcase your work.
            </p>
            <Button onClick={addProject} className="mt-4" variant="outline">
              <Plus className="size-4" />
              Add Project
            </Button>
          </div>
        ) : (
          <>
            {data.map((project, index) => (
              <div
                key={project.id}
                className="relative rounded-xl border border-border bg-card p-6"
              >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="size-5 text-muted-foreground/50" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Project {index + 1}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeProject(project.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor={`title-${project.id}`}>
                      <span className="flex items-center gap-2">
                        <FolderGit2 className="size-4 text-muted-foreground" />
                        Project Title
                      </span>
                    </Label>
                    <Input
                      id={`title-${project.id}`}
                      placeholder="E-commerce Platform"
                      value={project.title}
                      onChange={(e) =>
                        updateProject(project.id, "title", e.target.value)
                      }
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor={`description-${project.id}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`description-${project.id}`}
                      placeholder="Describe your project, what problem it solves, and your role in building it..."
                      rows={4}
                      value={project.description}
                      onChange={(e) =>
                        updateProject(project.id, "description", e.target.value)
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: Focus on the problem solved and your contribution. AI
                      will enhance this.
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2">
                    <Label>Tech Stack</Label>
                    <div className="flex min-h-[48px] flex-wrap gap-2 rounded-lg border border-input bg-background p-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTech(project.id, tech)}
                            className="rounded-full p-0.5 hover:bg-muted"
                          >
                            <X className="size-3" />
                          </button>
                        </span>
                      ))}
                      <Input
                        placeholder="Add technology..."
                        value={techInputs[project.id] || ""}
                        onChange={(e) =>
                          setTechInputs((prev) => ({
                            ...prev,
                            [project.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => handleTechKeyDown(e, project.id)}
                        className="flex-1 min-w-[120px] border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Press Enter to add each technology
                    </p>
                  </div>

                  {/* URLs */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`liveUrl-${project.id}`}>
                        <span className="flex items-center gap-2">
                          <ExternalLink className="size-4 text-muted-foreground" />
                          Live URL
                          <span className="text-xs text-muted-foreground">
                            (Optional)
                          </span>
                        </span>
                      </Label>
                      <Input
                        id={`liveUrl-${project.id}`}
                        type="url"
                        placeholder="https://myproject.com"
                        value={project.liveUrl}
                        onChange={(e) =>
                          updateProject(project.id, "liveUrl", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`githubUrl-${project.id}`}>
                        <span className="flex items-center gap-2">
                          <Github className="size-4 text-muted-foreground" />
                          GitHub URL
                          <span className="text-xs text-muted-foreground">
                            (Optional)
                          </span>
                        </span>
                      </Label>
                      <Input
                        id={`githubUrl-${project.id}`}
                        type="url"
                        placeholder="https://github.com/user/repo"
                        value={project.githubUrl}
                        onChange={(e) =>
                          updateProject(project.id, "githubUrl", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addProject} variant="outline" className="w-full">
              <Plus className="size-4" />
              Add Another Project
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
