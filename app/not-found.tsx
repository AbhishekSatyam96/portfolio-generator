import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg text-center">
        {/* Background decoration */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-chart-2/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-4/5 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative space-y-6">
          {/* Icon */}
          <div className="mx-auto flex size-24 items-center justify-center rounded-3xl bg-linear-to-br from-primary/20 to-chart-4/20 shadow-xl shadow-primary/10">
            <FileQuestion className="size-12 text-primary" />
          </div>

          {/* 404 Text */}
          <div className="space-y-2">
            <h1 className="text-8xl font-bold tracking-tighter text-foreground">
              4
              <span className="bg-linear-to-br from-primary to-chart-4 bg-clip-text text-transparent">
                0
              </span>
              4
            </h1>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Page not found
            </h2>
          </div>

          {/* Description */}
          <p className="mx-auto max-w-sm text-muted-foreground">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
            <Button size="lg" asChild className="shadow-lg shadow-primary/25">
              <Link href="/">
                <Home className="size-5" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="size-5" />
                Dashboard
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="pt-8">
            <p className="mb-4 text-sm text-muted-foreground">
              Here are some helpful links:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link
                href="/dashboard"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              <span className="text-border">•</span>
              <Link
                href="/create"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Create Portfolio
              </Link>
              <span className="text-border">•</span>
              <Link
                href="/templates"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Templates
              </Link>
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div className="relative mt-16">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Search className="size-3" />
            <span>If you believe this is an error, please contact support.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
