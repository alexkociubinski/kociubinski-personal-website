import React from "react";

/**
 * Inline social/profile link - icon + label, gold on hover.
 * Typographic-link CTA voice (Long Document): no button, no fill.
 * `whitespace-nowrap` keeps the label on one line at every width (gate 49).
 */
export default function SocialLink({
  href,
  label,
  icon,
  onClick,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  const external = href.startsWith("http");
  const common =
    "inline-flex items-center gap-1.5 whitespace-nowrap text-muted hover:text-accent transition-colors";
  if (onClick) {
    return (
      <button onClick={onClick} className={common} aria-label={label}>
        {icon}
        <span>{label}</span>
      </button>
    );
  }
  return (
    <a
      href={href}
      className={common}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}