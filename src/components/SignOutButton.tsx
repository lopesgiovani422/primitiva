'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh(); // Refresh para atualizar middleware e redirect
    };

    return (
        <button
            onClick={handleSignOut}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
            title="Sair"
        >
            <LogOut className="w-5 h-5" />
        </button>
    );
}
