import { Heart } from "lucide-react";

interface FooterSectionProps {
  fullName: string;
}

export function FooterSection({ fullName }: FooterSectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-muted/30 py-6">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-sm">
          <p>&copy; {currentYear} {fullName}</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="size-3 fill-red-500 text-red-500" /> using{" "}
            <span className="font-medium text-primary">Portfolio Generator</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
