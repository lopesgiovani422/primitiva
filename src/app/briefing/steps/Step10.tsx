'use client';
import { StepContainer, StepHeader, OptionCard, ErrorDisplay } from '../components/Common';

interface StepProps {
    onBack: () => void;
    selectedValue: string;
    onSelect: (value: string) => void;
    isSubmitting: boolean;
    error?: string | undefined;
}

export default function Step10({ onBack, selectedValue, onSelect, isSubmitting, error }: StepProps) {
    const options = ['Instagram', 'Behance', 'Indicação', 'Google', 'Outro'];

    return (
        <StepContainer isActive={true} step={10}>
            <StepHeader stepNumber="10" title="Ritual Final" question="Como nos conheceu?" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {options.map((opt) => (
                    <OptionCard
                        key={opt}
                        label={opt}
                        selected={selectedValue === opt}
                        onClick={() => onSelect(opt)}
                    />
                ))}
            </div>

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
                    type="submit"
                    disabled={isSubmitting || !selectedValue}
                    className="btn-next h-[52px] flex items-center justify-center min-w-[160px]"
                >
                    {isSubmitting ? 'Enviando...' : 'Iniciar Ritual'}
                </button>
            </div>
        </StepContainer>
    );
}
