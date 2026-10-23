import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const controlClasses =
  "block w-full rounded-xl border border-line-strong bg-white px-4 text-[0.98rem] text-ink placeholder:text-slate/70 transition-colors duration-200 hover:border-ink-600 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/8 aria-[invalid=true]:border-[#b42318] aria-[invalid=true]:ring-[#b42318]/10";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function Field({ id, label, required, error, hint, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="text-[#b42318]" aria-hidden="true">
            {" "}*
          </span>
        ) : (
          <span className="font-normal text-slate"> (facultatif)</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-slate">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-[#b42318]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlClasses, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlClasses, "min-h-28 py-3", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(controlClasses, "h-12 appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="m5 8 5 5 5-5" />
      </svg>
    </div>
  );
}
