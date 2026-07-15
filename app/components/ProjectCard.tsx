import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TagList } from "./Tag";

/**
 * Card for the projects grid. Image header, title, short description,
 * year, and monospace tech tags. The card itself is a div (not a link)
 * so that an optional `extraLinks` (e.g. a GitHub link) can sit alongside
 * the main "Explore →" link without producing nested <a> tags.
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
  ctaLabel = "Explore Project",
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
    <div className="group rounded-xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
      <Link href={href} className="block relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={`object-cover ${imagePosition} group-hover:scale-105 transition-transform duration-500`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <Link
            href={href}
            className="text-lg font-bold text-text group-hover:text-accent transition-colors"
          >
            {title}
          </Link>
          <span className="font-mono text-sm text-muted shrink-0">{year}</span>
        </div>
        <p className="text-muted mb-4 leading-relaxed">{description}</p>
        <TagList items={tags} />
        <div className="mt-4 flex gap-4 items-center">
          <Link
            href={href}
            className="text-accent group-hover:underline underline-offset-4"
          >
            {ctaLabel} →
          </Link>
          {extraLinks}
        </div>
      </div>
    </div>
  );
}