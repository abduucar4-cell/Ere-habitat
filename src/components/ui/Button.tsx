import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "leaf" | "inverse" | "sun" | "dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-leaf text-white hover:bg-leaf-600 shadow-[0_10px_28px_-12px_rgba(27,122,61,0.65)]",
  leaf: "bg-leaf text-white hover:bg-leaf-600",
  sun: "bg-sun text-ink hover:bg-[#ffd447] shadow-[0_10px_28px_-14px_rgba(200,150,0,0.7)]",
  dark: "bg-ink text-white hover:bg-ink-700",
  secondary: "border border-line-strong bg-white text-ink hover:border-ink hover:bg-white",
  ghost: "text-ink hover:bg-mist",
  inverse: "bg-white text-ink hover:bg-leaf-50",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function LinkButton({ variant, size, className, children, ...props }: LinkButtonProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}
