'use client';

import { useEffect, useState } from 'react';
import ProjectNavigation from '@/components/ProjectNavigation';
import ProjectFooter from '@/components/ProjectFooter';

export default function PedeCafe() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        import('@dotlottie/player-component').then(() => {
            const players = document.querySelectorAll('dotlottie-player');
            players.forEach((player: any) => {
                // Force properties to ensure they are active
                player.loop = true;
                player.autoplay = true;

                player.addEventListener('ready', () => {
                    player.play();
                });

                // Fail-safe: try to play if it's already instantiated
                if (player.play) {
                    try {
                        player.play();
                    } catch (e) {
                        // Player might not be ready yet, the listener above will catch it
                    }
                }
            });
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);

                    // If the target contains lottie players, try to play ALL of them
                    const players = entry.target.querySelectorAll('dotlottie-player');
                    players.forEach((player: any) => {
                        if (player.play) {
                            player.play();
                        }
                    });
                }
            });
        }, observerOptions);

        const finishLoading = () => {
            setIsLoaded(true);

            document.querySelectorAll('.immediate-reveal').forEach(el => {
                el.classList.add('active');
            });

            const elements = document.querySelectorAll('.scroll-trigger');
            elements.forEach(el => observer.observe(el));
        };

        // Attempt to finish loading when critical image (hero) is loaded
        const heroImg = document.querySelector('img[fetchpriority="high"]') as HTMLImageElement | null;
        if (heroImg && heroImg.complete) {
            finishLoading();
        } else if (heroImg) {
            heroImg.onload = finishLoading;
            heroImg.onerror = finishLoading;
        } else {
            finishLoading();
        }

        // Fallback
        const timeout = setTimeout(finishLoading, 2000);

        return () => {
            observer.disconnect();
            clearTimeout(timeout);
        };
    }, []);

    return (
        <>
            {!isLoaded && (
                <div id="preloader" className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center transition-opacity duration-800">
                    <div className="flex flex-col items-center gap-4">
                        <span className="font-mono text-xs uppercase tracking-[0.3em] animate-pulse text-white">Carregando</span>
                        <div className="w-32 h-[1px] bg-white/20 overflow-hidden relative">
                            <div className="absolute inset-y-0 left-0 bg-white w-full animate-[shimmer_1s_infinite_translateX(-100%)]">
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`bg-background-dark text-white overflow-x-hidden selection:bg-white selection:text-black ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                <div className="hidden md:block fixed inset-0 z-50 pointer-events-none opacity-[0.07] mix-blend-overlay bg-[image:var(--background-image-grain)]"></div>

                <ProjectNavigation />

                <main className="relative flex flex-col w-full min-h-screen pt-16">

                    <section className="relative h-[85vh] w-full flex flex-col justify-end p-4 md:p-8 overflow-hidden md:border-b border-white/20 bg-black">
                        <div className="absolute inset-0 z-0">
                            <picture>
                                <source media="(min-width: 768px)" srcSet="/assets/pedecafe/image/header_desktop.webp" />
                                <img src="/assets/pedecafe/image/header_mobile.webp" alt="Pé de Café Header"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    fetchPriority="high"
                                    width="800" height="1067" />
                            </picture>
                            <div className="absolute inset-0 bg-black/60"></div>
                        </div>

                        <div className="relative z-10 flex flex-col gap-2 pb-8">
                            <div className="flex items-center gap-3 mb-2 opacity-80 reveal-text immediate-reveal">
                                <span className="size-2 bg-white rounded-full animate-pulse"></span>
                                <span className="font-mono text-xs tracking-[0.2em] uppercase">Branding & Web</span>
                            </div>
                            <h1 className="text-7xl md:text-9xl font-display font-bold leading-[0.85] tracking-tighter text-white break-words reveal-text immediate-reveal">
                                PÉ DE<br />CAFÉ
                            </h1>
                        </div>
                    </section>

                    <section className="md:border-b border-white/20 relative z-10 bg-background-dark">
                        <div className="absolute top-0 left-0 h-px bg-white/40 line-grow scroll-trigger"></div>

                        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px]">
                            <div className="md:col-span-4 p-6 md:border-r border-white/20 flex flex-col justify-between bg-neutral-900/30">
                                <span className="font-mono text-sm text-neutral-400 uppercase tracking-widest sticky top-20 reveal-text scroll-trigger immediate-reveal">
                                    01 — O Desafio
                                </span>
                                <div className="hidden md:flex size-12 border border-white/20 rounded-full items-center justify-center mt-auto reveal-img scroll-trigger delay-200">
                                    <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                </div>
                            </div>
                            <div className="md:col-span-8 p-12 md:p-24 flex items-center">
                                <p className="font-serif text-xl md:text-2xl leading-relaxed text-white reveal-text scroll-trigger delay-100 immediate-reveal">
                                    Como transformar um concurso técnico em uma paixão popular? O desafio era quebrar a formalidade
                                    e trazer a essência do "cafezim" mineiro para o centro da marca. Criar uma identidade que fosse
                                    autoridade no assunto, mas com o sotaque e o acolhimento de quem recebe visita na cozinha de
                                    casa.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="md:border-b border-white/20 bg-neutral-900 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="aspect-[3/4] md:aspect-square overflow-hidden relative">
                                <img src="/assets/pedecafe/image/asset1.webp" alt="Pé de Café Concept"
                                    className="w-full h-full object-cover object-center reveal-img scroll-trigger" loading="lazy"
                                    width="800" height="1067" />
                            </div>
                            <div className="p-8 md:p-16 flex flex-col justify-center border-l border-white/10">
                                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6 reveal-text scroll-trigger">
                                    02 — O Conceito
                                </span>
                                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 reveal-text scroll-trigger delay-100">
                                    A nossa <br />mineiridade <br />acolhedora
                                </h2>
                                <p className="font-serif text-neutral-400 leading-relaxed reveal-text scroll-trigger delay-200">
                                    Unimos o estilo nostálgico dos cartoons "Rubber Hose" dos anos 30 com a irreverência mineira. A
                                    identidade visual personifica o café, criando mascotes que conversam com o público. É uma
                                    estética "Retro-Pop" que gera conexão emocional, celebrando a cultura do café sem
                                    gourmetização.
                                </p>
                                <div className="mt-8 pt-8 border-t border-white/10 flex gap-8 reveal-text scroll-trigger delay-300">
                                    <div>
                                        <span className="block text-2xl font-bold font-display">27</span>
                                        <span className="text-xs font-mono text-neutral-500 uppercase">Cafeterias</span>
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold font-display">+24k</span>
                                        <span className="text-xs font-mono text-neutral-500 uppercase">Votos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="md:border-b border-white/20 bg-black relative overflow-hidden py-24 md:py-32">
                        <div className="absolute top-0 left-0 w-full h-px bg-white/20"></div>
                        <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>

                        <div className="container mx-auto px-6 text-center">
                            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block reveal-text scroll-trigger">
                                Identidade Verbal
                            </span>
                            <p className="text-4xl md:text-6xl font-serif italic text-white/80 leading-tight max-w-4xl mx-auto reveal-text scroll-trigger delay-100">
                                "Um cafezim, um bolim e dois dedos de prosa. O resto a gente vê depois"
                            </p>
                            <div className="mt-12 flex justify-center gap-4 reveal-img scroll-trigger delay-200">
                                <span className="size-3 bg-white rounded-full"></span>
                                <span className="size-3 bg-white/50 rounded-full"></span>
                                <span className="size-3 bg-white/20 rounded-full"></span>
                            </div>
                        </div>
                    </section>

                    <section className="md:border-b border-white/20 bg-neutral-900 flex flex-col overflow-hidden">
                        <div className="relative w-full md:border-b border-white/20 group overflow-hidden">
                            <img src="/assets/pedecafe/image/header_desktop.webp" alt="Pé de Café Full View"
                                className="w-full aspect-[3/4] md:aspect-video object-cover object-center reveal-img scroll-trigger"
                                loading="lazy" width="1920" height="1080" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 md:border-b border-white/20">
                            <div className="aspect-square bg-black p-8 flex flex-col justify-between md:border-b-0 md:border-r border-white/20 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20"
                                    style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                                </div>
                                <span className="font-mono text-xs text-neutral-500 uppercase z-10 reveal-text scroll-trigger">
                                    Collab Pé de Café + Chico Rei
                                </span>
                                <div className="z-10">
                                    <p className="font-serif text-xl md:text-2xl leading-relaxed text-off-white reveal-text scroll-trigger delay-100">
                                        A identidade ganhou vida através de uma coleção exclusiva de camisas, ecobags e canecas que
                                        desenvolvemos junto com a Chico Rei, transformando expressões típicas e o mascote da marca em itens que vestiram
                                        os Juiz-foranos.
                                    </p>
                                </div>
                            </div>
                            <div className="aspect-square overflow-hidden relative">
                                <img src="/assets/pedecafe/image/asset2.webp" alt="Pé de Café Close Up"
                                    className="w-full h-full object-cover object-center contrast-125 reveal-img scroll-trigger delay-100"
                                    loading="lazy" width="800" height="800" />
                            </div>
                        </div>
                    </section>

                    <section className="md:border-b border-white/20 bg-neutral-900 relative overflow-hidden">
                        <div className="relative w-full group overflow-hidden bg-[#111] reveal-img scroll-trigger">
                            <div className="flex md:hidden w-full aspect-[3/4] relative">
                                {/* @ts-ignore */}
                                <dotlottie-player id="lottie-cup-mobile" src="/assets/pedecafe/lottie/mobile/animation1.lottie"
                                    background="transparent" speed="1" className="absolute inset-0 w-full h-full"
                                    style={{ width: '100%', height: '100%', pointerEvents: 'none', objectFit: 'cover' }} loop autoplay>
                                </dotlottie-player>
                            </div>

                            <div className="hidden md:block w-full aspect-video relative">
                                {/* @ts-ignore */}
                                <dotlottie-player id="lottie-cup-desktop" src="/assets/pedecafe/lottie/desktop/animation1.lottie"
                                    background="transparent" speed="1" className="absolute inset-0 w-full h-full"
                                    style={{ width: '100%', height: '100%', pointerEvents: 'none', objectFit: 'cover' }} loop autoplay>
                                </dotlottie-player>
                            </div>
                        </div>
                    </section>

                    <section className="md:border-b border-white/20 relative">
                        <div className="grid grid-cols-2 border-b border-white/20">
                            <div className="p-4 md:p-8 border-r border-white/20 hover:bg-white/5 transition-colors reveal-text scroll-trigger">
                                <p className="text-neutral-500 text-xs font-mono uppercase mb-2">Cliente</p>
                                <p className="text-white text-sm md:text-base font-display font-bold">Concurso Pé de Café</p>
                            </div>
                            <div className="p-4 md:p-8 hover:bg-white/5 transition-colors reveal-text scroll-trigger delay-100">
                                <p className="text-neutral-500 text-xs font-mono uppercase mb-2">Ano</p>
                                <p className="text-white text-sm md:text-base font-display font-bold">2025</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="p-4 md:p-8 border-r border-white/20 hover:bg-white/5 transition-colors reveal-text scroll-trigger delay-200">
                                <p className="text-neutral-500 text-xs font-mono uppercase mb-2">Serviços</p>
                                <p className="text-white text-xs font-mono mt-2">
                                    BRANDING<br /> IDENTIDADE VISUAL<br /> & VERBAL<br /> UX/UI DESIGN<br /> DESENVOLVIMENTO WEB
                                </p>
                            </div>
                            <div className="p-4 md:p-8 hover:bg-white/5 transition-colors reveal-text scroll-trigger delay-300">
                                <p className="text-neutral-500 text-xs font-mono uppercase mb-2">Paleta</p>
                                <div className="flex gap-2 mt-1">
                                    <div className="size-6 bg-[#1b33a9] border border-white/30" title="Obsidian"></div>
                                    <div className="size-6 bg-[#3247c6] border border-white/30" title="Bone"></div>
                                    <div className="size-6 bg-[#f7f0ea] border border-white/30" title="Charcoal"></div>
                                    <div className="size-6 bg-[#ffffff] border border-white/30" title="White"></div>
                                </div>
                                <p className="text-white text-xs font-mono mt-2">OBSIDIAN & BONE</p>
                            </div>
                        </div>
                    </section>

                    <section className="md:border-b border-white/20 bg-background-dark relative overflow-hidden">
                        <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="border-r border-white h-full"></div>
                            ))}
                        </div>

                        <div className="relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 items-end">
                                <div className="p-12 pb-32 md:p-12 flex flex-col justify-end h-full">
                                    <span className="font-mono text-sm text-neutral-400 uppercase tracking-widest block mb-8 reveal-text scroll-trigger">
                                        03 — Experiência
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 reveal-text scroll-trigger delay-100">
                                        Da mesa<br />ao voto!
                                    </h2>
                                    <p className="font-serif text-lg text-neutral-400 md:max-w-2xl reveal-text scroll-trigger delay-200">
                                        Desenhamos uma experiência que guia o usuário desde o momento em que senta na mesa até o
                                        momento em que ele vota. O jogo americano não funcionou apenas como suporte
                                        físico, mas como a interface de embarque.
                                        <br /><br />
                                        Criamos uma jornada contínua onde a identidade visual na mesa guia intuitivamente o cliente
                                        para o ambiente digital. Ao escanear o QR Code, a transição é imperceptível: a mesma
                                        linguagem, a mesma fluidez.
                                    </p>
                                </div>

                                <div className="relative w-full order-3 md:order-2 -mt-6 md:mt-0 scroll-trigger">
                                    <div className="flex md:hidden w-full aspect-[3/4] relative">
                                        {/* @ts-ignore */}
                                        <dotlottie-player src="/assets/pedecafe/lottie/mobile/animation2.lottie"
                                            background="transparent" speed="1" className="absolute inset-0 w-full h-full"
                                            style={{ width: '100%', height: '100%', pointerEvents: 'none', objectFit: 'cover', display: 'block' }}
                                            loop autoplay>
                                        </dotlottie-player>
                                    </div>

                                    <div className="hidden md:block w-full aspect-video relative">
                                        {/* @ts-ignore */}
                                        <dotlottie-player src="/assets/pedecafe/lottie/desktop/animation2.lottie"
                                            background="transparent" speed="1" className="absolute inset-0 w-full h-full"
                                            style={{ width: '100%', height: '100%', pointerEvents: 'none', objectFit: 'cover' }} loop autoplay>
                                        </dotlottie-player>
                                    </div>
                                </div>

                                <div className="w-full overflow-hidden order-2 md:order-3 md:col-span-2 -mt-6 md:mt-0">
                                    <div className="w-full reveal-img scroll-trigger">
                                        <picture>
                                            <source media="(min-width: 768px)" srcSet="/assets/pedecafe/image/combo_desktop.webp" />
                                            <img src="/assets/pedecafe/image/combo_mobile.webp" alt="Pé de Café Combo"
                                                className="w-full aspect-[3/4] md:aspect-video object-cover object-center"
                                                loading="lazy" width="800" height="1067" />
                                        </picture>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                    <ProjectFooter nextProject="/projetos/ninho" nextProjectName="NINHO" />

                </main>
            </div>
        </>
    );
}
