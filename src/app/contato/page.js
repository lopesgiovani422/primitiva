'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';

export default function Contato() {
    const observerRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observerRef.current = observer;

        const animatedElements = document.querySelectorAll('.reveal-up, .fade-in');
        animatedElements.forEach(el => observer.observe(el));

        const nav = document.querySelector('nav');
        if (nav) {
            setTimeout(() => nav.classList.add('active'), 100);
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-[#181010] dark:text-[#f8f5f5]">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">

                <header className="relative bg-black text-white min-h-[40vh] flex flex-col p-6 md:p-12 border-b border-white/10">
                    <nav className="flex items-center justify-between py-2 reveal-up">
                        <Link href="/">
                            <img src="/assets/primitiva/primitiva_logo.svg" alt="Logo Primitiva" className="h-6 w-auto"
                                fetchPriority="high" width="120" height="24" />
                        </Link>
                        <div className="flex gap-4">
                            <Link href="/sobre"
                                className="text-xs font-bold tracking-wider uppercase cursor-pointer hover:opacity-60 transition-opacity">Sobre</Link>
                            <span
                                className="text-xs font-bold tracking-wider uppercase text-white underline underline-offset-4">Contato</span>
                        </div>
                    </nav>

                    <div className="flex-1 flex flex-col justify-end items-start mt-10">
                        <div className="relative overflow-hidden w-full">
                            <h1
                                className="font-display font-black text-[14vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase text-white mix-blend-difference reveal-up delay-100">
                                BORA<br />
                                CONVERSAR?
                            </h1>
                        </div>
                    </div>
                </header>

                <div className="bg-black text-white min-h-[60vh] border-b border-white/10">
                    <div className="p-6 md:p-12 md:pr-24">
                        <div className="flex flex-col md:grid md:grid-cols-12 md:gap-12">

                            <div className="md:col-span-8 flex flex-col reveal-up delay-200 mb-16 md:mb-0">
                                <p className="text-white/60 font-serif text-lg mb-12 max-w-md">
                                    Tem um projeto audacioso em mente? Escolha a melhor forma de iniciar nosso ritual.
                                </p>

                                <div className="flex flex-col border-t border-white/20">

                                    <a href="https://wa.me/5532999508150" target="_blank"
                                        className="group border-b border-white/20 py-8 md:py-12 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">01 / Pra
                                                quem gosta de conversar</span>
                                            <span
                                                className="text-3xl md:text-5xl font-display font-bold uppercase group-hover:text-white/80 transition-colors">WhatsApp</span>
                                        </div>
                                        <span
                                            className="material-symbols-outlined text-4xl md:text-5xl text-white/50 group-hover:text-white group-hover:-rotate-45 transition-all duration-500">arrow_outward</span>
                                    </a>

                                    <Link href="/briefing"
                                        className="group border-b border-white/20 py-8 md:py-12 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">02 /
                                                Briefing Detalhado</span>
                                            <span
                                                className="text-3xl md:text-5xl font-display font-bold uppercase group-hover:text-white/80 transition-colors">Formulário</span>
                                        </div>
                                        <span
                                            className="material-symbols-outlined text-4xl md:text-5xl text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all duration-500">east</span>
                                    </Link>

                                </div>
                            </div>

                            <div className="md:col-span-4 reveal-up delay-300">
                                <h2 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-8 sticky top-24">Outros
                                    Canais</h2>

                                <div className="flex flex-col gap-8">
                                    <div>
                                        <span className="block text-xs font-mono text-white/40 mb-1">Email</span>
                                        <a href="mailto:ola@primitiva.cc"
                                            className="text-xl md:text-2xl hover:text-white/70 transition-colors font-display">ola@primitiva.cc</a>
                                    </div>

                                    <div>
                                        <span className="block text-xs font-mono text-white/40 mb-1">Social</span>
                                        <div className="flex flex-col gap-1">
                                            <a href="https://www.instagram.com/primitiva.cc" target="_blank"
                                                className="text-xl md:text-2xl hover:text-white/70 transition-colors font-display">Instagram
                                                ↗</a>
                                            <a href="https://www.behance.net/primitiva.cc" target="_blank"
                                                className="text-xl md:text-2xl hover:text-white/70 transition-colors font-display">Behance
                                                ↗</a>
                                            <a href="https://www.linkedin.com/company/primitiva.cc" target="_blank"
                                                className="text-xl md:text-2xl hover:text-white/70 transition-colors font-display">LinkedIn
                                                ↗</a>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="block text-xs font-mono text-white/40 mb-1">Base</span>
                                        <p className="text-xl md:text-2xl font-serif text-white/80">
                                            Juiz de Fora,<br />Minas Gerais
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <footer className="relative bg-black text-white py-12 px-6 border-t border-white/10">
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 fade-in">
                        <div className="flex gap-6 text-xs font-mono uppercase text-gray-500">
                            <Link className="hover:text-white transition-colors" href="/">Home</Link>
                            <Link className="hover:text-white transition-colors" href="/#projects">Projetos</Link>
                        </div>
                        <span className="text-[10px] text-gray-600 font-mono mt-4 md:mt-0">© 2026 Primitiva.</span>
                    </div>
                </footer>

            </div>
        </div>
    );
}
