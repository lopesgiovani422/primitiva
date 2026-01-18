export default function AboutTeam() {
    return (
        <section className="border-t border-black/10 bg-white">
            <div className="p-8 md:p-24 flex flex-col justify-center">
                <span className="font-mono text-xs uppercase tracking-widest opacity-60 mb-6 reveal-up">
                    Quem somos
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 reveal-up delay-100">
                    Fundada em <br />Juiz de Fora
                </h2>
                <p className="text-lg opacity-80 leading-relaxed font-serif mb-8 reveal-up delay-200">
                    Por Giovani Lopes, designer e estrategista, e Gustavo Tempone, desenvolvedor.
                    Somos um coletivo criativo nascido da união dessas duas frentes. Acreditamos que uma marca forte precisa de coerência do início ao fim.
                    Por isso, atuamos de forma integrada para que a estratégia desenhada no papel ganhe vida, função e força no mundo real.
                </p>
            </div>
        </section>
    );
}
