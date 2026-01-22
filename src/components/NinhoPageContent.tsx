'use client';

import { useEffect, useState } from 'react';
import ProjectNavigation from '@/components/ProjectNavigation';
import ProjectFooter from '@/components/ProjectFooter';
import { ArrowDown } from 'lucide-react';

export default function NinhoPageContent() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const setupPlayers = () => {
            const players = document.querySelectorAll('dotlottie-player');
            players.forEach((player: any) => {
                // Force properties and attributes
                player.loop = true;
                player.autoplay = true;
                player.setAttribute('loop', '');
                player.setAttribute('autoplay', '');

                const reveal = () => {
                    player.classList.remove('opacity-0');
                    player.play();
                };

                // Ensure it plays if ready
                if (player.isReady) {
                    reveal();
                }

                // Event listener for when the player is ready
                player.addEventListener('ready', () => {
                    player.loop = true;
                    player.setAttribute('loop', '');
                    reveal();
                });

                // Fallback: standard restart on complete
                player.addEventListener('complete', () => {
                    player.seek(0);
                    player.play();
                });

                // Extra safety: if it stops on the last frame, kick it
                player.addEventListener('frame', (e: any) => {
                    if (e.detail.frame === e.detail.totalFrames - 1) {
                        player.seek(0);
                        player.play();
                    }
                });

                // Ensure it plays if it loads later
                player.addEventListener('load', () => {
                    player.loop = true;
                    player.setAttribute('loop', '');
                    reveal();
                });
            });
        };

        // Run setup immediately and after a few intervals to catch hydration/upgrade
        setupPlayers();
        const intervals = [100, 500, 1000, 2000];
        const timers = intervals.map(ms => setTimeout(setupPlayers, ms));

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Handle Lottie players entering viewport
                    const players = entry.target.querySelectorAll('dotlottie-player');
                    players.forEach((player: any) => {
                        if (player && typeof player.play === 'function') {
                            player.play();
                        }
                    });
                } else {
                    // Pause Lottie players leaving viewport to save resources
                    const players = entry.target.querySelectorAll('dotlottie-player');
                    players.forEach((player: any) => {
                        if (player && typeof player.pause === 'function') {
                            player.pause();
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

            // Observe standard scroll trigger elements
            const elements = document.querySelectorAll('.scroll-trigger');
            elements.forEach(el => observer.observe(el));

            // Also explicitly observe sections containing lottie players
            const lottieContainers = document.querySelectorAll('.lottie-container, section:has(dotlottie-player)');
            lottieContainers.forEach(el => observer.observe(el));
        };

        // Trigger immediately for Ninho as it doesn't have a heavy preloader
        finishLoading();

        return () => {
            observer.disconnect();
            timers.forEach(t => clearTimeout(t));
        };
    }, []);

    return (
        <div className="bg-background-dark text-white selection:bg-white selection:text-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [{
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://primitiva.cc"
                        }, {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Projetos",
                            "item": "https://primitiva.cc/projetos"
                        }, {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "Ninho Tattoo",
                            "item": "https://primitiva.cc/projetos/ninho"
                        }]
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CreativeWork",
                        "name": "Ninho Tattoo Studio Branding",
                        "creator": {
                            "@type": "Organization",
                            "name": "Primitiva Coletivo Criativo"
                        },
                        "description": "Identidade visual para Ninho Tattoo Studio. Um conceito de abrigo e acolhimento visceral.",
                        "image": "https://primitiva.cc/assets/cover/ninho.webp",
                        "dateCreated": "2023"
                    })
                }}
            />
            <div className="hidden md:block fixed inset-0 z-50 pointer-events-none opacity-[0.07] mix-blend-overlay bg-[image:var(--background-image-grain)]"></div>

            <ProjectNavigation />

            <main className="relative flex flex-col w-full min-h-screen pt-16">

                <section className="relative h-[85vh] w-full flex flex-col justify-end p-4 md:p-8 overflow-hidden md:border-b border-white/20 bg-black">
                    <div className="absolute inset-0 z-0">
                        <picture>
                            <source media="(min-width: 768px)" srcSet="/assets/ninho/image/header_desktop.webp" />
                            <img src="/assets/cover/ninho.webp" alt="Ninho Cover"
                                className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-125"
                                fetchPriority="high"
                                width="800" height="1000" />
                        </picture>
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    <div className="relative z-10 flex flex-col gap-2 pb-8">
                        <div className="flex items-center gap-3 mb-2 opacity-80 reveal-text immediate-reveal">
                            <span className="size-2 bg-white rounded-full animate-pulse"></span>
                            <span className="font-mono text-xs tracking-[0.2em] uppercase">Identidade Visual</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-display font-bold leading-[0.85] tracking-tighter text-white break-words reveal-text immediate-reveal">
                            NINHO
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
                                <ArrowDown className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="md:col-span-8 p-12 md:p-24 flex items-center">
                            <p className="font-serif text-xl md:text-2xl leading-relaxed text-white reveal-text scroll-trigger delay-100 immediate-reveal">
                                Equilibrar a proteção do "Ninho" com a visceralidade da tatuagem. O objetivo foi ressignificar o
                                conceito de abrigo. Não buscamos a suavidade ingênua, mas um acolhimento maduro. Criar uma marca
                                que transmitisse segurança, não fragilidade. Um santuário preparado para a intensidade do
                                processo de uma tatuagem.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="md:border-b border-white/20 bg-neutral-900 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="aspect-[3/4] md:aspect-square overflow-hidden relative">
                            <img src="/assets/ninho/image/asset1.webp" alt="Ninho Concept"
                                className="w-full h-full object-cover object-center reveal-img scroll-trigger" loading="lazy"
                                width="800" height="1067" />
                        </div>
                        <div className="p-8 md:p-16 flex flex-col justify-center border-l border-white/10">
                            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6 reveal-text scroll-trigger">
                                02 — O Conceito
                            </span>
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 reveal-text scroll-trigger delay-100">
                                O ninho
                            </h2>
                            <p className="font-serif text-neutral-400 leading-relaxed reveal-text scroll-trigger delay-200">
                                O logo busca a forma do ninho, mas com ângulos que cortam. Ele traz a rebeldia inerente à
                                tatuagem. Não é um berço macio; é uma estrutura de proteção forjada na pele. A identidade visual
                                usa linhas que se entrelaçam infinitamente, criando uma trama que não apenas decora, mas
                                envolve.
                            </p>
                            <div className="mt-8 pt-8 border-t border-white/10 flex gap-8 reveal-text scroll-trigger delay-300">
                                <div>
                                    <span className="block text-2xl font-bold font-display">03</span>
                                    <span className="text-xs font-mono text-neutral-500 uppercase">Artistas</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-bold font-display">∞</span>
                                    <span className="text-xs font-mono text-neutral-500 uppercase">Histórias</span>
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
                            "Dói, mas fica bonito pra caramba!"
                        </p>
                        <div className="mt-12 flex justify-center gap-4 reveal-img scroll-trigger delay-200">
                            <span className="size-3 bg-white rounded-full"></span>
                            <span className="size-3 bg-white/50 rounded-full"></span>
                            <span className="size-3 bg-white/20 rounded-full"></span>
                        </div>
                    </div>
                </section>

                <section className="md:border-b border-white/20 bg-neutral-900 flex flex-col overflow-hidden">
                    <div className="relative w-full md:border-b border-white/20 group overflow-hidden bg-[#111] reveal-img scroll-trigger">
                        <picture>
                            <source media="(min-width: 768px)" srcSet="/assets/ninho/image/asset2.jpg" />
                            <img src="/assets/ninho/image/asset2_mobile.jpg" alt="Ninho Studio"
                                className="w-full aspect-[3/4] md:aspect-video object-cover object-center" loading="lazy"
                                width="800" height="1067" />
                        </picture>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:border-b border-white/20">
                        <div className="aspect-square bg-black p-8 flex flex-col justify-between md:border-b-0 md:border-r border-white/20 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20"
                                style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                            </div>
                            <span className="font-mono text-xs text-neutral-500 uppercase z-10 reveal-text scroll-trigger">
                                O Abraço do Ninho
                            </span>
                            <div className="z-10">
                                <p className="font-serif text-xl md:text-2xl leading-relaxed text-off-white reveal-text scroll-trigger delay-100">
                                    O padrão visual não é estático. Nas camisetas e ecobags, as linhas se estendem e abraçam o
                                    corpo de quem usa. É a sensação visual de estar envolto pelo Ninho, protegido pela arte que
                                    você carrega na pele e no tecido.
                                </p>
                            </div>
                        </div>
                        <div className="aspect-square overflow-hidden relative">
                            <img src="/assets/ninho/image/asset3.webp" alt="Ninho Pattern"
                                className="w-full h-full object-cover object-center reveal-img scroll-trigger delay-100"
                                loading="lazy" width="800" height="800" />
                        </div>
                    </div>
                </section>

                <section className="md:border-b border-white/20 bg-neutral-900 relative overflow-hidden -mt-1">
                    <div className="relative w-full group overflow-hidden reveal-img scroll-trigger">
                        <div className="w-full aspect-video relative bg-neutral-900/50">
                            {/* @ts-ignore */}
                            <dotlottie-player id="lottie-cup-unified" src="/assets/ninho/lottie/scene.lottie"
                                background="transparent" speed="1" className="w-full h-full block opacity-0 transition-opacity duration-500"
                                style={{ pointerEvents: 'none', objectFit: 'cover' }}>
                            </dotlottie-player>
                        </div>
                    </div>
                </section>

                <section className="md:border-b border-white/20 relative">
                    <div className="grid grid-cols-2 border-b border-white/20">
                        <div className="p-4 md:p-8 border-r border-white/20 hover:bg-white/5 transition-colors reveal-text scroll-trigger">
                            <p className="text-neutral-500 text-xs font-mono uppercase mb-2">Cliente</p>
                            <p className="text-white text-sm md:text-base font-display font-bold">Ninho Tattoo Studio</p>
                        </div>
                        <div className="p-4 md:p-8 hover:bg-white/5 transition-colors reveal-text scroll-trigger delay-100">
                            <p className="text-neutral-500 text-xs font-mono uppercase mb-2">Ano</p>
                            <p className="text-white text-sm md:text-base font-display font-bold">2023</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="p-4 md:p-8 border-r border-white/20 hover:bg-white/5 transition-colors reveal-text scroll-trigger delay-200">
                            <p className="text-neutral-500 text-xs font-mono uppercase mb-2">Serviços</p>
                            <p className="text-white text-xs font-mono mt-2">
                                BRANDING<br /> IDENTIDADE VISUAL<br /> DESIGN DE EMBALAGENS<br /> IDENTIDADE VERBAL
                            </p>
                        </div>
                        <div className="p-4 md:p-8 hover:bg-white/5 transition-colors reveal-text scroll-trigger delay-300">
                            <p className="text-neutral-500 text-xs font-mono uppercase mb-2">Paleta</p>
                            <div className="flex gap-2 mt-1">
                                <div className="size-6 bg-[#2D2926] border border-white/30" title="Pantone Black C"></div>
                                <div className="size-6 bg-[#FFA300] border border-white/30" title="Pantone 137 C"></div>
                                <div className="size-6 bg-[#F5F5F5] border border-white/30" title="Off-White"></div>
                            </div>
                            <p className="text-white text-xs font-mono mt-2">BLACK & AMBER</p>
                        </div>
                    </div>
                </section>

                <section className="md:border-b border-white/20 bg-background-dark relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-end">
                            <div className="p-6 md:p-12 flex flex-col justify-end h-full">
                                <span className="font-mono text-sm text-neutral-400 uppercase tracking-widest block mb-8 reveal-text scroll-trigger">
                                    03 — Experiência
                                </span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 reveal-text scroll-trigger delay-100">
                                    O acolhimento<br />pós tattoo
                                </h2>
                                <p className="font-serif text-lg text-neutral-400 md:max-w-xl reveal-text scroll-trigger delay-200">
                                    A experiência não termina na agulha. Desenvolvemos kits de pós-tattoo e materiais
                                    informativos que garantem que o cliente se sinta cuidado e informado muito depois de sair do
                                    estúdio.
                                </p>
                            </div>

                            <div className="relative w-full">
                                <div className="flex md:hidden w-full aspect-[3/4] relative">
                                    <div className="absolute inset-0 w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: 'url("/assets/ninho/image/asset4.webp")' }}>
                                    </div>
                                </div>

                                <div className="hidden md:block w-full aspect-video relative">
                                    <div className="absolute inset-0 w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: 'url("/assets/ninho/image/asset4.webp")' }}>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <ProjectFooter nextProject="/projetos/pedecafe" nextProjectName="PÉ DE CAFÉ" />

            </main>
        </div>
    );
}
