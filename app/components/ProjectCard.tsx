import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Builds-style project card - full-bleed 16:9 image with layered overlays.
 * Default state: faded image + gradient/blur with title and description.
 * Hover state: image reveals, text fades, tech tags appear at bottom.
 * The entire card is a single clickable element (no nested interactive children).
 * If `href` is external (starts with "http"), it renders as <a target="_blank">
 * with a small ↗ icon next to the title, mirroring the SocialLink pattern.
 *
 * Inspired by https://www.johnathanmo.com/ "Builds" section.
 */
export default function ProjectCard({
  href,
  image,
  imageAlt,
  imagePosition = "object-center",
  title,
  description,
  tags,
}: {
  href: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  title: string;
  description: string;
  tags: readonly string[];
}) {
  const isExternal = href.startsWith("http");
  const inner = (
    <div className="group relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-surface">
      {/* Background image - faded by default, reveals on hover */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        className={`object-cover ${imagePosition} opacity-30 dark:opacity-20 transition-opacity duration-300 group-hover:opacity-80 dark:group-hover:opacity-60`}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Gradient overlay - fades on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-bg/60 to-bg/20 transition-opacity duration-300 group-hover:opacity-40" />

      {/* Backdrop blur on upper portion - disappears on hover */}
      <div className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_30%,transparent_70%)] transition-opacity duration-300 group-hover:opacity-0" />

      {/* Content overlay - visible by default, hidden on hover */}
      <div className="relative z-10 h-full flex flex-col p-4 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="font-bold text-text text-base leading-tight inline-flex items-baseline gap-1">
          <span>{title}</span>
          {isExternal && (
            <ArrowUpRight
              size={14}
              className="text-muted shrink-0 translate-y-[1px]"
              aria-hidden="true"
            />
          )}
        </h3>
        <p className="text-sm text-muted mt-1 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Tech tags - hidden by default, revealed on hover */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pt-8 bg-gradient-to-t from-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-bg/60 text-text/80 backdrop-blur-sm border border-border/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="block">
      {inner}
    </Link>
  );
}
