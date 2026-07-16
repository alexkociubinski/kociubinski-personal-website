import React from "react";

/**
 * Long Document section head — a hairline rule above a bold short heading,
 * stacked single-column (never the tag-left / header-right two-column tell).
 * `id` enables navbar anchor scrolling; `scroll-mt` offsets the sticky nav.
 */
export default function SectionHeading({
  id,
  children,
  as: Tag = "h2",
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={`border-t border-border pt-8 mt-16 mb-6 scroll-mt-20 text-xl font-bold tracking-tight text-text ${className}`}
    >
      {children}
    </Tag>
  );
}