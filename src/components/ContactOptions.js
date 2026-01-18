import Link from 'next/link';

export default function ContactOptions() {
    return (
        <div className="md:col-span-8 flex flex-col reveal-up delay-200 mb-16 md:mb-0">
            <p className="text-white/60 font-serif text-lg mb-12 max-w-md">
                Tem um projeto audacioso em mente? <br />Escolha a melhor forma de iniciar nosso ritual.
            </p>

            <div className="flex flex-col border-t border-white/20">
                <a
                    href="https://wa.me/5532999508150"
                    target="_blank"
                    className="group border-b border-white/20 py-8 md:py-12 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                            01 / Pra quem gosta de conversar
                        </span>
                        <span className="text-3xl md:text-5xl font-display font-bold uppercase group-hover:text-white/80 transition-colors">
                            WhatsApp
                        </span>
                    </div>
                    <span className="material-symbols-outlined text-4xl md:text-5xl text-white/50 group-hover:text-white group-hover:-rotate-45 transition-all duration-500">
                        arrow_outward
                    </span>
                </a>

                <Link
                    href="/briefing"
                    className="group border-b border-white/20 py-8 md:py-12 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                            02 / Briefing Detalhado
                        </span>
                        <span className="text-3xl md:text-5xl font-display font-bold uppercase group-hover:text-white/80 transition-colors">
                            Formulário
                        </span>
                    </div>
                    <span className="material-symbols-outlined text-4xl md:text-5xl text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all duration-500">
                        east
                    </span>
                </Link>
            </div>
        </div>
    );
}
