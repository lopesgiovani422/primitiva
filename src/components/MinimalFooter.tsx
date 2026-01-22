'use client';

import Link from 'next/link';

export default function MinimalFooter() {
    return (
        <footer className="footer-minimal bg-black py-12 border-t border-white/10 reveal-up">
            {/* Exactly the same container as the section above in contato/page.js */}
            <div className="p-6 md:p-12 md:pr-24">
                <div className="flex flex-col md:grid md:grid-cols-12 md:gap-12 gap-y-12 items-start">

                    {/* Column aligns with ContactOptions (8 columns) */}
                    <div className="md:col-span-8 flex flex-col items-start justify-between self-stretch">

                        <div className="flex flex-col items-start gap-6">
                            <Link href="/" className="inline-block group">
                                <img
                                    src="/assets/primitiva/primitiva_logo.svg"
                                    alt="Logo Primitiva"
                                    className="h-6 w-auto opacity-30 hover:opacity-100 transition-opacity"
                                    fetchPriority="high"
                                    width="120"
                                    height="24"
                                />
                            </Link>
                            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
                                Branding <br></br>para<br />ousados
                            </p>
                        </div>

                        <div className="mt-8 md:mt-0">
                            <span className="text-[10px] text-gray-700 font-mono uppercase leading-relaxed block">
                                © 2026 Primitiva.<br />
                                Todos os direitos reservados.
                            </span>
                        </div>
                    </div>

                    {/* Column aligns with ContactChannels (4 columns) */}
                    <div className="md:col-span-4 flex flex-col items-start gap-8">
                        {/* Empty on top to maintain the vertical alignment with columns above if needed, 
                            but here we just need the text to start at the same horizontal line. */}
                    </div>

                </div>
            </div>
        </footer>
    );
}
