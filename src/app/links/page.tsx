'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Links() {
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal-up');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 80);
        });
    }, []);

    return (
        <div className="text-white font-display antialiased selection:bg-white selection:text-black bg-black min-h-screen">

            {/* Efeito de Grão */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-20 mix-blend-overlay bg-grain"></div>

            <main className="relative z-10 min-h-[100svh] max-w-md mx-auto flex flex-col p-4">

                {/* Header Spacer */}
                <header className="pt-8 pb-4 reveal-up"></header>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 gap-3 mb-8">

                    {/* Portfólio (Destaque) */}
                    <Link href="/"
                        className="bento-card col-span-2 bg-neutral-900 text-white p-8 flex flex-col justify-between aspect-[16/9] reveal-up group relative overflow-hidden delay-100">
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
                            <span
                                className="material-symbols-outlined text-3xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_outward</span>
                        </div>
                        <div className="relative z-10 text-left">
                            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">Ver<br />Projetos</h2>
                        </div>
                    </Link>

                    {/* WhatsApp */}
                    <a href="https://wa.me/5532999508150" target="_blank"
                        className="bento-card col-span-1 bg-neutral-900 border border-white/5 p-5 flex flex-col justify-between aspect-square reveal-up group delay-200">
                        <div className="flex justify-between items-start">
                            <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">Manda um
                                oi</span>
                            <h3 className="text-xl font-bold uppercase tracking-tight">Whats<br />App</h3>
                        </div>
                    </a>

                    {/* Briefing */}
                    <Link href="/briefing"
                        className="bento-card col-span-1 bg-neutral-900 border border-white/5 p-5 flex flex-col justify-between aspect-square reveal-up group delay-300">
                        <div className="flex justify-between items-start">
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <span
                                    className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">Orçamentos</span>
                                <h3 className="text-xl font-bold uppercase tracking-tight">Iniciar<br />Projeto</h3>
                            </div>
                            <span
                                className="material-symbols-outlined text-3xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_outward</span>
                        </div>
                    </Link>

                    {/* Contato / Email */}
                    <a href="mailto:ola@primitiva.cc"
                        className="bento-card col-span-2 bg-neutral-900 border border-white/5 p-6 flex items-center justify-between reveal-up group delay-400">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-tight">ola@primitiva.cc</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl opacity-40">mail</span>
                        </div>
                    </a>

                </div>

                {/* Social Footer */}
                <footer className="mt-4 pt-4 pb-12 text-center reveal-up delay-500">
                    <div className="flex flex-col items-center gap-6">
                        <Link href="/">
                            <img src="/assets/primitiva/primitiva_logo.svg" alt="Logo Primitiva"
                                className="h-6 w-auto opacity-40 hover:opacity-100 transition-opacity" fetchPriority="high"
                                width="120" height="24" />
                        </Link>
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Primitiva</p>
                        <div className="h-px w-8 bg-white/20"></div>
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
