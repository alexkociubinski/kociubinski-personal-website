import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TagList } from "./Tag";

/**
 * Card for the projects grid. Image header, title, short description,
 * year, and monospace tech tags. The card is a div (not a link) so an
 * optional `extraLinks` (e.g. GitHub) sits alongside the main link
 * without nesting <a> tags. Hover = border-color shift only (no scale on
 * the card); the image may zoom inside the card.
 */
export default function ProjectCard({
  href,
  image,
  imageAlt,
  imagePosition = "object-center",
  title,
  year,
  description,
  tags,
  ctaLabel = "Explore",
  extraLinks,
}: {
  href: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  title: string;
  year: string;
  description: string;
  tags: readonly string[];
  ctaLabel?: string;
  extraLinks?: ReactNode;
}) {
  return (
    <div className="group rounded-xl border border-border bg-surface overflow-hidden transition-colors duration-200 hover:border-accent/50">
      <Link href={href} className="block relative h-44 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={`object-cover ${imagePosition} group-hover:scale-105 transition-transform duration-500`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <Link
            href={href}
            className="text-lg font-bold tracking-tight text-text group-hover:text-accent transition-colors"
          >
            {title}
          </Link>
          <span className="nums font-mono text-sm text-muted shrink-0">{year}</span>
        </div>
        <p className="text-muted text-sm leading-relaxed mb-4">{description}</p>
        <TagList items={tags} />
        <div className="mt-4 flex gap-4 items-center whitespace-nowrap">
          <Link
            href={href}
            className="text-accent hover:underline underline-offset-4"
          >
            {ctaLabel} →
          </Link>
          {extraLinks}
        </div>
      </div>
    </div>
  );
}