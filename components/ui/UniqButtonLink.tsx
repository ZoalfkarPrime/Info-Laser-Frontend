import Link from "next/link";
import {cn} from "@/lib/utils";
import React from "react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "violet" | "violetDark" | "violetOutline" | "white";
  className?: string;
  onClick?: () => void;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

export const UniqButtonLink: React.FC<ButtonLinkProps> = (
  {
    href,
    children,
    variant = "violet",
    className,
  }) => {
  const variants = {
    "violet": "text-white bg-[var(--violet)] hover:cursor-pointer hover:bg-[var(--violet-hover)] hover:shadow-[0_4px_4px_var(--violet-dark-hover)] focus:bg-[var(--violet-hover)] focus:shadow-[0_4px_4px_var(--violet-dark-hover)]",
    violetDark: "text-[var(--violet)] bg-[var(--violet-dark)] hover:bg-[var(--violet-dark-hover)] hover:shadow-[0_4px_4px_var(--violet-dark)] focus:bg-[var(--violet-dark-hover)] focus:shadow-[0_4px_4px_var(--violet-dark)]",
    violetOutline: "text-[var(--violet)] bg-white border-2 !border-[var(--violet-dark)] py-1 px-3 hover:!border-[var(--violet-dark-hover)] hover:shadow-[0_1px_1px_var(--violet-dark-hover)] focus:!border-[var(--violet-dark-hover)] focus:shadow-[0_1px_1px_var(--violet-dark-hover)]",
    white: "text-[var(--violet)] bg-white hover:text-white focus:text-white hover:bg-[var(--violet)] focus:bg-[var(--violet)] hover:[&>svg]:fill-white focus:[&>svg]:fill-white"
  };

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center text-sm rounded-3xl py-3 px-5 transition-all duration-300",
        "hover:cursor-pointer",
        "max-md:text-xs max-md:py-2 max-md:px-3",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
};
