"use client";

import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";
import { calculateClamp } from "../../lib/clampMath";
import { INITIAL_INPUTS } from "./ClampGenerator";

const TYPOGRAPHY_PRESETS = [
    // 1px gap (12 to 15)
    { name: 'fs-12', min: 11, max: 12 },
    { name: 'fs-14', min: 13, max: 14 },
    { name: 'fs-15', min: 14, max: 15 },
    // 2px gap (16 to 22)
    { name: 'fs-16', min: 14, max: 16 },
    { name: 'fs-18', min: 16, max: 18 },
    { name: 'fs-20', min: 18, max: 20 },
    { name: 'fs-22', min: 20, max: 22 },
    // 4px gap (24 to 30)
    { name: 'fs-24', min: 20, max: 24 },
    { name: 'fs-26', min: 22, max: 26 },
    { name: 'fs-28', min: 24, max: 28 },
    { name: 'fs-30', min: 26, max: 30 },
    // 8px gap (32 to 36)
    { name: 'fs-32', min: 24, max: 32 },
    { name: 'fs-34', min: 26, max: 34 },
    { name: 'fs-36', min: 28, max: 36 },
    { name: 'fs-38', min: 30, max: 38 },
    { name: 'fs-40', min: 32, max: 40 },
    // 12px gap (42 to 46)
    { name: 'fs-42', min: 30, max: 42 },
    { name: 'fs-44', min: 32, max: 44 },
    { name: 'fs-46', min: 34, max: 46 },
    // 16px gap (50+)
    { name: 'fs-52', min: 36, max: 52 },
    { name: 'fs-56', min: 40, max: 56 },
    { name: 'fs-60', min: 44, max: 60 },
    //24px gap (64)
    { name: 'fs-64', min: 40, max: 64 },
    //32px gap (72)
    { name: 'fs-72', min: 40, max: 72 },
    //40px gap (80)
    { name: 'fs-80', min: 40, max: 80 },
    //48px gap (88)
    { name: 'fs-88', min: 40, max: 88 },
    //56px gap (96)
    { name: 'fs-96', min: 40, max: 96 },
];

export const TypographyDemo = () => {
    const [rootFontSize, setRootFontSize] = useState<number>(INITIAL_INPUTS.rootFontSize);
    const [minViewport, setMinViewport] = useState<number>(INITIAL_INPUTS.minViewport);
    const [maxViewport, setMaxViewport] = useState<number>(INITIAL_INPUTS.maxViewport);
    const [copiedAll, setCopiedAll] = useState(false);

    const typographyCss = useMemo(() => {
        let cssString = `/* Fluid Typography utility classes */\n/* Root font-size: ${rootFontSize}px, Viewport: ${minViewport}px - ${maxViewport}px */\n\n`;

        TYPOGRAPHY_PRESETS.forEach(preset => {
            const result = calculateClamp({
                minViewport, maxViewport,
                minFontSize: preset.min,
                maxFontSize: preset.max,
                rootFontSize,
                units: { minViewport: 'px', maxViewport: 'px', minFontSize: 'px', maxFontSize: 'px' }
            });

            if (result.isValid) {
                cssString += `.${preset.name} {\n  font-size: ${result.clampString};\n}\n\n`;
            }
        });

        cssString += `/* Fluid Spacing utility classes (Padding/Margin example) */\n`;
        cssString += `.p-fluid {\n  padding: clamp(1rem, 0.5rem + 2vw, 2rem);\n}\n\n`;
        cssString += `.m-fluid {\n  margin: clamp(1rem, 0.5rem + 2vw, 2rem);\n}\n`;

        return cssString;
    }, [rootFontSize, minViewport, maxViewport]);

    const handleCopyAll = async () => {
        await navigator.clipboard.writeText(typographyCss);
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-24 mb-24 px-6 sm:px-12 text-zinc-100 font-sans">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Typography & Spacing Demo</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    Pre-generated fluid classes for typography and spacing. Adjust the root font-size or
                    viewport below and copy the CSS to save time, eliminating most media queries.
                </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8 mb-12 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Root Font Size (px)</label>
                        <input
                            type="number"
                            value={rootFontSize}
                            onChange={(e) => setRootFontSize(Number(e.target.value) || 16)}
                            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Min Viewport (px)</label>
                        <input
                            type="number"
                            value={minViewport}
                            onChange={(e) => setMinViewport(Number(e.target.value) || 320)}
                            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Max Viewport (px)</label>
                        <input
                            type="number"
                            value={maxViewport}
                            onChange={(e) => setMaxViewport(Number(e.target.value) || 1280)}
                            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                    <h3 className="text-xl font-semibold">Generated CSS</h3>
                    <button
                        onClick={handleCopyAll}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                    >
                        {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedAll ? "Copied All!" : "Copy Full CSS"}
                    </button>
                </div>

                <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-4 max-h-96 overflow-y-auto font-mono text-sm text-zinc-300">
                    <pre>{typographyCss}</pre>
                </div>
            </div>

            <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Scaling Logic (Desktop vs Mobile Gap)</h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                    Good fluid typography relies on scaling the difference between mobile and desktop font sizes.
                    Smaller text requires less variation, while larger headings need dramatic scaling. The generated classes above follow this industry-standard logic:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-mono text-sm">
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                        <span className="text-zinc-200 font-bold">12px - 15px</span>
                        <div className="text-zinc-500 mt-1">1px Gap</div>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                        <span className="text-zinc-200 font-bold">16px - 22px</span>
                        <div className="text-zinc-500 mt-1">2px Gap</div>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                        <span className="text-zinc-200 font-bold">24px - 30px</span>
                        <div className="text-zinc-500 mt-1">4px Gap</div>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                        <span className="text-zinc-200 font-bold">32px - 40px</span>
                        <div className="text-zinc-500 mt-1">8px Gap</div>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                        <span className="text-zinc-200 font-bold">42px - 46px</span>
                        <div className="text-zinc-500 mt-1">12px Gap</div>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                        <span className="text-zinc-200 font-bold">52px - 60px</span>
                        <div className="text-zinc-500 mt-1">16px Gap</div>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                        <span className="text-zinc-200 font-bold">64px</span>
                        <div className="text-zinc-500 mt-1">24px Gap</div>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                        <span className="text-zinc-200 font-bold">72px</span>
                        <div className="text-zinc-500 mt-1">32px Gap</div>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                        <span className="text-zinc-200 font-bold">80px</span>
                        <div className="text-zinc-500 mt-1">40px Gap</div>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                        <span className="text-zinc-200 font-bold">88px</span>
                        <div className="text-zinc-500 mt-1">48px Gap</div>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/80">
                        <span className="text-zinc-200 font-bold">96px</span>
                        <div className="text-zinc-500 mt-1">56px Gap</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
