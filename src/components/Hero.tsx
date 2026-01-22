'use client';

import Link from 'next/link';
import posthog from 'posthog-js';

interface Project {
    href: string;
    image: string;
    alt: string;
    tag: string;
    title: string;
    delay: string;
    extraClasses?: string;
}

const projects: Project[] = [
    {
        href: '/projetos/ninho',
        image: '/assets/cover/ninho.webp',
        alt: 'Ninho',
        tag: 'Identidade Visual',
        title: 'Ninho',
        delay: ''
    },
    {
        href: '/projetos/pedecafe',
        image: '/assets/cover/pedecafe.webp',
        alt: 'Pé de Café',
        tag: 'Branding & Web',
        title: 'Pé de Café',
        delay: 'delay-100'
    },
    {
        href: '/projetos/oqfjf',
        image: '/assets/cover/oqfjf.webp',
        alt: 'O Que Fazer em JF?',
        tag: 'Identidade Visual',
        title: 'O que fazer em JF?',
        delay: 'delay-200',
        extraClasses: 'contrast-[1.5] brightness-75'
    }
];

export default function Hero() {
    const handleProjectClick = (project: Project) => {
        posthog.capture('project_viewed', {
            project_title: project.title,
            project_tag: project.tag,
            project_href: project.href
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full">
            {projects.map((project, idx) => (
                <Link
                    key={idx}
                    href={project.href}
                    prefetch={false}
                    onClick={() => handleProjectClick(project)}
                    className={`group relative aspect-[4/5] overflow-hidden cursor-pointer reveal-up ${project.delay}`}
                >
                    <img
                        src={project.image}
                        alt={project.alt}
                        className={`absolute inset-0 w-full h-full object-cover object-center contrast-125 transition-transform duration-700 group-hover:scale-105 ${project.extraClasses || ''}`}
                        loading={idx === 0 ? "eager" : "lazy"}
                        fetchPriority={idx === 0 ? "high" : "auto"}
                        width="800"
                        height="1000"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <span className="inline-block px-2 py-1 mb-2 text-[10px] font-mono bg-white text-black uppercase tracking-wider">
                            {project.tag}
                        </span>
                        <h2 className="text-3xl font-bold text-white uppercase tracking-tight leading-none">
                            {project.title}
                        </h2>
                    </div>
                </Link>
            ))}
        </div>
    );
}
