'use client';
import { StepContainer, StepHeader, ErrorDisplay } from '../components/Common';
import type { UseFormRegister } from 'react-hook-form';

interface StepProps {
    register: UseFormRegister<any>;
    onNext: () => void;
    onBack: () => void;
    error?: string | undefined;
}

export default function Step9({ register, onNext, onBack, error }: StepProps) {
    return (
        <StepContainer isActive={true} step={9}>
            <StepHeader stepNumber="09" title="Referência" question="Tem algum projeto ou marca que te inspira?" />
            <input
                {...register('referencia')}
                type="text"
                placeholder="URL ou nome da marca"
                className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                autoFocus
            />

            <ErrorDisplay message={error} />

            <div className="mt-12 flex items-center gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="h-[52px] px-8 border border-white/10 text-white/50 hover:text-white hover:border-white hover:bg-white/5 transition-all text-[10px] font-mono uppercase tracking-[0.2em] font-bold"
                >
                    Voltar
                </button>

                <button
                    type="button"
                    onClick={onNext}
                    className="h-[52px] px-8 border border-white/10 text-white/50 hover:text-white hover:border-white hover:bg-white/5 transition-all text-[10px] font-mono uppercase tracking-[0.2em] font-bold"
                >
                    Pular
                </button>

                <button
                    type="button"
                    onClick={onNext}
                    className="btn-next h-[52px] flex items-center justify-center min-w-[160px]"
                >
                    Próximo
                </button>
            </div>
        </StepContainer>
    );
}
