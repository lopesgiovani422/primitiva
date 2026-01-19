export default function Methodology() {
    return (
        <section className="cv-auto py-12 px-6 md:py-24 bg-background-light">
            <div className="max-w-xl md:max-w-7xl mx-auto">
                <div className="mb-12 md:mb-20 text-center reveal-up">
                    <span className="text-xs font-mono uppercase tracking-widest border border-black px-2 py-1 rounded-full">Metodologia</span>
                    <h3 className="mt-4 text-3xl md:text-5xl font-serif">
                        <span className="italic">O ritual</span> primitivo
                    </h3>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8">

                    {/* FASE 1 */}
                    <div className="reveal-up delay-100 border-[3px] border-black bg-white p-6 md:p-8 relative h-full">
                        <span className="absolute -top-4 left-6 bg-black text-white px-3 py-1 text-sm font-bold font-mono">Fase 1</span>
                        <h4 className="text-2xl font-black uppercase mt-2 mb-3">Imersão</h4>
                        <p className="text-sm leading-relaxed opacity-80">
                            Investigamos seu cenário, público e concorrentes. Antes de desenhar, diagnosticamos o problema real para traçar a rota estratégica correta.
                        </p>
                    </div>

                    {/* FASE 2 */}
                    <div className="reveal-up delay-200 border-[3px] border-black bg-white p-6 md:p-8 relative h-full">
                        <span className="absolute -top-4 left-6 bg-black text-white px-3 py-1 text-sm font-bold font-mono">Fase 2</span>
                        <h4 className="text-2xl font-black uppercase mt-2 mb-3">Criação</h4>
                        <p className="text-sm leading-relaxed opacity-80">
                            A estratégia ganha forma. Traduzimos conceitos em identidade visual e interfaces com rigor estético, testando aplicações até chegar na solução ideal.
                        </p>
                    </div>

                    {/* FASE 3 */}
                    <div className="reveal-up delay-300 border-[3px] border-black bg-white p-6 md:p-8 relative h-full">
                        <span className="absolute -top-4 left-6 bg-black text-white px-3 py-1 text-sm font-bold font-mono">Fase 3</span>
                        <h4 className="text-2xl font-black uppercase mt-2 mb-3">Entrega</h4>
                        <p className="text-sm leading-relaxed opacity-80">
                            Preparamos sua marca para o mundo. Organizamos arquivos, manuais e diretrizes para que você tenha total autonomia na gestão do projeto.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
