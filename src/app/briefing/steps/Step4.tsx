'use client';
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay } from '../components/Common';
import type { UseFormRegister } from 'react-hook-form';

interface StepProps {
    register: UseFormRegister<any>;
    onNext: () => void;
    onBack: () => void;
    handleWhatsAppChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | undefined;
}

export default function Step4({ register, onNext, onBack, handleWhatsAppChange, error }: StepProps) {
    return (
        <StepContainer isActive={true} step={4}>
            <StepHeader stepNumber="04" title="Conexão" question="Seu WhatsApp para um papo rápido?" />
            <input
                {...register('whatsapp')}
                type="tel"
                onChange={handleWhatsAppChange}
                placeholder="(00) 00000-0000"
                className="bg-transparent border-0 border-b-2 border-white/10 py-4 text-2xl md:text-5xl w-full text-white placeholder:text-white/20 focus:outline-none focus:border-white focus:ring-0 transition-colors"
            />
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} onBack={onBack} />
        </StepContainer>
    );
}
