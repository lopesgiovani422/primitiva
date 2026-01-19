export default function AboutTeam() {
    return (
        <section className="border-t border-black/10 bg-white">
            <div className="p-8 md:p-24 flex flex-col justify-center">
                <span className="font-mono text-xs uppercase tracking-widest opacity-60 mb-6 reveal-up">
                    Quem somos
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 reveal-up delay-100">
                    De pessoas<br />para pessoas
                </h2>
                <p className="text-lg opacity-80 leading-relaxed font-serif mb-8 reveal-up delay-200 md:max-w-3xl">
                    A Primitiva não é uma corporação, é um estúdio criado por Giovani Lopes e Gustavo Tempone para ser o contraponto às agências inchadas e impessoais.

                    <br></br><br></br>Nosso processo é próximo e intencional. Acreditamos que marcas fortes não são construídas por linhas de produção, mas por pessoas que se importam de verdade. Nós nos importamos. Cada projeto que sai daqui leva um pedaço da nossa dedicação.
                </p>
            </div>
        </section>
    );
}
