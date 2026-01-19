'use client';
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay } from '../components/Common';
import type { UseFormRegister } from 'react-hook-form';

interface StepProps {
    register: UseFormRegister<any>;
    onNext: () => void;
    onBack: () => void;
    error?: string | undefined;
}

export default function Step2({ register, onNext, onBack, error }: StepProps) {
    return (
        <StepContainer isActive={true} step={2}>
            <StepHeader stepNumber="02" title="A Marca" question="Qual o nome da sua empresa ou projeto?" />
            <input
                {...register('empresa')}
                type="text"
                placeholder="Ex: Primitiva Studio"
                className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors"
            />
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} onBack={onBack} showEnterHint={true} />
        </StepContainer>
    );
}
