'use client';
import React from 'react';

interface StepContainerProps {
    children: React.ReactNode;
    isActive: boolean;
    step: number;
}

export function StepContainer({ children, isActive, step }: StepContainerProps) {
    if (!isActive) return null;
    return (
        <div data-step={step} className="flex flex-col w-full max-w-4xl step-enter">
            {children}
        </div>
    );
}

interface StepHeaderProps {
    stepNumber: string;
    title: string;
    question: string;
}

export function StepHeader({ stepNumber, title, question }: StepHeaderProps) {
    return (
        <>
            <span className="text-xs font-mono uppercase tracking-[0.3em] mb-4 text-white/40">{stepNumber} — {title}</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">{question}</h2>
        </>
    );
}

interface OptionCardProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export function OptionCard({ label, selected, onClick }: OptionCardProps) {
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

export function NavigationButtons({
    onNext,
    onBack,
    showBack = true,
    nextLabel = "Próximo",
    isSubmitting = false,
    showEnterHint = false
}: {
    onNext: () => void,
    onBack?: () => void,
    showBack?: boolean,
    nextLabel?: string,
    isSubmitting?: boolean,
    showEnterHint?: boolean
}) {
    return (
        <div className="mt-12 flex items-center gap-4">
            {showBack && (
                <button
                    type="button"
                    onClick={onBack}
                    className="h-[52px] px-8 border border-white/10 text-white/50 hover:text-white hover:border-white hover:bg-white/5 transition-all text-[10px] font-mono uppercase tracking-[0.2em] font-bold"
                >
                    Voltar
                </button>
            )}

            <button
                type="button"
                onClick={onNext}
                disabled={isSubmitting}
                className="btn-next h-[52px] flex items-center justify-center min-w-[160px] relative overflow-hidden group"
            >
                <span className="relative z-10">{nextLabel}</span>
                {showEnterHint && !isSubmitting && (
                    <span className="ml-4 text-[9px] opacity-30 hidden md:inline-block border-l border-black/20 pl-4 relative z-10 uppercase tracking-widest font-mono">
                        ENTER
                    </span>
                )}
            </button>
        </div>
    );
}

export function ErrorDisplay({ message }: { message?: string | undefined }) {
    return (
        <div className={`mt-6 h-4 flex items-center gap-2 transition-all duration-300 ${message ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
            <span className="material-symbols-outlined text-[14px] text-red-500/60">error</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-red-500/80">{message}</span>
        </div>
    );
}
