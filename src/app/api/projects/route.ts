import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { client_name, project_name, status_progress, notion_url, drive_url, stitch_url, extra_links, status_label } = body;

        if (!client_name) {
            return NextResponse.json({ error: 'Nome do cliente é obrigatório' }, { status: 400 });
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from('projects')
            .insert([{
                client_name,
                project_name,
                status_progress: Number(status_progress) || 0,
                notion_url,
                drive_url,
                stitch_url,
                extra_links,
                status_label: status_label || 'Em andamento'
            }])
            .select()
            .single();

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, project: data });

    } catch (error) {
        console.error('API Handler Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID do projeto é obrigatório' }, { status: 400 });
        }

        const supabase = await createClient();

        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, client_name, project_name, status_progress, notion_url, drive_url, stitch_url, extra_links, status_label } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID do projeto é obrigatório' }, { status: 400 });
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from('projects')
            .update({
                client_name,
                project_name,
                status_progress: Number(status_progress),
                notion_url,
                drive_url,
                stitch_url,
                extra_links,
                status_label
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, project: data });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
