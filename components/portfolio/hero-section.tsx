import { MapPin, Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  fullName: string;
  title: string;
  location?: string;
  email: string;
  linkedinUrl?: string;
  githubUrl?: string;
  bio?: string;
}

export function HeroSection({
  fullName,
  title,
  location,
  email,
  linkedinUrl,
  githubUrl,
  bio,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-12 sm:py-20">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-chart-2/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          {/* Avatar */}
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-4 text-2xl font-bold text-white shadow-xl shadow-primary/25 sm:size-28 sm:text-4xl">
            {fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          {/* Name and title */}
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {fullName}
          </h1>
          <p className="mt-2 text-base font-medium text-primary sm:mt-4 sm:text-xl">
            {title}
          </p>

          {/* Location */}
          {location && (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              <span>{location}</span>
            </p>
          )}

          {/* Bio */}
          {bio && (
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
              {bio}
            </p>
          )}

          {/* Social links and contact */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Button size="sm" asChild className="sm:size-default">
              <a href={`mailto:${email}`}>
                <Mail className="size-4" />
                <span className="hidden sm:inline">Get in Touch</span>
                <span className="sm:hidden">Contact</span>
              </a>
            </Button>

            {linkedinUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
              </Button>
            )}

            {githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
