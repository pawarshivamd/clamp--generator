"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Sparkles, Loader2, Info } from "lucide-react";
import { calculateClamp } from "../../lib/clampMath";
import { INITIAL_INPUTS } from "./ClampGenerator";

const DEFAULT_PRESETS = [
    { name: 'fs-14', min: 13, max: 14 },
    { name: 'fs-16', min: 14, max: 16 },
    { name: 'fs-20', min: 18, max: 20 },
    { name: 'fs-24', min: 20, max: 24 },
    { name: 'fs-32', min: 24, max: 32 },
    { name: 'fs-40', min: 30, max: 40 },
    { name: 'fs-48', min: 36, max: 48 },
    { name: 'fs-64', min: 40, max: 64 },
];

export const AITypographyDemo = () => {
    const [presets, setPresets] = useState(DEFAULT_PRESETS);
    const [reasoning, setReasoning] = useState<string | null>(null);

    const [rootFontSize, setRootFontSize] = useState<number>(INITIAL_INPUTS.rootFontSize);
    const [minViewport, setMinViewport] = useState<number>(INITIAL_INPUTS.minViewport);
    const [maxViewport, setMaxViewport] = useState<number>(INITIAL_INPUTS.maxViewport);

    const [copiedAll, setCopiedAll] = useState(false);

    // AI State
    const [prompt, setPrompt] = useState("A sleek, aggressive portfolio for a modern street photographer.");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const typographyCss = useMemo(() => {
        let cssString = `/* AI Generated Fluid Typography */\n/* Root font-size: ${rootFontSize}px, Viewport: ${minViewport}px - ${maxViewport}px */\n\n`;

        presets.forEach(preset => {
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

        cssString += `/* Fluid Spacing */\n`;
        cssString += `.p-fluid {\n  padding: clamp(1rem, 0.5rem + 2vw, 2rem);\n}\n\n`;
        cssString += `.m-fluid {\n  margin: clamp(1rem, 0.5rem + 2vw, 2rem);\n}\n`;

        return cssString;
    }, [rootFontSize, minViewport, maxViewport, presets]);

    const handleCopyAll = async () => {
        await navigator.clipboard.writeText(typographyCss);
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    };

    const generateAIScale = async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/generate-scale', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate AI scale");
            }

            if (data.presets && Array.isArray(data.presets)) {
                setPresets(data.presets);
                if (data.reasoning) {
                    setReasoning(data.reasoning);
                }
            } else {
                throw new Error("AI returned invalid data format");
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-24 mb-24 px-6 sm:px-12 text-zinc-100 font-sans">
            <div className="text-center mb-12 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    Powered by Gemini AI
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">AI Typography Architect</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Describe your project layout, context, or vibe. Our AI will instantly derive a mathematically optimized fluid typography scale tuned perfectly to your design.
                </p>
            </div>

            {/* AI Generator Input */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-50 pointer-events-none" />

                <label className="block text-sm font-semibold text-zinc-300 mb-3 ml-1">
                    Describe your project aesthetic
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. A dense crypto exchange dashboard with heavy data tables..."
                        className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 text-zinc-100 placeholder-zinc-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
                        onKeyDown={(e) => e.key === 'Enter' && generateAIScale()}
                    />
                    <button
                        onClick={generateAIScale}
                        disabled={isLoading}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 w-full sm:w-auto"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Generate
                            </>
                        )}
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                        {error.includes("GEMINI_API_KEY") && (
                            <div className="mt-2 text-red-300/80">
                                <strong>Setup required:</strong> Add your free Gemini key to `.env` exactly like this:<br />
                                <code className="block mt-1 p-2 bg-red-950/30 rounded select-all font-mono">GEMINI_API_KEY=your_copied_key_here</code>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* AI Reasoning Display */}
            {reasoning && (
                <div className="mb-12 bg-blue-900/10 border border-blue-500/20 p-6 rounded-2xl flex gap-4 text-blue-200">
                    <Info className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-blue-300 mb-1">AI Reasoning</h4>
                        <p className="leading-relaxed opacity-90">{reasoning}</p>
                    </div>
                </div>
            )}

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8 mb-12 shadow-2xl relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4 text-blue-400">
                            <Loader2 className="w-10 h-10 animate-spin" />
                            <p className="font-medium animate-pulse">Calculating optimal scales...</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-0">
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
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        Generated CSS Matrix
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 ml-2">
                            {presets.length} steps
                        </span>
                    </h3>
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

            {/* Visual breakdown of current presets */}
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold mb-4">Current Interpolation Ranges (Mobile → Desktop)</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 font-mono text-sm">
                    {presets.map((preset, i) => (
                        <div key={i} className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/80 flex justify-between items-center">
                            <span className="text-blue-400 font-bold">{preset.name}</span>
                            <span className="text-zinc-400 text-xs text-right">
                                {preset.min}px → {preset.max}px
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
