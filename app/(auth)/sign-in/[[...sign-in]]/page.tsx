import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue building your portfolio
        </p>
      </div>

      {/* Clerk SignIn Component */}
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25",
            card: "shadow-none",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton:
              "border border-border bg-background hover:bg-muted text-foreground",
            socialButtonsBlockButtonText: "font-medium",
            formFieldLabel: "text-foreground font-medium",
            formFieldInput:
              "border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary",
            footerActionLink: "text-primary hover:text-primary/80 font-medium",
            identifierPreviewText: "text-foreground",
            identifierPreviewEditButton: "text-primary hover:text-primary/80",
            formFieldAction: "text-primary hover:text-primary/80",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground",
            alertText: "text-destructive",
            formResendCodeLink: "text-primary hover:text-primary/80",
          },
          layout: {
            socialButtonsPlacement: "top",
            socialButtonsVariant: "blockButton",
          },
        }}
      />

      {/* Additional link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline"
        >
          Sign up for free
        </Link>
      </p>
    </div>
  );
}
