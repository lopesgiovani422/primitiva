'use client';
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay } from '../components/Common';
import type { UseFormRegister } from 'react-hook-form';

interface StepProps {
    register: UseFormRegister<any>;
    onNext: () => void;
    error?: string | undefined;
}

export default function Step1({ register, onNext, error }: StepProps) {
    return (
        <StepContainer isActive={true} step={1}>
            <StepHeader stepNumber="01" title="O Início" question="Primeiro, como podemos te chamar?" />
            <input
                {...register('nome')}
                type="text"
                placeholder="Seu nome"
                className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                autoFocus
            />
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} showBack={false} showEnterHint={true} />
        </StepContainer>
    );
}
