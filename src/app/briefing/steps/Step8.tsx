'use client';
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay } from '../components/Common';
import type { UseFormRegister } from 'react-hook-form';

interface StepProps {
    register: UseFormRegister<any>;
    onNext: () => void;
    onBack: () => void;
    error?: string | undefined;
}

export default function Step8({ register, onNext, onBack, error }: StepProps) {
    return (
        <StepContainer isActive={true} step={8}>
            <StepHeader stepNumber="08" title="Profundidade" question="Fale um pouco sobre o projeto." />
            <textarea
                {...register('descricao')}
                placeholder="O que te motivou a nos procurar?"
                rows={1}
                className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors resize-none"
            ></textarea>
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} onBack={onBack} />
        </StepContainer>
    );
}
