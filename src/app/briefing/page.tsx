'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Steps
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import Step7 from './steps/Step7';
import Step8 from './steps/Step8';
import Step9 from './steps/Step9';
import Step10 from './steps/Step10';

const formSchema = z.object({
    nome: z.string().min(3, 'Por favor, insira seu nome').trim(),
    empresa: z.string().min(2, 'Por favor, insira o nome da sua empresa').trim(),
    email: z.string().email('Por favor, insira um e-mail válido'),
    whatsapp: z.string().min(14, 'Por favor, insira um telefone válido com DDD'),
    servico: z.string().min(1, 'Por favor, selecione um serviço'),
    investimento: z.string().min(1, 'Por favor, selecione uma faixa de investimento'),
    prazo: z.string().min(1, 'Por favor, selecione um prazo'),
    descricao: z.string().min(10, 'Por favor, fale um pouco mais sobre o projeto').trim(),
    referencia: z.string().optional(),
    origem: z.string().min(1, 'Por favor, selecione como nos conheceu')
});

type BriefingFormData = z.infer<typeof formSchema>;

export default function Briefing() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmittingInternal, setIsSubmittingInternal] = useState(false);
    const totalSteps = 10;

    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        watch,
        formState: { errors }
    } = useForm<BriefingFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: '',
            empresa: '',
            email: '',
            whatsapp: '',
            servico: '',
            investimento: '',
            prazo: '',
            descricao: '',
            referencia: '',
            origem: ''
        }
    });

    const formData = watch();

    // Get current step error
    const getCurrentError = () => {
        const stepFields: Record<number, keyof BriefingFormData> = {
            1: 'nome',
            2: 'empresa',
            3: 'email',
            4: 'whatsapp',
            5: 'servico',
            6: 'investimento',
            7: 'prazo',
            8: 'descricao',
            9: 'referencia',
            10: 'origem'
        };
        const field = stepFields[currentStep];
        if (!field) return undefined;
        return errors[field]?.message;
    };

    // Calculate progress width
    const progressWidth = currentStep > totalSteps ? '100%' : `${((currentStep - 1) / totalSteps) * 100}%`;

    const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const masked = value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/g, "($1) $2")
            .replace(/(\d)(\d{4})$/, "$1-$2")
            .substring(0, 15);
        setValue('whatsapp', masked, { shouldValidate: true });
    };

    const nextStep = async () => {
        const stepFields: Record<number, (keyof BriefingFormData)[]> = {
            1: ['nome'],
            2: ['empresa'],
            3: ['email'],
            4: ['whatsapp'],
            5: ['servico'],
            6: ['investimento'],
            7: ['prazo'],
            8: ['descricao'],
            9: ['referencia'],
            10: ['origem']
        };

        const isStepValid = await trigger(stepFields[currentStep]);

        if (isStepValid) {
            if (currentStep <= totalSteps) {
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const selectOption = (name: keyof BriefingFormData, value: string) => {
        setValue(name, value, { shouldValidate: true });
        if (currentStep < totalSteps) {
            setTimeout(() => nextStep(), 500);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const activeEl = document.activeElement as HTMLElement | null;
            if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
                if (activeEl.tagName === 'TEXTAREA') return;

                e.preventDefault();
                if (currentStep < totalSteps) {
                    nextStep();
                }
            }
        }
    };

    const onSubmit = async (data: BriefingFormData) => {
        setIsSubmittingInternal(true);

        try {
            const emailDestino = "heyprimitiva@gmail.com";
            const response = await fetch(`https://formsubmit.co/ajax/${emailDestino}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Novo Briefing Primitiva: ${data.empresa}`,
                    _template: 'table',
                    _captcha: 'false',
                    ...data
                })
            });

            if (response.ok) {
                setCurrentStep(11);
            }
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmittingInternal(false);
        }
    };

    // Auto-focus logic
    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
            if (currentStepEl) {
                const input = currentStepEl.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null;
                if (input) input.focus();
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [currentStep]);

    const currentError = getCurrentError();

    return (
        <div className="font-display bg-[#0A0A0A] text-white min-h-screen overflow-hidden selection:bg-white selection:text-black" onKeyDown={handleKeyDown}>
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-[2px] bg-white/10 z-50">
                <div
                    className="h-full bg-white transition-all duration-500 ease-out"
                    style={{ width: progressWidth }}
                ></div>
            </div>

            {/* Exit Link */}
            <Link href="/contato"
                className="fixed top-8 left-8 z-50 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-mono uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">close</span> Sair
            </Link>

            {/* Logo */}
            <img src="/assets/primitiva/primitiva_logo.svg" alt="Logo Primitiva" className="fixed top-8 right-8 z-50 h-5 w-auto"
                fetchPriority="high" width="100" height="20" />

            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 h-screen w-full flex items-center justify-center px-6 md:px-24">

                {currentStep === 1 && <Step1 register={register} onNext={nextStep} error={currentError} />}
                {currentStep === 2 && <Step2 register={register} onNext={nextStep} onBack={prevStep} error={currentError} />}
                {currentStep === 3 && <Step3 register={register} onNext={nextStep} onBack={prevStep} error={currentError} />}
                {currentStep === 4 && <Step4 register={register} onNext={nextStep} onBack={prevStep} handleWhatsAppChange={handleWhatsAppChange} error={currentError} />}
                {currentStep === 5 && <Step5 selectedValue={formData.servico} onSelect={(v) => selectOption('servico', v)} onNext={nextStep} onBack={prevStep} error={currentError} />}
                {currentStep === 6 && <Step6 selectedValue={formData.investimento} onSelect={(v) => selectOption('investimento', v)} onNext={nextStep} onBack={prevStep} error={currentError} />}
                {currentStep === 7 && <Step7 selectedValue={formData.prazo} onSelect={(v) => selectOption('prazo', v)} onNext={nextStep} onBack={prevStep} error={currentError} />}
                {currentStep === 8 && <Step8 register={register} onNext={nextStep} onBack={prevStep} error={currentError} />}
                {currentStep === 9 && <Step9 register={register} onNext={nextStep} onBack={prevStep} error={currentError} />}
                {currentStep === 10 && <Step10 selectedValue={formData.origem} onSelect={(v) => selectOption('origem', v)} onBack={prevStep} isSubmitting={isSubmittingInternal} error={currentError} />}

                {/* Step Final: Sucesso */}
                {currentStep === 11 && (
                    <div className="step-container active flex flex-col items-center justify-center w-full max-w-4xl text-center">
                        <h2 className="text-5xl md:text-8xl font-black mb-8 serif tracking-tighter">OBRIGADO!</h2>
                        <p className="text-xl text-white/60 mb-12">Recebemos seus dados. Em breve entraremos em contato para darmos vida ao seu projeto.</p>
                        <Link href="/"
                            className="inline-block border border-white/20 px-8 py-4 uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all">Voltar
                            para Home</Link>
                    </div>
                )}
            </form>

            <style jsx global>{`
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
                
                @keyframes stepEnter {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .step-enter {
                    animation: stepEnter 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
            `}</style>
        </div>
    );
}
