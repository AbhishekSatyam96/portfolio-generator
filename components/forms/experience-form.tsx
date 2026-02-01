"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Trash2,
  Building2,
  Briefcase,
  Calendar,
  GripVertical,
} from "lucide-react";

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const emptyExperience: Omit<Experience, "id"> = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
};

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      ...emptyExperience,
      id: crypto.randomUUID(),
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    onChange(
      data.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]: value,
              ...(field === "isCurrent" && value === true ? { endDate: "" } : {}),
            }
          : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Work Experience</h2>
        <p className="text-muted-foreground">
          Add your professional experience. Our AI will help enhance your descriptions.
        </p>
      </div>

      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <Building2 className="mx-auto size-10 text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">
              No experience added yet. Add your first role to get started.
            </p>
            <Button onClick={addExperience} className="mt-4" variant="outline">
              <Plus className="size-4" />
              Add Experience
            </Button>
          </div>
        ) : (
          <>
            {data.map((experience, index) => (
              <div
                key={experience.id}
                className="relative rounded-xl border border-border bg-card p-6"
              >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="size-5 text-muted-foreground/50" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Experience {index + 1}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeExperience(experience.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  {/* Company and Role */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`company-${experience.id}`}>
                        <span className="flex items-center gap-2">
                          <Building2 className="size-4 text-muted-foreground" />
                          Company
                        </span>
                      </Label>
                      <Input
                        id={`company-${experience.id}`}
                        placeholder="Acme Inc."
                        value={experience.company}
                        onChange={(e) =>
                          updateExperience(experience.id, "company", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`role-${experience.id}`}>
                        <span className="flex items-center gap-2">
                          <Briefcase className="size-4 text-muted-foreground" />
                          Role / Title
                        </span>
                      </Label>
                      <Input
                        id={`role-${experience.id}`}
                        placeholder="Senior Developer"
                        value={experience.role}
                        onChange={(e) =>
                          updateExperience(experience.id, "role", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${experience.id}`}>
                        <span className="flex items-center gap-2">
                          <Calendar className="size-4 text-muted-foreground" />
                          Start Date
                        </span>
                      </Label>
                      <Input
                        id={`startDate-${experience.id}`}
                        type="month"
                        value={experience.startDate}
                        onChange={(e) =>
                          updateExperience(experience.id, "startDate", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${experience.id}`}>
                        <span className="flex items-center gap-2">
                          <Calendar className="size-4 text-muted-foreground" />
                          End Date
                        </span>
                      </Label>
                      <div className="space-y-2">
                        <Input
                          id={`endDate-${experience.id}`}
                          type="month"
                          value={experience.endDate}
                          disabled={experience.isCurrent}
                          onChange={(e) =>
                            updateExperience(experience.id, "endDate", e.target.value)
                          }
                        />
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={experience.isCurrent}
                            onChange={(e) =>
                              updateExperience(experience.id, "isCurrent", e.target.checked)
                            }
                            className="size-4 rounded border-input"
                          />
                          <span className="text-muted-foreground">
                            I currently work here
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor={`description-${experience.id}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`description-${experience.id}`}
                      placeholder="Describe your responsibilities, achievements, and the impact you made..."
                      rows={4}
                      value={experience.description}
                      onChange={(e) =>
                        updateExperience(experience.id, "description", e.target.value)
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: Include specific achievements and metrics. Our AI will help polish this.
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addExperience} variant="outline" className="w-full">
              <Plus className="size-4" />
              Add Another Experience
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
