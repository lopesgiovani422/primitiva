export default function ContactChannels() {
    return (
        <div className="md:col-span-4 reveal-up delay-300">
            <h2 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-8 sticky top-24">
                Outros Canais
            </h2>

            <div className="flex flex-col gap-8">
                <div>
                    <span className="block text-xs font-mono text-white/40 mb-1">Email</span>
                    <a
                        href="mailto:ola@primitiva.cc"
                        className="text-xl md:text-2xl hover:text-white/70 transition-colors font-display"
                    >
                        ola@primitiva.cc
                    </a>
                </div>

                <div>
                    <span className="block text-xs font-mono text-white/40 mb-1">Social</span>
                    <div className="flex flex-col gap-1">
                        <a
                            href="https://www.instagram.com/primitiva.cc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl md:text-2xl hover:text-white/70 transition-colors font-display"
                        >
                            Instagram ↗
                        </a>
                        <a
                            href="https://www.behance.net/primitiva"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl md:text-2xl hover:text-white/70 transition-colors font-display"
                        >
                            Behance ↗
                        </a>
                        <a
                            href="https://www.linkedin.com/company/primitiva.cc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl md:text-2xl hover:text-white/70 transition-colors font-display"
                        >
                            LinkedIn ↗
                        </a>
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
    );
}
