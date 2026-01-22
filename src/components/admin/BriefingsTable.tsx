'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
    CheckCircle,
    Eye,
    User,
    Building2,
    FileText,
    Globe,
    Palette,
    Layers,
    Target,
    Users,
    Activity,
    MessageSquare,
    Zap,
    Briefcase,
    Download,
    FileDown
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
import { Badge } from "@/components/ui/badge";
import { jsPDF } from "jspdf";

interface Briefing {
    id: string;
    created_at: string;
    type: 'site' | 'brand';
    contact_name: string;
    company_name: string;
    [key: string]: any;
}

interface BriefingsTableProps {
    briefings: Briefing[];
}

export default function BriefingsTable({ briefings }: BriefingsTableProps) {
    const [selected, setSelected] = useState<Briefing | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleView = (b: Briefing) => {
        // Normalize data: merge the jsonb 'data' field into the main object if it exists
        const normalizedData = b.data ? { ...b, ...b.data } : b;
        setSelected(normalizedData);
        setIsOpen(true);
    };

    const generatePDF = (briefing: any) => {
        const doc = new jsPDF();
        const margin = 20;
        let y = 20;

        // Header
        doc.setFontSize(22);
        doc.setTextColor(0, 0, 0);
        doc.text("PRIMITIVA", margin, y);
        y += 10;

        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(`BRIEFING: ${briefing.type === 'site' ? 'DESENVOLVIMENTO WEB' : 'IDENTIDADE VISUAL'}`, margin, y);
        y += 15;

        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y, 190, y);
        y += 15;

        // Basic Info
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text("IDENTIFICAÇÃO", margin, y);
        y += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Empresa: ${briefing.company_name || '-'}`, margin, y);
        y += 6;
        doc.text(`Responsável: ${briefing.contact_name || '-'}`, margin, y);
        y += 6;
        doc.text(`Data: ${format(new Date(briefing.created_at), "dd/MM/yyyy HH:mm")}`, margin, y);
        y += 15;

        // Content
        const addSection = (title: string, fields: { label: string, value: any, isSlider?: boolean }[]) => {
            if (y > 250) {
                doc.addPage();
                y = 20;
            }
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text(title.toUpperCase(), margin, y);
            y += 8;

            fields.forEach(f => {
                if (f.value === undefined || f.value === null) return;

                if (f.isSlider) {
                    doc.setFontSize(9);
                    doc.setFont("helvetica", "bold");
                    doc.text(`${f.label}:`, margin, y);

                    const barWidth = 60;
                    const barX = margin + 50;
                    const val = Number(f.value);

                    // Background bar
                    doc.setDrawColor(220, 220, 220);
                    doc.setFillColor(240, 240, 240);
                    doc.rect(barX, y - 3, barWidth, 3, "F");

                    // Value bar
                    doc.setFillColor(0, 0, 0);
                    doc.rect(barX, y - 3, (val / 5) * barWidth, 3, "F");

                    doc.setFont("helvetica", "normal");
                    doc.text(`Nível ${val}/5`, barX + barWidth + 5, y);
                    y += 8;
                } else {
                    doc.setFontSize(10);
                    doc.setFont("helvetica", "bold");
                    const label = `${f.label}: `;
                    const valueStr = Array.isArray(f.value) ? f.value.join(", ") : String(f.value);
                    const splitValue = doc.splitTextToSize(valueStr, 140);

                    if (y + (splitValue.length * 5) > 280) {
                        doc.addPage();
                        y = 20;
                    }

                    doc.text(label, margin, y);
                    doc.setFont("helvetica", "normal");

                    if (splitValue.length > 1 || doc.getTextWidth(label + valueStr) > 160) {
                        y += 5;
                        doc.text(splitValue, margin + 5, y);
                        y += (splitValue.length * 5);
                    } else {
                        doc.text(valueStr, margin + doc.getTextWidth(label), y);
                        y += 6;
                    }
                }
            });
            y += 5;
        };

        if (briefing.type === 'brand') {
            addSection("Essência", [
                { label: "História", value: briefing.origin_story },
                { label: "Valores", value: briefing.main_values },
                { label: "Impacto", value: briefing.transformative_impact },
                { label: "Visão", value: briefing.vision_future }
            ]);
            addSection("Público", [
                { label: "Classe", value: briefing.audience_class },
                { label: "Idade", value: briefing.audience_age },
                { label: "Gênero", value: briefing.audience_gender },
                { label: "Perfil", value: briefing.dream_client_psychographics }
            ]);
            addSection("Personalidade", [
                { label: "Traços", value: briefing.brand_personality_traits },
                { label: "Top 3", value: briefing.top_3_traits },
                { label: "Analogia", value: briefing.brand_analogy }
            ]);
            addSection("Calibragem", [
                { label: "Tradicional/Disruptiva", value: briefing.personality_s1, isSlider: true },
                { label: "Brincalhona/Séria", value: briefing.personality_s2, isSlider: true },
                { label: "Acessível/Exclusiva", value: briefing.personality_s3, isSlider: true },
                { label: "Sutil/Vibrante", value: briefing.personality_s4, isSlider: true },
                { label: "Tecnológica/Humana", value: briefing.personality_s5, isSlider: true }
            ]);
        } else {
            addSection("Estratégia", [
                { label: "Objetivos", value: briefing.main_objective },
                { label: "Tráfego", value: briefing.traffic_source },
                { label: "Páginas", value: briefing.essential_pages }
            ]);
            addSection("Design & UX", [
                { label: "Status Conteúdo", value: briefing.content_status },
                { label: "Referências", value: briefing.references },
                { label: "Vibe Visual", value: briefing.visual_vibe, isSlider: true }
            ]);
            addSection("Tecnologia", [
                { label: "Gestão CMS", value: briefing.cms_needs },
                { label: "Funcionalidades", value: briefing.functionalities },
                { label: "Domínio/Host", value: briefing.domain_hosting },
                { label: "Prazo", value: briefing.deadline }
            ]);
        }

        doc.save(`Briefing_${briefing.company_name.replace(/\s+/g, '_')}_${briefing.type}.pdf`);
    };

    return (
        <>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-950 text-xs uppercase text-zinc-500 font-mono tracking-wider border-b border-zinc-800">
                            <tr>
                                <th className="p-4 pl-6">Tipo</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Empresa</th>
                                <th className="p-4">Responsável</th>
                                <th className="p-4 text-right pr-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {briefings.map((b) => (
                                <tr key={b.id} className="hover:bg-zinc-800/20 transition-colors group">
                                    <td className="p-4 pl-6">
                                        {b.type === 'site' ? (
                                            <Badge variant="outline" className="border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-[10px] uppercase">
                                                <Globe className="w-3 h-3 mr-1" /> Site
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="border-purple-500/20 bg-purple-500/10 text-purple-400 font-mono text-[10px] uppercase">
                                                <Palette className="w-3 h-3 mr-1" /> Brand
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="p-4 text-zinc-400 text-sm whitespace-nowrap font-mono text-xs">
                                        {format(new Date(b.created_at), "dd MMM, HH:mm", { locale: ptBR })}
                                    </td>
                                    <td className="p-4 font-medium text-white">
                                        {b.company_name || b.data?.company_name || '-'}
                                    </td>
                                    <td className="p-4 text-zinc-300">
                                        {b.contact_name || b.data?.contact_name || '-'}
                                    </td>
                                    <td className="p-4 text-right pr-6 flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => generatePDF(b.data ? { ...b, ...b.data } : b)}
                                            className="h-8 w-8 p-0 hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors"
                                            title="Baixar PDF"
                                        >
                                            <FileDown className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleView(b)}
                                            className="h-8 w-8 p-0 hover:bg-white hover:text-black transition-colors"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {briefings.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-zinc-600">Nenhum briefing encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent side="right" className="bg-[#0A0A0A] border-zinc-800 text-white w-full sm:max-w-2xl overflow-y-auto p-0">
                    {selected && (
                        <div className="flex flex-col h-full">
                            <SheetHeader className="p-8 pb-4 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <SheetTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                                            Briefing {selected.type === 'site' ? 'Web' : 'Marca'}
                                        </SheetTitle>
                                        <SheetDescription className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                            ID: {selected.id.split('-')[0]}...
                                        </SheetDescription>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 bg-white/5 border-white/10 text-white hover:bg-white hover:text-black transition-all"
                                            onClick={() => generatePDF(selected)}
                                        >
                                            <Download className="w-3.5 h-3.5 mr-2" />
                                            PDF
                                        </Button>
                                        <Badge className={selected.type === 'site' ? 'bg-blue-500/10 text-blue-400 px-3 py-1' : 'bg-purple-500/10 text-purple-400 px-3 py-1'}>
                                            {selected.type.toUpperCase()}
                                        </Badge>
                                    </div>
                                </div>
                            </SheetHeader>

                            <div className="px-8 pb-12 space-y-10">
                                {/* Informações Básicas */}
                                <section className="space-y-6">
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <User className="w-4 h-4" />
                                        <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Identificação</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest block mb-1">Nome</span>
                                            <p className="text-zinc-200">{selected.contact_name}</p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest block mb-1">Empresa</span>
                                            <p className="text-white font-medium">{selected.company_name}</p>
                                        </div>
                                        {selected.type === 'brand' && (
                                            <div>
                                                <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest block mb-1">Tempo de Mercado</span>
                                                <p className="text-zinc-200">{selected.years_in_business || '-'}</p>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                <Separator className="bg-zinc-800/50" />

                                {selected.type === 'brand' ? (
                                    <BriefingBrandDetails data={selected} />
                                ) : (
                                    <BriefingSiteDetails data={selected} />
                                )}

                                <Separator className="bg-zinc-800/50" />

                                <section>
                                    <div className="text-[10px] font-mono text-zinc-600">
                                        REGISTRADO EM: {format(new Date(selected.created_at), "dd/MM/yyyy HH:mm:ss")}
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

function BriefingBrandDetails({ data }: { data: any }) {
    return (
        <div className="space-y-10">
            {/* Essência */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-500">
                    <Zap className="w-4 h-4" />
                    <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Essência da Marca</h3>
                </div>
                <div className="space-y-6">
                    <DetailBlock label="História/Origem" value={data.origin_story} />
                    <DetailBlock label="Valores Inegociáveis" value={data.main_values} />
                    <DetailBlock label="Impacto Transformativo" value={data.transformative_impact} />
                    <DetailBlock label="Visão de Futuro (5-10 anos)" value={data.vision_future} />
                </div>
            </section>

            <Separator className="bg-zinc-800/50" />

            {/* Tribo */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-500">
                    <Users className="w-4 h-4" />
                    <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Público Alvo</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DetailItem label="Classe" value={data.audience_class} />
                    <DetailItem label="Faixa Etária" value={data.audience_age} />
                    <DetailItem label="Gênero" value={data.audience_gender} />
                </div>
                <DetailBlock label="Psicográfico (Hábitos/Estilo)" value={data.dream_client_psychographics} />
            </section>

            <Separator className="bg-zinc-800/50" />

            {/* Persona */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-500">
                    <FileText className="w-4 h-4" />
                    <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Personalidade</h3>
                </div>
                <div className="space-y-6">
                    <div>
                        <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest block mb-2">Traços da Marca</span>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {data.brand_personality_traits?.map((t: string) => (
                                <Badge key={t} variant="secondary" className="bg-zinc-800 text-zinc-300 border-none">{t}</Badge>
                            ))}
                        </div>
                        {data.brand_personality_traits_other && (
                            <p className="text-xs text-zinc-500 mt-1">Outros: {data.brand_personality_traits_other}</p>
                        )}
                    </div>

                    <div>
                        <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest block mb-2">O que a marca NÃO é</span>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {data.brand_not_person?.map((t: string) => (
                                <Badge key={t} variant="outline" className="text-red-400 border-red-400/20 bg-red-400/5">{t}</Badge>
                            ))}
                        </div>
                        {data.brand_not_person_other && (
                            <p className="text-xs text-zinc-500 mt-1">Outros: {data.brand_not_person_other}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DetailItem label="Top 3 mais fortes" value={data.top_3_traits} />
                        <DetailItem label="Lugar/Objeto/Música" value={data.brand_analogy} />
                    </div>
                </div>
            </section>

            <Separator className="bg-zinc-800/50" />

            {/* Calibragem */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-500">
                    <Activity className="w-4 h-4" />
                    <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Calibragem Visual</h3>
                </div>
                <div className="space-y-4">
                    <CalibrationSlider label="Tradicional vs Disruptiva" value={data.personality_s1} />
                    <CalibrationSlider label="Brincalhona vs Séria" value={data.personality_s2} />
                    <CalibrationSlider label="Acessível vs Exclusiva" value={data.personality_s3} />
                    <CalibrationSlider label="Sutil vs Vibrante" value={data.personality_s4} />
                    <CalibrationSlider label="Tecnológica vs Humana" value={data.personality_s5} />
                </div>
            </section>

            <Separator className="bg-zinc-800/50" />

            {/* Touchpoints */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-500">
                    <Layers className="w-4 h-4" />
                    <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Pontos de Contato</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {data.touchpoints?.map((p: string) => (
                        <Badge key={p} variant="secondary" className="bg-zinc-800 text-zinc-300 border-none">{p}</Badge>
                    ))}
                    {data.touchpoints_other && (
                        <Badge variant="outline" className="border-zinc-700 text-zinc-500">{data.touchpoints_other}</Badge>
                    )}
                </div>
            </section>

            {data.final_considerations && (
                <>
                    <Separator className="bg-zinc-800/50" />
                    <DetailBlock label="Considerações Finais" value={data.final_considerations} />
                </>
            )}
        </div>
    );
}

function BriefingSiteDetails({ data }: { data: any }) {
    return (
        <div className="space-y-10">
            {/* Estratégia */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-500">
                    <Target className="w-4 h-4" />
                    <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Estratégia Web</h3>
                </div>
                <div className="space-y-6">
                    <div>
                        <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest block mb-2">Objetivos Principais</span>
                        <div className="flex flex-wrap gap-2">
                            {data.main_objective?.map((o: string) => (
                                <Badge key={o} variant="secondary" className="bg-zinc-800 text-zinc-300 border-none">{o}</Badge>
                            ))}
                            {data.main_objective_other && (
                                <Badge variant="outline" className="border-zinc-700 text-zinc-500">{data.main_objective_other}</Badge>
                            )}
                        </div>
                    </div>
                    <div>
                        <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest block mb-2">Fontes de Tráfego</span>
                        <div className="flex flex-wrap gap-2">
                            {data.traffic_source?.map((s: string) => (
                                <Badge key={s} variant="secondary" className="bg-zinc-800 text-zinc-300 border-none">{s}</Badge>
                            ))}
                            {data.traffic_source_other && (
                                <Badge variant="outline" className="border-zinc-700 text-zinc-500">{data.traffic_source_other}</Badge>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="bg-zinc-800/50" />

            {/* Conteúdo */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-500">
                    <Layers className="w-4 h-4" />
                    <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Estrutura & Conteúdo</h3>
                </div>
                <div className="space-y-6">
                    <DetailBlock label="Páginas Essenciais" value={data.essential_pages} />
                    <DetailItem label="Status do Conteúdo" value={data.content_status_other || data.content_status} />
                    <DetailBlock label="Referências" value={data.references} italic />
                </div>
            </section>

            <Separator className="bg-zinc-800/50" />

            {/* Design & UX */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-500">
                    <Palette className="w-4 h-4" />
                    <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Design & UX</h3>
                </div>
                <CalibrationSlider label="Estático vs Animado" value={data.visual_vibe} />
            </section>

            <Separator className="bg-zinc-800/50" />

            {/* Tecnologias e Funcionalidades */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-500">
                    <Globe className="w-4 h-4" />
                    <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Funcionalidades & Tech</h3>
                </div>
                <div className="space-y-6">
                    <DetailItem label="Nível de Gerenciamento (CMS)" value={data.cms_needs_other || data.cms_needs} />
                    <div>
                        <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest block mb-2">Funcionalidades Extras</span>
                        <div className="flex flex-wrap gap-2">
                            {data.functionalities?.map((f: string) => (
                                <Badge key={f} variant="secondary" className="bg-zinc-800 text-zinc-300 border-none">{f}</Badge>
                            ))}
                            {data.functionalities_other && (
                                <Badge variant="outline" className="border-zinc-700 text-zinc-500">{data.functionalities_other}</Badge>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="bg-zinc-800/50" />

            {/* Logística */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-500">
                    <Briefcase className="w-4 h-4" />
                    <h3 className="text-xs uppercase font-mono tracking-[0.2em]">Logística & Prazo</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem label="Domínio/Hospedagem" value={data.domain_hosting} />
                    <DetailItem label="Prazo/Deadline" value={data.deadline} />
                </div>
            </section>
        </div>
    );
}

function CalibrationSlider({ label, value }: { label: string, value: number }) {
    if (value === undefined) return null;
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-zinc-600">
                <span>{label}</span>
                <span className="text-zinc-400">Nível {value}</span>
            </div>
            <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                <div
                    className="h-full bg-white transition-all duration-1000"
                    style={{ width: `${(value / 5) * 100}%` }}
                />
            </div>
        </div>
    );
}

function DetailBlock({ label, value, italic = false }: { label: string, value: string, italic?: boolean }) {
    if (!value) return null;
    return (
        <div className="space-y-2">
            <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest block">{label}</span>
            <p className={`text-zinc-300 text-sm leading-relaxed ${italic ? 'italic font-serif text-base' : ''}`}>
                {italic ? `"${value}"` : value}
            </p>
        </div>
    );
}

function DetailItem({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest block mb-1">{label}</span>
            <p className="text-zinc-200">{value || '-'}</p>
        </div>
    );
}
