import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About CSS Clamp | Fluid Typography',
    description: 'Learn the math and pure logic behind the CSS clamp() function and how fluid typography is calculated.',
};

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 w-full flex-1">
            <header className="space-y-4 mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                    About Fluid Typography
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl">
                    Understanding the mathematics and pure logic behind the <code className="bg-zinc-800 text-blue-400 px-1.5 py-0.5 rounded text-sm relative -top-0.5">clamp()</code> function, and how it dramatically simplifies responsive web design.
                </p>
            </header>

            <div className="space-y-12 text-zinc-300 leading-relaxed text-lg">
                <section className="space-y-6 bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800/50">
                    <h2 className="text-2xl font-bold text-white mb-4">What is CSS <code>clamp()</code>?</h2>
                    <p>
                        The CSS <code>clamp()</code> function allows you to create values that fluidly scale up and down but are strictly bounded between a defined minimum and maximum size. It takes three comma-separated parameters:
                    </p>
                    
                    <div className="bg-[#0b1121] border border-blue-900/30 rounded-lg p-6 font-mono text-emerald-400 text-center shadow-inner mt-4">
                        clamp(MIN, PREFERRED, MAX)
                    </div>

                    <ul className="space-y-4 mt-6 list-none pl-0">
                        <li className="flex gap-4">
                            <span className="shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold font-mono text-xs border border-blue-500/20">1</span>
                            <div>
                                <strong className="text-white block mb-1">MIN (Minimum Value)</strong>
                                <span>The absolute smallest size your element can ever shrink to. This is generally the size perfectly suited for small mobile devices.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="shrink-0 w-8 h-8 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold font-mono text-xs border border-pink-500/20">2</span>
                            <div>
                                <strong className="text-white block mb-1">PREFERRED (The Fluid Math)</strong>
                                <span>The value that calculates the fluid scaling in-between. This is where linear interpolation mathematically connects the viewport width (vw) to the size.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="shrink-0 w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold font-mono text-xs border border-amber-500/20">3</span>
                            <div>
                                <strong className="text-white block mb-1">MAX (Maximum Value)</strong>
                                <span>The absolute ceiling point. The element will stop growing here, no matter how wide the browser window (desktop monitors) gets.</span>
                            </div>
                        </li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">The Pure Logic of the Calculation</h2>
                    <p>
                        To calculate the "PREFERRED" value, you are essentially drawing a straight line on a graph between two points: Point A (Min Viewport Width, Min Font Size) and Point B (Max Viewport Width, Max Font Size).
                    </p>

                    <div className="space-y-4">
                        <div className="bg-zinc-900 border-l-4 border-l-blue-500 rounded-r-lg p-5">
                            <h3 className="text-white font-semibold mb-2">1. Find the Slope (Rate of Change)</h3>
                            <p className="text-sm text-zinc-400 mb-2">How fast should the font grow per every 1 pixel of screen width?</p>
                            <code className="block bg-[#0b1121] px-4 py-3 rounded text-pink-400 font-mono text-sm border border-zinc-800">
                                Slope = (Max Size - Min Size) / (Max Viewport - Min Viewport)
                            </code>
                        </div>

                        <div className="bg-zinc-900 border-l-4 border-l-purple-500 rounded-r-lg p-5">
                            <h3 className="text-white font-semibold mb-2">2. Find the Intersection (y-intercept)</h3>
                            <p className="text-sm text-zinc-400 mb-2">What would the size theoretically be if the screen was 0 pixels wide?</p>
                            <code className="block bg-[#0b1121] px-4 py-3 rounded text-purple-400 font-mono text-sm border border-zinc-800">
                                Intersection = Min Size - (Min Viewport * Slope)
                            </code>
                        </div>

                        <div className="bg-zinc-900 border-l-4 border-l-emerald-500 rounded-r-lg p-5">
                            <h3 className="text-white font-semibold mb-2">3. The Final Preferred Value</h3>
                            <p className="text-sm text-zinc-400 mb-2">Translate this into CSS using REMs and VWs:</p>
                            <code className="block bg-[#0b1121] px-4 py-3 rounded text-emerald-400 font-mono text-sm border border-zinc-800">
                                [Intersection]rem + [Slope * 100]vw
                            </code>
                        </div>
                    </div>

                    <p className="pt-4">
                        This generator handles all of this math for you instantly. When it outputs a result like <code className="text-zinc-500 bg-zinc-800 px-1 py-0.5 rounded text-sm">clamp(1rem, 0.5rem + 2.5vw, 2rem)</code>, it is giving you the exact mathematically perfect line to scale smoothly from 1rem to 2rem across your provided breakpoints.
                    </p>
                </section>
            </div>
        </div>
    );
}
