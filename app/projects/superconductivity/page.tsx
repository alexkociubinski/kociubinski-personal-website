'use client';

import React from 'react';
import Image from "next/image";
import BackLink from '../../components/BackLink';
import SectionHeading from '../../components/SectionHeading';
import { TagList } from '../../components/Tag';

export default function SuperconductivityPage() {
    return (
        <div className="min-h-screen bg-bg text-text">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <BackLink />

                <h1 className="text-[clamp(2rem,4vw+0.5rem,3rem)] font-bold tracking-tight mb-2">Monte Carlo Superconductivity Research</h1>
                <p className="nums font-mono text-sm text-muted mb-8">2025</p>

                <div className="relative h-96 w-full rounded-xl overflow-hidden mb-12 border border-border">
                    <Image
                        src="/metropolisalg.png"
                        alt="Superconductivity Research"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <section className="mb-12">
                    <SectionHeading>Project Description</SectionHeading>
                    <p className="text-muted text-lg leading-relaxed">
                        Research into superconductivity using Monte Carlo simulations. This project explores the behavior of materials at different temperatures and the conditions required for superconductivity.
                    </p>
                </section>

                <section className="mb-12">
                    <SectionHeading>Technologies &amp; Methods</SectionHeading>
                    <TagList items={["Python", "Monte Carlo", "Data Analysis"]} />
                </section>

                <section>
                    <SectionHeading>Research Goals</SectionHeading>
                    <ul className="space-y-2 text-muted">
                        <li className="flex gap-3"><span className="text-accent">◆</span> Simulate particle interactions at different temperatures</li>
                        <li className="flex gap-3"><span className="text-accent">◆</span> Analyze phase transitions</li>
                        <li className="flex gap-3"><span className="text-accent">◆</span> Optimize simulation algorithms for performance</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}