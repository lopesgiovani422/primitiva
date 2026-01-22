import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // STRICT: This layout now ONLY handles strictly protected admin routes.
    // The login page is moved to /login, so it DOES NOT use this layout.
    // If we are here, we MUST have a user.

    if (!user) {
        redirect('/login');
    }

    const userEmail = user?.email ?? null;

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#F2F2F0]">
            <AdminSidebar userEmail={userEmail} />
            <div className="pl-64 min-h-screen flex flex-col">
                {children}
            </div>
        </div>
    );
}
