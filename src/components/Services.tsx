'use client';

import { useState } from 'react';

interface ServiceItem {
    title: string;
    content: string;
}

const services: ServiceItem[] = [
    {
        title: "Estratégia",
        content: "Definimos o posicionamento, tom de voz e o território da marca para garantir relevância no mercado."
    },
    {
        title: "Identidade Visual",
        content: "Criação de logotipos, sistemas visuais, paletas de cores e tipografia. Traduzimos a estratégia em elementos visuais proprietários e marcantes."
    },
    {
        title: "UX/UI Design",
        content: "Design de interfaces focadas na experiência do usuário. Criamos jornadas intuitivas e layouts funcionais para produtos digitais."
    },
    {
        title: "Web Development",
        content: "Desenvolvimento front-end e back-end de sites institucionais, landing pages e aplicações web com foco em performance e SEO."
    },
    {
        title: "Packaging",
        content: "Design de embalagens que destacam o produto no ponto de venda e criam uma experiência de unboxing memorável."
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
                            Da fundação até o desenvolvimento de um aplicativo, nós temos o que você precisa.
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
                                    <span className={`material-symbols-outlined text-white/50 group-hover:text-white transition-transform duration-300 icon-toggle text-3xl ${activeAccordion === idx ? 'rotate-180' : ''}`}>
                                        keyboard_arrow_down
                                    </span>
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
