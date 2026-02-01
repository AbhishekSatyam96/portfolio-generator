"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
} from "lucide-react";

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

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (
    field: keyof PersonalInfo,
    value: string
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Personal Information</h2>
        <p className="text-muted-foreground">
          Tell us about yourself. This information will be displayed on your portfolio.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Full Name and Title */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              <span className="flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                Full Name
              </span>
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">
              <span className="flex items-center gap-2">
                <Briefcase className="size-4 text-muted-foreground" />
                Professional Title
              </span>
            </Label>
            <Input
              id="title"
              placeholder="Senior Frontend Developer"
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">
              <span className="flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground" />
                Email Address
              </span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              <span className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground" />
                Phone Number
                <span className="text-xs text-muted-foreground">(Optional)</span>
              </span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-muted-foreground" />
              Location
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </span>
          </Label>
          <Input
            id="location"
            placeholder="San Francisco, CA"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        {/* Social Links */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">
              <span className="flex items-center gap-2">
                <Linkedin className="size-4 text-muted-foreground" />
                LinkedIn URL
                <span className="text-xs text-muted-foreground">(Optional)</span>
              </span>
            </Label>
            <Input
              id="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/johndoe"
              value={data.linkedinUrl}
              onChange={(e) => handleChange("linkedinUrl", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubUrl">
              <span className="flex items-center gap-2">
                <Github className="size-4 text-muted-foreground" />
                GitHub URL
                <span className="text-xs text-muted-foreground">(Optional)</span>
              </span>
            </Label>
            <Input
              id="githubUrl"
              type="url"
              placeholder="https://github.com/johndoe"
              value={data.githubUrl}
              onChange={(e) => handleChange("githubUrl", e.target.value)}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <Label htmlFor="summary">
            <span className="flex items-center gap-2">
              Brief Summary
              <span className="text-xs text-muted-foreground">
                (Optional - AI will generate a professional bio if left empty)
              </span>
            </span>
          </Label>
          <Textarea
            id="summary"
            placeholder="A brief summary about yourself, your expertise, and what you're passionate about..."
            rows={4}
            value={data.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
