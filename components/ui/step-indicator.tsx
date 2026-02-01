import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-start">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isClickable = onStepClick && (isCompleted || isCurrent);
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.id}
              className={cn("relative flex flex-col items-center", !isLast && "flex-1")}
            >
              <div className="flex w-full items-center">
                {/* Step circle */}
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick?.(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary bg-background text-primary ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "border-border bg-background text-muted-foreground",
                    isClickable && "cursor-pointer hover:ring-4 hover:ring-primary/10",
                    !isClickable && "cursor-default"
                  )}
                >
                  {isCompleted ? (
                    <Check className="size-4" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </button>

                {/* Connector line */}
                {!isLast && (
                  <div className="h-0.5 flex-1 mx-2">
                    <div
                      className={cn(
                        "h-full w-full transition-colors duration-300",
                        isCompleted ? "bg-primary" : "bg-border"
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="mt-3 text-center">
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
                {step.description && (
                  <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">
                    {step.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
