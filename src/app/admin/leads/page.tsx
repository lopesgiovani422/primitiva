import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LeadsTable from '@/components/admin/LeadsTable';

export const dynamic = 'force-dynamic';

export default async function LeadsDashboardPage() {
    const supabase = await createClient();

    // Validar Sessão
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/admin/login');
    }

    // Buscar Leads
    const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase Error:', error);
    }

    const safeLeads = (leads || []) as any[];

    // Stats
    const total = safeLeads.length;
    const completed = safeLeads.filter(l => l.status === 'completed').length;
    const incomplete = safeLeads.filter(l => l.status !== 'completed').length;
    const conversion = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <main className="p-12">
            <header className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Leads</h1>
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Gerenciamento de contatos e prospecção</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono">Total Leads</span>
                    <p className="text-4xl font-display font-medium mt-2">{total}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                    <span className="text-green-500/70 text-[10px] uppercase tracking-[0.2em] font-mono">Completos</span>
                    <p className="text-4xl font-display font-medium mt-2 text-green-400">{completed}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                    <span className="text-yellow-500/70 text-[10px] uppercase tracking-[0.2em] font-mono">Incompletos</span>
                    <p className="text-4xl font-display font-medium mt-2 text-yellow-500">{incomplete}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono">Conversão</span>
                    <p className="text-4xl font-display font-medium mt-2">{conversion}%</p>
                </div>
            </div>

            <LeadsTable leads={safeLeads} />
        </main>
    );
}
