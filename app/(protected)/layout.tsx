import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  Sparkles,
  LayoutDashboard,
  FileEdit,
  Eye,
  Settings,
  HelpCircle,
} from "lucide-react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-border/50 bg-card lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2.5 border-b border-border/50 px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-chart-4 shadow-lg shadow-primary/25">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                PortfolioGen
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <NavItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem href="/create" icon={FileEdit} label="Create Portfolio" />
            <NavItem href="/preview" icon={Eye} label="Preview" />
            <NavItem href="/settings" icon={Settings} label="Settings" />
          </nav>

          {/* Footer */}
          <div className="border-t border-border/50 p-4">
            <NavItem href="/help" icon={HelpCircle} label="Help & Support" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 bg-background/95 px-6 backdrop-blur-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-chart-4">
                <Sparkles className="size-4 text-white" />
              </div>
              <span className="text-lg font-bold">PortfolioGen</span>
            </Link>
          </div>

          {/* Spacer for desktop */}
          <div className="hidden lg:block" />

          {/* User button */}
          <div className="flex items-center gap-4">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "size-9",
                  userButtonPopoverCard: "shadow-xl",
                  userButtonPopoverActionButton: "hover:bg-muted",
                },
              }}
            />
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8">{children}</main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background lg:hidden">
        <div className="flex items-center justify-around py-2">
          <MobileNavItem href="/dashboard" icon={LayoutDashboard} label="Home" />
          <MobileNavItem href="/create" icon={FileEdit} label="Create" />
          <MobileNavItem href="/preview" icon={Eye} label="Preview" />
          <MobileNavItem href="/settings" icon={Settings} label="Settings" />
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Icon className="size-5" />
      {label}
    </Link>
  );
}

function MobileNavItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon className="size-5" />
      <span className="text-xs">{label}</span>
    </Link>
  );
}
