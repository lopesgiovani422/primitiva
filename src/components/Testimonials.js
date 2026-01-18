'use client';

import { useState, useEffect } from 'react';

const testimonials = [
    {
        quote: "A Primitiva não criou apenas um logo, eles traduziram exatamente a essência de tudo o que representava nosso concurso.",
        author: "Mirella Motta",
        role: "Pé de Café"
    },
    {
        quote: "Eles conseguiram captar uma complexidade estratégica e transformar em uma identidade visual simples, mas extremamente potente.",
        author: "João Silva",
        role: "TechStart"
    },
    {
        quote: "O processo de imersão foi um divisor de águas para nós. O resultado final superou qualquer expectativa que tínhamos.",
        author: "Ana Clara",
        role: "Studio Aura"
    }
];

export default function Testimonials() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 px-6 bg-black text-white border-y border-white/20 reveal-up">
            <div className="max-w-xl md:max-w-3xl mx-auto text-center relative min-h-[350px] md:min-h-[300px] flex items-center justify-center">
                {testimonials.map((test, idx) => (
                    <div
                        key={idx}
                        className={`testimonial-slide absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${currentTestimonial === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <blockquote className="font-serif text-3xl md:text-5xl italic leading-tight mb-8">
                            "{test.quote}"
                        </blockquote>
                        <cite className="not-italic flex flex-col items-center gap-1">
                            <span className="font-bold uppercase tracking-widest text-sm">{test.author}</span>
                            <span className="text-xs font-mono text-gray-400">{test.role}</span>
                        </cite>
                    </div>
                ))}
            </div>
        </section>
    );
}
