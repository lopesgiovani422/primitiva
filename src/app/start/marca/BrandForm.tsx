'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';

// Common Components Reuse
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay, InputWithArrow, TextareaWithArrow } from '../../briefing/components/Common';

// --- SCHEMA ---
const brandBriefingSchema = z.object({
    // 0. INTRO
    contact_name: z.string().min(2, 'Por favor, seu nome.').trim(),
    company_name: z.string().min(2, 'Nome da marca é obrigatório.').trim(),
    years_in_business: z.string().optional(),

    // 1. DEEP WHY
    origin_story: z.string().min(10, 'Conte um pouco mais sobre a origem...').trim(),
    main_values: z.string().min(5, 'Quais os valores inegociáveis?').trim(),
    transformative_impact: z.string().min(5, 'O que a marca transforma?').trim(),
    vision_future: z.string().min(5, 'Como vê a marca em 5-10 anos?').trim(),

    // 2. PUBLICO
    // Split Demographics
    audience_class: z.string().min(2, 'Classe social?').trim(),
    audience_age: z.string().min(2, 'Faixa etária?').trim(),
    audience_gender: z.string().min(2, 'Gênero predominante?').trim(),

    dream_client_psychographics: z.string().min(10, 'Hábitos, medos, estilo de vida...').trim(),

    // 3. PERSONALIDADE
    brand_personality_traits: z.array(z.string()).optional(),
    brand_personality_traits_other: z.string().optional(),
    top_3_traits: z.string().min(2, 'Cite as 3 principais.').trim(),
    brand_not_person: z.array(z.string()).optional(),
    brand_not_person_other: z.string().optional(),

    // Sliders
    personality_s1: z.number().optional(),
    personality_s2: z.number().optional(),
    personality_s3: z.number().optional(),
    personality_s4: z.number().optional(),
    personality_s5: z.number().optional(),

    brand_analogy: z.string().min(5, 'Se a marca fosse...').trim(),

    // 4. FECHAMENTO (Renumbered)
    touchpoints: z.array(z.string()).optional(),
    touchpoints_other: z.string().optional(),
    final_considerations: z.string().optional()
});

type BrandBriefingData = z.infer<typeof brandBriefingSchema>;

// Custom Components
function RangeSlider({ label, value, onChange, leftLabel, rightLabel }: { label: string, value: number, onChange: (val: number) => void, leftLabel: string, rightLabel: string }) {
    return (
        <div className="mb-8">
            <div className="flex justify-between mb-4 font-mono text-[10px] uppercase tracking-widest text-white/50">
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
            </div>
            <input
                type="range"
                min="1"
                max="5"
                step="1"
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

function CheckboxGrid({ options, selected = [], onChange, limit, isDisabled }: { options: string[], selected: string[], onChange: (vals: string[]) => void, limit?: number, isDisabled?: boolean }) {
    const toggle = (opt: string) => {
        if (isDisabled) return;
        if (selected.includes(opt)) onChange(selected.filter(s => s !== opt));
        else {
            if (limit && selected.length >= limit) return;
            onChange([...selected, opt]);
        }
    };

    return (
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar ${isDisabled ? 'pointer-events-none' : ''}`}>
            {options.map(opt => {
                const isSelected = selected.includes(opt);
                return (
                    <div
                        key={opt}
                        onClick={() => toggle(opt)}
                        className={`cursor-pointer px-3 py-2 border transition-all duration-300 flex items-center gap-2 text-xs font-medium uppercase tracking-wide
                            ${isSelected ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:bg-white/5'}
                        `}
                    >
                        <div className={`w-2 h-2 ${isSelected ? 'bg-black' : 'bg-white/20'}`} />
                        <span>{opt}</span>
                    </div>
                );
            })}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
            `}</style>
        </div>
    );
}

const ADJECTIVES_LIST = [
    'Sofisticada', 'Minimalista', 'Ousada', 'Tradicional', 'Futurista', 'Humana',
    'Técnica', 'Divertida', 'Séria', 'Elegante', 'Acessível', 'Exclusiva',
    'Rebelde', 'Confiável', 'Criativa', 'Apaixonada', 'Discreta', 'Vibrante',
    'Industrial', 'Orgânica', 'Nostálgica', 'Luxuosa', 'Prática', 'Sonhadora',
    'Agressiva', 'Pacífica', 'Líder', 'Parceira', 'Jovem', 'Madura', 'Nerd',
    'Artística', 'Analítica', 'Rústica', 'Clean', 'Complexa', 'Simples'
];

export default function BrandBriefing() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        watch,
        formState: { errors }
    } = useForm<BrandBriefingData>({
        resolver: zodResolver(brandBriefingSchema),
        defaultValues: {
            brand_personality_traits: [],
            brand_not_person: [],
            touchpoints: [],
            personality_s1: 3, personality_s2: 3, personality_s3: 3, personality_s4: 3, personality_s5: 3,
        }
    });

    const watchAll = watch();

    // 1. Persistence - Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('primitiva_marca_briefing');
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
            localStorage.setItem('primitiva_marca_briefing', JSON.stringify({
                data: watchAll,
                step: currentStep
            }));
        }
    }, [watchAll, currentStep, isSuccess]);

    const traits = watch('brand_personality_traits') || [];
    const notTraits = watch('brand_not_person') || [];
    const points = watch('touchpoints') || [];
    const audience_gender = watch('audience_gender');
    const audience_class = watch('audience_class');
    const audience_age = watch('audience_age');

    // Sliders
    const s1 = watch('personality_s1');
    const s2 = watch('personality_s2');
    const s3 = watch('personality_s3');
    const s4 = watch('personality_s4');
    const s5 = watch('personality_s5');

    const totalSteps = 19;

    const nextStep = async () => {
        let fields: (keyof BrandBriefingData)[] = [];

        switch (currentStep) {
            case 1: fields = ['contact_name']; break;
            case 2: fields = ['company_name']; break;
            case 4: fields = ['origin_story']; break;
            case 5: fields = ['main_values']; break;
            case 6: fields = ['transformative_impact']; break;
            case 7: fields = ['vision_future']; break;
            case 8: fields = ['audience_class']; break;
            case 9: fields = ['audience_age']; break;
            case 10: fields = ['audience_gender']; break;
            case 11: fields = ['dream_client_psychographics']; break;
            case 13: fields = ['top_3_traits']; break;
            case 15: fields = ['brand_analogy']; break;
        }

        const valid = fields.length > 0 ? await trigger(fields) : true;

        if (valid && !isTransitioning) {
            setIsTransitioning(true);
            if (currentStep < totalSteps - 1) {
                setCurrentStep(currentStep + 1);
                setTimeout(() => setIsTransitioning(false), 400);
            } else {
                handleSubmit(onSubmit)();
                setIsTransitioning(false);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1 && !isTransitioning) {
            setIsTransitioning(true);
            setCurrentStep(currentStep - 1);
            setTimeout(() => setIsTransitioning(false), 400);
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

    const onSubmit = async (data: BrandBriefingData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'brand',
                    data: data
                })
            });

            // 2. Save to database
            const dbResponse = await fetch('/api/briefings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: data,
                    type: 'brand'
                })
            });

            if (response.ok && dbResponse.ok) {
                setIsSuccess(true);
                localStorage.removeItem('primitiva_marca_briefing');
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

    // Auto Focus
    useEffect(() => {
        const t = setTimeout(() => {
            const el = document.querySelector(`[data-step="${currentStep}"] input, [data-step="${currentStep}"] textarea`) as HTMLElement;
            if (el) el.focus();
        }, 400);
        return () => clearTimeout(t);
    }, [currentStep]);

    if (isSuccess) {
        return (
            <div className="font-display bg-[#0A0A0A] text-white h-dvh flex items-center justify-center p-6 text-center">
                <div className="max-w-4xl">
                    <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase">Obrigado!</h2>
                    <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">Toda a essência da sua marca foi captada. <br></br>Entraremos em contato em breve.</p>
                    <Link href="/" className="inline-block border border-white/20 px-8 py-4 uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all">Página Inicial</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="font-display bg-[#0A0A0A] text-white h-dvh overflow-hidden flex flex-col" onKeyDown={handleKeyDown}>
            {/* Progress */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50">
                <div
                    className="h-full bg-white transition-all duration-700 ease-out"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
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

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className="flex-1 flex flex-col px-8 md:px-32 pb-8 md:pb-16 pt-24 w-full max-w-4xl mx-auto overflow-y-auto">

                {/* 0. WELCOME INTRO */}
                {currentStep === 0 && (
                    <div className="flex flex-col items-start text-left step-enter w-full max-w-2xl my-auto">
                        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-6 block">Briefing</span>
                        <h1 className="text-3xl md:text-5xl font-normal font-serif italic tracking-tight mb-8 leading-[1.15]">
                            Identidade Visual<br></br> & Branding
                        </h1>
                        <p className="text-base md:text-lg text-white/40 font-light leading-relaxed animate-reveal-up delay-100 mb-12">
                            O briefing é a fase mais importante do projeto. Ele serve para alinhar expectativas, entender profundamente os objetivos do seu negócio e garantir que a estratégia visual seja fundamentada em clareza. Suas respostas nos darão a base necessária para materializar sua visão com precisão.
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
                    <StepHeader stepNumber="02" title="Intro" question="E qual é o nome da marca para este projeto?" />
                    <InputWithArrow register={register} name="company_name" placeholder="Sua marca..." onNext={nextStep} autoComplete="off" />
                    <ErrorDisplay message={errors.company_name?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 3} step={3}>
                    <StepHeader stepNumber="03" title="Intro" question="Há quanto tempo a empresa existe?" />
                    <InputWithArrow register={register} name="years_in_business" placeholder="Ex: 5 anos" onNext={nextStep} autoComplete="off" />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                {/* 1. DEEP WHY */}
                <StepContainer isActive={currentStep === 4} step={4}>
                    <StepHeader stepNumber="04" title="Essência" question="Qual foi a história ou motivo para começar?" />
                    <TextareaWithArrow register={register} name="origin_story" placeholder="Tudo começou..." onNext={nextStep} />
                    <ErrorDisplay message={errors.origin_story?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 5} step={5}>
                    <StepHeader stepNumber="05" title="Essência" question="Quais são os principais valores inegociáveis que ela defende?" />
                    <TextareaWithArrow register={register} name="main_values" placeholder="Valores principais..." onNext={nextStep} />
                    <ErrorDisplay message={errors.main_values?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 6} step={6}>
                    <StepHeader stepNumber="06" title="Essência" question="O que a marca entrega ou transforma na vida das pessoas?" />
                    <TextareaWithArrow register={register} name="transformative_impact" placeholder="Seu propósito..." onNext={nextStep} />
                    <ErrorDisplay message={errors.transformative_impact?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 7} step={7}>
                    <StepHeader stepNumber="07" title="Visão" question="Como você vê a empresa em 5 ou 10 anos?" />
                    <TextareaWithArrow register={register} name="vision_future" placeholder="Sua visão..." onNext={nextStep} />
                    <ErrorDisplay message={errors.vision_future?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                {/* 2. PÚBLICO */}
                <StepContainer isActive={currentStep === 8} step={8}>
                    <StepHeader stepNumber="08" title="Tribo" question="Qual a classe social predominante do seu público?" />
                    <div className="flex flex-col gap-6 mt-8 w-full max-w-xl">
                        <div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                {['Classe A (Alto)', 'Classe B (Médio-Alto)', 'Classe C (Médio)', 'Classe D/E (Básico)'].map(opt => {
                                    const [mainLabel, subLabel] = opt.split('(');
                                    return (
                                        <div
                                            key={opt}
                                            onClick={() => {
                                                if (isTransitioning) return;
                                                setValue('audience_class', opt, { shouldValidate: true });
                                                nextStep();
                                            }}
                                            className={`cursor-pointer px-3 py-3 border text-center text-xs font-medium uppercase tracking-wide transition-all duration-300
                                                    ${audience_class === opt ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:bg-white/5'}
                                                    ${isTransitioning ? 'pointer-events-none' : ''}
                                                `}
                                        >
                                            {mainLabel?.trim() || ''} <br />
                                            {subLabel && (
                                                <span className="opacity-50 text-[10px] normal-case">
                                                    {subLabel.replace(')', '')}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <input type="hidden" {...register('audience_class')} />
                            <ErrorDisplay message={errors.audience_class?.message} />
                        </div>
                    </div>
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 9} step={9}>
                    <StepHeader stepNumber="09" title="Tribo" question="Qual a faixa etária principal?" />
                    <div className="flex flex-col gap-6 mt-8 w-full max-w-xl">
                        <div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                                {['< 18 anos', '18-24 anos', '25-34 anos', '35-44 anos', '45-60 anos', '60+ anos'].map(opt => (
                                    <div
                                        key={opt}
                                        onClick={() => {
                                            if (isTransitioning) return;
                                            setValue('audience_age', opt, { shouldValidate: true });
                                            nextStep();
                                        }}
                                        className={`cursor-pointer px-2 py-3 border text-center text-xs font-medium uppercase tracking-wide transition-all duration-300
                                            ${audience_age === opt ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:bg-white/5'}
                                            ${isTransitioning ? 'pointer-events-none' : ''}
                                        `}
                                    >
                                        {opt}
                                    </div>
                                ))}
                            </div>
                            <input type="hidden" {...register('audience_age')} />
                            <ErrorDisplay message={errors.audience_age?.message} />
                        </div>
                    </div>
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 10} step={10}>
                    <StepHeader stepNumber="10" title="Tribo" question="Qual o gênero predominante?" />
                    <div className="flex flex-col gap-6 mt-8 w-full max-w-xl">
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {['Feminino', 'Masculino', 'Ambos / Neutro'].map(opt => (
                                    <div
                                        key={opt}
                                        onClick={() => {
                                            if (isTransitioning) return;
                                            setValue('audience_gender', opt, { shouldValidate: true });
                                            nextStep();
                                        }}
                                        className={`cursor-pointer px-4 py-3 border text-center text-sm font-medium transition-all duration-300
                                            ${audience_gender === opt ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:bg-white/5'}
                                            ${isTransitioning ? 'pointer-events-none' : ''}
                                        `}
                                    >
                                        {opt}
                                    </div>
                                ))}
                            </div>
                            <input type="hidden" {...register('audience_gender')} />
                            <ErrorDisplay message={errors.audience_gender?.message} />
                        </div>
                    </div>
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 11} step={11}>
                    <StepHeader stepNumber="11" title="Tribo" question="Quem são eles? (Hábitos, interesses, estilo de vida)." />
                    <TextareaWithArrow register={register} name="dream_client_psychographics" placeholder="Habitos e interesses" onNext={nextStep} />
                    <ErrorDisplay message={errors.dream_client_psychographics?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                {/* 3. PERSONALIDADE */}
                <StepContainer isActive={currentStep === 12} step={12}>
                    <StepHeader stepNumber="12" title="Persona" question="Se sua empresa fosse uma pessoa, como ela seria?" />
                    <p className="text-white/40 text-sm mb-4">Selecione todas que se aplicam.</p>
                    <CheckboxGrid
                        options={[...ADJECTIVES_LIST, 'Outro']}
                        selected={traits}
                        onChange={(vals) => setValue('brand_personality_traits', vals)}
                        isDisabled={isTransitioning}
                    />
                    {traits.includes('Outro') && (
                        <div className="mt-8 border-b border-white border-opacity-50 pb-2">
                            <input {...register('brand_personality_traits_other')} placeholder="Outros traços..." className="input-text !text-xl md:!text-3xl !border-none !p-0" autoFocus />
                        </div>
                    )}
                    <NavigationButtons onNext={nextStep} onBack={prevStep} />
                </StepContainer>

                <StepContainer isActive={currentStep === 13} step={13}>
                    <StepHeader stepNumber="13" title="Persona" question="Desses adjetivos, quais são os top 3 mais fortes?" />
                    <InputWithArrow register={register} name="top_3_traits" placeholder="Top 3 traços..." onNext={nextStep} />
                    <ErrorDisplay message={errors.top_3_traits?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 14} step={14}>
                    <StepHeader stepNumber="14" title="Persona" question="E como ela NÃO seria?" />
                    <CheckboxGrid
                        options={[...ADJECTIVES_LIST, 'Outro']}
                        selected={notTraits}
                        onChange={(vals) => setValue('brand_not_person', vals)}
                        isDisabled={isTransitioning}
                    />
                    {notTraits.includes('Outro') && (
                        <div className="mt-8 border-b border-white border-opacity-50 pb-2">
                            <input {...register('brand_not_person_other')} placeholder="O que ela não é?" className="input-text !text-xl md:!text-3xl !border-none !p-0" autoFocus />
                        </div>
                    )}
                    <NavigationButtons onNext={nextStep} onBack={prevStep} />
                </StepContainer>

                <StepContainer isActive={currentStep === 15} step={15}>
                    <StepHeader stepNumber="15" title="Persona" question="Se a marca fosse um lugar, objeto ou estilo musical..." />
                    <TextareaWithArrow register={register} name="brand_analogy" placeholder="Ex: Jazz e Cabernet" onNext={nextStep} />
                    <ErrorDisplay message={errors.brand_analogy?.message} />
                    <NavigationButtons onNext={nextStep} onBack={prevStep} showNext={false} />
                </StepContainer>

                <StepContainer isActive={currentStep === 16} step={16}>
                    <StepHeader stepNumber="16" title="Calibragem" question="Ajuste fino da personalidade:" />
                    <div className="w-full max-w-3xl mt-8">
                        <RangeSlider label="1" value={s1 || 3} onChange={(v) => setValue('personality_s1', v)} leftLabel="Tradicional" rightLabel="Disruptiva" />
                        <RangeSlider label="2" value={s2 || 3} onChange={(v) => setValue('personality_s2', v)} leftLabel="Brincalhona" rightLabel="Séria" />
                        <RangeSlider label="3" value={s3 || 3} onChange={(v) => setValue('personality_s3', v)} leftLabel="Acessível" rightLabel="Exclusiva" />
                        <RangeSlider label="4" value={s4 || 3} onChange={(v) => setValue('personality_s4', v)} leftLabel="Sutil / Minimal" rightLabel="Vibrante" />
                        <RangeSlider label="5" value={s5 || 3} onChange={(v) => setValue('personality_s5', v)} leftLabel="Tecnológica" rightLabel="Humana" />
                    </div>
                    <NavigationButtons onNext={nextStep} onBack={prevStep} />
                </StepContainer>

                <StepContainer isActive={currentStep === 17} step={17}>
                    <StepHeader stepNumber="17" title="Entrega" question="Onde a identidade será aplicada principalmente?" />
                    <CheckboxGrid
                        options={['Instagram', 'Site / App', 'Embalagens', 'Papelaria', 'Loja Física', 'Eventos', 'Uniforme', 'Outro']}
                        selected={points}
                        onChange={(vals) => setValue('touchpoints', vals)}
                        isDisabled={isTransitioning}
                    />
                    {points.includes('Outro') && (
                        <div className="mt-8 border-b border-white border-opacity-50 pb-2">
                            <input {...register('touchpoints_other')} placeholder="Onde mais?" className="input-text !text-xl md:!text-3xl !border-none !p-0" autoFocus />
                        </div>
                    )}
                    <NavigationButtons onNext={nextStep} onBack={prevStep} />
                </StepContainer>


                {/* 5. FIM */}
                <StepContainer isActive={currentStep === 18} step={18}>
                    <StepHeader stepNumber="18" title="Fim" question="Algo mais? Alguma intuição ou ideia final?" />
                    <TextareaWithArrow register={register} name="final_considerations" placeholder="Espaço livre..." onNext={handleSubmit(onSubmit)} showArrow={false} />
                    <NavigationButtons
                        nextLabel={isSubmitting ? "Enviando..." : "Finalizar"}
                        onNext={handleSubmit(onSubmit)}
                        onBack={prevStep}
                        isSubmitting={isSubmitting}
                    />
                </StepContainer>

            </form>

            <style jsx global>{`
                .input-text { width: 100%; background: transparent; border: none; border-bottom: 2px solid rgba(255,255,255,0.1); padding-top: 1rem; padding-bottom: 1rem; padding-left: 0; font-size: 2rem; color: white; outline: none; transition: all 0.3s ease; font-weight: 300; border-radius: 0; }
                .input-text:focus { border-bottom-color: white; caret-color: white; outline: none !important; box-shadow: none !important; }
                .input-text::placeholder { color: rgba(255,255,255,0.2); }
                
                .input-textarea { width: 100%; background: transparent; border: none; border-bottom: 2px solid rgba(255,255,255,0.1); padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0; font-size: 1.5rem; line-height: 1.5; color: white; resize: none; outline: none; transition: border-color 0.3s ease; font-weight: 300; border-radius: 0; min-height: 40px; overflow: hidden; }
                .input-textarea:focus { border-bottom-color: white; caret-color: white; outline: none !important; box-shadow: none !important; }
                .input-textarea::placeholder { color: rgba(255,255,255,0.2); }
                
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
