'use client';

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SuperconductivityPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/?view=projects" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition">
                    <ArrowLeft size={20} />
                    Back to Portfolio
                </Link>

                <h1 className="text-4xl font-bold mb-6">Monte Carlo Superconductivity Undergraduate Research</h1>

                <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-2xl">
                    <Image
                        src="/arsenal.png"
                        alt="Superconductivity Research"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">Project Description</h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        Research into superconductivity using Monte Carlo simulations. This project explores the behavior of materials at different temperatures and the conditions required for superconductivity.
                    </p>

                    <h3 className="text-xl font-bold mb-3">Technologies & Methods</h3>
                    <div className="flex gap-2 flex-wrap mb-8">
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">Python</span>
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">Monte Carlo Simulation</span>
                        <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">Data Analysis</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3">Research Goals</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Simulate particle interactions at near-zero temperatures</li>
                        <li>Analyze phase transitions</li>
                        <li>Optimize simulation algorithms for performance</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
