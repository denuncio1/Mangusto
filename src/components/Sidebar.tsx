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
  // ...existing code (apenas objetos de menu)...
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
          { title: "NR 01 - Disposições Gerais", href: "/nr/01", icon: BookOpenText },
          { title: "NR 02 - Inspeção Prévia", href: "/nr/02", icon: BookOpenText },
          { title: "NR 03 - Embargo e Interdição", href: "/nr/03", icon: BookOpenText },
          { title: "NR 04 - SESMT", href: "/nr/04", icon: BookOpenText },
          { title: "NR 05 - CIPA", href: "/nr/05", icon: BookOpenText },
          { title: "NR 06 - EPI", href: "/nr/06", icon: BookOpenText },
          { title: "NR 07 - PCMSO", href: "/nr/07", icon: BookOpenText },
          { title: "NR 09 - PPRA", href: "/nr/09", icon: BookOpenText },
          { title: "NR 10 - Segurança em Instalações e Serviços em Eletricidade", href: "/nr/10", icon: BookOpenText },
          { title: "NR 12 - Segurança no Trabalho em Máquinas e Equipamentos", href: "/nr/12", icon: BookOpenText },
          { title: "NR 15 - Atividades e Operações Insalubres", href: "/nr/15", icon: BookOpenText },
          { title: "NR 17 - Ergonomia", href: "/nr/17", icon: BookOpenText },
          { title: "NR 18 - Condições e Meio Ambiente na Indústria da Construção", href: "/nr/18", icon: BookOpenText },
          { title: "NR 20 - Inflamáveis e Combustíveis", href: "/nr/20", icon: BookOpenText },
          { title: "NR 23 - Proteção Contra Incêndios", href: "/nr/23", icon: BookOpenText },
          { title: "NR 24 - Condições Sanitárias e de Conforto nos Locais de Trabalho", href: "/nr/24", icon: BookOpenText },
          { title: "NR 26 - Sinalização de Segurança", href: "/nr/26", icon: BookOpenText },
          { title: "NR 28 - Fiscalização e Penalidades", href: "/nr/28", icon: BookOpenText },
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
      }
    ]
  },
  {
    title: "SAIR",
    icon: FileText,
    href: "/logout",
  }
];

function SidebarItem({ item, openItems, toggleOpen, parentKey = "" }) {
  const itemKey = item.href || item.title || parentKey;
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
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
            if (hasChildren) {
              e.preventDefault();
              toggleOpen(itemKey);
            }
          }}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.title}
        </NavLink>
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => toggleOpen(itemKey)}
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform", openItems[itemKey] && "rotate-180")}/>
          </Button>
        )}
      </div>
      {hasChildren && openItems[itemKey] && (
        <div className="ml-6 space-y-1">
          {item.children.map((child, idx) => (
            <SidebarItem
              key={child.href || child.title || `${itemKey}-child-${idx}`}
              item={child}
              openItems={openItems}
              toggleOpen={toggleOpen}
              parentKey={`${itemKey}-child-${idx}`}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

function Sidebar() {
  const [openItems, setOpenItems] = useState({});
  const toggleOpen = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <aside className="w-64 bg-sidebar h-full flex flex-col">
      <div className="flex items-center justify-center h-16">
        <MangustoLogo />
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-1 px-2 py-4">
          {navItems.map((item, idx) => (
            <SidebarItem
              key={item.href || item.title || `item-${idx}`}
              item={item}
              openItems={openItems}
              toggleOpen={toggleOpen}
            />
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}

export { Sidebar };