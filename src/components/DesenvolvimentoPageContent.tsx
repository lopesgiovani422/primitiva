'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Zap, ShieldCheck, TrendingUp, Star, Phone } from 'lucide-react';
import ClientAnimations from '@/components/ClientAnimations';

export default function DesenvolvimentoPageContent() {
    return (
        <main className="bg-background-light text-[#181010] min-h-screen selection:bg-black selection:text-white font-display">
            <ClientAnimations />

            {/* Minimal Header (Landing Page Mode) */}
            <header className="absolute top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center">
                <Link href="/" className="hover:opacity-60 transition-opacity">
                    <img src="/assets/primitiva/primitiva_logo.svg" alt="Primitiva Logo" className="h-6 w-auto brightness-0" />
                </Link>
            </header>

            {/* 1. Hero Section (O Impacto Imediato) */}
            <section className="relative pt-40 pb-20 px-6 md:px-12 border-b border-black/10 min-h-[90vh] flex flex-col justify-center">
                <div className="max-w-[1920px] mx-auto w-full">
                    <div className="overflow-hidden">
                        <h1 className="font-display font-black text-[12vw] leading-[0.8] tracking-tighter uppercase mb-8 reveal-up active w-full break-words">
                            Chega de <br />
                            <span className="text-black/20">sites lentos.</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end reveal-up active delay-200 mt-12 border-t border-black/10 pt-12">
                        <div className="max-w-xl">
                            <p className="font-light text-lg md:text-xl leading-relaxed mb-8">
                                Seu Wordpress está matando suas vendas. Unimos design estratégico com a velocidade do Next.js.
                                <strong><br></br>Não entregamos apenas um site bonito, entregamos uma máquina de conversão.</strong>
                            </p>
                            <Link href="/contato" className="group inline-flex items-center gap-4 bg-black text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-[#333] transition-colors">
                                Orçar meu projeto
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="md:text-right hidden md:block opacity-60 font-mono text-xs uppercase">
                            <p>Stack: Next.js 15 / React / Tailwind</p>
                            <p>Server-side Rendering / Edge Computing</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. A Prova Técnica (PageSpeed Simulation) */}
            <section className="py-32 px-6 md:px-12 bg-black text-white relative overflow-hidden">
                {/* Background Grain */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'var(--background-image-grain)' }}></div>

                <div className="max-w-[1920px] mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal-up">
                            <h2 className="font-display font-bold text-5xl md:text-7xl uppercase leading-none mb-8">
                                Não acredite na gente. <br />
                                <span className="text-[#4ADE80] stroke-text-white">Acredite no Google.</span>
                            </h2>
                            <p className="text-white/70 text-lg md:text-xl font-light mb-8 max-w-md">
                                Este site que você está navegando foi construído com a mesma tecnologia que usaremos no seu. Sentiu a velocidade? <br></br>Seu cliente também sente.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[#4ADE80] font-mono text-3xl font-bold">0.4s</span>
                                    <span className="text-xs uppercase opacity-50">Tempo de Carregamento</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[#4ADE80] font-mono text-3xl font-bold">100/100</span>
                                    <span className="text-xs uppercase opacity-50">Google PageSpeed</span>
                                </div>
                            </div>
                        </div>

                        {/* PageSpeed Cards Simulation */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal-up delay-200">
                            <ScoreCard score={100} label="Performance" delay={0} />
                            <ScoreCard score={100} label="Acessibilidade" delay={100} />
                            <ScoreCard score={100} label="Práticas" delay={200} />
                            <ScoreCard score={100} label="SEO" delay={300} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. O Diferencial (Grid Brutalista) */}
            <section className="border-b border-black/10 bg-background-light">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10">
                    <FeatureBlock
                        icon={<Zap className="w-8 h-8" />}
                        title="Velocidade"
                        text="Carregamento instantâneo. O Google prioriza sites rápidos. Otimizamos cada linha de código para garantir scores máximos."
                        delay="delay-100"
                    />
                    <FeatureBlock
                        icon={<ShieldCheck className="w-8 h-8" />}
                        title="Tecnologia Sólida"
                        text="Adeus plugins vulneráveis. Usamos a stack das maiores empresas de tecnologia do mundo (React/Next.js)."
                        delay="delay-200"
                    />
                    <FeatureBlock
                        icon={<TrendingUp className="w-8 h-8" />}
                        title="Conversão"
                        text="Cada milissegundo conta. Arquitetura pensada para transformar visitantes em leads, sem distrações desnecessárias."
                        delay="delay-300"
                    />
                </div>
            </section>

            {/* 4. Portfólio (UI Focus) */}
            <section className="py-32 px-6 md:px-12 bg-[#F2F2F0]">
                <div className="max-w-[1920px] mx-auto">
                    <div className="flex items-end justify-between mb-24 border-b border-black/10 pb-8 reveal-up">
                        <h2 className="font-display font-black text-5xl md:text-8xl uppercase tracking-tighter opacity-10">Interface</h2>
                        <span className="font-mono text-xs uppercase tracking-widest hidden md:block">Produtos Digitais</span>
                    </div>

                    <div className="space-y-40">
                        {/* Projeto 1: Pé de Café UI */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center reveal-up">
                            <div className="lg:col-span-5 order-2 lg:order-1">
                                <div className="space-y-6 sticky top-32">
                                    <span className="inline-block px-3 py-1 bg-black text-white text-xs font-mono uppercase">Web App</span>
                                    <h3 className="font-display font-bold text-4xl md:text-6xl uppercase">Pé de Café</h3>
                                    <p className="text-lg opacity-80 leading-relaxed max-w-md">
                                        Sistema de votação interativo em tempo real. Interface fluida que elimina o refresh de página, proporcionando sensação de app nativo.
                                    </p>
                                    <ul className="space-y-2 font-mono text-xs uppercase opacity-60 pt-4 border-t border-black/10 mt-8">
                                        <li className="flex justify-between"><span>Framework</span> <span>Next.js</span></li>
                                        <li className="flex justify-between"><span>Styling</span> <span>Tailwind CSS</span></li>
                                        <li className="flex justify-between"><span>Animation</span> <span>Framer Motion</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="lg:col-span-7 order-1 lg:order-2">
                                <div className="bg-[#e6e6e4] p-8 md:p-16 rounded-sm relative group overflow-hidden">
                                    {/* Browser Mockup Frame */}
                                    <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-black/5 transform transition-transform duration-700 group-hover:scale-[1.01] group-hover:-translate-y-2">
                                        <div className="bg-[#f0f0f0] px-4 py-3 border-b border-gray-200 flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                        </div>
                                        <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative">
                                            <img src="/assets/cover/pedecafe.webp" alt="Interface Pé de Café" className="w-full h-full object-cover object-top hover:object-bottom transition-all duration-[3000ms] ease-in-out" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Projeto 2: OQFJF Mobile UI */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center reveal-up">
                            <div className="lg:col-span-7">
                                <div className="bg-[#1a1a1a] p-8 md:p-16 rounded-sm relative group overflow-hidden flex justify-center gap-8">
                                    {/* Mobile Mockup 1 */}
                                    <div className="relative w-[280px] aspect-[9/19] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden transform translate-y-12 transition-transform duration-700 group-hover:translate-y-8">
                                        <img src="/assets/cover/oqfjf.webp" alt="App O Que Fazer em JF Tela 1" className="w-full h-full object-cover" />
                                    </div>
                                    {/* Mobile Mockup 2 (Visual effect - reuse image dimmed) */}
                                    <div className="relative w-[280px] aspect-[9/19] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden transform translate-y-24 opacity-50 grayscale transition-transform duration-700 group-hover:translate-y-16 group-hover:opacity-80 md:block hidden">
                                        <img src="/assets/cover/oqfjf.webp" alt="App O Que Fazer em JF Tela 2" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-5">
                                <div className="space-y-6 sticky top-32">
                                    <span className="inline-block px-3 py-1 bg-black text-white text-xs font-mono uppercase">PWA Mobile</span>
                                    <h3 className="font-display font-bold text-4xl md:text-6xl uppercase">OQFJF</h3>
                                    <p className="text-lg opacity-80 leading-relaxed max-w-md">
                                        Guia da cidade otimizado para mobile. Carregamento instantâneo mesmo em redes 4G instáveis. Estrutura de SEO avançada para dominar as buscas locais.
                                    </p>
                                    <ul className="space-y-2 font-mono text-xs uppercase opacity-60 pt-4 border-t border-black/10 mt-8">
                                        <li className="flex justify-between"><span>Type</span> <span>Progressive Web App</span></li>
                                        <li className="flex justify-between"><span>Performance</span> <span>99/100 Mobile</span></li>
                                        <li className="flex justify-between"><span>Optimization</span> <span>Image CDN</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Footer CTA (O Ultimato) */}
            <section className="bg-black text-white py-32 px-6 md:px-12 text-center relative overflow-hidden">
                <div className="max-w-5xl mx-auto relative z-10 reveal-up">
                    <h2 className="font-display font-bold text-4xl md:text-6xl uppercase mb-12">
                        Sua empresa merece mais <br /> do que um template pronto.
                    </h2>
                    <Link href="/contato" className="bg-[#dc2626] text-white px-12 py-6 font-bold text-lg md:text-xl uppercase tracking-wider hover:bg-white hover:text-black transition-colors inline-flex items-center gap-4">
                        Vamos construir algo sólido
                        <ArrowRight className="w-6 h-6" />
                    </Link>

                    <div className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center opacity-40 font-mono text-xs uppercase gap-4">
                        <span>© 2026 Primitiva Studio</span>
                        <div className="flex gap-6">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <Link href="/contato" className="hover:text-white transition-colors">Contato</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Sub-components

function ScoreCard({ score, label, delay }: { score: number, label: string, delay: number }) {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    // Map number delay to static class string for Tailwind compiler
    const delayClass = delay === 0 ? '' :
        delay === 100 ? 'delay-100' :
            delay === 200 ? 'delay-200' :
                delay === 300 ? 'delay-300' : 'delay-100';

    return (
        <div className={`flex flex-col items-center gap-4 bg-white/5 p-6 rounded-lg border border-white/10 hover:border-[#4ADE80]/50 transition-colors group reveal-up ${delayClass}`}>
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="transform -rotate-90 w-full h-full">
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        className="text-white/10"
                    />
                    {/* Foreground Circle */}
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="text-[#4ADE80] transition-all duration-1000 ease-out group-hover:text-white"
                        strokeLinecap="round"
                    />
                </svg>
                <span className="absolute text-2xl font-mono font-bold text-[#4ADE80] group-hover:text-white transition-colors">{score}</span>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-center opacity-60">{label}</span>
        </div>
    );
}

function FeatureBlock({ icon, title, text, delay }: { icon: React.ReactNode, title: string, text: string, delay: string }) {
    return (
        <div className={`p-12 md:p-16 hover:bg-white transition-colors duration-500 group reveal-up ${delay}`}>
            <div className="mb-8 opacity-40 group-hover:opacity-100 transition-opacity text-black group-hover:text-[#4ADE80] transform group-hover:scale-110 duration-300 origin-left">
                {icon}
            </div>
            <h3 className="font-display font-bold text-2xl uppercase mb-4">{title}</h3>
            <p className="font-light opacity-80 leading-relaxed max-w-sm text-sm md:text-base">
                {text}
            </p>
        </div>
    );
}
