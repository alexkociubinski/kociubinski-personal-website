'use client';

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ArsenalLedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/?view=projects" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition">
                    <ArrowLeft size={20} />
                    Back to Portfolio
                </Link>

                <h1 className="text-4xl font-bold mb-6">Garmin Controlled Arsenal LED Sign</h1>

                <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-2xl">
                    <Image
                        src="/arsenal.png"
                        alt="Arsenal LED Sign"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">Project Description</h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        An integrated smart home system that allows the control of an Arsenal LED Sign with a Garmin Fenix 5 watch using virtual machines and Home Assistant.
                        This project bridges the gap between wearable technology and smart home automation, allowing for convenient control of decorative lighting directly from the wrist.
                    </p>

                    <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                    <div className="flex gap-2 flex-wrap mb-8">
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">Nabu Casa</span>
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">UTM Virtual Machine</span>
                        <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">Home Assistant Webhooks</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3">Key Features</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Control LED sign power and brightness from Garmin Fenix 5</li>
                        <li>Integration with Home Assistant for automation rules</li>
                        <li>Secure communication via Webhooks</li>
                        <li>Virtual Machine hosting for reliability</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
