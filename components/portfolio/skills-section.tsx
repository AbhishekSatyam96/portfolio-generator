interface SkillsSectionProps {
  skills: string[];
}

const skillColors = [
  "bg-primary/10 text-primary border-primary/20",
  "bg-chart-2/10 text-chart-2 border-chart-2/20",
  "bg-chart-3/10 text-chart-3 border-chart-3/20",
  "bg-chart-4/10 text-chart-4 border-chart-4/20",
  "bg-chart-5/10 text-chart-5 border-chart-5/20",
];

export function SkillsSection({ skills }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  return (
    <section className="bg-muted/30 py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Skills & Technologies
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Technologies and tools I work with
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm ${
                skillColors[index % skillColors.length]
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
