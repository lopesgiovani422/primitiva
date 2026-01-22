import { NextResponse } from 'next/server';

const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID || '296359';
const POSTHOG_HOST = 'https://us.posthog.com';

interface AnalyticsResponse {
    demo: boolean;
    error: string | null;
    period: string;
    data: {
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
    };
}

// Mock/Default data
function getDefaultResponse(isDemo = true, error?: string, days = 7): AnalyticsResponse {
    return {
        demo: isDemo,
        error: error || null,
        period: `${days} dias`,
        data: {
            summary: {
                pageViews: 0,
                uniqueUsers: 0,
                ctaClicks: 0,
                briefingsStarted: 0,
                briefingsSubmitted: 0,
                conversionRate: '0%',
                linktreeClicks: 0,
                whatsappClicks: 0
            },
            charts: {
                pageViewsByDay: [],
                trafficSources: []
            }
        }
    };
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');

    if (!POSTHOG_API_KEY || POSTHOG_API_KEY === 'your_personal_api_key_here') {
        return NextResponse.json(getDefaultResponse(true, 'PostHog Key not configured', days));
    }

    try {
        const dateFrom = new Date();
        dateFrom.setDate(dateFrom.getDate() - days);
        const dateFromStr = dateFrom.toISOString().split('T')[0];

        const [eventsData, uniqueUsersData, trafficSourcesData, dailyPageviews] = await Promise.all([
            // Counts por evento
            queryPostHog(`
                SELECT event, count() as count FROM events 
                WHERE timestamp >= '${dateFromStr}' 
                AND event IN ('$pageview', 'cta_clicked', 'briefing_started', 'briefing_submitted', 'linktree_clicked', 'whatsapp_clicked')
                GROUP BY event
            `),
            // Usuários únicos
            queryPostHog(`SELECT count(DISTINCT distinct_id) FROM events WHERE timestamp >= '${dateFromStr}'`),
            // Fontes de tráfego
            queryPostHog(`
                SELECT 
                    multiIf(
                        properties.utm_source IS NOT NULL, properties.utm_source,
                        properties.$referrer_domain ILIKE '%instagram.com%', 'Instagram',
                        properties.$referrer_domain ILIKE '%google.com%', 'Google Search',
                        properties.$referrer_domain ILIKE '%facebook.com%', 'Facebook',
                        properties.$referrer_domain ILIKE '%linkedin.com%', 'LinkedIn',
                        properties.$referrer_domain = '' OR properties.$referrer_domain IS NULL, 'Direto',
                        properties.$referrer_domain
                    ) as source,
                    count() as count
                FROM events
                WHERE timestamp >= '${dateFromStr}' AND event = '$pageview'
                GROUP BY source ORDER BY count DESC LIMIT 8
            `),
            // Daily Pageviews
            queryPostHog(`
                SELECT toDate(timestamp) as date, count() as count FROM events 
                WHERE timestamp >= '${dateFromStr}' AND event = '$pageview'
                GROUP BY date ORDER BY date
            `)
        ]);

        const response = getDefaultResponse(false, undefined, days);

        // Map events
        if (eventsData?.results) {
            const counts: any = Object.fromEntries(eventsData.results);
            response.data.summary.pageViews = Number(counts['$pageview']) || 0;
            response.data.summary.ctaClicks = Number(counts['cta_clicked']) || 0;
            response.data.summary.briefingsStarted = Number(counts['briefing_started']) || 0;
            response.data.summary.briefingsSubmitted = Number(counts['briefing_submitted']) || 0;
            response.data.summary.linktreeClicks = Number(counts['linktree_clicked']) || 0;
            response.data.summary.whatsappClicks = Number(counts['whatsapp_clicked']) || 0;
        }

        response.data.summary.uniqueUsers = Number(uniqueUsersData?.results?.[0]?.[0]) || 0;

        // Traffic sources
        if (trafficSourcesData?.results) {
            response.data.charts.trafficSources = trafficSourcesData.results.map((r: any) => ({
                name: String(r[0] || 'Desconhecido'),
                count: Number(r[1]) || 0
            }));
        }

        // Fill daily gaps
        const dailyMap = new Map<string, number>(dailyPageviews?.results?.map((r: any) => [String(r[0]), Number(r[1])]) || []);
        const chartData: { date: string; count: number }[] = [];
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0] || '';
            chartData.push({
                date: dateStr,
                count: dailyMap.get(dateStr) || 0
            });
        }
        response.data.charts.pageViewsByDay = chartData;

        // Conversion
        if (response.data.summary.briefingsStarted > 0) {
            response.data.summary.conversionRate = ((response.data.summary.briefingsSubmitted / response.data.summary.briefingsStarted) * 100).toFixed(1) + '%';
        }

        return NextResponse.json(response);
    } catch (e: any) {
        return NextResponse.json(getDefaultResponse(true, e.message, days));
    }
}

async function queryPostHog(query: string) {
    const res = await fetch(`${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${POSTHOG_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: { kind: 'HogQLQuery', query } })
    });
    if (!res.ok) throw new Error(`PH Error ${res.status}`);
    return res.json();
}
