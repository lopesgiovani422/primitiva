'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ProjectNavigation from '@/components/ProjectNavigation';
import ProjectFooter from '@/components/ProjectFooter';

export default function OqueFazerEmJF() {
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.immediate-reveal').forEach(el => {
            el.classList.add('active');
        });

        const elements = document.querySelectorAll('.scroll-trigger');
        elements.forEach(el => observer.observe(el));

        // Carousel Logic
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        let intervalId: NodeJS.Timeout | undefined;

        if (slides.length > 0) {
            intervalId = setInterval(() => {
                const prevSlide = slides[currentSlide];
                if (prevSlide) {
                    prevSlide.classList.remove('opacity-100');
                    prevSlide.classList.add('opacity-0');
                }

                currentSlide = (currentSlide + 1) % slides.length;

                const nextSlide = slides[currentSlide];
                if (nextSlide) {
                    nextSlide.classList.remove('opacity-0');
                    nextSlide.classList.add('opacity-100');
                }
            }, 1200);
        }

        return () => {
            observer.disconnect();
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="bg-background-dark text-white selection:bg-white selection:text-black">
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.07] mix-blend-overlay bg-noise"></div>

            <ProjectNavigation />

            <main className="relative flex flex-col w-full min-h-screen pt-16">

                <section
                    className="relative h-[85vh] w-full flex flex-col justify-end p-4 md:p-8 overflow-hidden md:border-b border-white/20 bg-black">
                    <div className="absolute inset-0 z-0">
                        <picture>
                            <source media="(min-width: 768px)" srcSet="/assets/cover/oqfjf_desktop.webp" />
                            <img src="/assets/cover/oqfjf.webp" alt=""
                                className="absolute inset-0 w-full h-full object-cover object-center contrast-125"
                                fetchPriority="high" loading="eager" decoding="async" width="800" height="1000" />
                        </picture>
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>

                    <div className="relative z-10 flex flex-col gap-2 pb-8">
                        <div className="flex items-center gap-3 mb-2 opacity-80 reveal-text immediate-reveal">
                            <span className="size-2 bg-white rounded-full animate-pulse"></span>
                            <span className="font-mono text-xs tracking-[0.2em] uppercase">Identidade Visual</span>
                        </div>
                        <h1
                            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tighter text-white break-words reveal-text immediate-reveal">
                            O QUE FAZER<br />EM JF?
                        </h1>
                    </div>
                </section>

                <section className="md:border-b border-white/20 relative z-10 bg-background-dark">
                    <div className="absolute top-0 left-0 h-px bg-white/40 line-grow scroll-trigger"></div>

                    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px]">
                        <div
                            className="md:col-span-4 p-6 md:border-r border-white/20 flex flex-col justify-between bg-neutral-900/30">
                            <span
                                className="font-mono text-sm text-neutral-400 uppercase tracking-widest sticky top-20 reveal-text scroll-trigger immediate-reveal">01
                                — O Desafio</span>
                            <div
                                className="hidden md:flex size-12 border border-white/20 rounded-full items-center justify-center mt-auto reveal-img scroll-trigger delay-200">
                                <span className="material-symbols-outlined text-sm">arrow_downward</span>
                            </div>
                        </div>
                        <div className="md:col-span-8 p-12 md:p-24 flex items-center">
                            <p
                                className="font-serif text-xl md:text-2xl leading-relaxed text-white md:max-w-2xl reveal-text scroll-trigger delay-100 immediate-reveal">
                                O desafio era criar um guia que
                                conectasse gerações através de um olhar contemporâneo. Uma marca que não apenas indica destinos,
                                mas provoca a descoberta do extraordinário no cotidiano da cidade.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="md:border-b border-white/20 bg-neutral-900 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        <div className="aspect-[3/4] md:aspect-square overflow-hidden relative">
                            <img src="/assets/oqfjf/asset1.webp" alt="O Que Fazer em JF Concept"
                                className="w-full h-full object-cover object-center reveal-img scroll-trigger" loading="lazy"
                                decoding="async" width="800" height="1067" />
                        </div>

                        <div className="p-8 md:p-16 flex flex-col justify-center border-l border-white/10">
                            <span
                                className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6 reveal-text scroll-trigger">02
                                — O Conceito</span>
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 reveal-text scroll-trigger delay-100">
                                A diversidade<br />Juiz-forana
                            </h2>
                            <p
                                className="font-serif text-neutral-400 leading-relaxed md:max-w-xl reveal-text scroll-trigger delay-200">
                                Unimos a pulsante curiosidade do "Explorador" à acessibilidade do "Cara Comum". O resultado é
                                uma
                                identidade visual democrática e vibrante, onde a diversidade de cores reflete a pluralidade da
                                cidade. É um convite aberto: para todos, em todos os lugares.
                            </p>
                            <div className="mt-8 pt-8 border-t border-white/10 flex gap-8 reveal-text scroll-trigger delay-300">
                                <div>
                                    <span className="block text-2xl font-bold font-display text-white">140k+</span>
                                    <span className="text-xs font-mono text-neutral-500 uppercase">Seguidores</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-bold font-display text-white">100+</span>
                                    <span className="text-xs font-mono text-neutral-500 uppercase">Parceiros</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="md:border-b border-white/20 bg-neutral-900">
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        <div className="p-8 md:p-16 flex flex-col justify-center md:border-r border-white/10 order-2 md:order-1">
                            <span
                                className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6 reveal-text scroll-trigger">03
                                - A criação</span>
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 reveal-text scroll-trigger delay-100">
                                Feito à mão,<br />com muito carinho
                            </h2>
                            <p
                                className="font-serif text-neutral-400 leading-relaxed md:max-w-xl reveal-text scroll-trigger delay-200">
                                A marca nasceu de um processo orgânico. Cada letra foi feita
                                traço por traço, para traduzir a energia e o ritmo da cidade. As curvas e a composição
                                viva transformam o logotipo em uma assinatura autêntica. É imperfeito, humano e cheio de
                                pulsação, como a própria essência de JF.
                            </p>
                        </div>

                        <div className="aspect-[3/4] md:aspect-square overflow-hidden relative order-1 md:order-2">
                            <img src="/assets/oqfjf/asset2.webp" alt="O Que Fazer em JF Detail"
                                className="w-full h-full object-cover object-center reveal-img scroll-trigger" loading="lazy"
                                decoding="async" width="800" height="800" />
                        </div>

                    </div>
                </section>

                <section className="md:border-b border-white/20 bg-neutral-900 flex flex-col overflow-hidden">
                    <div
                        className="relative w-full md:border-b border-white/20 group overflow-hidden bg-[#111] reveal-img scroll-trigger">
                        <img src="/assets/oqfjf/capitur.webp" alt="Capitur"
                            className="w-full aspect-[3/4] md:aspect-video object-cover object-center" loading="lazy"
                            decoding="async" width="1920" height="1080" />
                    </div>

                    <div className="bg-black py-24 md:py-32 border-b border-white/20">
                        <div className="container mx-auto px-6 text-center">
                            <span
                                className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block reveal-text scroll-trigger">
                                Nossa guia</span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 reveal-text scroll-trigger">
                                CAPITUR</h2>
                            <p
                                className="text-xl md:text-2xl font-serif text-white/80 leading-relaxed max-w-3xl mx-auto reveal-text scroll-trigger delay-100">
                                Símbolo de JF, a capivara ganha personalidade e vira nossa anfitriã. Com charme e um olhar
                                apurado, ela é a guia que revela os tesouros ocultos da cidade.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:border-b border-white/20">
                        <div className="aspect-[3/4] md:aspect-square overflow-hidden relative md:border-r border-white/20"
                            id="process-carousel">

                            <div className="carousel-slide absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 opacity-100"
                                style={{ backgroundImage: "url('/assets/oqfjf/bag1.webp')" }}>
                            </div>

                            <div className="carousel-slide absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 opacity-0"
                                style={{ backgroundImage: "url('/assets/oqfjf/bag2.webp')" }}>
                            </div>

                            <div className="carousel-slide absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 opacity-0"
                                style={{ backgroundImage: "url('/assets/oqfjf/bag4.webp')" }}>
                            </div>

                            <div className="carousel-slide absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 opacity-0"
                                style={{ backgroundImage: "url('/assets/oqfjf/bag3.webp')" }}>
                            </div>

                            <div className="carousel-slide absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 opacity-0"
                                style={{ backgroundImage: "url('/assets/oqfjf/bag5.webp')" }}>
                            </div>

                            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                        </div>

                        <div className="aspect-square bg-black p-8 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20"
                                style={{ backgroundImage: "radial-gradient(#333 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
                            </div>
                            <span className="font-mono text-xs text-neutral-500 uppercase z-10 reveal-text scroll-trigger">04 -
                                Experiência</span>
                            <div className="z-10">
                                <p
                                    className="font-serif text-xl md:text-2xl leading-relaxed text-off-white md:max-w-xl reveal-text scroll-trigger delay-100">
                                    A marca foi feita para habitar a rua. De ecobags a bottons, a identidade visual se
                                    materializa
                                    em objetos que transformam seguidores em embaixadores. É o design que sai da tela e ganha
                                    vida nas ruas de JF.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <ProjectFooter nextProject="/projetos/pedecafe" nextProjectName="PÉ DE CAFÉ" />

            </main>

            <style jsx global>{`
                .bg-noise {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
                }
            `}</style>
        </div>
    );
}
