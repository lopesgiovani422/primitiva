import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import BriefingsTable from '@/components/admin/BriefingsTable';

export const dynamic = 'force-dynamic';

export default async function BriefingsDashboardPage() {
    const supabase = await createClient();

    // Validar Sessão
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/admin/login');
    }

    // Buscar Briefings
    const { data: briefings, error } = await supabase
        .from('briefings')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase Error:', error);
    }

    const safeBriefings = (briefings || []) as any[];

    // Stats
    const total = safeBriefings.length;
    const siteCount = safeBriefings.filter(b => b.type === 'site').length;
    const brandCount = safeBriefings.filter(b => b.type === 'brand').length;
    const last30Days = safeBriefings.filter(b => {
        const date = new Date(b.created_at);
        const now = new Date();
        return (now.getTime() - date.getTime()) < (30 * 24 * 60 * 60 * 1000);
    }).length;

    return (
        <main className="p-12">
            <header className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Briefings</h1>
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Coleta estratégica de informações</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono">Total de Briefings</span>
                    <p className="text-4xl font-display font-medium mt-2">{total}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                    <span className="text-blue-500/70 text-[10px] uppercase tracking-[0.2em] font-mono">Projetos Site</span>
                    <p className="text-4xl font-display font-medium mt-2 text-blue-400">{siteCount}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                    <span className="text-purple-500/70 text-[10px] uppercase tracking-[0.2em] font-mono">Projetos Brand</span>
                    <p className="text-4xl font-display font-medium mt-2 text-purple-500">{brandCount}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono">Últimos 30 dias</span>
                    <p className="text-4xl font-display font-medium mt-2 text-white">{last30Days}</p>
                </div>
            </div>

            <BriefingsTable briefings={safeBriefings} />
        </main>
    );
}
