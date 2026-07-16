'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BackLink from '../../components/BackLink';
import SectionHeading from '../../components/SectionHeading';
import { TagList } from '../../components/Tag';

export default function ArsenalLedPage() {
    const screenshots = [
        { src: '/arsSS1.png', alt: 'Arsenal LED Control Interface 1' },
        { src: '/arsSS2.png', alt: 'Arsenal LED Control Interface 2' },
        { src: '/arsSS3.png', alt: 'Arsenal LED Control Interface 3' },
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
    };

    const previousImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    };

    return (
        <div className="min-h-screen bg-bg text-text">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <BackLink />

                <h1 className="text-[clamp(2rem,4vw+0.5rem,3rem)] font-bold tracking-tight mb-2">Garmin-Controlled Arsenal LED Sign</h1>
                <p className="nums font-mono text-sm text-muted mb-8">2024</p>

                {/* Hero Image */}
                <div className="relative h-96 w-full rounded-xl overflow-hidden mb-12 border border-border">
                    <Image
                        src="/arsenal.png"
                        alt="Arsenal LED Sign"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Project Description */}
                <section className="mb-12">
                    <SectionHeading>Project Description</SectionHeading>
                    <p className="text-muted text-lg leading-relaxed mb-8">
                        An integrated smart home system that allows the control of an Arsenal LED Sign with a Garmin Fenix 5 watch using virtual machines and Home Assistant.
                        This project bridges the gap between wearable technology and smart home automation, allowing for convenient control of decorative lighting directly from the wrist.
                    </p>
                    <h3 className="text-xl font-bold mb-3 text-text">Technologies Used</h3>
                    <TagList items={["Nabu Casa", "UTM Virtual Machine", "Home Assistant Webhooks"]} />
                    <h3 className="text-xl font-bold mt-8 mb-3 text-text">Key Features</h3>
                    <ul className="space-y-2 text-muted">
                        <li className="flex gap-3"><span className="text-accent">◆</span> Control LED sign power and brightness from Garmin Fenix 5</li>
                        <li className="flex gap-3"><span className="text-accent">◆</span> Integration with Home Assistant for automation rules</li>
                        <li className="flex gap-3"><span className="text-accent">◆</span> Secure communication via Webhooks</li>
                        <li className="flex gap-3"><span className="text-accent">◆</span> Virtual Machine hosting for reliability</li>
                    </ul>
                </section>

                {/* System Architecture Diagram */}
                <section className="mb-12">
                    <SectionHeading>System Architecture</SectionHeading>
                    <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-black border border-border">
                        <Image
                            src="/ArsenalDiagram.png"
                            alt="Arsenal LED System Architecture Diagram"
                            fill
                            className="object-contain"
                        />
                    </div>
                </section>

                {/* Screenshot Gallery */}
                <section className="mb-12">
                    <SectionHeading>Interface Screenshots</SectionHeading>
                    <div className="relative">
                        <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-black border border-border">
                            <Image
                                src={screenshots[currentImageIndex].src}
                                alt={screenshots[currentImageIndex].alt}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={previousImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-surface/80 hover:bg-surface p-2 rounded-full transition border border-border hover:text-accent"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface/80 hover:bg-surface p-2 rounded-full transition border border-border hover:text-accent"
                            aria-label="Next image"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-2 mt-4">
                            {screenshots.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`h-2 rounded-full transition-all ${
                                        index === currentImageIndex
                                            ? "bg-accent w-8"
                                            : "bg-border w-2"
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Video Demonstration */}
                <section>
                    <SectionHeading>Video Demonstration</SectionHeading>
                    <div className="relative w-full rounded-xl overflow-hidden bg-black border border-border">
                        <video
                            controls
                            className="w-full h-auto"
                            preload="metadata"
                        >
                            <source src="/IMG_2880.MOV" type="video/quicktime" />
                            <source src="/IMG_2880.MOV" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </section>
            </div>
        </div>
    );
}