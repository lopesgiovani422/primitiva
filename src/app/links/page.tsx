'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import posthog from 'posthog-js';

export default function Links() {
    // PostHog: Track link clicks from Instagram bio
    const handleLinkClick = (linkName: string, linkType: 'internal' | 'external' | 'whatsapp' | 'email') => {
        if (linkType === 'whatsapp') {
            posthog.capture('whatsapp_clicked', { source: 'instagram_bio' });
        } else if (linkName === 'Iniciar Projeto') {
            posthog.capture('briefing_started', { source: 'instagram_bio' });
        } else {
            posthog.capture('linktree_clicked', {
                link_name: linkName,
                link_type: linkType,
                source: 'instagram_bio'
            });
        }
    };

    useEffect(() => {
        // PostHog: Track page view specifically for Instagram bio links
        posthog.capture('linktree_viewed', {
            source: 'instagram_bio'
        });

        const elements = document.querySelectorAll('.reveal-up');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 80);
        });
    }, []);

    return (
        <div className="text-white font-display antialiased selection:bg-white selection:text-black bg-black h-[100dvh] w-full overflow-hidden">

            {/* Efeito de Grão */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-20 mix-blend-overlay bg-grain"></div>

            <main className="relative z-10 w-full h-full max-w-md mx-auto flex flex-col px-4 py-6 md:py-8 gap-4">

                {/* Header - Minimal spacer */}
                <div className="shrink-0"></div>

                {/* Bento Grid - Fills available space */}
                <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-[2fr_1.1fr_0.4fr] gap-3">

                    {/* Portfólio (Destaque) - Row 1 (Biggest) */}
                    <Link href="/"
                        onClick={() => handleLinkClick('Ver Projetos', 'internal')}
                        className="bento-card col-span-2 row-span-1 bg-neutral-900 text-white p-6 md:p-8 flex flex-col justify-between h-full reveal-up group relative overflow-hidden delay-100 rounded-sm">
                        {/* Slideshow Background */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-0 animate-slideshow"
                                style={{ backgroundImage: "url('/assets/cover/pedecafe.webp')", animationDelay: '0s' }}></div>
                            <div className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-0 animate-slideshow"
                                style={{ backgroundImage: "url('/assets/cover/ninho.webp')", animationDelay: '4s' }}></div>
                            {/* Overlay para leitura */}
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500">
                            </div>
                        </div>

                        <div className="flex justify-between items-start relative z-10">
                            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Portfolio</span>
                            <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                        <div className="relative z-10 text-left">
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-2">Ver<br />Projetos</h2>
                        </div>
                    </Link>

                    {/* WhatsApp */}
                    <a href="https://wa.me/5532999508150" target="_blank"
                        onClick={() => handleLinkClick('WhatsApp', 'whatsapp')}
                        className="bento-card col-span-1 row-span-1 bg-neutral-900 border border-white/5 p-4 md:p-5 flex flex-col justify-between h-full reveal-up group delay-200 rounded-sm">
                        <div className="flex justify-between items-start">
                            <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">Manda um
                                oi</span>
                            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight">Whats<br />App</h3>
                        </div>
                    </a>

                    {/* Briefing */}
                    <Link href="/briefing"
                        onClick={() => handleLinkClick('Iniciar Projeto', 'internal')}
                        className="bento-card col-span-1 row-span-1 bg-neutral-900 border border-white/5 p-4 md:p-5 flex flex-col justify-between h-full reveal-up group delay-300 rounded-sm">
                        <div className="flex justify-between items-start">
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <span
                                    className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">Orçamentos</span>
                                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight">Iniciar<br />Projeto</h3>
                            </div>
                            <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Contato / Email */}
                    <a href="mailto:ola@primitiva.cc"
                        onClick={() => handleLinkClick('Email', 'email')}
                        className="bento-card col-span-2 row-span-1 bg-neutral-900 border border-white/5 p-4 md:p-6 flex items-center justify-between h-full reveal-up group delay-400 rounded-sm">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-tight">ola@primitiva.cc</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5 opacity-40" />
                        </div>
                    </a>

                </div>

                {/* Social Footer - Compact */}
                <footer className="shrink-0 pt-0 pb-2 text-center reveal-up delay-500">
                    <div className="flex flex-col items-center gap-4">
                        <Link href="/">
                            <img src="/assets/primitiva/primitiva_logo.svg" alt="Logo Primitiva"
                                className="h-5 w-auto opacity-40 hover:opacity-100 transition-opacity" fetchPriority="high"
                                width="100" height="20" />
                        </Link>
                        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Primitiva</p>
                    </div>
                </footer>

            </main>

            <style jsx>{`
                .bg-grain {
                    background-image: var(--background-image-grain);
                }
                .bento-card {
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                }
                @media (hover: hover) {
                    .bento-card:hover {
                        transform: translateY(-4px);
                        border-color: rgba(255, 255, 255, 0.3);
                    }
                }
                .bento-card:active {
                     transform: scale(0.98);
                }
                @keyframes slideshow {
                    0% { opacity: 0; transform: scale(1); }
                    5% { opacity: 1; }
                    45% { opacity: 1; }
                    50% { opacity: 0; transform: scale(1.05); }
                    100% { opacity: 0; }
                }
                .animate-slideshow {
                    animation: slideshow 8s infinite;
                }
                .delay-100 { transition-delay: 100ms; }
                .delay-200 { transition-delay: 200ms; }
                .delay-300 { transition-delay: 300ms; }
                .delay-400 { transition-delay: 400ms; }
                .delay-500 { transition-delay: 500ms; }
            `}</style>
        </div>
    );
}
