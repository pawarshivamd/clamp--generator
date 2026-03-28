import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Navigation } from '../components/layout/Navigation';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mono',
});

export const metadata: Metadata = {
    title: 'Fluid Typography & Clamp Generator | By Shivam Pawar',
    description: 'A modern, interactive tool to generate CSS clamp() functions, fluid typography scales, and spacing utilities. Perfect for responsive web design.',
    keywords: [
        'fluid typography',
        'CSS clamp generator',
        'responsive typography',
        'web design tool',
        'Tailwind CSS',
        'Next.js',
        'frontend development',
        'UI/UX design',
        'CSS utilities'
    ],
    authors: [{ name: 'Shivam Pawar' }],
    creator: 'Shivam Pawar',
    publisher: 'Shivam Pawar',
    robots: 'index, follow',
    alternates: {
        canonical: 'https://fluid-typography-clamp-generator.vercel.app/',
        languages: {
            en: 'https://fluid-typography-clamp-generator.vercel.app/',
        },
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/img/apple-touch-icon.png',
    },
    openGraph: {
        type: 'website',
        url: 'https://fluid-typography-clamp-generator.vercel.app/',
        title: 'Fluid Typography & Clamp Generator',
        description: 'Generate CSS clamp() functions, dynamic typography, and fluid spacing scales instantly.',
        siteName: 'Fluid Typography',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fluid Typography & Clamp Generator',
        description: 'Generate CSS clamp() functions, dynamic typography, and fluid spacing scales instantly.',
        creator: '@shivampawar7',
    },
    other: {
        'theme-color': '#0f172a',
        'msapplication-TileColor': '#0f172a',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Fluid Typography Generator',
        'application-name': 'Fluid Typography Generator',
        'copyright': 'Shivam Pawar',
        'language': 'English',
        'revisit-after': '7 days',
        'distribution': 'global',
        'rating': 'general',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: '#0f172a',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <body className="min-h-screen bg-[#0f172a] text-zinc-100 font-sans selection:bg-blue-500/30 flex flex-col" suppressHydrationWarning>

                {/* JSON-LD Structured Data via Next.js Script API */}
                <Script
                    id="ld-software"
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            name: "Fluid Typography & Clamp Generator",
                            applicationCategory: "DeveloperApplication",
                            operatingSystem: "Any",
                            author: {
                                "@type": "Person",
                                name: "Shivam Pawar",
                            },
                            description: "A developer tool to generate CSS clamp() functions, fluid typography scales, and responsive spacing utilities.",
                            offers: {
                                "@type": "Offer",
                                price: "0",
                                priceCurrency: "USD"
                            }
                        })
                    }}
                />

                <Script
                    id="ld-faq"
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: [
                                {
                                    "@type": "Question",
                                    name: "What is a CSS clamp generator?",
                                    acceptedAnswer: {
                                        "@type": "Answer",
                                        text: "A CSS clamp generator is a tool that calculates the optimal clamp() function values to create fluid typography and spacing that scales perfectly between minimum and maximum viewport widths."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    name: "How does fluid typography work?",
                                    acceptedAnswer: {
                                        "@type": "Answer",
                                        text: "Fluid typography adjusts the font size smoothly according to the screen width, eliminating the need for complex media queries at specific breakpoints."
                                    }
                                }
                            ]
                        })
                    }}
                />

                <Navigation />
                <main className="flex-1 w-full flex flex-col">
                    {children}
                </main>
                <footer className="w-full border-t border-zinc-800/50 py-8 mt-auto z-10 bg-[#0f172a]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-zinc-500 text-sm">
                            © {new Date().getFullYear()} Fluid Typography & Clamp Generator. By <a href="https://shivam-pawar-7.vercel.app/" className="text-zinc-400 hover:text-white hover:underline transition-all duration-200">Shivam Pawar</a>
                        </p>
                        <nav className="flex gap-6">
                            <a href="/about" className="text-sm font-medium text-zinc-400 hover:text-white hover:underline transition-all duration-200">
                                About & Clamp Logic
                            </a>
                        </nav>
                    </div>
                </footer>
            </body>
        </html>
    );
}
