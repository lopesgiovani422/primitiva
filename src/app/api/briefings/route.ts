import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { trackMetaServerEvent } from '@/lib/meta-capi';
import { trackGAServerEvent } from '@/lib/ga-server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, data, type, status } = body;

        // Capturar dados do cliente para CAPI
        const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
        const userAgent = request.headers.get('user-agent') || '';

        if (!data.company_name && !data.contact_name) {
            return NextResponse.json({ message: 'Dados insuficientes' }, { status: 400 });
        }

        const briefingData = {
            contact_name: data.contact_name,
            company_name: data.company_name,
            type, // 'site' or 'brand'
            status: status || 'completed',
            data: data, // Store full payload here
            updated_at: new Date().toISOString(),
        };

        let result;

        if (id) {
            result = await supabase
                .from('briefings')
                .update(briefingData)
                .eq('id', id)
                .select()
                .single();
        } else {
            result = await supabase
                .from('briefings')
                .insert([briefingData])
                .select()
                .single();

            // Meta CAPI: Enviar evento de Lead / Conversão Final
            if (result.data) {
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
                        briefing_type: type,
                        company: data.company_name,
                        submission_type: 'full_briefing'
                    }
                });

                // Google Analytics: Enviar evento de Lead / Conversão Final
                await trackGAServerEvent('generate_lead', {
                    briefing_id: result.data.id,
                    type: type,
                    company: data.company_name
                });
            }
        }

        if (result.error) {
            console.error('Supabase Error:', result.error);
            return NextResponse.json({ error: result.error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, briefing: result.data });

    } catch (error) {
        console.error('API Handler Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('briefings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
