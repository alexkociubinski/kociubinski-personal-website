'use client';

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SuperconductivityPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/?view=projects" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-8 transition font-medium">
                    <ArrowLeft size={20} />
                    Back to Portfolio
                </Link>

                <h1 className="text-4xl font-bold mb-6">Monte Carlo Superconductivity Undergraduate Research</h1>

                <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-2xl">
                    <Image
                        src="/metropolisalg.png"
                        alt="Superconductivity Research"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="bg-neutral-900 rounded-2xl p-8 shadow-xl border border-neutral-800">
                    <h2 className="text-2xl font-bold mb-4">Project Description</h2>
                    <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                        Research into superconductivity using Monte Carlo simulations. This project explores the behavior of materials at different temperatures and the conditions required for superconductivity.
                    </p>

                    <h3 className="text-xl font-bold mb-3">Technologies & Methods</h3>
                    <div className="flex gap-2 flex-wrap mb-8">
                        <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-500/20">Python</span>
                        <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-500/20">Monte Carlo Simulation</span>
                        <span className="bg-neutral-700/50 text-neutral-300 px-3 py-1 rounded-full text-sm border border-neutral-700">Data Analysis</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3">Research Goals</h3>
                    <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>Simulate particle interactions at different temperatures</li>
                        <li>Analyze phase transitions</li>
                        <li>Optimize simulation algorithms for performance</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
