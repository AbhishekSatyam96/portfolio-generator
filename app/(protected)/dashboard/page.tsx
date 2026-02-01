import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Eye,
  Share2,
  Edit3,
  TrendingUp,
  Users,
  MousePointerClick,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Copy,
  MoreHorizontal,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName || "there";

  // TODO: Fetch actual portfolio data from Supabase
  const hasPortfolio = false; // Change this when DB is connected
  const portfolioData = null;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {firstName}!
        </h1>
        <p className="text-muted-foreground">
          {hasPortfolio
            ? "Here's how your portfolio is performing"
            : "Let's create your professional portfolio"}
        </p>
      </div>

      {hasPortfolio ? (
        // Portfolio exists - show overview
        <PortfolioOverview data={portfolioData} />
      ) : (
        // No portfolio - show empty state
        <EmptyState />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="space-y-8">
      {/* Main CTA Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-chart-2/10 blur-3xl" />
        </div>

        <div className="relative p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            {/* Icon */}
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-chart-4 shadow-lg shadow-primary/25">
              <Sparkles className="size-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Create Your Portfolio
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Stand out from the crowd with a professional portfolio powered by
              AI. It only takes a few minutes to get started.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="shadow-lg shadow-primary/25">
                <Link href="/create">
                  <Plus className="size-5" />
                  Create Portfolio
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/templates">View Templates</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={<Clock className="size-5" />}
          title="Ready in Minutes"
          description="Our guided form makes it easy to input your information quickly"
        />
        <FeatureCard
          icon={<Sparkles className="size-5" />}
          title="AI-Powered Content"
          description="Get professional bio and project descriptions written by AI"
        />
        <FeatureCard
          icon={<Share2 className="size-5" />}
          title="Easy Sharing"
          description="Get a unique link to share with recruiters and on social media"
        />
      </div>

      {/* Steps Preview */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
        <h3 className="mb-6 text-lg font-semibold">How it works</h3>
        <div className="grid gap-6 sm:grid-cols-3">
          <StepPreview
            number="1"
            title="Fill Your Details"
            description="Enter your personal info, experience, skills, and projects"
          />
          <StepPreview
            number="2"
            title="AI Enhancement"
            description="Our AI generates a professional bio and enhances your content"
          />
          <StepPreview
            number="3"
            title="Publish & Share"
            description="Preview your portfolio, make edits, and publish with one click"
          />
        </div>
      </div>
    </div>
  );
}

function PortfolioOverview({ data }: { data: unknown }) {
  // Mock data - replace with actual data
  const stats = {
    views: 1234,
    uniqueVisitors: 567,
    clicks: 89,
    lastUpdated: "2 days ago",
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Eye className="size-5" />}
          label="Total Views"
          value={stats.views.toLocaleString()}
          trend="+12%"
          trendUp
        />
        <StatCard
          icon={<Users className="size-5" />}
          label="Unique Visitors"
          value={stats.uniqueVisitors.toLocaleString()}
          trend="+8%"
          trendUp
        />
        <StatCard
          icon={<MousePointerClick className="size-5" />}
          label="Link Clicks"
          value={stats.clicks.toLocaleString()}
          trend="+23%"
          trendUp
        />
        <StatCard
          icon={<Clock className="size-5" />}
          label="Last Updated"
          value={stats.lastUpdated}
        />
      </div>

      {/* Portfolio Card */}
      <div className="rounded-2xl border border-border/50 bg-card">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Portfolio thumbnail */}
            <div className="flex size-16 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-chart-4/20">
              <Sparkles className="size-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">My Portfolio</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-green-500" />
                  Published
                </span>
                <span>•</span>
                <span>yourname.portfoliogen.com</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/preview">
                <Eye className="size-4" />
                Preview
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/create">
                <Edit3 className="size-4" />
                Edit
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="size-4" />
              Copy Link
            </Button>
            <Button size="sm" asChild>
              <Link href="/p/yourname" target="_blank">
                <ExternalLink className="size-4" />
                View Live
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="border-t border-border/50 px-6 py-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href="/create?step=personal"
              className="text-muted-foreground hover:text-foreground"
            >
              Update personal info
            </Link>
            <Link
              href="/create?step=experience"
              className="text-muted-foreground hover:text-foreground"
            >
              Add experience
            </Link>
            <Link
              href="/create?step=projects"
              className="text-muted-foreground hover:text-foreground"
            >
              Add projects
            </Link>
            <Link
              href="/settings"
              className="text-muted-foreground hover:text-foreground"
            >
              Change template
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-border/50 bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Recent Activity</h3>
          <Button variant="ghost" size="sm">
            View all
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <ActivityItem
            title="Portfolio viewed"
            description="Someone from San Francisco viewed your portfolio"
            time="2 hours ago"
          />
          <ActivityItem
            title="GitHub link clicked"
            description="A visitor clicked your GitHub profile link"
            time="5 hours ago"
          />
          <ActivityItem
            title="Portfolio shared"
            description="Your portfolio was shared on LinkedIn"
            time="1 day ago"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5">
      <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function StepPreview({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {number}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  trend,
  trendUp,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {icon}
        </div>
        {trend && (
          <span
            className={`flex items-center text-sm font-medium ${
              trendUp ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp
              className={`size-4 ${!trendUp && "rotate-180"}`}
            />
            {trend}
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function ActivityItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <span className="shrink-0 text-xs text-muted-foreground">{time}</span>
    </div>
  );
}
