'use client';

import { useState } from 'react';

const faqs = [
    { q: "Qual o prazo médio de entrega?", a: "Nossos projetos de branding completos levam em média de 6 a 8 semanas, dependendo da complexidade e do escopo de entrega acordado." },
    { q: "Vocês trabalham com redes sociais?", a: "Focamos na criação da marca e diretrizes visuais. Entregamos templates e direção de arte para social, mas não fazemos a gestão mensal de posts." },
    { q: "Como funciona o pagamento?", a: "Trabalhamos geralmente com 50% de entrada para reserva de agenda e início do projeto, e os 50% restantes na entrega final dos arquivos." }
];

export default function FAQ() {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <section className="cv-auto py-20 px-6 md:py-32 bg-background-light">
            <div className="max-w-xl md:max-w-2xl mx-auto">
                <h3 className="text-xl font-bold uppercase mb-8 border-b border-black pb-2 reveal-up">Dúvidas Frequentes</h3>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border-b border-black/20 dark:border-white/20 pb-4 reveal-up delay-100">
                            <button
                                type="button"
                                onClick={() => toggleAccordion(idx)}
                                className="accordion-trigger flex items-center justify-between w-full text-left group cursor-pointer outline-none py-2"
                            >
                                <span className="text-lg md:text-xl font-bold">{faq.q}</span>
                                <span className={`material-symbols-outlined transition-transform duration-300 icon-toggle ${activeAccordion === idx ? 'rotate-180' : ''}`}>
                                    keyboard_arrow_down
                                </span>
                            </button>
                            <div className={`accordion-content ${activeAccordion === idx ? 'block' : 'hidden'} mt-4 text-sm leading-relaxed opacity-80 font-serif`}>
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
