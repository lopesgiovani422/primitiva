'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';

export default function StartHub() {
    return (
        <main className="min-h-screen md:h-screen md:h-[100svh] bg-[#0A0A0A] text-white selection:bg-white selection:text-black font-display overflow-y-auto md:overflow-hidden flex flex-col relative">
            {/* Ambient Background Details */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

            {/* Header */}
            <header className="w-full px-8 md:px-16 pt-8 md:pt-20 pb-4 md:pb-8 flex justify-between items-center relative z-50 shrink-0">
                <div className="mix-blend-difference pointer-events-none">
                    <img src="/assets/primitiva/primitiva_logo.svg" alt="Primitiva" className="h-4 md:h-5 w-auto opacity-40 shrink-0" />
                </div>

                <Link href="/" className="text-white/30 hover:text-white transition-all duration-500 text-[10px] font-mono uppercase tracking-[0.3em] flex items-center gap-3 group">
                    <span className="hidden md:inline group-hover:pr-2 transition-all">Encerrar Sessão</span>
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500 border border-white/10 rounded-full p-1" />
                </Link>
            </header>

            {/* Content Wrapper */}
            <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-8 md:px-16 py-12 md:py-0 overflow-y-auto md:overflow-hidden">

                <section className="mb-8 md:mb-16 max-w-4xl shrink-0">
                    <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-white/16 mb-4 block animate-fade-in">Briefings</span>
                    <p className="text-lg md:text-1xl text-white/50 font-light leading-relaxed animate-reveal-up delay-100">
                        Selecione o ritual de descoberta adequado para o seu momento atual.
                    </p>
                </section>

                {/* Modules Grid */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-12 w-full">

                    {/* 1. BRAND MODULE */}
                    <Link
                        href="/start/marca"
                        className="group relative flex flex-col p-8 md:p-16 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700 overflow-hidden min-h-0 flex-1"
                    >
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6 md:mb-12">
                                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 group-hover:text-white/50 transition-colors">01 / Marca</span>
                                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                            </div>

                            <h2 className="text-4xl md:text-7xl font-normal font-serif italic mb-4 md:mb-6 tracking-tight group-hover:translate-x-4 transition-transform duration-700">Deep Brand</h2>

                            <p className="text-xs md:text-sm text-white/30 group-hover:text-white/60 transition-colors duration-500 font-light leading-relaxed max-w-xs mt-auto">
                                Arquétipos, DNA, voz e universo visual. <br />
                                Para quem busca alma e consistência.
                            </p>
                        </div>

                        {/* Decorative background number */}
                        <span className="absolute -bottom-10 -right-6 text-[120px] md:text-[180px] font-bold text-white/[0.02] leading-none pointer-events-none italic select-none">1</span>
                    </Link>

                    {/* 2. SITE MODULE */}
                    <Link
                        href="/start/site"
                        className="group relative flex flex-col p-8 md:p-16 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700 overflow-hidden min-h-0 flex-1"
                    >
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6 md:mb-12">
                                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 group-hover:text-white/50 transition-colors">02 / Web</span>
                                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                            </div>

                            <h2 className="text-4xl md:text-7xl font-normal font-serif italic mb-4 md:mb-6 tracking-tight group-hover:translate-x-4 transition-transform duration-700">Site & Tech</h2>

                            <p className="text-xs md:text-sm text-white/30 group-hover:text-white/60 transition-colors duration-500 font-light leading-relaxed max-w-xs mt-auto">
                                Performance imersiva e UX estratégica. <br />
                                Para quem busca impacto e conversão.
                            </p>
                        </div>

                        {/* Decorative background number */}
                        <span className="absolute -bottom-10 -right-8 text-[120px] md:text-[180px] font-bold text-white/[0.02] leading-none pointer-events-none italic select-none">2</span>
                    </Link>

                </div>
            </div>

            {/* Minimal Footer */}
            <footer className="p-6 md:p-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 shrink-0">
                <div className="flex flex-col gap-2 order-2 md:order-1 items-center md:items-start text-center md:text-left">
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">© 2026 Primitiva</span>
                    <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest hidden md:block">Branding para Ousados</span>
                </div>

                <div className="flex items-center gap-8 order-1 md:order-2">
                    <a href="https://instagram.com/primitiva.cc" target="_blank" className="text-[10px] font-mono text-white/30 hover:text-white transition-colors uppercase tracking-[0.2em]">Instagram</a>
                    <a href="mailto:ola@primitiva.cc" className="text-[10px] font-mono text-white/30 hover:text-white transition-colors uppercase tracking-[0.2em]">E-mail</a>
                    <a href="https://wa.me/5532999508150" target="_blank" className="text-[10px] font-mono text-white/30 hover:text-white transition-colors uppercase tracking-[0.2em]">WhatsApp</a>
                </div>
            </footer>

            <style jsx>{`
            `}</style>
        </main>
    );
}
