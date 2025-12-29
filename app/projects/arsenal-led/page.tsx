'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/?view=projects" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-8 transition font-medium">
                    <ArrowLeft size={20} />
                    Back to Portfolio
                </Link>

                <h1 className="text-4xl font-bold mb-6">Garmin Controlled Arsenal LED Sign</h1>

                {/* Hero Image */}
                <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-2xl">
                    <Image
                        src="/arsenal.png"
                        alt="Arsenal LED Sign"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Project Description */}
                <div className="bg-neutral-900 rounded-2xl p-8 shadow-xl mb-8 border border-neutral-800">
                    <h2 className="text-2xl font-bold mb-4">Project Description</h2>
                    <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                        An integrated smart home system that allows the control of an Arsenal LED Sign with a Garmin Fenix 5 watch using virtual machines and Home Assistant.
                        This project bridges the gap between wearable technology and smart home automation, allowing for convenient control of decorative lighting directly from the wrist.
                    </p>

                    <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                    <div className="flex gap-2 flex-wrap mb-8">
                        <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-500/20">Nabu Casa</span>
                        <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-500/20">UTM Virtual Machine</span>
                        <span className="bg-neutral-700/50 text-neutral-300 px-3 py-1 rounded-full text-sm border border-neutral-700">Home Assistant Webhooks</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3">Key Features</h3>
                    <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>Control LED sign power and brightness from Garmin Fenix 5</li>
                        <li>Integration with Home Assistant for automation rules</li>
                        <li>Secure communication via Webhooks</li>
                        <li>Virtual Machine hosting for reliability</li>
                    </ul>
                </div>

                {/* System Architecture Diagram */}
                <div className="bg-neutral-900 rounded-2xl p-8 shadow-xl mb-8 border border-neutral-800">
                    <h2 className="text-2xl font-bold mb-4">System Architecture</h2>
                    <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-black border border-neutral-800">
                        <Image
                            src="/ArsenalDiagram.png"
                            alt="Arsenal LED System Architecture Diagram"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Screenshot Gallery */}
                <div className="bg-neutral-900 rounded-2xl p-8 shadow-xl mb-8 border border-neutral-800">
                    <h2 className="text-2xl font-bold mb-4">Interface Screenshots</h2>
                    <div className="relative">
                        <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-black border border-neutral-800">
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
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-neutral-800/80 hover:bg-neutral-700 p-2 rounded-full transition border border-neutral-700"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-800/80 hover:bg-neutral-700 p-2 rounded-full transition border border-neutral-700"
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
                                    className={`w-2 h-2 rounded-full transition ${index === currentImageIndex ? 'bg-yellow-400 w-8' : 'bg-neutral-600'
                                        }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Video Demonstration */}
                <div className="bg-neutral-900 rounded-2xl p-8 shadow-xl border border-neutral-800">
                    <h2 className="text-2xl font-bold mb-4">Video Demonstration</h2>
                    <div className="relative w-full rounded-xl overflow-hidden bg-black border border-neutral-800">
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
                </div>
            </div>
        </div>
    );
}
