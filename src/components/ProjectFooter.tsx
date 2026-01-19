import Link from 'next/link';

interface ProjectFooterProps {
    nextProject: string;
    nextProjectName: string;
}

export default function ProjectFooter({ nextProject, nextProjectName }: ProjectFooterProps) {
    return (
        <footer
            className="bg-primary text-background-dark p-6 md:p-12 min-h-[50vh] flex flex-col justify-between group cursor-pointer transition-colors duration-500 hover:bg-off-white -mt-6 md:-mt-1 relative z-20">
            <div className="w-full h-px bg-black/10 mb-8 line-grow scroll-trigger"></div>
            <div className="flex flex-col gap-4">
                <span
                    className="font-mono text-xs uppercase tracking-widest text-black/60 reveal-text scroll-trigger">Próximo
                    projeto</span>
                <Link
                    href={nextProject}
                    className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tight group-hover:translate-x-2 transition-transform duration-300 reveal-text scroll-trigger delay-100 flex items-center"
                >
                    {nextProjectName}<span
                        className="material-symbols-outlined text-6xl md:text-8xl align-middle ml-2 group-hover:ml-6 transition-all">arrow_forward</span>
                </Link>
            </div>
            <div className="flex justify-between items-end mt-12 font-mono text-xs uppercase tracking-widest text-black/60">
                <div>Primitiva</div>
                <div>© 2026</div>
            </div>
        </footer>
    );
}
