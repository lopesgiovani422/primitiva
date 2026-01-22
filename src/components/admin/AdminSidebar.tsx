'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Users,
    FileText,
    LayoutDashboard,
    LogOut,
    ChevronRight,
    Lock,
    BarChart3
} from 'lucide-react';
import { cn } from "@/lib/utils";
import SignOutButton from '@/components/SignOutButton';

export default function AdminSidebar({ userEmail }: { userEmail?: string | null }) {
    const pathname = usePathname();

    const menuItems = [
        {
            title: "Leads",
            icon: Users,
            href: "/admin/leads",
            active: pathname === "/admin/leads" || pathname === "/admin"
        },
        {
            title: "Projetos",
            icon: LayoutDashboard,
            href: "/admin/projects",
            active: pathname === "/admin/projects"
        },
        {
            title: "Briefings",
            icon: FileText,
            href: "/admin/briefings",
            active: pathname === "/admin/briefings"
        },
        {
            title: "Analytics",
            icon: BarChart3,
            href: "/admin/analytics",
            active: pathname === "/admin/analytics"
        }
    ];

    return (
        <aside className="w-64 border-r border-zinc-800 bg-[#0A0A0A] flex flex-col fixed inset-y-0 left-0 z-50">
            {/* Header */}
            <div className="h-20 border-b border-zinc-800 flex items-center px-6">
                <img src="/assets/primitiva/primitiva_logo.svg" alt="Primitiva" className="h-4 w-auto opacity-80" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                <div className="px-2 mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-zinc-600">Navegação</span>
                </div>
                {menuItems.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                            "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 group",
                            item.active
                                ? "bg-white text-black"
                                : "text-zinc-500 hover:text-white hover:bg-zinc-900"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className={cn("w-4 h-4", item.active ? "text-black" : "group-hover:text-white")} />
                            <span className="text-sm font-medium">{item.title}</span>
                        </div>
                        {item.active && <ChevronRight className="w-3 h-3" />}
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-800">
                {userEmail && (
                    <div className="px-3 py-3 mb-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                        <div className="flex items-center gap-2 text-green-500 mb-1">
                            <Lock className="w-3 h-3" />
                            <span className="text-[10px] font-mono uppercase tracking-widest">Autenticado</span>
                        </div>
                        <p className="text-xs text-zinc-400 truncate">{userEmail}</p>
                    </div>
                )}
                <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-700">Painel v1.2</span>
                    <SignOutButton />
                </div>
            </div>
        </aside>
    );
}
