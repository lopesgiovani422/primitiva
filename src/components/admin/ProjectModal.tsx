'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Project {
    id?: string;
    client_name: string;
    project_name?: string;
    status_progress: number;
    status_label?: string;
    notion_url?: string;
    drive_url?: string;
    stitch_url?: string;
    extra_links?: { label: string, url: string }[];
}

interface ProjectModalProps {
    project?: Project;
    trigger?: React.ReactNode;
}

export default function ProjectModal({ project, trigger }: ProjectModalProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [extraLinks, setExtraLinks] = useState<{ label: string, url: string }[]>([]);
    const router = useRouter();

    const isEditing = !!project?.id;

    useEffect(() => {
        if (open && project?.extra_links) {
            setExtraLinks(project.extra_links);
        } else if (!open && !isEditing) {
            setExtraLinks([]);
        }
    }, [open, project, isEditing]);

    const addExtraLink = () => {
        setExtraLinks([...extraLinks, { label: '', url: '' }]);
    };

    const updateExtraLink = (index: number, field: 'label' | 'url', value: string) => {
        const updated = [...extraLinks];
        if (updated[index]) {
            updated[index][field] = value;
            setExtraLinks(updated);
        }
    };

    const removeExtraLink = (index: number) => {
        setExtraLinks(extraLinks.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            id: project?.id,
            client_name: formData.get('client_name'),
            project_name: formData.get('project_name'),
            status_progress: formData.get('status_progress'),
            notion_url: formData.get('notion_url'),
            drive_url: formData.get('drive_url'),
            stitch_url: formData.get('stitch_url'),
            status_label: formData.get('status_label') || 'Em andamento',
            extra_links: extraLinks.filter(l => l.label && l.url),
        };

        try {
            const response = await fetch('/api/projects', {
                method: isEditing ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setOpen(false);
                if (!isEditing) setExtraLinks([]);
                router.refresh();
            } else {
                const err = await response.json();
                alert(err.error || "Erro ao salvar projeto");
            }
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Erro de conexão");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="bg-white text-black hover:bg-zinc-200 font-bold uppercase text-[10px] tracking-widest h-12 px-8">
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Projeto
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold tracking-tight">
                            {isEditing ? `Editar Projeto: ${project.client_name}` : 'Novo Projeto'}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                            {isEditing ? 'Atualize as informações do projeto' : 'Adicione um novo projeto ativo ao hub'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-8">
                        <div className="grid gap-2">
                            <Label htmlFor="client_name" className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Nome do Cliente *</Label>
                            <Input id="client_name" name="client_name" defaultValue={project?.client_name} placeholder="Ex: Nike" className="bg-zinc-900 border-zinc-800 text-white" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="project_name" className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Tipo de Projeto</Label>
                            <Input id="project_name" name="project_name" defaultValue={project?.project_name} placeholder="Ex: Identidade Visual" className="bg-zinc-900 border-zinc-800 text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="status_progress" className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Progresso (%)</Label>
                                <Input id="status_progress" name="status_progress" type="number" min="0" max="100" defaultValue={project?.status_progress ?? 10} className="bg-zinc-900 border-zinc-800 text-white" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status_label" className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Tag de Status</Label>
                                <Input id="status_label" name="status_label" defaultValue={project?.status_label} placeholder="Em andamento" className="bg-zinc-900 border-zinc-800 text-white" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block border-b border-zinc-800 pb-2">Links Principais</Label>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="notion_url" className="text-[10px] uppercase font-mono tracking-widest text-zinc-600">Notion</Label>
                                    <Input id="notion_url" name="notion_url" defaultValue={project?.notion_url} placeholder="https://notion.so/..." className="bg-zinc-900/50 border-zinc-800 text-white h-9" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="drive_url" className="text-[10px] uppercase font-mono tracking-widest text-zinc-600">Google Drive</Label>
                                    <Input id="drive_url" name="drive_url" defaultValue={project?.drive_url} placeholder="https://drive.google.com/..." className="bg-zinc-900/50 border-zinc-800 text-white h-9" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="stitch_url" className="text-[10px] uppercase font-mono tracking-widest text-zinc-600">Stitch</Label>
                                    <Input id="stitch_url" name="stitch_url" defaultValue={project?.stitch_url} placeholder="https://stitch.app/..." className="bg-zinc-900/50 border-zinc-800 text-white h-9" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                                <Label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">Links Extras</Label>
                                <Button type="button" onClick={addExtraLink} variant="ghost" size="sm" className="h-6 text-[9px] uppercase tracking-tighter hover:bg-zinc-800">
                                    + Adicionar
                                </Button>
                            </div>

                            {extraLinks.map((link, index) => (
                                <div key={index} className="flex gap-2 items-end">
                                    <div className="grid gap-2 flex-1">
                                        <Input
                                            placeholder="Nome (ex: Figma)"
                                            value={link.label}
                                            onChange={(e) => updateExtraLink(index, 'label', e.target.value)}
                                            className="bg-zinc-900/30 border-zinc-800 text-white h-8 text-xs"
                                        />
                                    </div>
                                    <div className="grid gap-2 flex-[2]">
                                        <Input
                                            placeholder="URL"
                                            value={link.url}
                                            onChange={(e) => updateExtraLink(index, 'url', e.target.value)}
                                            className="bg-zinc-900/30 border-zinc-800 text-white h-8 text-xs"
                                        />
                                    </div>
                                    <Button type="button" onClick={() => removeExtraLink(index)} variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-600 hover:text-red-400">
                                        ×
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogFooter className="pt-4 border-t border-zinc-900">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white hover:bg-zinc-900">Cancelar</Button>
                        <Button type="submit" disabled={loading} className="bg-white text-black hover:bg-zinc-200">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? "Salvar Alterações" : "Criar Projeto")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
