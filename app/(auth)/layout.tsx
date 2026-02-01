import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Branding */}
      <div className="relative hidden lg:flex flex-col bg-linear-to-br from-primary via-primary/95 to-chart-4 p-12 text-white">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/2 -right-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <Sparkles className="size-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">PortfolioGen</span>
        </Link>

        {/* Main content */}
        <div className="relative flex flex-1 flex-col justify-center">
          <blockquote className="space-y-6">
            <p className="text-3xl font-medium leading-relaxed lg:text-4xl">
              &ldquo;Create a portfolio that truly represents your professional
              journey. Let AI do the heavy lifting.&rdquo;
            </p>
            <footer className="space-y-1">
              <p className="text-lg font-semibold">Your Career, Elevated</p>
              <p className="text-white/70">
                Join thousands of professionals who&apos;ve transformed their
                online presence
              </p>
            </footer>
          </blockquote>
        </div>

        {/* Features list */}
        <div className="relative grid grid-cols-2 gap-4 pt-8 border-t border-white/20">
          <FeatureItem icon="sparkles" text="AI-Powered Content" />
          <FeatureItem icon="clock" text="Ready in Minutes" />
          <FeatureItem icon="share" text="Easy Sharing" />
          <FeatureItem icon="shield" text="Secure & Private" />
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex flex-col">
        {/* Mobile header */}
        <div className="flex items-center justify-between p-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-chart-4">
              <Sparkles className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">PortfolioGen</span>
          </Link>
        </div>

        {/* Auth content */}
        <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} PortfolioGen. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  const icons: Record<string, React.ReactNode> = {
    sparkles: (
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    clock: (
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    share: (
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
    ),
    shield: (
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  };

  return (
    <div className="flex items-center gap-3 text-sm text-white/80">
      <div className="flex size-8 items-center justify-center rounded-lg bg-white/10">
        {icons[icon]}
      </div>
      <span>{text}</span>
    </div>
  );
}
