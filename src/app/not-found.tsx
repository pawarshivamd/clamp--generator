"use client";

import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center selection:bg-blue-500/30">

            {/* Animated Icon Container */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl transform hover:rotate-6 transition-transform duration-300">
                    <FileQuestion className="w-16 h-16 md:w-20 md:h-20 text-blue-500" />
                </div>
            </div>

            {/* Typography */}
            <div className="space-y-2 mb-10">
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent opacity-20 absolute -z-10 left-1/2 -translate-x-1/2 top-1/4 select-none">
                    404
                </h1>

                <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">
                    Oops! Page Lost.
                </h2>

                <p className="text-zinc-400 max-w-sm mx-auto text-base md:text-lg leading-relaxed">
                    The page you are looking for doesn't exist or has been moved to a new universe.
                </p>
            </div>

            {/* Buttons Group */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/25 group"
                >
                    <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    Back to Home
                </Link>
            </div>

            {/* Footer Note */}
            <p className="mt-16 text-zinc-600 text-sm font-medium uppercase tracking-widest">
                Error Code: 404_NOT_FOUND
            </p>
        </div>
    );
}