'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
    CheckCircle,
    Clock,
    Eye,
    Mail,
    Phone,
    Building2,
    User,
    Calendar,
    BarChart3,
    CircleDollarSign,
    Timer,
    MessageSquare,
    Search
} from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Lead {
    id: string;
    created_at: string;
    status: string;
    nome: string;
    empresa: string;
    email: string;
    whatsapp: string;
    servico: string;
    investimento: string;
    prazo: string;
    descricao: string;
    origem: string;
    step: number;
}

interface LeadsTableProps {
    leads: Lead[];
}

export default function LeadsTable({ leads }: LeadsTableProps) {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleViewLead = (lead: Lead) => {
        setSelectedLead(lead);
        setIsSheetOpen(true);
    };

    return (
        <>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-950 text-xs uppercase text-zinc-500 font-mono tracking-wider border-b border-zinc-800">
                            <tr>
                                <th className="p-4 pl-6">Status</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Empresa</th>
                                <th className="p-4">Nome</th>
                                <th className="p-4">Contato</th>
                                <th className="p-4">Progresso</th>
                                <th className="p-4 text-right pr-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-zinc-800/20 transition-colors group">
                                    <td className="p-4 pl-6">
                                        {lead.status === 'completed' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-green-500/10 text-green-500 border border-green-500/20">
                                                <CheckCircle className="w-3 h-3" /> Completo
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                                <Clock className="w-3 h-3" /> Parcial
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-zinc-400 text-sm whitespace-nowrap font-mono text-xs">
                                        {format(new Date(lead.created_at), "dd MMM, HH:mm", { locale: ptBR })}
                                    </td>
                                    <td className="p-4 font-medium text-white">
                                        {lead.empresa || <span className="text-zinc-700 italic">Sem empresa</span>}
                                    </td>
                                    <td className="p-4 text-zinc-300">
                                        {lead.nome || <span className="text-zinc-700">-</span>}
                                    </td>
                                    <td className="p-4 text-zinc-400 text-sm font-mono text-xs">
                                        <div className="flex flex-col gap-1">
                                            {lead.whatsapp && <span>{lead.whatsapp}</span>}
                                            {lead.email && <span className="text-xs opacity-60">{lead.email}</span>}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                                            <span>{Math.min(Math.round((lead.step / 9) * 100), 100)}%</span>
                                            <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${lead.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}
                                                    style={{ width: `${Math.min((lead.step / 9) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleViewLead(lead)}
                                            className="h-8 w-8 p-0 hover:bg-white hover:text-black transition-colors"
                                        >
                                            <Eye className="h-4 w-4" />
                                            <span className="sr-only">Visualizar</span>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {leads.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-zinc-600">Nenhum lead encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="right" className="bg-[#0A0A0A] border-zinc-800 text-white w-full sm:max-w-xl overflow-y-auto p-0">
                    {selectedLead && (
                        <div className="flex flex-col h-full">
                            <SheetHeader className="p-8 pb-4 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <SheetTitle className="text-2xl font-bold tracking-tight text-white">
                                            Detalhes do Lead
                                        </SheetTitle>
                                        <SheetDescription className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                            ID: {selectedLead.id.split('-')[0]}...
                                        </SheetDescription>
                                    </div>
                                    {selectedLead.status === 'completed' ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-green-500/10 text-green-500 border border-green-500/20">
                                            <CheckCircle className="w-3.5 h-3.5" /> Completo
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                            <Clock className="w-3.5 h-3.5" /> Parcial
                                        </span>
                                    )}
                                </div>
                            </SheetHeader>

                            <div className="px-8 pb-12 space-y-10">
                                {/* Informações Básicas */}
                                <section className="space-y-6">
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <User className="w-4 h-4" />
                                        <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Contato</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest">Nome</span>
                                            <p className="text-zinc-200">{selectedLead.nome || '-'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest">Empresa</span>
                                            <p className="text-white font-medium">{selectedLead.empresa || '-'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest">WhatsApp</span>
                                            <p className="text-zinc-200 font-mono">{selectedLead.whatsapp || '-'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest">Email</span>
                                            <p className="text-zinc-200 font-mono text-sm">{selectedLead.email || '-'}</p>
                                        </div>
                                    </div>
                                </section>

                                <Separator className="bg-zinc-800/50" />

                                {/* Briefing */}
                                <section className="space-y-6">
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <BarChart3 className="w-4 h-4" />
                                        <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Briefing</h3>
                                    </div>
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-zinc-600">
                                                    <Timer className="w-3 h-3" />
                                                    <span className="text-[10px] uppercase font-mono tracking-widest">Prazo</span>
                                                </div>
                                                <p className="text-zinc-200">{selectedLead.prazo || '-'}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-zinc-600">
                                                    <CircleDollarSign className="w-3 h-3" />
                                                    <span className="text-[10px] uppercase font-mono tracking-widest">Investimento</span>
                                                </div>
                                                <p className="text-zinc-200">{selectedLead.investimento || '-'}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-zinc-600">
                                                <Building2 className="w-3 h-3" />
                                                <span className="text-[10px] uppercase font-mono tracking-widest">Serviço</span>
                                            </div>
                                            <p className="text-zinc-200">{selectedLead.servico || '-'}</p>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-zinc-600">
                                                <Search className="w-3 h-3" />
                                                <span className="text-[10px] uppercase font-mono tracking-widest">Como conheceu</span>
                                            </div>
                                            <p className="text-zinc-200">{selectedLead.origem || '-'}</p>
                                        </div>

                                        <div className="space-y-3 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                                            <div className="flex items-center gap-2 text-zinc-600">
                                                <MessageSquare className="w-3 h-3" />
                                                <span className="text-[10px] uppercase font-mono tracking-widest">Descrição do Projeto</span>
                                            </div>
                                            <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap italic font-serif">
                                                "{selectedLead.descricao || 'Sem descrição fornecida'}"
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <Separator className="bg-zinc-800/50" />

                                {/* Metadados */}
                                <section className="space-y-4">
                                    <div className="flex items-center gap-2 text-zinc-700">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <h3 className="text-[10px] uppercase font-mono tracking-[0.2em]">Registro</h3>
                                    </div>
                                    <div className="text-[10px] font-mono text-zinc-600 space-y-1">
                                        <p>CRIADO EM: {format(new Date(selectedLead.created_at), "dd/MM/yyyy HH:mm:ss")}</p>
                                        <p>PROGRESSO: {Math.min(selectedLead.step, 9)} / 9 PASSOS</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
}
