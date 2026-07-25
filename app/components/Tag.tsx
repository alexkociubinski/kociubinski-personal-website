import React from "react";

/**
 * Plain monospace tech tag - replaces the old colored pill style.
 * Used on the projects grid and project detail pages.
 */
export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-sm text-muted">{children}</span>
  );
}

/**
 * A row of space-separated tech tags, e.g. <TagList items={["Python", "C"]} />.
 */
export function TagList({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}