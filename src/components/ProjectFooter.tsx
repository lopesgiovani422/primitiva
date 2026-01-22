import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProjectFooterProps {
    nextProject: string;
    nextProjectName: string;
}

export default function ProjectFooter({ nextProject, nextProjectName }: ProjectFooterProps) {
    return (
        <footer
            className="bg-white text-black p-6 md:p-12 min-h-[50vh] flex flex-col justify-between group cursor-pointer transition-colors duration-500 hover:bg-zinc-50 relative z-20">
            <div className="w-full h-px bg-black/10 mb-8 line-grow scroll-trigger"></div>
            <div className="flex flex-col gap-4">
                <span
                    className="font-mono text-xs uppercase tracking-widest text-black/60 reveal-text scroll-trigger">Próximo
                    projeto</span>
                <Link
                    href={nextProject}
                    className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tight group-hover:translate-x-2 transition-transform duration-300 reveal-text scroll-trigger delay-100 flex items-center"
                >
                    {nextProjectName}
                    <ArrowRight className="w-16 h-16 md:w-24 md:h-24 ml-2 group-hover:ml-6 transition-all" />
                </Link>
            </div>
            <div className="flex justify-between items-end mt-12 font-mono text-xs uppercase tracking-widest text-black/60">
                <div>Primitiva</div>
                <div>© 2026</div>
            </div>
        </footer>
    );
}
