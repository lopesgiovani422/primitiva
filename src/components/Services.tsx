'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ServiceItem {
    title: string;
    content: string;
}

const services: ServiceItem[] = [
    {
        title: "Estratégia de Marca",
        content: "Antes do visual, o conceito. Definimos posicionamento, arquétipo e tom de voz para garantir que sua marca ocupe um lugar único na mente do consumidor."
    },
    {
        title: "Identidade Visual",
        content: "Traduzimos estratégia em desejo. Criamos sistemas visuais proprietários: logotipos, cores e tipografia, que tornam sua marca inconfundível."
    },
    {
        title: "Design de Interfaces (UX/UI)",
        content: "Interfaces que as pessoas amam usar. Desenhamos jornadas intuitivas e layouts funcionais, focados na melhor experiência para o usuário final."
    },
    {
        title: "Desenvolvimento Web",
        content: "Desenvolvimento front-end e back-end de sites e aplicações com código limpo, rápido e otimizado para SEO."
    },
    {
        title: "Design de Embalagens",
        content: "Criamos rótulos e embalagens que se destacam na prateleira e geram uma experiência de unboxing memorável."
    }
];

export default function Services() {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <div className="bg-black text-white border-b border-white/10">
            <div className="p-6 md:p-24 border-b border-white/10">
                <div className="flex flex-col md:grid md:grid-cols-12 md:gap-12">
                    <div className="md:col-span-4 mb-8 md:mb-0">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 reveal-up sticky top-24">
                            O que fazemos
                        </h2>
                        <p className="hidden md:block text-white/60 font-serif text-lg mt-4 reveal-up delay-100 max-w-xs">
                            Da essência à experiência digital. Unimos estratégia, design e código para construir marcas completas.
                        </p>
                    </div>

                    <div className="md:col-span-8 flex flex-col">
                        {services.map((item, idx) => (
                            <div key={idx} className={`border-b border-white/10 reveal-up delay-${(idx + 1) * 100}`}>
                                <button
                                    type="button"
                                    onClick={() => toggleAccordion(idx)}
                                    className={`accordion-trigger flex justify-between items-center w-full py-6 md:px-6 text-left group cursor-pointer hover:bg-white/5 transition-colors outline-none ${activeAccordion === idx ? 'bg-white/5' : ''}`}
                                >
                                    <span className="text-2xl md:text-4xl font-bold uppercase tracking-tight">{item.title}</span>
                                    <ChevronDown className={`w-8 h-8 text-white/50 group-hover:text-white transition-transform duration-300 ${activeAccordion === idx ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`accordion-content ${activeAccordion === idx ? 'block' : 'hidden'} px-6 pb-6 text-white/70 font-mono text-sm leading-relaxed max-w-xl`}>
                                    <p>{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
