import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProjectsGrid from '@/components/admin/ProjectsGrid';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ProjectModal from '@/components/admin/ProjectModal';

export const dynamic = 'force-dynamic';

export default async function ProjectsDashboardPage() {
    const supabase = await createClient();

    // Validar Sessão
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/admin/login');
    }

    // Buscar Projetos
    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error && error.code !== 'PGRST116') {
        console.error('Supabase Error:', error);
    }

    const safeProjects = (projects || []) as any[];

    // Stats
    const total = safeProjects.length;
    const completedAvg = total > 0
        ? Math.round(safeProjects.reduce((acc, p) => acc + (p.status_progress || 0), 0) / total)
        : 0;

    return (
        <main className="p-12">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Projetos Ativos</h1>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Acompanhamento e acesso rápido aos arquivos</p>
                </div>

                <ProjectModal />
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono">Total de Projetos</span>
                    <p className="text-4xl font-display font-medium mt-2">{total}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <span className="text-blue-500/70 text-[10px] uppercase tracking-[0.2em] font-mono">Média de Progresso</span>
                    <div className="flex items-end gap-3">
                        <p className="text-4xl font-display font-medium mt-2 text-blue-400">{completedAvg}%</p>
                        <div className="mb-2 h-1 w-24 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400" style={{ width: `${completedAvg}%` }} />
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono">Projetos em Alerta</span>
                    <p className="text-4xl font-display font-medium mt-2 text-white">0</p>
                </div>
            </div>

            <ProjectsGrid projects={safeProjects} />
        </main>
    );
}
