import React from "react";

/**
 * Light surface card — thin border, subtle rounded corners, minimal shadow.
 * Replaces the old heavy `bg-neutral-900 ... shadow-xl` card.
 */
export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 ${className}`}
    >
      {children}
    </div>
  );
}