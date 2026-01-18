'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Briefing() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
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
    });
    const [toast, setToast] = useState({ show: false, message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const totalSteps = 10;

    // Calculate progress width
    const progressWidth = currentStep > totalSteps ? '100%' : `${((currentStep - 1) / totalSteps) * 100}%`;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const showNotification = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    const nextStep = () => {
        // Validation for required fields
        const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
        if (currentStepEl) {
            const requiredInputs = currentStepEl.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            requiredInputs.forEach(input => {
                if (!input.value) isValid = false;
            });

            if (!isValid && currentStep <= totalSteps) {
                showNotification('Por favor, preencha este campo para continuar.');
                return;
            }
        }

        if (currentStep <= totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const selectOption = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setTimeout(() => nextStep(), 500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const activeEl = document.activeElement;
            if (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') {
                e.preventDefault();
                nextStep();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // ENVIO PARA O E-MAIL (Usando FormSubmit.co)
            // IMPORTANTE: Na primeira vez que testar, você receberá um email de confirmação no endereço abaixo para ativar.
            const emailDestino = "giovaniblopes@outlook.com"; // <--- COLOQUE SEU EMAIL AQUI

            const response = await fetch(`https://formsubmit.co/ajax/${emailDestino}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Novo Briefing Primitiva: ${formData.empresa}`,
                    _template: 'table',
                    _captcha: 'false',
                    ...formData
                })
            });

            if (response.ok) {
                setCurrentStep(11); // Success step
            } else {
                showNotification("Erro ao enviar. Verifique o email configurado.");
            }
        } catch (error) {
            showNotification("Erro de conexão. Tente novamente.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Auto-focus logic
    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
            if (currentStepEl) {
                const input = currentStepEl.querySelector('input, textarea');
                if (input) input.focus();
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [currentStep]);


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

            <form onSubmit={handleSubmit} className="relative z-10 h-screen w-full flex items-center justify-center px-6 md:px-24">

                {/* Steps */}
                {/* Step 1: Nome */}
                <StepContainer isActive={currentStep === 1} step={1}>
                    <StepHeader stepNumber="01" title="O Início" question="Primeiro, como podemos te chamar?" />
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                        className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                        autoFocus
                    />
                    <div className="mt-12 flex items-center gap-4">
                        <button type="button" onClick={nextStep} className="btn-next">Próximo</button>
                        <span className="text-[10px] font-mono text-white/30 hidden md:block">Pressione ENTER</span>
                    </div>
                </StepContainer>

                {/* Step 2: Empresa */}
                <StepContainer isActive={currentStep === 2} step={2}>
                    <StepHeader stepNumber="02" title="A Marca" question="Qual o nome da sua empresa ou projeto?" />
                    <input type="text" name="empresa" value={formData.empresa} onChange={handleInputChange} placeholder="Ex: Primitiva Studio" required
                        className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                    />
                    <div className="mt-12 flex items-center gap-4">
                        <button type="button" onClick={nextStep} className="btn-next">Próximo</button>
                        <span className="text-[10px] font-mono text-white/30 hidden md:block">Pressione ENTER</span>
                    </div>
                </StepContainer>

                {/* Step 3: Email */}
                <StepContainer isActive={currentStep === 3} step={3}>
                    <StepHeader stepNumber="03" title="Contato" question="Qual seu melhor e-mail?" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="nome@exemplo.com" required
                        className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                    />
                    <div className="mt-12 flex items-center gap-4">
                        <button type="button" onClick={nextStep} className="btn-next">Próximo</button>
                    </div>
                </StepContainer>

                {/* Step 4: WhatsApp */}
                <StepContainer isActive={currentStep === 4} step={4}>
                    <StepHeader stepNumber="04" title="Conexão" question="Seu WhatsApp para um papo rápido?" />
                    <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="(00) 00000-0000"
                        className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                    />
                    <div className="mt-12 flex items-center gap-4">
                        <button type="button" onClick={nextStep} className="btn-next">Próximo</button>
                        <button type="button" onClick={nextStep}
                            className="text-xs font-mono text-white/40 hover:text-white uppercase tracking-widest decoration-1 underline underline-offset-4">Pular
                            este passo</button>
                    </div>
                </StepContainer>

                {/* Step 5: Serviços */}
                <StepContainer isActive={currentStep === 5} step={5}>
                    <StepHeader stepNumber="05" title="O Ritual" question="No que vamos trabalhar juntos?" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {['Branding', 'Identidade Visual', 'Site', 'Full Experience'].map((opt) => (
                            <OptionCard
                                key={opt}
                                label={opt === 'Site' ? 'Landing Page / Site UX' : opt === 'Full Experience' ? 'Full Experience (Tudo)' : opt === 'Branding' ? 'Branding Completo' : opt}
                                selected={formData.servico === opt}
                                onClick={() => selectOption('servico', opt)}
                            />
                        ))}
                    </div>
                    {/* Hidden input simulated by state */}
                    <div className="mt-12">
                        <button type="button" onClick={nextStep} className="btn-next" disabled={!formData.servico}>Próximo</button>
                    </div>
                </StepContainer>

                {/* Step 6: Investimento */}
                <StepContainer isActive={currentStep === 6} step={6}>
                    <StepHeader stepNumber="06" title="Energia" question="Qual o investimento estimado?" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {['3k-6k', '6k-12k', '12k-20k', '20k+'].map((opt) => (
                            <OptionCard
                                key={opt}
                                label={opt === '20k+' ? 'Acima de R$ 20.000' : opt === '3k-6k' ? 'R$ 3.000 — R$ 6.000' : opt === '6k-12k' ? 'R$ 6.000 — R$ 12.000' : 'R$ 12.000 — R$ 20.000'}
                                selected={formData.investimento === opt}
                                onClick={() => selectOption('investimento', opt)}
                            />
                        ))}
                    </div>
                    <div className="mt-12">
                        <button type="button" onClick={nextStep} className="btn-next" disabled={!formData.investimento}>Próximo</button>
                    </div>
                </StepContainer>

                {/* Step 7: Prazo */}
                <StepContainer isActive={currentStep === 7} step={7}>
                    <StepHeader stepNumber="07" title="Tempo" question="Qual o prazo desejado?" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {[
                            { val: 'Urgente', label: 'Para ontem (Urgente)' },
                            { val: '1 Mes', label: 'Até 1 mês' },
                            { val: '2-3 Meses', label: '2 a 3 meses' },
                            { val: 'Sem Pressa', label: 'Sem pressa, foco em qualidade' }
                        ].map((opt) => (
                            <OptionCard
                                key={opt.val}
                                label={opt.label}
                                selected={formData.prazo === opt.val}
                                onClick={() => selectOption('prazo', opt.val)}
                            />
                        ))}
                    </div>
                    <div className="mt-12">
                        <button type="button" onClick={nextStep} className="btn-next" disabled={!formData.prazo}>Próximo</button>
                    </div>
                </StepContainer>

                {/* Step 8: Descrição */}
                <StepContainer isActive={currentStep === 8} step={8}>
                    <StepHeader stepNumber="08" title="Profundidade" question="Fale um pouco sobre o projeto." />
                    <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        placeholder="O que te motivou a nos procurar?"
                        rows="1"
                        className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors resize-none"
                    ></textarea>
                    <div className="mt-12 flex items-center gap-4">
                        <button type="button" onClick={nextStep} className="btn-next">Próximo</button>
                    </div>
                </StepContainer>

                {/* Step 9: Inspiração */}
                <StepContainer isActive={currentStep === 9} step={9}>
                    <StepHeader stepNumber="09" title="Referência" question="Tem algum projeto ou marca que te inspira?" />
                    <input
                        type="text"
                        name="referencia"
                        value={formData.referencia}
                        onChange={handleInputChange}
                        placeholder="URL ou nome da marca"
                        className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                    />
                    <div className="mt-12 flex items-center gap-4">
                        <button type="button" onClick={nextStep} className="btn-next">Próximo</button>
                        <button type="button" onClick={nextStep}
                            className="text-xs font-mono text-white/40 hover:text-white uppercase tracking-widest decoration-1 underline underline-offset-4">Não
                            tenho agora</button>
                    </div>
                </StepContainer>

                {/* Step 10: Origem */}
                <StepContainer isActive={currentStep === 10} step={10}>
                    <StepHeader stepNumber="10" title="Ritual Final" question="Como nos conheceu?" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                        {['Instagram', 'Behance', 'Indicação', 'Google', 'Outro'].map((opt) => (
                            <OptionCard
                                key={opt}
                                label={opt}
                                selected={formData.origem === opt}
                                onClick={() => selectOption('origem', opt)}
                            />
                        ))}
                    </div>
                    <div className="mt-12">
                        <button type="submit" className="btn-next" disabled={!formData.origem || isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Iniciar Ritual'}
                        </button>
                    </div>
                </StepContainer>

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

                {/* Toast Notification */}
                {toast.show && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
                        <div className="animate-toast bg-red-500/10 border border-red-500/50 backdrop-blur-md text-red-200 px-6 py-3 flex items-center gap-3 shadow-2xl pointer-events-auto w-auto max-w-md rounded-sm">
                            <span className="material-symbols-outlined text-sm">error</span>
                            <span className="font-mono text-xs uppercase tracking-widest">{toast.message}</span>
                        </div>
                    </div>
                )}

            </form>

            {/* Nav Buttons (hide on success) */}
            {currentStep <= totalSteps && (
                <div className="fixed bottom-8 right-8 flex gap-4 z-40">
                    <button type="button" onClick={prevStep} disabled={currentStep === 1}
                        className="size-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all disabled:opacity-0 disabled:pointer-events-none">
                        <span className="material-symbols-outlined">expand_less</span>
                    </button>
                    <button type="button" onClick={nextStep} disabled={currentStep > totalSteps}
                        className="size-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all">
                        <span className="material-symbols-outlined">expand_more</span>
                    </button>
                </div>
            )}

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
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .step-enter {
                    animation: stepEnter 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }

                @keyframes slideInToast {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-toast {
                    animation: slideInToast 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
            `}</style>
        </div>
    );
}

function StepContainer({ children, isActive, step }) {
    if (!isActive) return null;
    return (
        <div data-step={step} className={`flex flex-col w-full max-w-4xl step-enter`}>
            {children}
        </div>
    );
}

function StepHeader({ stepNumber, title, question }) {
    return (
        <>
            <span className="text-xs font-mono uppercase tracking-[0.3em] mb-4 text-white/40">{stepNumber} — {title}</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">{question}</h2>
        </>
    );
}

function OptionCard({ label, selected, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer p-6 rounded-sm flex items-center justify-between border transition-all duration-300
                ${selected
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white/10 hover:border-white/50 hover:bg-white/5'
                }`}
        >
            <span className="font-display font-medium">{label}</span>
            {selected && <span className="material-symbols-outlined text-sm">check</span>}
        </div>
    );
}
