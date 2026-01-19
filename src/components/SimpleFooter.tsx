'use client';

import Link from 'next/link';

export default function SimpleFooter() {
    return (
        <footer className="footer-simple bg-black pt-24 pb-16 px-6 border-t border-white/10 reveal-up">
            <div className="max-w-7xl mx-auto">
                {/* Grid matching AboutValues (3 columns) to ensure perfect alignment */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-left items-start">

                    {/* Column 1: Brand & Copyright */}
                    <div className="flex flex-col items-start justify-between self-stretch md:min-h-[140px]">
                        <div className="flex flex-col items-start gap-6">
                            <Link href="/" className="inline-block group">
                                <img
                                    src="/assets/primitiva/primitiva_logo.svg"
                                    alt="Logo Primitiva"
                                    className="h-6 w-auto opacity-100 transition-transform duration-500 group-hover:scale-[1.02]"
                                    fetchPriority="high"
                                    width="120"
                                    height="24"
                                />
                            </Link>
                            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
                                Primitiva
                            </p>
                        </div>

                        <div className="mt-8 md:mt-0">
                            <span className="text-[10px] text-gray-700 font-mono uppercase leading-relaxed block">
                                © 2026 Primitiva.<br />
                                Todos os direitos reservados.
                            </span>
                        </div>
                    </div>

                    {/* Column 2: Social Section */}
                    <div className="flex flex-col items-start justify-between self-stretch md:min-h-[140px]">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">Sociais</span>
                        <div className="flex flex-col gap-3 text-xs font-mono uppercase text-gray-500 mt-8 md:mt-0">
                            <a className="hover:text-white transition-colors flex items-center gap-2 group"
                                href="https://www.instagram.com/primitiva.cc" target="_blank" rel="noopener noreferrer">
                                Instagram <span className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0">↗</span>
                            </a>
                            <a className="hover:text-white transition-colors flex items-center gap-2 group"
                                href="https://www.behance.net/primitiva" target="_blank" rel="noopener noreferrer">
                                Behance <span className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0">↗</span>
                            </a>
                            <a className="hover:text-white transition-colors flex items-center gap-2 group"
                                href="mailto:oi@primitiva.cc">
                                Email <span className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0">↗</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 3: Info Section */}
                    <div className="flex flex-col items-start justify-between self-stretch md:min-h-[140px]">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">Base</span>
                        <div className="flex flex-col gap-1 mt-8 md:mt-0">
                            <p className="text-xs font-mono text-gray-500 uppercase">Juiz de Fora</p>
                            <p className="text-xs font-mono text-gray-500 uppercase">Minas Gerais</p>
                            <p className="text-xs font-mono text-gray-500 uppercase">Brasil</p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
