'use client';

import { useState, useEffect } from 'react';
import {
    BarChart3,
    Users,
    MousePointerClick,
    TrendingUp,
    ExternalLink,
    Loader2,
    MessageCircle,
    FileText,
    Instagram,
    RefreshCw,
    AlertCircle,
    Globe,
    Search,
    Share2,
    ArrowUpRight
} from 'lucide-react';

interface AnalyticsData {
    summary: {
        pageViews: number;
        uniqueUsers: number;
        ctaClicks: number;
        briefingsStarted: number;
        briefingsSubmitted: number;
        conversionRate: string;
        linktreeClicks: number;
        whatsappClicks: number;
    };
    charts: {
        pageViewsByDay: { date: string; count: number }[];
        trafficSources: { name: string; count: number }[];
    };
}

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDemo, setIsDemo] = useState(false);
    const [days, setDays] = useState(7);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/analytics?days=${days}`);
            const json = await res.json();

            if (json.data) {
                setData(json.data);
                setIsDemo(json.demo);
                setError(json.error || null);
            } else if (json.error) {
                setError(json.error);
            }
        } catch (e) {
            setError('Erro de conexão ao carregar analytics');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [days]);

    return (
        <div className="p-8 lg:p-12 space-y-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Analytics</h1>
                    <p className="text-zinc-500 text-sm">
                        Métricas em tempo real do seu site
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex bg-zinc-900 rounded-lg p-1">
                        {[7, 30, 90].map((d) => (
                            <button
                                key={d}
                                onClick={() => setDays(d)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${days === d
                                        ? 'bg-white text-black'
                                        : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                {d}d
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={fetchData}
                        disabled={loading}
                        className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>

                    <a
                        href="https://us.posthog.com/project/296359"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <span className="text-sm hidden md:inline">PostHog</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {(error || isDemo) && (
                <div className={`border rounded-xl p-4 flex items-start gap-3 ${isDemo ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-red-500/10 border-red-500/30'
                    }`}>
                    <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDemo ? 'text-yellow-500' : 'text-red-500'
                        }`} />
                    <div>
                        <p className={`font-medium ${isDemo ? 'text-yellow-400' : 'text-red-400'}`}>
                            {isDemo ? 'Modo Demonstração' : 'Aviso do Sistema'}
                        </p>
                        <p className={`text-sm ${isDemo ? 'text-yellow-500/80' : 'text-red-500/80'}`}>
                            {error || 'Configure a chave do PostHog para ver dados reais.'}
                        </p>
                    </div>
                </div>
            )}

            {loading && !data && (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
                </div>
            )}

            {data && (
                <>
                    {/* Main Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MetricCard
                            icon={<Users className="w-5 h-5" />}
                            label="Visitantes Únicos"
                            value={(data.summary?.uniqueUsers || 0).toLocaleString()}
                            color="blue"
                        />
                        <MetricCard
                            icon={<BarChart3 className="w-5 h-5" />}
                            label="Page Views"
                            value={(data.summary?.pageViews || 0).toLocaleString()}
                            color="purple"
                        />
                        <MetricCard
                            icon={<MousePointerClick className="w-5 h-5" />}
                            label="Cliques em CTA"
                            value={(data.summary?.ctaClicks || 0).toLocaleString()}
                            color="green"
                        />
                        <MetricCard
                            icon={<TrendingUp className="w-5 h-5" />}
                            label="Taxa de Conversão"
                            value={data.summary?.conversionRate || '0%'}
                            color="amber"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Traffic Sources */}
                        <div className="lg:col-span-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Origem do Tráfego
                            </h3>
                            <div className="space-y-4">
                                {(data.charts?.trafficSources?.length || 0) > 0 ? (
                                    data.charts.trafficSources.map((source, i) => (
                                        <div key={i} className="space-y-1.5">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-zinc-300 flex items-center gap-1.5">
                                                    {getSourceIcon(source.name)}
                                                    {source.name}
                                                </span>
                                                <span className="text-zinc-500">{source.count}</span>
                                            </div>
                                            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{ width: `${(source.count / (data.summary?.pageViews || 1)) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-zinc-600 text-sm text-center py-4">Sem dados de origem</p>
                                )}
                            </div>
                        </div>

                        {/* Line Chart */}
                        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-6">
                                Page Views Diários
                            </h3>
                            <div className="h-48 flex items-end gap-1">
                                {(data.charts?.pageViewsByDay?.length || 0) > 0 ? (
                                    data.charts.pageViewsByDay.map((item, i) => {
                                        const maxCount = Math.max(...data.charts.pageViewsByDay.map(d => d.count), 1);
                                        const height = (item.count / maxCount) * 100;
                                        return (
                                            <div
                                                key={i}
                                                className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t opacity-80 hover:opacity-100 transition-opacity cursor-pointer group relative"
                                                style={{ height: `${Math.max(height, 4)}%` }}
                                            >
                                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10">
                                                    <div className="font-semibold">{item.count}</div>
                                                    <div className="text-zinc-400 text-[10px]">{formatDate(item.date)}</div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">
                                        Nenhum dado temporal disponível
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <SmallMetricCard
                            icon={<FileText className="w-4 h-4" />}
                            label="Briefings Iniciados"
                            value={data.summary?.briefingsStarted || 0}
                        />
                        <SmallMetricCard
                            icon={<FileText className="w-4 h-4" />}
                            label="Briefings Enviados"
                            value={data.summary?.briefingsSubmitted || 0}
                            highlight
                        />
                        <SmallMetricCard
                            icon={<Instagram className="w-4 h-4" />}
                            label="Cliques Instagram"
                            value={data.summary?.linktreeClicks || 0}
                        />
                        <SmallMetricCard
                            icon={<MessageCircle className="w-4 h-4" />}
                            label="Cliques WhatsApp"
                            value={data.summary?.whatsappClicks || 0}
                        />
                    </div>

                    {/* Platforms Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <PlatformCard
                            name="Google Analytics"
                            description="Relatórios GA4 completos"
                            href="https://analytics.google.com"
                            isActive={!!process.env.NEXT_PUBLIC_GA_ID}
                            color="orange"
                        />
                        <PlatformCard
                            name="Meta Business"
                            description="Gerenciador de Eventos Pixels"
                            href="https://business.facebook.com/events_manager2"
                            isActive={!!process.env.NEXT_PUBLIC_META_PIXEL_ID}
                            color="blue"
                        />
                        <PlatformCard
                            name="PostHog Live"
                            description="Eventos em tempo real"
                            href="https://us.posthog.com/project/296359/activity/explore"
                            isActive={true}
                            color="indigo"
                        />
                    </div>
                </>
            )}
        </div>
    );
}

function MetricCard({
    icon,
    label,
    value,
    color
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: 'blue' | 'purple' | 'green' | 'amber';
}) {
    const colorClasses = {
        blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/30',
        purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30',
        green: 'from-green-500/20 to-green-600/5 border-green-500/30',
        amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/30',
    };

    return (
        <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-2xl p-6`}>
            <div className="flex items-center gap-2 text-zinc-400 mb-3">
                {icon}
                <span className="text-xs font-mono uppercase tracking-widest">{label}</span>
            </div>
            <p className="text-4xl font-bold tracking-tight text-white">{value}</p>
        </div>
    );
}

function SmallMetricCard({
    icon,
    label,
    value,
    highlight = false
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
    highlight?: boolean;
}) {
    return (
        <div className={`bg-zinc-900/50 border rounded-xl p-4 ${highlight ? 'border-emerald-500/30' : 'border-zinc-800'
            }`}>
            <div className="flex items-center gap-2 text-zinc-500 mb-2">
                {icon}
                <span className="text-xs">{label}</span>
            </div>
            <p className={`text-2xl font-bold ${highlight ? 'text-emerald-400' : 'text-zinc-100'}`}>
                {(value || 0).toLocaleString()}
            </p>
        </div>
    );
}

function PlatformCard({ name, description, href, isActive, color }: {
    name: string;
    description: string;
    href: string;
    isActive: boolean;
    color: 'orange' | 'blue' | 'indigo';
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all font-sans"
        >
            <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                    {isActive ? '● Ativo' : '○ Pendente'}
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-lg mb-1 text-zinc-100">{name}</h4>
            <p className="text-zinc-500 text-xs">{description}</p>
        </a>
    );
}

function getSourceIcon(source: string) {
    const s = source ? source.toLowerCase() : '';
    if (s.includes('direto')) return <Globe className="w-3.5 h-3.5 text-zinc-400" />;
    if (s.includes('google')) return <Search className="w-3.5 h-3.5 text-zinc-400" />;
    if (s.includes('instagram') || s.includes('facebook')) return <Instagram className="w-3.5 h-3.5 text-zinc-400" />;
    return <Share2 className="w-3.5 h-3.5 text-zinc-400" />;
}

function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}
