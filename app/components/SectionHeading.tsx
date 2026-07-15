import React from "react";

/**
 * Section heading with a top divider — mirrors the horizontal-rule section
 * anchors used on johnathanmo.com. `id` enables navbar anchor scrolling.
 */
export default function SectionHeading({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="border-t border-border pt-10 mb-8 scroll-mt-20">
      <h2 className="text-2xl font-bold text-text">{children}</h2>
    </div>
  );
}