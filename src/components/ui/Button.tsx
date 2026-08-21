"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md border font-medium leading-5 no-underline whitespace-nowrap transition-colors duration-150 cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-brand border-brand text-white hover:bg-brand-hi hover:border-brand-hi",
  ghost: "bg-transparent text-tx border-line hover:border-brand-hi hover:text-brand-hi",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  sm: "h-[34px] px-[14px] text-[13px] rounded-sm",
};

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const tap = { scale: 0.98 };

  if (href) {
    return (
      <m.a href={href} className={cls} whileTap={tap} onClick={onClick}>
        {children}
      </m.a>
    );
  }

  return (
    <m.button
      type={type}
      className={cls}
      whileTap={tap}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </m.button>
  );
}
