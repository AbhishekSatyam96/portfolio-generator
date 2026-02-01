"use client";

import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Sparkles, Lightbulb } from "lucide-react";

interface SkillsFormProps {
  data: string[];
  onChange: (data: string[]) => void;
}

const SUGGESTED_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "SQL",
  "Git",
  "AWS",
  "Docker",
  "Tailwind CSS",
  "GraphQL",
  "REST APIs",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "CI/CD",
  "Agile",
  "Figma",
  "UI/UX Design",
];

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [inputValue, setInputValue] = useState("");

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !data.includes(trimmedSkill)) {
      onChange([...data, trimmedSkill]);
    }
    setInputValue("");
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(inputValue);
    }
    if (e.key === "Backspace" && inputValue === "" && data.length > 0) {
      removeSkill(data[data.length - 1]);
    }
  };

  const availableSuggestions = SUGGESTED_SKILLS.filter(
    (skill) => !data.includes(skill)
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Skills & Technologies</h2>
        <p className="text-muted-foreground">
          Add your technical skills, programming languages, frameworks, and tools.
        </p>
      </div>

      <div className="space-y-6">
        {/* Skills Input */}
        <div className="space-y-2">
          <div className="relative">
            <div className="flex min-h-[120px] flex-wrap gap-2 rounded-xl border border-input bg-background p-4 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              {data.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="rounded-full p-0.5 hover:bg-primary/20"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <Input
                placeholder={data.length === 0 ? "Type a skill and press Enter..." : "Add more..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Press Enter to add a skill, Backspace to remove the last one
          </p>
        </div>

        {/* Quick Add from Suggestions */}
        {availableSuggestions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lightbulb className="size-4" />
              <span>Quick add suggestions:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableSuggestions.slice(0, 12).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                >
                  <Plus className="size-3" />
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Skills Count */}
        <div className="rounded-xl border border-border/50 bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="size-5" />
              </div>
              <div>
                <p className="font-medium">
                  {data.length} {data.length === 1 ? "skill" : "skills"} added
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.length < 5
                    ? "Add at least 5 skills for better results"
                    : data.length < 10
                    ? "Looking good! Add more for a comprehensive profile"
                    : "Great! You have a solid skill set"}
                </p>
              </div>
            </div>
            {data.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange([])}
                className="text-muted-foreground hover:text-destructive"
              >
                Clear all
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
