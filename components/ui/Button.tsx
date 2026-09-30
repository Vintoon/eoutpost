import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-outpost-sky disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-outpost-gradient text-white shadow-glass hover:shadow-glass-lg hover:-translate-y-0.5",
        secondary:
          "glass text-outpost-navy hover:bg-white/70 hover:-translate-y-0.5",
        outline:
          "border border-outpost-navy/20 text-outpost-navy hover:bg-outpost-navy hover:text-white",
        ghost: "text-outpost-navy hover:bg-outpost-navy/5",
        gold: "bg-outpost-gold text-white shadow-glass hover:brightness-110 hover:-translate-y-0.5",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noreferrer" className={classes}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
