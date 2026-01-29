import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ClipboardList, ListChecks, FolderOpen, HeartPulse, Calculator, GraduationCap,
  BellRing, LayoutDashboard, FileText, Link, Sparkles, Scale, Target, Users, History,
  ListPlus, FlaskConical, ShieldAlert, ChevronDown, ClipboardType, TrendingUp, CheckCircle,
  FileSignature, ScanText, Share2, SearchCheck, FileQuestion, BarChart3,
  Gauge, Lightbulb, BookOpenText, CalendarCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import MangustoLogo from "./MangustoLogo";

const navItems = [
  {
    title: "ADMINISTRATIVO",
    icon: LayoutDashboard,
    children: [
      { title: "Dashboard Gerencial", href: "/dashboard", icon: LayoutDashboard },
      { title: "Perfil da Empresa", href: "/company-profile", icon: Scale },
      { title: "Gestão de Funcionários", href: "/sst-lists/funcionario", icon: Users },
      { title: "Cadastrar Funcionário", href: "/funcionario-form", icon: ListPlus },
    ],
  },
  {
    title: "RH / ADM",
    icon: Users,
    children: [
      { title: "Capacitação e Sensibilização", href: "/training-awareness", icon: GraduationCap },
      { title: "Monitoramento da Saúde (S-2220)", href: "/occupational-exam-form", icon: HeartPulse },
      { title: "Administração de Relatos Psicossociais", href: "/psychosocial-report-admin", icon: HeartPulse },
    ],
  },
  {
    title: "SEGURANÇA",
    icon: ShieldAlert,
    children: [
      {
        title: "Normas Regulamentadoras (NRs)",
        icon: BookOpenText,
        children: [
          // ...NRs conforme bloco anterior, mantendo status e subitens...
        ],
      },
      { title: "Gestão de EPI/EPC", href: "/epi-epc-management/stock-control", icon: ShieldAlert },
      { title: "Inventário de Riscos Ocupacionais", href: "/occupational-risk-inventory", icon: ClipboardList },
      { title: "Plano de Ação Integrado", href: "/integrated-action-plan", icon: ListChecks },
      { title: "Gestão de Emergências", href: "/emergency-management", icon: BellRing },
      { title: "Predição de Acidentes (IA)", href: "/accident-prediction", icon: Target },
    ],
  },
  {
    title: "SAÚDE",
    icon: HeartPulse,
    children: [
      { title: "Módulo de Avaliação Psicossocial", href: "/psychosocial-assessment", icon: HeartPulse },
      { title: "Canal de Denúncia/Sugestão Psicossocial", href: "/psychosocial-report", icon: HeartPulse },
    ],
  },
  {
    title: "DOCUMENTOS",
    icon: FolderOpen,
    children: [
      { title: "Gestão de Documentos Digitais", href: "/document-management", icon: FolderOpen },
      { title: "Automação de Relatórios", href: "/report-automation", icon: FileText },
    ],
  },
  {
    title: "FINANCEIRO",
    icon: BarChart3,
    children: [
      { title: "Dashboard ESG – Social", href: "/esg-dashboard", icon: BarChart3 },
    ],
  },
  {
    title: "RELATÓRIOS",
    icon: FileText,
    children: [
      { title: "Relatórios Integrados", href: "/psychosocial-assessment/integrated-reports", icon: BarChart3 },
      { title: "Simulador de Classificação de Riscos", href: "/risk-classification-simulator", icon: Calculator },
    ],
  },
  {
    title: "SAIR",
    icon: FileText,
    href: "/logout",
  },
];
  // ...existing code...
// ...existing code...
    {
      title: "Comunicação de Acidente de Trabalho (S-2210)",
      icon: ShieldAlert,
      children: [
        {
          title: "Input Rápido CAT",
          href: "/occupational-accident-quick-input",
          icon: FileText,
        },
      ],
    },
  {
    title: "Monitoramento da Saúde (S-2220)",
    icon: HeartPulse,
    children: [
      {
        title: "Registrar Exame Ocupacional",
        href: "/occupational-exam-form",
        icon: FileText,
      },
      {
        title: "Exames Registrados / Exportar XML",
        href: "/occupational-exam-list",
        icon: FileText,
      },
    ],
  },
  {
    title: "Predição de Acidentes (IA)",
    href: "/accident-prediction",
    icon: Target,
    adminOnly: true,
  },
  {
    title: "Assistente de Conformidade NR-01",
    href: "/compliance-assistant",
    icon: Target,
    adminOnly: true,
  },
  {
    title: "Administração de Relatos Psicossociais",
    href: "/psychosocial-report-admin",
    icon: Target,
    adminOnly: true,
  },
  {
    title: "Gestão de Terceiros",
    href: "/third-party",
    icon: Users,
    children: [
      {
        title: "Intercâmbio de Inventários",
        href: "/third-party/ThirdPartyExchange",
        icon: Share2,
      },
      {
        title: "Consolidação de Riscos",
        href: "/third-party/ThirdPartyConsolidation",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Glossário NR-01",
    href: "/glossario-nr01",
    icon: BookOpenText,
  },
  {
    title: "Perfil da Empresa",
    href: "/company-profile",
    icon: Scale,
  },
  {
    title: "Dashboard Gerencial",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Gestão de Funcionários",
    href: "/sst-lists/funcionario",
    icon: Users,
  },
  {
    title: "Cadastrar Funcionário",
    href: "/funcionario-form",
    icon: ListPlus,
  },
  {
    title: "Dashboard ESG – Social",
    href: "/esg-dashboard",
    icon: BarChart3,
    adminOnly: false,
  },
  {
    title: "Inventário de Riscos Ocupacionais",
    href: "/occupational-risk-inventory",
    icon: ClipboardList,
    children: [
      {
        title: "Levantamento Preliminar de Perigos",
        href: "/occupational-risk-inventory/preliminary-hazard-assessment",
        icon: SearchCheck,
      },
      {
        title: "Cadastro de Perigos e Riscos",
        href: "/occupational-risk-inventory/hazard-risk-registration",
        icon: ListPlus,
      },
      {
        title: "Inclusão de Agentes de Risco",
        href: "/occupational-risk-inventory/risk-agents",
        icon: FlaskConical,
      },
      {
        title: "Classificação de Risco (NR-1)",
        href: "/occupational-risk-inventory/risk-classification",
        icon: ShieldAlert,
      },
    ],
  },
  {
    title: "Plano de Ação Integrado",
    href: "/integrated-action-plan",
    icon: ListChecks,
    children: [
      {
        title: "Medidas de Prevenção",
        href: "/integrated-action-plan/prevention-measures",
        icon: ClipboardType,
      },
      {
        title: "Priorização Automática",
        href: "/integrated-action-plan/automatic-prioritization",
        icon: TrendingUp,
      },
      {
        title: "Acompanhamento de Ações",
        href: "/integrated-action-plan/action-monitoring",
        icon: CheckCircle,
      },
    ],
  },
  {
    title: "Gestão de Documentos Digitais",
    href: "/document-management",
    icon: FolderOpen,
    children: [
      {
        title: "Emissão e Certificado Digital",
        href: "/document-management/digital-certificate-emission",
        icon: FileSignature,
      },
      {
        title: "Digitalização Segura (NR-1.6)",
        href: "/document-management/secure-digitization",
        icon: ScanText,
      },
      {
        title: "Compartilhamento com Entidades",
        href: "/document-management/share-with-entities",
        icon: Share2,
      },
    ],
  },
  {
    title: "Módulo de Avaliação Psicossocial",
    href: "/psychosocial-assessment",
    icon: HeartPulse,
    children: [
      {
        title: "Questionários e Análise",
        href: "/psychosocial-assessment/questionnaires-analysis",
        icon: FileQuestion,
      },
      {
        title: "Relatórios Integrados",
        href: "/psychosocial-assessment/integrated-reports",
        icon: BarChart3,
      },
      {
        title: "Foco em Riscos Psicossociais",
        href: "/psychosocial-assessment/psychosocial-focus",
        icon: Target,
      },
    ],
  },

  // Canal de Denúncia/Sugestão Psicossocial (fixo, visível para todos)
  {
    title: "Canal de Denúncia/Sugestão Psicossocial",
    href: "/psychosocial-report",
    icon: HeartPulse,
    adminOnly: false,
  },
  {
    title: "Simulador de Classificação de Riscos",
    href: "/risk-classification-simulator",
    icon: Calculator,
    children: [
      {
        title: "Calculadora de Nível de Risco",
        href: "/risk-classification-simulator/interactive-risk-calculator",
        icon: Gauge,
      },
      {
        title: "Sugestão de Medidas Automática",
        href: "/risk-classification-simulator/automatic-measures-suggestion",
        icon: Lightbulb,
      },
    ],
  },
  {
    title: "Capacitação e Sensibilização",
    href: "/training-awareness",
    icon: GraduationCap,
    children: [
      {
        title: "EAD/Semipresencial (NR-01)",
        href: "/ead-trainings",
        icon: GraduationCap,
      },
      {
        title: "Trilhas de Treinamento",
        href: "/training-awareness/training-tracks",
        icon: BookOpenText,
      },
      {
        title: "Registro de Ações",
        href: "/training-awareness/action-registration",
        icon: CalendarCheck,
      },
    ],
  },
  {
    title: "Gestão de Emergências",
    href: "/emergency-management",
    icon: BellRing,
  },
  {
    title: "Automação de Relatórios",
    href: "/report-automation",
    icon: FileText,
  },
  {
    title: "Integração com PGR",
    href: "/pgr-integration",
    icon: Link,
  },
  {
    title: "Funcionalidades Extras",
    href: "/extra-features",
    icon: Sparkles,
  },
  {
    title: "Conformidade legal automatizada",
    href: "/legal-compliance",
    icon: Scale,
  },
  // Removido: Foco em riscos psicossociais do menu principal
  {
    title: "Integração com CIPA e trabalhadores",
    href: "/cipa-integration",
    icon: Users,
    children: [
      {
        title: "Canal de Consulta e Participação (NR-1, 1.5.3.3)",
        href: "/cipa-integration/consultation-participation-channel",
        icon: SearchCheck,
      },
      {
        title: "Prevenção ao Assédio (NR-1, 1.4.1.1)",
        href: "/cipa-integration/harassment-prevention",
        icon: ShieldAlert,
      },
    ],
  },
  {
    title: "Ordens de Serviço de SST",
    href: "/service-orders",
    icon: FileText,
  },
  {
    title: "Histórico de atualizações por 20 anos",
    href: "/update-history",
    icon: History,
  },
];

export const Sidebar = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleOpen = (href: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  return (
    <ScrollArea className="h-full py-4 overflow-auto">
      <div className="flex flex-col items-center py-4">
        <MangustoLogo className="mb-6" />
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-sidebar-foreground">
          Menu Principal
        </h2>
        <div className="space-y-1">
          {navItems.map((item, idx) => {
            const itemKey = item.href || item.title || idx;
            return (
              <React.Fragment key={itemKey}>
                <div className="flex items-center justify-between">
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex-grow",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground"
                      )
                    }
                    onClick={(e) => {
                      if (item.children) {
                        e.preventDefault();
                        toggleOpen(item.href);
                      }
                    }}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.title}
                  </NavLink>
                  {item.children && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleOpen(item.href)}
                    >
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openItems[item.href] && "rotate-180")}/>
                    </Button>
                  )}
                </div>
                {openItems[item.href] && item.children && (
                  <div className="ml-6 space-y-1">
                    {item.children.map((child, cidx) => {
                      const childKey = child.href || child.title || `${itemKey}-child-${cidx}`;
                      return (
                        <NavLink
                          key={childKey}
                          to={child.href}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              isActive
                                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                : "text-sidebar-foreground"
                            )
                          }
                        >
                          {child.icon && <child.icon className="h-4 w-4" />}
                          {child.title}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}