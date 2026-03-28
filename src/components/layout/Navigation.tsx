"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Type } from "lucide-react";

export const Navigation = () => {
    const pathname = usePathname();

    return (
        <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 w-full">
            <div className="max-w-4xl mx-auto sm:px-6 px-2 h-14 flex items-center md:gap-6 gap-2">
                <Link
                    href="/"
                    className={`flex items-center gap-2 text-xs sm:text-sm text-nowrap font-medium transition-colors border-b-2 px-2 h-full py-4 ${pathname === "/"
                        ? "text-blue-400 border-blue-500"
                        : "text-zinc-400 border-transparent hover:text-zinc-200 hover:border-zinc-700"
                        }`}
                >
                    <Layers className="w-3 h-3 sm:w-4 sm:h-4" />
                    Clamp Generator
                </Link>

                <Link
                    href="/typography-demo"
                    className={`flex items-center gap-2 text-xs sm:text-sm text-nowrap font-medium transition-colors border-b-2 px-2 h-full py-4 ${pathname === "/typography-demo"
                        ? "text-blue-400 border-blue-500"
                        : "text-zinc-400 border-transparent hover:text-zinc-200 hover:border-zinc-700"
                        }`}
                >
                    <Type className="w-3 h-3 sm:w-4 sm:h-4" />
                    Typography Demo
                </Link>
            </div>
        </nav>
    );
};
