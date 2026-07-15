import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * "← Back to Portfolio" text link used at the top of every project detail page.
 */
export default function BackLink({ href = "/#projects" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-muted hover:text-accent mb-8 transition-colors font-medium"
    >
      <ArrowLeft size={20} />
      Back to Portfolio
    </Link>
  );
}