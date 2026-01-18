'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';

export default function Sobre() {
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
            // Delay to ensure it runs after mount
            setTimeout(() => nav.classList.add('active'), 500);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <div className="bg-background-light font-display antialiased text-[#181010]">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">

                <header className="relative bg-black text-white min-h-[50vh] flex flex-col p-6 md:p-12 border-b border-white/10">
                    <nav className="flex items-center justify-between py-2 reveal-up">
                        <Link href="/">
                            <img src="/assets/primitiva/primitiva_logo.svg" alt="Logo Primitiva" className="h-6 w-auto"
                                fetchPriority="high" width="120" height="24" />
                        </Link>
                        <div className="flex gap-4">
                            <span
                                className="text-xs font-bold tracking-wider uppercase text-white underline underline-offset-4">Sobre</span>
                            <Link href="/contato"
                                className="text-xs font-bold tracking-wider uppercase cursor-pointer hover:opacity-60 transition-opacity">Contato</Link>
                        </div>
                    </nav>

                    <div className="flex-1 flex flex-col justify-end items-start mt-10">
                        <div className="relative overflow-hidden w-full">
                            <div className="flex items-center gap-3 mb-4 opacity-80 reveal-up delay-100">
                                <span className="size-2 bg-white rounded-full animate-pulse"></span>
                                <span className="font-mono text-xs tracking-[0.2em] uppercase">A Origem</span>
                            </div>
                            <h1
                                className="font-display font-black text-[10vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase text-white reveal-up delay-200">
                                Primitiva
                            </h1>
                        </div>
                    </div>
                </header>

                <div className="bg-background-light text-black">

                    <section
                        className="grid grid-cols-1 md:grid-cols-12 min-h-[60vh] border-b border-black/10">
                        <div
                            className="md:col-span-4 p-8 md:p-12 border-r border-black/10 flex flex-col justify-between">
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60 reveal-up">adjetivo<br />

                                1. que é o primeiro a existir; que coincide com a origem de algo; inicial, primevo,
                                original.</span>
                            <p className="text-lg md:text-xl leading-relaxed opacity-80">
                                <br />Acreditamos que marcas fortes não se sustentam apenas na estética, mas no alicerce: nas
                                crenças, ambições e histórias que são só suas.

                                <br />O nosso trabalho é traduzir essa essência em algo tangível. Voltamos à origem para descobrir
                                o
                                que faz a sua marca ser única.
                            </p>
                        </div>
                    </section>
                </div>

                <section
                    className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden border-b border-black/10 reveal-up">
                    <img src="/assets/primitiva/primitiva1.jpg" alt="Primitiva Studio"
                        className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-125 hover:scale-105 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white z-10">
                        <span className="font-mono text-xs uppercase tracking-widest block mb-2">Juiz de Fora — MG</span>
                        <span className="font-display font-bold text-3xl">EST. 2025</span>
                    </div>
                </section>

                <section className="border-t border-black/10 bg-white">
                    <div className="p-8 md:p-24 flex flex-col justify-center">
                        <span className="font-mono text-xs uppercase tracking-widest opacity-60 mb-6 reveal-up">Quem
                            somos</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 reveal-up delay-100">
                            Fundada em <br />Juiz de Fora
                        </h2>
                        <p className="text-lg opacity-80 leading-relaxed font-serif mb-8 reveal-up delay-200">
                            Por Giovani Lopes, designer e estrategista, e Gustavo Tempone,
                            desenvolvedor. Somos um coletivo criativo nascido da união dessas duas frentes. Acreditamos que uma
                            marca forte precisa de coerência do início ao fim. Por isso, atuamos de forma integrada para que a
                            estratégia desenhada no papel ganhe vida, função e força no mundo real.
                        </p>
                    </div>
                </section>

                <section className="py-20 px-6 md:py-32">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase mb-16 reveal-up">
                            Trabalhamos para que <br className="hidden md:block" />sua marca tenha:
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

                            <div className="reveal-up delay-100 group">
                                <span
                                    className="text-xs font-mono border border-black px-2 py-1 rounded-full uppercase">01</span>
                                <h3
                                    className="text-3xl font-display font-bold uppercase mt-6 mb-4 group-hover:translate-x-2 transition-transform">
                                    Estratégia</h3>
                                <p className="text-sm md:text-base opacity-70 leading-relaxed font-serif">
                                    Não desenhamos nada sem saber o porquê. Investigamos o mercado, o público e a alma do
                                    negócio para traçar rotas que funcionam no mundo real.
                                </p>
                            </div>

                            <div className="reveal-up delay-200 group">
                                <span
                                    className="text-xs font-mono border border-black px-2 py-1 rounded-full uppercase">02</span>
                                <h3
                                    className="text-3xl font-display font-bold uppercase mt-6 mb-4 group-hover:translate-x-2 transition-transform">
                                    Identidade</h3>
                                <p className="text-sm md:text-base opacity-70 leading-relaxed font-serif">
                                    Traduzimos estratégia em visual. Criamos sistemas de design proprietários, tipografias com
                                    personalidade e identidades que não pedem licença.
                                </p>
                            </div>

                            <div className="reveal-up delay-300 group">
                                <span
                                    className="text-xs font-mono border border-black px-2 py-1 rounded-full uppercase">03</span>
                                <h3
                                    className="text-3xl font-display font-bold uppercase mt-6 mb-4 group-hover:translate-x-2 transition-transform">
                                    Experiência</h3>
                                <p className="text-sm md:text-base opacity-70 leading-relaxed font-serif">
                                    Do digital ao físico. Desenvolvemos sites, embalagens e materiais gráficos que garantem que
                                    a marca respire a mesma verdade em todos os pontos de contato.
                                </p>
                            </div>

                        </div>

                        <div className="mt-16 reveal-up delay-300">
                            <Link href="/contato"
                                className="inline-flex items-center gap-2 border-b border-black pb-1 uppercase font-bold text-sm tracking-widest hover:opacity-60 transition-opacity">
                                Bora conversar? <span className="material-symbols-outlined text-lg">east</span>
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />

            </div>
        </div>
    );
}
