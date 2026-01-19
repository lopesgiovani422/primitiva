import Link from 'next/link';

export default function AboutValues() {
    return (
        <section className="py-20 px-6 md:py-32">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-display font-bold uppercase mb-16 reveal-up">
                    Trabalhamos para que sua marca tenha:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    <div className="reveal-up delay-100 group">
                        <span className="text-xs font-mono border border-black px-2 py-1 rounded-full uppercase">01</span>
                        <h3 className="text-3xl font-display font-bold uppercase mt-6 mb-4 group-hover:translate-x-2 transition-transform">
                            Estratégia
                        </h3>
                        <p className="text-sm md:text-base opacity-70 leading-relaxed font-serif">
                            Não desenhamos nada sem saber o porquê. Investigamos o mercado, o público e a alma da marca para definir rotas claras e um posicionamento que resolva problemas reais de negócio.
                        </p>
                    </div>

                    <div className="reveal-up delay-200 group">
                        <span className="text-xs font-mono border border-black px-2 py-1 rounded-full uppercase">02</span>
                        <h3 className="text-3xl font-display font-bold uppercase mt-6 mb-4 group-hover:translate-x-2 transition-transform">
                            Identidade
                        </h3>
                        <p className="text-sm md:text-base opacity-70 leading-relaxed font-serif">
                            Visual que gera desejo. Traduzimos conceitos em sistemas proprietários, garantindo que sua marca seja reconhecida antes mesmo de ser lida.
                        </p>
                    </div>

                    <div className="reveal-up delay-300 group">
                        <span className="text-xs font-mono border border-black px-2 py-1 rounded-full uppercase">03</span>
                        <h3 className="text-3xl font-display font-bold uppercase mt-6 mb-4 group-hover:translate-x-2 transition-transform">
                            Experiência
                        </h3>
                        <p className="text-sm md:text-base opacity-70 leading-relaxed font-serif">
                            Consistência gera confiança. Do site à embalagem, orquestramos todos os pontos de contato para que a marca tenha uma voz única e coerente.
                        </p>
                    </div>
                </div>

                <div className="mt-16 reveal-up delay-300">
                    <Link
                        href="/contato"
                        className="inline-flex items-center gap-2 border-b border-black pb-1 uppercase font-bold text-sm tracking-widest hover:opacity-60 transition-opacity"
                    >
                        Bora conversar? <span className="material-symbols-outlined text-lg">east</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
