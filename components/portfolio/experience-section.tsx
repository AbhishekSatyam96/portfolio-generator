import { Building2, Calendar } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  enhancedDescription?: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString + "-01");
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (experiences.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Experience
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            My professional journey and accomplishments
          </p>
        </div>

        {/* Simple vertical timeline */}
        <div className="relative space-y-6">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-border" />

          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-3 size-4 rounded-full border-4 border-background bg-primary" />

              {/* Card */}
              <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm">
                {/* Company */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Building2 className="size-4 shrink-0" />
                  <span className="truncate">{exp.company}</span>
                </div>

                {/* Role */}
                <h3 className="mt-1 text-lg font-semibold sm:text-xl">
                  {exp.role}
                </h3>

                {/* Date */}
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  <Calendar className="size-4 shrink-0" />
                  <span>{formatDate(exp.startDate)}</span>
                  <span>—</span>
                  {exp.isCurrent ? (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Present
                    </span>
                  ) : (
                    <span>{formatDate(exp.endDate || "")}</span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {exp.enhancedDescription || exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
