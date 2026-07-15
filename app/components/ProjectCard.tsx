import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TagList } from "./Tag";

/**
 * Card for the projects grid. Image header, title, short description,
 * year, and monospace tech tags. Links to the project's detail route.
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
    <Link
      href={href}
      className="group block rounded-xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
    >
      <div className="h-48 relative overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={`object-cover ${imagePosition} group-hover:scale-105 transition-transform duration-500`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors">
            {title}
          </h3>
          <span className="font-mono text-sm text-muted shrink-0">{year}</span>
        </div>
        <p className="text-muted mb-4 leading-relaxed">{description}</p>
        <TagList items={tags} />
        <div className="mt-4 flex gap-4 items-center">
          <span className="text-accent group-hover:underline underline-offset-4">
            {ctaLabel} →
          </span>
          {extraLinks}
        </div>
      </div>
    </Link>
  );
}