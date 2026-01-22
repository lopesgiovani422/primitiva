import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { getPostHogClient } from '@/lib/posthog-server';
import { trackMetaServerEvent } from '@/lib/meta-capi';
import { trackGAServerEvent } from '@/lib/ga-server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, data, step, status } = body;

        // Capturar dados do cliente para CAPI
        const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
        const userAgent = request.headers.get('user-agent') || '';

        // Validar dados mínimos para criação (se for novo)
        if (!id && (!data.email && !data.whatsapp)) {
            // Se não tem ID nem contato, não salvamos ainda no banco pra não encher de lixo
            // (A menos que você queira salvar leads anônimos, mas usually esperamos o contato)
            return NextResponse.json({ message: 'Aguardando contato' }, { status: 200 });
        }

        const leadData = {
            ...data,
            step,
            status: status || 'in_progress',
            updated_at: new Date().toISOString(),
        };

        let result;

        if (id) {
            // ATUALIZAR lead existente
            result = await supabase
                .from('leads')
                .update(leadData)
                .eq('id', id)
                .select()
                .single();
        } else {
            // CRIAR novo lead
            result = await supabase
                .from('leads')
                .insert([leadData])
                .select()
                .single();

            // PostHog: Track new lead creation (server-side)
            if (result.data) {
                const posthog = getPostHogClient();
                const distinctId = data.email || data.whatsapp || result.data.id;
                posthog.capture({
                    distinctId: distinctId,
                    event: 'lead_created',
                    properties: {
                        lead_id: result.data.id,
                        step: step,
                        has_email: !!data.email,
                        has_whatsapp: !!data.whatsapp,
                        servico: data.servico || null,
                        source: 'api'
                    }
                });

                // Meta CAPI: Enviar evento de Lead
                await trackMetaServerEvent({
                    event_name: 'Lead',
                    raw_user_data: {
                        email: data.email || undefined,
                        phone: data.whatsapp || undefined,
                    },
                    user_data: {
                        client_ip_address: clientIp,
                        client_user_agent: userAgent,
                    },
                    custom_data: {
                        lead_id: result.data.id,
                        servico: data.servico || 'Não especificado',
                        step: step
                    }
                });

                // Google Analytics: Enviar evento de Lead
                await trackGAServerEvent('generate_lead', {
                    lead_id: result.data.id,
                    step: step,
                    method: data.email ? 'email' : 'whatsapp'
                });
            }
        }

        if (result.error) {
            console.error('Supabase Error:', result.error);
            return NextResponse.json({ error: result.error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, lead: result.data });

    } catch (error) {
        console.error('API Handler Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
