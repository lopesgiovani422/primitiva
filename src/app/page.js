'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal-up, .fade-in');
    animatedElements.forEach(el => observer.observe(el));

    // Testimonial slider interval
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [testimonials.length]);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <main className="relative flex w-full flex-col">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        <Link href="/projetos/pedecafe" prefetch={false} className="group relative aspect-[4/5] overflow-hidden cursor-pointer reveal-up">
          <img src="/assets/cover/pedecafe.webp" alt="Pé de Café"
            className="absolute inset-0 w-full h-full object-cover object-center contrast-125 transition-transform duration-700 group-hover:scale-105"
            loading="lazy" width="800" height="1000" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="inline-block px-2 py-1 mb-2 text-[10px] font-mono bg-white text-black uppercase tracking-wider">Branding & Web</span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight leading-none">Pé de Café</h2>
          </div>
        </Link>

        <Link href="/projetos/ninho" prefetch={false} className="group relative aspect-[4/5] overflow-hidden cursor-pointer reveal-up delay-100">
          <img src="/assets/cover/ninho.webp" alt="Ninho"
            className="absolute inset-0 w-full h-full object-cover object-center contrast-125 transition-transform duration-700 group-hover:scale-105"
            loading="lazy" width="800" height="1000" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="inline-block px-2 py-1 mb-2 text-[10px] font-mono bg-white text-black uppercase tracking-wider">Identidade Visual</span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight leading-none">Ninho</h2>
          </div>
        </Link>

        <Link href="/projetos/oqfjf" prefetch={false} className="group relative aspect-[4/5] overflow-hidden cursor-pointer reveal-up delay-200">
          <img src="/assets/cover/oqfjf.webp" alt="O Que Fazer em JF?"
            className="absolute inset-0 w-full h-full object-cover object-center contrast-[1.5] brightness-75 transition-transform duration-700 group-hover:scale-105"
            loading="lazy" width="800" height="1000" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="inline-block px-2 py-1 mb-2 text-[10px] font-mono bg-white text-black uppercase tracking-wider">Identidade Visual</span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight leading-none">O que fazer em JF?</h2>
          </div>
        </Link>
      </div>

      <div className="bg-black text-white border-b border-white/10">
        <div className="p-6 md:p-24 border-b border-white/10">
          <div className="flex flex-col md:grid md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4 mb-8 md:mb-0">
              <h2 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 reveal-up sticky top-24">O que fazemos</h2>
              <p className="hidden md:block text-white/60 font-serif text-lg mt-4 reveal-up delay-100 max-w-xs">
                Nosso arsenal de ferramentas para construir marcas que não pedem licença para existir.
              </p>
            </div>

            <div className="md:col-span-8 flex flex-col">
              {[
                { title: "Estratégia", content: "Definimos o posicionamento, tom de voz e o território da marca para garantir relevância no mercado." },
                { title: "Identidade Visual", content: "Criação de logotipos, sistemas visuais, paletas de cores e tipografia. Traduzimos a estratégia em elementos visuais proprietários e marcantes." },
                { title: "UX/UI Design", content: "Design de interfaces focadas na experiência do usuário. Criamos jornadas intuitivas e layouts funcionais para produtos digitais." },
                { title: "Web Development", content: "Desenvolvimento front-end e back-end de sites institucionais, landing pages e aplicações web com foco em performance e SEO." },
                { title: "Packaging", content: "Design de embalagens que destacam o produto no ponto de venda e criam uma experiência de unboxing memorável." }
              ].map((item, idx) => (
                <div key={idx} className={`border-b border-white/10 reveal-up delay-${(idx + 1) * 100}`}>
                  <button type="button" onClick={() => toggleAccordion(idx)}
                    className={`accordion-trigger flex justify-between items-center w-full py-6 md:px-6 text-left group cursor-pointer hover:bg-white/5 transition-colors outline-none ${activeAccordion === idx ? 'bg-white/5' : ''}`}>
                    <span className="text-2xl md:text-4xl font-bold uppercase tracking-tight">{item.title}</span>
                    <span className={`material-symbols-outlined text-white/50 group-hover:text-white transition-transform duration-300 icon-toggle text-3xl ${activeAccordion === idx ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
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

      <section className="cv-auto py-12 px-6 md:py-24 bg-background-light">
        <div className="max-w-xl md:max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 text-center reveal-up">
            <span className="text-xs font-mono uppercase tracking-widest border border-black px-2 py-1 rounded-full">Metodologia</span>
            <h3 className="mt-4 text-3xl md:text-5xl font-serif">
              <span className="italic">O ritual</span> primitivo
            </h3>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="reveal-up delay-100 border-[3px] border-black bg-white p-6 md:p-8 relative h-full">
              <span className="absolute -top-4 left-6 bg-black text-white px-3 py-1 text-sm font-bold font-mono">Fase 1</span>
              <h4 className="text-2xl font-black uppercase mt-2 mb-3">Imersão</h4>
              <p className="text-sm leading-relaxed opacity-80">Mergulhamos fundo na essência do negócio. Entrevistas, pesquisa arqueológica e busca pela verdade crua.</p>
            </div>
            <div className="reveal-up delay-200 border-[3px] border-black bg-white p-6 md:p-8 relative h-full">
              <span className="absolute -top-4 left-6 bg-black text-white px-3 py-1 text-sm font-bold font-mono">Fase 2</span>
              <h4 className="text-2xl font-black uppercase mt-2 mb-3">Tradução</h4>
              <p className="text-sm leading-relaxed opacity-80">Transformamos conceitos abstratos em códigos visuais e verbais tangíveis. A magia ganha forma.</p>
            </div>
            <div className="reveal-up delay-300 border-[3px] border-black bg-white p-6 md:p-8 relative h-full">
              <span className="absolute -top-4 left-6 bg-black text-white px-3 py-1 text-sm font-bold font-mono">Fase 3</span>
              <h4 className="text-2xl font-black uppercase mt-2 mb-3">Expansão</h4>
              <p className="text-sm leading-relaxed opacity-80">Entrega dos assets e diretrizes para que a marca ocupe seu território no mundo real.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-black text-white border-y border-white/20 reveal-up">
        <div className="max-w-xl md:max-w-3xl mx-auto text-center relative min-h-[350px] md:min-h-[300px] flex items-center justify-center">
          {testimonials.map((test, idx) => (
            <div key={idx} className={`testimonial-slide absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${currentTestimonial === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
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

      <section className="cv-auto py-20 px-6 md:py-32 bg-background-light">
        <div className="max-w-xl md:max-w-2xl mx-auto">
          <h3 className="text-xl font-bold uppercase mb-8 border-b border-black pb-2 reveal-up">Dúvidas Frequentes</h3>
          <div className="space-y-4">
            {[
              { q: "Qual o prazo médio de entrega?", a: "Nossos projetos de branding completos levam em média de 6 a 8 semanas, dependendo da complexidade e do escopo de entrega acordado." },
              { q: "Vocês trabalham com redes sociais?", a: "Focamos na criação da marca e diretrizes visuais. Entregamos templates e direção de arte para social, mas não fazemos a gestão mensal de posts." },
              { q: "Como funciona o pagamento?", a: "Trabalhamos geralmente com 50% de entrada para reserva de agenda e início do projeto, e os 50% restantes na entrega final dos arquivos." }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-black/20 dark:border-white/20 pb-4 reveal-up delay-100">
                <button type="button" onClick={() => toggleAccordion(`faq-${idx}`)}
                  className="accordion-trigger flex items-center justify-between w-full text-left group cursor-pointer outline-none py-2">
                  <span className="text-lg md:text-xl font-bold">{faq.q}</span>
                  <span className={`material-symbols-outlined transition-transform duration-300 icon-toggle ${activeAccordion === `faq-${idx}` ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
                </button>
                <div className={`accordion-content ${activeAccordion === `faq-${idx}` ? 'block' : 'hidden'} mt-4 text-sm leading-relaxed opacity-80 font-serif`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
