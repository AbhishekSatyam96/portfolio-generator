import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Zap,
  Palette,
  Share2,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Shield,
  Globe,
  Code2,
  Layers,
  MousePointerClick,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-chart-4 shadow-lg shadow-primary/25">
              <Sparkles className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              PortfolioGen
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="shadow-lg shadow-primary/25">
              <Link href="/sign-up">
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Main gradient blob */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-125 w-200 rounded-full bg-linear-to-r from-primary/20 via-chart-4/15 to-chart-2/20 blur-3xl" />
          {/* Side accents */}
          <div className="absolute top-60 -right-20 h-80 w-80 rounded-full bg-chart-2/20 blur-3xl" />
          <div className="absolute top-80 -left-20 h-60 w-60 rounded-full bg-chart-4/15 blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                <Zap className="size-4" />
                <span>AI-Powered Portfolio Builder</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Build Your{" "}
                <span className="bg-linear-to-r from-primary via-chart-4 to-chart-2 bg-clip-text text-transparent">
                  Dream Portfolio
                </span>{" "}
                in Minutes
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
                Stop struggling with design. Just enter your information and let
                our AI create a stunning, professional portfolio that gets you
                noticed.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Button
                  size="lg"
                  asChild
                  className="w-full shadow-xl shadow-primary/30 sm:w-auto"
                >
                  <Link href="/sign-up">
                    Start Building Free
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-chart-2" />
                  <span>No coding required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-chart-2" />
                  <span>AI suggestions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-chart-2" />
                  <span>Free forever</span>
                </div>
              </div>
            </div>

            {/* Right - Portfolio Preview Mockup */}
            <div className="relative mx-auto w-full max-w-lg lg:mx-0">
              {/* Browser mockup */}
              <div className="relative rounded-2xl border border-border/50 bg-card shadow-2xl shadow-primary/10">
                {/* Browser header */}
                <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-400" />
                    <div className="size-3 rounded-full bg-yellow-400" />
                    <div className="size-3 rounded-full bg-green-400" />
                  </div>
                  <div className="mx-auto flex-1 px-8">
                    <div className="mx-auto max-w-xs rounded-md bg-muted/50 px-3 py-1.5 text-center text-xs text-muted-foreground">
                      yourname.portfoliogen.com
                    </div>
                  </div>
                </div>
                {/* Portfolio preview content */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className="size-14 rounded-full bg-linear-to-br from-primary to-chart-4" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 rounded bg-foreground/80" />
                        <div className="h-3 w-24 rounded bg-muted-foreground/40" />
                      </div>
                    </div>
                    {/* Bio */}
                    <div className="space-y-2 pt-2">
                      <div className="h-3 w-full rounded bg-muted-foreground/20" />
                      <div className="h-3 w-4/5 rounded bg-muted-foreground/20" />
                      <div className="h-3 w-3/5 rounded bg-muted-foreground/20" />
                    </div>
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <div className="h-6 w-16 rounded-full bg-primary/20" />
                      <div className="h-6 w-20 rounded-full bg-chart-2/20" />
                      <div className="h-6 w-14 rounded-full bg-chart-4/20" />
                      <div className="h-6 w-18 rounded-full bg-chart-3/20" />
                    </div>
                    {/* Project cards */}
                    <div className="grid grid-cols-2 gap-3 pt-3">
                      <div className="aspect-video rounded-lg bg-linear-to-br from-primary/30 to-chart-4/30" />
                      <div className="aspect-video rounded-lg bg-linear-to-br from-chart-2/30 to-chart-3/30" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-primary/20 bg-primary/5" />
              <div className="absolute -bottom-8 -right-8 -z-20 h-full w-full rounded-2xl border border-primary/10 bg-primary/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Social Proof */}
      <section className="border-y border-border/50 bg-muted/30 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            Trusted by professionals from leading companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 grayscale">
            {["Google", "Meta", "Amazon", "Microsoft", "Apple", "Netflix"].map(
              (company) => (
                <div
                  key={company}
                  className="text-lg font-bold tracking-tight text-foreground/70"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-chart-2/20 bg-chart-2/10 px-3 py-1 text-sm font-medium text-chart-2">
              <Layers className="size-4" />
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Stand Out
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features that make creating your portfolio effortless and
              your results impressive.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Sparkles className="size-6" />}
              title="AI Content Writer"
              description="Our AI helps you write compelling descriptions, summaries, and project highlights that captivate recruiters."
              gradient="from-primary to-chart-4"
            />
            <FeatureCard
              icon={<Palette className="size-6" />}
              title="Beautiful Templates"
              description="Choose from professionally designed templates. Each one is crafted to highlight your unique skills."
              gradient="from-chart-4 to-chart-3"
            />
            <FeatureCard
              icon={<Zap className="size-6" />}
              title="Instant Generation"
              description="Go from zero to a complete portfolio in under 5 minutes. No design experience needed."
              gradient="from-chart-2 to-primary"
            />
            <FeatureCard
              icon={<Globe className="size-6" />}
              title="Custom Domain"
              description="Get your own personalized URL or connect a custom domain to make your portfolio truly yours."
              gradient="from-chart-3 to-chart-2"
            />
            <FeatureCard
              icon={<Smartphone className="size-6" />}
              title="Mobile Perfect"
              description="Every portfolio looks stunning on any device. Responsive design that adapts beautifully."
              gradient="from-primary to-chart-2"
            />
            <FeatureCard
              icon={<Shield className="size-6" />}
              title="Analytics Built-in"
              description="Track who's viewing your portfolio and which projects get the most attention."
              gradient="from-chart-4 to-primary"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative overflow-hidden bg-muted/30 py-20 md:py-28"
      >
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <MousePointerClick className="size-4" />
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three Steps to Your Dream Portfolio
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No complicated setup. No design skills needed. Just follow these
              simple steps.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <StepCard
              step="01"
              title="Enter Your Info"
              description="Fill in your details - work experience, projects, skills. Our smart form guides you through everything."
              icon={<Code2 className="size-6" />}
            />
            <StepCard
              step="02"
              title="AI Enhancement"
              description="Our AI analyzes your content and suggests improvements to make your portfolio more impactful."
              icon={<Sparkles className="size-6" />}
            />
            <StepCard
              step="03"
              title="Publish & Share"
              description="Pick a template, customize colors, and publish. Share your unique link with the world."
              icon={<Share2 className="size-6" />}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by Professionals
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what others are saying about their portfolio experience.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <TestimonialCard
              quote="I landed my dream job at a FAANG company. My portfolio made all the difference in standing out."
              name="Sarah Chen"
              role="Software Engineer"
              avatar="SC"
            />
            <TestimonialCard
              quote="Built my portfolio in 10 minutes. The AI suggestions helped me describe my projects way better than I could."
              name="Marcus Johnson"
              role="Product Designer"
              avatar="MJ"
            />
            <TestimonialCard
              quote="Finally, a portfolio builder that doesn't require a design degree. Clean, professional, and so easy to use."
              name="Priya Sharma"
              role="Data Scientist"
              avatar="PS"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary to-chart-4 p-1">
            <div className="rounded-4xl bg-linear-to-br from-primary via-primary/95 to-chart-4 px-6 py-16 text-center sm:px-16 md:py-24">
              {/* Decorative elements */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              </div>

              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Ready to Build Your Portfolio?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
                  Join thousands of professionals who&apos;ve launched their
                  careers with stunning portfolios. Start free today.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    variant="secondary"
                    asChild
                    className="w-full shadow-xl sm:w-auto"
                  >
                    <Link href="/sign-up">
                      Create Your Portfolio
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-white/60">
                  No credit card required. Free forever for basic features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/20 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-chart-4">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="text-lg font-bold">PortfolioGen</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground">
                Contact
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} PortfolioGen
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <div
        className={`mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-linear-to-br ${gradient} text-white shadow-lg`}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
  icon,
}: {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-border/50 bg-card p-8 text-center">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30">
          {step}
        </div>
      </div>
      <div className="mb-4 mt-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  avatar,
}: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6">
      <div className="mb-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="size-5 fill-chart-3 text-chart-3"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="mb-6 text-foreground/90 leading-relaxed">&quot;{quote}&quot;</p>
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-primary to-chart-4 text-sm font-bold text-white">
          {avatar}
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  );
}
