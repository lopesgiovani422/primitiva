'use client';
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay } from '../components/Common';
import type { UseFormRegister } from 'react-hook-form';

interface StepProps {
    register: UseFormRegister<any>;
    onNext: () => void;
    onBack: () => void;
    error?: string | undefined;
}

export default function Step3({ register, onNext, onBack, error }: StepProps) {
    return (
        <StepContainer isActive={true} step={3}>
            <StepHeader stepNumber="03" title="Contato" question="Qual seu melhor e-mail?" />
            <input
                {...register('email')}
                type="email"
                placeholder="nome@exemplo.com"
                className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors"
            />
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} onBack={onBack} />
        </StepContainer>
    );
}
