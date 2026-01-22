'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';

// Common Components Reuse
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay, OptionCard, InputWithArrow, TextareaWithArrow } from '../../briefing/components/Common';

// --- SCHEMA ---
const siteBriefingSchema = z.object({
    // 0. INTRO
    contact_name: z.string().min(2, 'Por favor, seu nome.').trim(),
    company_name: z.string().min(2, 'Nome da marca é obrigatório.').trim(),

    // 1. ESTRATÉGIA DIGITAL
    main_objective: z.array(z.string()).min(1, 'Selecione pelo menos um objetivo.'),
    main_objective_other: z.string().optional(),
    traffic_source: z.array(z.string()).min(1, 'Selecione pelo menos uma fonte.'),
    traffic_source_other: z.string().optional(),

    // 2. UX & CONTEÚDO
    essential_pages: z.string().min(5, 'Quais páginas teremos?').trim(),
    content_status: z.string().min(1, 'Qual o status do conteúdo?'),
    content_status_other: z.string().optional(),

    // 3. UI & INTERATIVIDADE
    visual_vibe: z.number().optional(), // Slider: Performance vs Immersive
    references: z.string().optional(),

    // 4. STACK TÉCNICA
    cms_needs: z.string().min(1, 'Selecione o nível de controle.'),
    cms_needs_other: z.string().optional(),
    functionalities: z.array(z.string()).optional(),
    functionalities_other: z.string().optional(),

    // 5. FINALIZAÇÃO
    domain_hosting: z.string().optional(),
    deadline: z.string().optional()
});

type SiteBriefingData = z.infer<typeof siteBriefingSchema>;

// Slider Component (Reused from Marca logic)
function RangeSlider({ value, onChange, leftLabel, rightLabel }: { value: number, onChange: (val: number) => void, leftLabel: string, rightLabel: string }) {
    return (
        <div className="mb-8">
            <div className="flex justify-between mb-4 font-mono text-[10px] uppercase tracking-widest text-white/50">
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
            </div>
            <input
                type="range" min="1" max="5" step="1"
                value={value || 3}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-[2px] bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-150"
            />
        </div>
    );
}

function GrowingTextarea({ register, name, placeholder }: { register: any, name: string, placeholder: string }) {
    const { ref, ...rest } = register(name);
    return (
        <textarea
            {...rest}
            ref={(e) => {
                ref(e);
                if (e) {
                    e.style.height = 'auto';
                    e.style.height = e.scrollHeight + 'px';
                }
            }}
            placeholder={placeholder}
            className="input-textarea"
            rows={1}
            onInput={(e: any) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
            }}
        />
    );
}

function CheckboxGrid({ options, selected = [], onChange, isDisabled }: { options: string[], selected: string[], onChange: (vals: string[]) => void, isDisabled?: boolean }) {
    const toggle = (opt: string) => {
        if (isDisabled) return;
        if (selected.includes(opt)) onChange(selected.filter(s => s !== opt));
        else onChange([...selected, opt]);
    };
    return (
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-2 mt-6 ${isDisabled ? 'pointer-events-none' : ''}`}>
            {options.map(opt => {
                const isSelected = selected.includes(opt);
                return (
                    <div
                        key={opt} onClick={() => toggle(opt)}
                        className={`cursor-pointer px-3 py-3 border transition-all duration-300 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wide
                            ${isSelected ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:bg-white/5'}
                        `}
                    >
                        <div className={`w-1.5 h-1.5 ${isSelected ? 'bg-black' : 'bg-white/20'}`} />
                        <span>{opt}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default function SiteBriefing() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const { register, handleSubmit, trigger, setValue, watch, formState: { errors } } = useForm<SiteBriefingData>({
        resolver: zodResolver(siteBriefingSchema),
        defaultValues: {
            main_objective: [],
            traffic_source: [],
            functionalities: [],
            visual_vibe: 3
        }
    });

    const watchAll = watch();

    // 1. Persistence - Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('primitiva_site_briefing');
        if (saved) {
            try {
                const { data, step } = JSON.parse(saved);
                // Set form values
                Object.keys(data).forEach((key) => {
                    setValue(key as any, data[key]);
                });
                // Set step (only if not success)
                if (!isSuccess && step) setCurrentStep(step);
            } catch (e) {
                console.error("Error loading saved form:", e);
            }
        }
    }, [setValue, isSuccess]);

    // 2. Persistence - Save to localStorage
    useEffect(() => {
        if (!isSuccess) {
            localStorage.setItem('primitiva_site_briefing', JSON.stringify({
                data: watchAll,
                step: currentStep
            }));
        }
    }, [watchAll, currentStep, isSuccess]);

    const activeFuncs = watch('functionalities') || [];
    const mainObjs = watch('main_objective') || [];
    const trafficSources = watch('traffic_source') || [];
    const cStatus = watch('content_status');
    const cms = watch('cms_needs');
    const vVibe = watch('visual_vibe') || 3;

    const totalSteps = 13;

    const nextStep = async () => {
        let fields: (keyof SiteBriefingData)[] = [];
        switch (currentStep) {
            case 1: fields = ['contact_name']; break;
            case 2: fields = ['company_name']; break;
            case 3: fields = ['main_objective']; break;
            case 4: fields = ['traffic_source']; break;
            case 5: fields = ['essential_pages']; break;
            case 6: fields = ['content_status']; break;
            case 8: fields = ['references']; break;
            case 9: fields = ['cms_needs']; break;
            case 11: fields = ['domain_hosting']; break;
            case 12: fields = ['deadline']; break;
        }

        const valid = fields.length > 0 ? await trigger(fields) : true;
        if (valid) {
            if (currentStep < totalSteps - 1) {
                // Enable transition protection to prevent accidental clicks
                setIsTransitioning(true);
                setCurrentStep(currentStep + 1);
                setTimeout(() => setIsTransitioning(false), 350);
            }
            else handleSubmit(onSubmit)();
        }
    };

    const prevStep = () => {
        if (currentStep > 1 && !isTransitioning) {
            setIsTransitioning(true);
            setCurrentStep(currentStep - 1);
            setTimeout(() => setIsTransitioning(false), 350);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            const el = document.activeElement as HTMLElement;
            if (el?.tagName === 'TEXTAREA') return;
            e.preventDefault();
            nextStep();
        }
    };

    const onSubmit = async (data: SiteBriefingData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'site',
                    data: data
                })
            });

            // 2. Save to database
            const dbResponse = await fetch('/api/briefings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: data,
                    type: 'site'
                })
            });

            if (response.ok && dbResponse.ok) {
                setIsSuccess(true);
                localStorage.removeItem('primitiva_site_briefing');
            } else {
                alert("Ocorreu um erro ao enviar. Tente novamente.");
            }
        } catch (err) {
            console.error(err);
            alert("Ocorreu um erro de conexão.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="font-display bg-[#0A0A0A] text-white h-dvh flex items-center justify-center p-6 text-center">
                <div className="max-w-4xl">
                    <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase">Obrigado!</h2>
                    <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">Recebemos seu formulário. <br></br>Entraremos em contato em breve.</p>
                    <Link href="/" className="inline-block border border-white/20 px-8 py-4 uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all">Página Inicial</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="font-display bg-[#0A0A0A] text-white h-dvh overflow-hidden flex flex-col" onKeyDown={handleKeyDown}>
            {/* Progress */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50">
                <div className="h-full bg-white transition-all duration-700 ease-out" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
            </div>

            {/* Header */}
            <div className="fixed top-8 left-8 z-50 pointer-events-none mix-blend-difference">
                <img src="/assets/primitiva/primitiva_logo.svg" alt="Primitiva" className="h-5 w-auto opacity-50" />
            </div>
            <div className="fixed top-8 right-8 z-50">
                <Link href="/start" className="text-white/40 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest flex items-center gap-2 group">
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> <span className="hidden md:inline">Cancelar</span>
                </Link>
            </div>

            {/* Top Gradient Overlay - prevents content from visually conflicting with header */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-[#0A0A0A] z-40 pointer-events-none" />
            <div className="fixed top-20 left-0 right-0 h-8 bg-gradient-to-b from-[#0A0A0A] to-transparent z-40 pointer-events-none" />

            <form onSubmit={(e) => e.preventDefault()} className="flex-1 flex flex-col px-8 md:px-32 pb-8 md:pb-16 pt-24 w-full max-w-4xl mx-auto overflow-y-auto">

                {/* 0. WELCOME INTRO */}
                {currentStep === 0 && (
                    <div className="flex flex-col items-start text-left step-enter w-full max-w-2xl my-auto">
                        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-6 block">Briefing</span>
                        <h1 className="text-3xl md:text-5xl font-normal font-serif italic tracking-tight mb-8 leading-[1.15]">
                            Desenvolvimento <br></br>Web & Tecnologia
                        </h1>
                        <p className="text-base md:text-lg text-white/40 font-light leading-relaxed animate-reveal-up delay-100 mb-12">
                            Para construir um site que realmente traga resultados, precisamos ir além da estética. Este briefing nos ajuda a mapear a jornada do seu usuário, definir prioridades técnicas e entender quais funcionalidades são críticas para o sucesso do seu negócio. Ele será o guia estratégico para cada decisão que tomaremos.
                        </p>
                        <button
                            onClick={nextStep}
                            className="btn-next h-[52px] flex items-center justify-center px-12 group"
                        >
                            Começar Ritual
                        </button>
                    </div>
                )}

                {/* 0. INTRO */}
                <StepContainer isActive={currentStep === 1} step={1}>
                    <StepHeader stepNumber="01" title="Intro" question="Olá. Com quem falamos?" />
                    <InputWithArrow register={register} name="contact_name" placeholder="Seu nome..." onNext={nextStep} autoComplete="off" />
                    <ErrorDisplay message={errors.contact_name?.message} />
                    <NavigationButtons onNext={nextStep} showBack={false} showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 2} step={2}>
                    <StepHeader stepNumber="02" title="Intro" question="E qual é o nome do projeto/empresa?" />
                    <InputWithArrow register={register} name="company_name" placeholder="Sua marca..." onNext={nextStep} autoComplete="off" />
                    <ErrorDisplay message={errors.company_name?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                {/* 1. ESTRATÉGIA */}
                <StepContainer isActive={currentStep === 3} step={3}>
                    <StepHeader stepNumber="03" title="Estratégia" question="Qual é o principal objetivo deste site?" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { id: 'E-commerce', label: 'Vender produtos (E-commerce)' },
                            { id: 'Leads', label: 'Gerar Orçamentos/Leads (Serviços)' },
                            { id: 'Portfólio', label: 'Portfólio / Credibilidade' },
                            { id: 'Conteúdo', label: 'Blog / Notícias' },
                        ].map(opt => (
                            <OptionCard
                                key={opt.id}
                                label={opt.label}
                                selected={mainObjs.includes(opt.id)}
                                onClick={() => {
                                    const next = mainObjs.includes(opt.id)
                                        ? mainObjs.filter(i => i !== opt.id)
                                        : [...mainObjs, opt.id];
                                    setValue('main_objective', next);
                                }}
                                isDisabled={isTransitioning}
                            />
                        ))}

                        <OptionCard
                            label="Outro..."
                            selected={mainObjs.includes('Outro')}
                            onClick={() => {
                                const next = mainObjs.includes('Outro')
                                    ? mainObjs.filter(i => i !== 'Outro')
                                    : [...mainObjs, 'Outro'];
                                setValue('main_objective', next);
                            }}
                            isDisabled={isTransitioning}
                        />

                        {mainObjs.includes('Outro') && (
                            <div className="md:col-span-2 border-b border-white border-opacity-50 pb-2 animate-reveal-up">
                                <input
                                    {...register('main_objective_other')}
                                    placeholder="Descreva o seu objetivo aqui..."
                                    className="input-text !text-2xl md:!text-4xl !border-none !p-0"
                                    autoFocus
                                />
                            </div>
                        )}
                    </div>
                    <ErrorDisplay message={errors.main_objective?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} />
                </StepContainer>

                <StepContainer isActive={currentStep === 4} step={4}>
                    <StepHeader stepNumber="04" title="Estratégia" question="Como as pessoas chegarão até o site?" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { id: 'Google Ads', label: 'Google Ads (Tráfego Pago)' },
                            { id: 'SEO', label: 'SEO (Busca Orgânica)' },
                            { id: 'Instagram', label: 'Instagram / Redes Sociais' },
                            { id: 'Indicação', label: 'Indicação / Boca a boca' },
                            { id: 'E-mail', label: 'E-mail Marketing' },
                        ].map(opt => (
                            <OptionCard
                                key={opt.id}
                                label={opt.label}
                                selected={trafficSources.includes(opt.id)}
                                onClick={() => {
                                    const current = trafficSources;
                                    const next = current.includes(opt.id)
                                        ? current.filter(i => i !== opt.id)
                                        : [...current, opt.id];
                                    setValue('traffic_source', next);
                                }}
                                isDisabled={isTransitioning}
                            />
                        ))}

                        <OptionCard
                            label="Outro..."
                            selected={trafficSources.includes('Outro')}
                            onClick={() => {
                                const current = trafficSources;
                                const next = current.includes('Outro')
                                    ? current.filter(i => i !== 'Outro')
                                    : [...current, 'Outro'];
                                setValue('traffic_source', next);
                            }}
                            isDisabled={isTransitioning}
                        />

                        {trafficSources.includes('Outro') && (
                            <div className="md:col-span-2 border-b border-white border-opacity-50 pb-2 animate-reveal-up">
                                <input
                                    {...register('traffic_source_other')}
                                    placeholder="Descreva outra fonte aqui..."
                                    className="input-text !text-2xl md:!text-4xl !border-none !p-0"
                                    autoFocus
                                />
                            </div>
                        )}
                    </div>
                    <ErrorDisplay message={errors.traffic_source?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} />
                </StepContainer>

                {/* 2. UX & CONTEÚDO */}
                <StepContainer isActive={currentStep === 5} step={5}>
                    <StepHeader stepNumber="05" title="UX" question="Quais páginas são essenciais?" />
                    <TextareaWithArrow register={register} name="essential_pages" placeholder="Ex: Contato, Sobre" onNext={nextStep} />
                    <ErrorDisplay message={errors.essential_pages?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 6} step={6}>
                    <StepHeader stepNumber="06" title="Conteúdo" question="Já tem os conteúdos para colocar no site?" />
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { id: 'Tudo Pronto', label: 'Tudo pronto e em alta qualidade (textos e imagens)' },
                            { id: 'Rascunhos', label: 'Tenho rascunhos, mas preciso de ajuda para finalizar' },
                            { id: 'Nada', label: 'Não tenho nada. Preciso de criação total.' },
                        ].map(opt => (
                            <OptionCard key={opt.id} label={opt.label} selected={cStatus === opt.id} onClick={() => { setValue('content_status', opt.id as any); nextStep(); }} isDisabled={isTransitioning} />
                        ))}

                        {cStatus === 'Outro' ? (
                            <div className="border-b border-white border-opacity-50 pb-2">
                                <input
                                    {...register('content_status_other')}
                                    placeholder="Explique a situação aqui..."
                                    className="input-text !text-2xl md:!text-4xl !border-none !p-0"
                                    autoFocus
                                />
                            </div>
                        ) : null}
                    </div>
                    <ErrorDisplay message={errors.content_status?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} />
                </StepContainer>

                {/* 3. UI */}
                <StepContainer isActive={currentStep === 7} step={7}>
                    <StepHeader stepNumber="07" title="Design" question="Vibe Visual & Motion:" />
                    <div className="w-full max-w-3xl mt-8">
                        <RangeSlider value={vVibe} onChange={(v) => setValue('visual_vibe', v)} leftLabel="Estático" rightLabel="Animado" />
                        <p className="text-[10px] text-white/30 uppercase tracking-widest mt-4">
                            Dica: Experiências muito animadas podem impactar levemente o tempo de carregamento.
                        </p>
                    </div>
                    <NavigationButtons onNext={nextStep} onBack={prevStep} />
                </StepContainer>

                <StepContainer isActive={currentStep === 8} step={8}>
                    <StepHeader stepNumber="08" title="Design" question="Tem referências de sites que você admira?" />
                    <TextareaWithArrow register={register} name="references" placeholder="Links e referências..." onNext={nextStep} />
                    <ErrorDisplay message={errors.references?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} onSkip={nextStep} showNext={false} />
                </StepContainer>

                {/* 4. TECH */}
                <StepContainer isActive={currentStep === 9} step={9}>
                    <StepHeader stepNumber="09" title="Tech" question="Nível de gerenciamento pós-lançamento" />
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { id: 'Total', label: 'Total: Quero mudar tudo sozinho (Textos, Imagens, Novas Páginas)' },
                            { id: 'Parcial', label: 'Parcial: Apenas Blog / Cases. O resto pode ser fixo.' },
                            { id: 'Zero', label: 'Zero: Não pretendo mexer. Foco em performance máxima.' },
                        ].map(opt => (
                            <OptionCard key={opt.id} label={opt.label} selected={cms === opt.id} onClick={() => { setValue('cms_needs', opt.id as any); nextStep(); }} isDisabled={isTransitioning} />
                        ))}
                    </div>
                    <ErrorDisplay message={errors.cms_needs?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} />
                </StepContainer>

                <StepContainer isActive={currentStep === 10} step={10}>
                    <StepHeader stepNumber="10" title="Tech" question="Integrações e Funcionalidades:" />
                    <CheckboxGrid
                        options={['Forms (RD/Active)', 'Área Restrita / Login', 'Multi-idioma', 'Busca Interna', 'Dark Mode Nativo', 'Integração de API', 'Outro']}
                        selected={activeFuncs}
                        onChange={(vals) => setValue('functionalities', vals)}
                        isDisabled={isTransitioning}
                    />
                    {activeFuncs.includes('Outro') && (
                        <div className="mt-8 border-b border-white border-opacity-50 pb-2">
                            <input {...register('functionalities_other')} placeholder="Quais outras funcionalidades? Digite aqui..." className="input-text !text-xl md:!text-3xl !border-none !p-0" autoFocus />
                        </div>
                    )}
                    <NavigationButtons onNext={nextStep} onBack={prevStep} />
                </StepContainer>

                {/* 5. FINAL */}
                <StepContainer isActive={currentStep === 11} step={11}>
                    <StepHeader stepNumber="11" title="Logística" question="Já possui domínio e hospedagem?" />
                    <InputWithArrow register={register} name="domain_hosting" placeholder="Se sim, onde?" onNext={nextStep} />
                    <ErrorDisplay message={errors.domain_hosting?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} onSkip={nextStep} skipLabel="Ainda não" showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 12} step={12}>
                    <StepHeader stepNumber="12" title="Logística" question="Existe uma data crítica para lançamento?" />
                    <InputWithArrow register={register} name="deadline" placeholder="Se sim, quando?" onNext={nextStep} showArrow={false} />
                    <ErrorDisplay message={errors.deadline?.message} />
                    <NavigationButtons nextLabel={isSubmitting ? "Enviando..." : "Finalizar"} onNext={nextStep} onBack={prevStep} isSubmitting={isSubmitting} />
                </StepContainer>

            </form>

            <style jsx global>{`
                .input-text { width: 100%; background: transparent; border: none; border-bottom: 2px solid rgba(255,255,255,0.1); padding-top: 1rem; padding-bottom: 1rem; padding-left: 0; font-size: 2rem; color: white; outline: none; transition: all 0.3s ease; font-weight: 300; border-radius: 0; }
                .input-text:focus { border-bottom-color: white; caret-color: white; outline: none !important; box-shadow: none !important; }
                .input-text::placeholder { color: rgba(255,255,255,0.2); }
                
                .input-textarea { width: 100%; background: transparent; border: none; border-bottom: 2px solid rgba(255,255,255,0.1); padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0; font-size: 1.5rem; line-height: 1.5; color: white; resize: none; outline: none; transition: border-color 0.3s ease; font-weight: 300; border-radius: 0; min-height: 40px; overflow: hidden; }
                .input-textarea:focus { border-bottom-color: white; caret-color: white; outline: none !important; box-shadow: none !important; }
                .input-textarea::placeholder { color: rgba(255,255,255,0.2); }
                
                .serif { font-family: var(--font-instrument-serif), serif; }
                @media (min-width: 768px) { 
                    .input-text { font-size: 3rem; } 
                    .input-textarea { font-size: 2rem; }
                }

                .step-enter { animation: stepEnter 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
                @keyframes stepEnter { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                
                .btn-next {
                    background: white;
                    color: black;
                    padding: 1rem 2rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    transition: all 0.3s ease;
                }
                .btn-next:hover:not(:disabled) {
                    transform: scale(1.05);
                    background: #f0f0f0;
                }
                .btn-next:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
                
                html { scroll-behavior: smooth; }
            `}</style>
        </div>
    );
}
