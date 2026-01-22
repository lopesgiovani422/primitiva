'use client';

import React from 'react';
import {
    ExternalLink,
    MoreVertical,
    Folder,
    Calendar,
    ArrowUpRight,
    Trash2,
    Edit2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProjectModal from './ProjectModal';

const NotionIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
        <path d="M4.458 4h15.084c.805 0 1.458.653 1.458 1.458v13.084c0 .805-.653 1.458-1.458 1.458H4.458A1.458 1.458 0 013 18.542V5.458C3 4.653 3.653 4 4.458 4z" fill="white" />
        <path d="M7.4 8.7V17h1.4V8.7L15.3 17h1.4V7.5h-1.4v8.3L8.8 7.5H7.4v1.2z" fill="black" />
    </svg>
);

const DriveIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
        <path d="M9.13 4.4l-5.69 9.84L6.3 19h11.4l2.86-4.92L14.87 4.4H9.13z" fill="white" />
        <path d="M14.87 4.4l-5.74 9.92 2.87 4.96 5.74-9.92-2.87-4.96z" fill="#000" opacity="0.2" />
    </svg>
);

const StitchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="white" />
        <path d="M8 7v10M12 7v10M16 7v10" stroke="black" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

interface Project {
    id: string;
    client_name: string;
    project_name: string;
    status_progress: number;
    status_label: string;
    notion_url: string;
    drive_url: string;
    stitch_url?: string;
    extra_links?: { label: string, url: string }[];
    created_at: string;
}

interface ProjectsGridProps {
    projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
    const router = useRouter();

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Excluir projeto: ${name}?`)) return;

        try {
            const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
            if (res.ok) router.refresh();
        } catch (e) {
            console.error(e);
        }
    };

    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-zinc-800 rounded-2xl text-zinc-600">
                <Folder className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-mono text-sm uppercase tracking-widest">Nenhum projeto ativo no momento</p>
                <Button variant="link" className="text-zinc-500 mt-2 hover:text-white">Adicionar novo projeto</Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="group bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-500 flex flex-col justify-between h-full"
                >
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] uppercase font-mono tracking-widest py-1">
                                {project.status_label || 'Em andamento'}
                            </Badge>
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="text-zinc-600 hover:text-white transition-colors focus:outline-none hover:bg-white/5 p-1 rounded-md">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800 text-white min-w-[160px]">
                                        <ProjectModal
                                            project={project}
                                            trigger={
                                                <button className="w-full text-left" onClick={(e) => e.stopPropagation()}>
                                                    <DropdownMenuItem
                                                        onSelect={(e) => e.preventDefault()}
                                                        className="flex items-center gap-2 cursor-pointer focus:bg-white focus:text-black transition-colors"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                        Editar
                                                    </DropdownMenuItem>
                                                </button>
                                            }
                                        />
                                        <DropdownMenuItem
                                            onClick={() => handleDelete(project.id, project.client_name)}
                                            className="flex items-center gap-2 cursor-pointer text-red-500 focus:bg-red-500 focus:text-white transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            Excluir
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-zinc-500 text-[10px] uppercase font-mono tracking-[0.2em] mb-1">Cliente</h3>
                            <p className="text-2xl font-semibold tracking-tight text-white group-hover:text-blue-400 transition-colors uppercase">{project.client_name}</p>
                            {project.project_name && (
                                <p className="text-zinc-400 text-sm mt-1">{project.project_name}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                                <span className="text-zinc-500">Progresso</span>
                                <span className="text-white">{project.status_progress}%</span>
                            </div>
                            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white transition-all duration-1000 ease-out"
                                    style={{ width: `${project.status_progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-wrap gap-2">
                            {project.notion_url && (
                                <a
                                    href={project.notion_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 h-9 bg-zinc-950 border border-zinc-800 rounded-lg text-[11px] font-semibold hover:bg-white hover:text-black transition-all group/link"
                                >
                                    <NotionIcon />
                                    Notion
                                </a>
                            )}

                            {project.drive_url && (
                                <a
                                    href={project.drive_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 h-9 bg-zinc-950 border border-zinc-800 rounded-lg text-[11px] font-semibold hover:bg-white hover:text-black transition-all group/link"
                                >
                                    <DriveIcon />
                                    Drive
                                </a>
                            )}

                            {project.stitch_url && (
                                <a
                                    href={project.stitch_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 h-9 bg-zinc-950 border border-zinc-800 rounded-lg text-[11px] font-semibold hover:bg-white hover:text-black transition-all group/link"
                                >
                                    <StitchIcon />
                                    Stitch
                                </a>
                            )}

                            {project.extra_links?.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 h-9 bg-zinc-950 border border-zinc-800 rounded-lg text-[11px] font-semibold hover:bg-white hover:text-black transition-all group/link"
                                >
                                    <ExternalLink className="w-3.5 h-3.5 mr-2" />
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

