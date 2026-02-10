// (empty line removed)
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ClipboardList, ListChecks, FolderOpen, HeartPulse, Calculator, GraduationCap,
  BellRing, LayoutDashboard, FileText, Link, Sparkles, Scale, Target, Users, History,
  ListPlus, FlaskConical, ShieldAlert, ChevronDown, ClipboardType, TrendingUp, CheckCircle,
  FileSignature, ScanText, Share2, SearchCheck, FileQuestion, BarChart3,
  Gauge, Lightbulb, BookOpenText, CalendarCheck, Stethoscope,
  Wrench, ShieldCheck, BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MangustoLogo from "./MangustoLogo";

const navItems = [
  {
    title: "OPERAÇÕES E EQUIPAMENTOS (NR-10, 11, 12, 13, 18, 35)",
    icon: Wrench,
    children: [
      { title: "Checklist de Máquinas (NR-12)", href: "/operacoes/checklist-maquinas", icon: ClipboardList, description: "Inspeções digitais de máquinas com foto e evidência." },
      { title: "Dashboard de Conformidade Legal por NR", href: "/dashboard-conformidade-legal", icon: BarChart3, description: "Painel de indicadores por NR para auditoria ISO 45001 e fiscalizações." },
      { title: "Vasos de Pressão e Caldeiras (NR-13)", href: "/operacoes/vasos-caldeiras", icon: FileText, description: "Prontuários e inspeções periódicas com alerta de vencimento." },
      { title: "Gestão de EPI/EPC (NR-06)", href: "/epi-epc-management", icon: ShieldCheck, description: "Controle de estoque, CA automático e entrega via biometria facial." },
      { title: "Permissão de Trabalho Digital (PT/PET)", href: "/operacoes/permissao-trabalho", icon: BadgeCheck, description: "Liberação digital de trabalho em altura ou espaço confinado via celular." },
      { title: "Checklist PT/PET Inteligente", href: "/operacoes/checklist-ptpet", icon: BadgeCheck, description: "Checklist dinâmico com biometria e geolocalização." },
      { title: "Mapa de Riscos Operacionais (Game Changer)", href: "/operacoes/mapa-riscos-operacionais", icon: Sparkles, description: "Mapa interativo com alertas em tempo real de riscos, PTs, EPIs e áreas críticas." },
      { title: "Planta Interativa", href: "/operacoes/planta-interativa", icon: LayoutDashboard, description: "Visualização interativa da planta com áreas de risco." },
      { title: "IA: Detecção de Não Conformidades em Fotos", href: "/operacoes/ia-nao-conformidades", icon: ScanText, description: "Analisa fotos de inspeções e detecta riscos automaticamente via IA." },
      { title: "Telemetria de Máquinas (IoT)", href: "/operacoes/telemetria-maquinas", icon: Gauge, description: "Dashboard de sensores, alertas, manutenção e previsão de falhas." },
      { title: "Rota de Inspeção Inteligente", href: "/operacoes/rota-inspecao-inteligente", icon: ListChecks, description: "Sugere a melhor rota de inspeção para técnicos, reduzindo tempo e deslocamento." },
      { title: "Integração CMMS / Manutenção", href: "/operacoes/integracao-cmms-manutencao", icon: Wrench, description: "Abre ordem de manutenção automática, acompanha SLA e fecha NC ao concluir." },
    ],
  },
  {
    title: "COMPLIANCE",
    icon: Scale,
    activeBg: '#38b000', // verde
    activeColor: '#fff',
    children: [
      {
        title: "Biblioteca de Normas 'Live'",
        href: "/compliance/normas",
        icon: BookOpenText,
        description: "Consulta a todas as NRs na íntegra ou resumidas, atualizadas via API do Governo. Filtros inteligentes, modo leigo, favoritos, anotações e links cruzados com outros módulos."
      },
      {
        title: "Auditoria Interna por NR",
        href: "/compliance/auditoria",
        icon: ClipboardList,
        description: "Checklists prontos e customizáveis por NR, registro de evidências, classificação de itens, relatórios automáticos e integração com gestão de não conformidades."
      },
      {
        title: "Simulados de Fiscalização",
        href: "/compliance/simulados-fiscalizacao",
        icon: SearchCheck,
        description: "Checklists simulando fiscalizações reais, geração de índice de prontidão e integração com planos de ação."
      },
      {
        title: "Gestão de Não Conformidades (Plano de Ação 5W2H)",
        href: "/nc-list",
        icon: ListChecks,
        description: "Registro e tratamento de NCs, fluxo 5W2H, linha do tempo, evidências e relatórios para auditorias."
      },
      {
        title: "Leis e Integrações",
        href: "/compliance/leis",
        icon: FileText,
        description: "Consulta a leis, integrações com API do governo, eventos, mensageria e segurança/LGPD."
      }
    ]
  },
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
      {
        title: "Gestão de Terceiros e Acessos",
        icon: ShieldAlert,
        children: [
          { title: "Portal do Fornecedor", href: "/third-party/portal", icon: FolderOpen },
          { title: "Upload de Documentos com IA (OCR)", href: "/third-party/upload", icon: ScanText },
          { title: "Painel do Gestor de Terceiros", href: "/third-party/manager", icon: Users },
          { title: "Integração com Portaria", href: "/third-party/access-control", icon: Link },
          { title: "Histórico de Acessos Bloqueados", href: "/third-party/access-history", icon: History },
        ],
      },
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
    title: "SAÚDE ESTRATÉGICA (PCMSO, Reabilitação e Avaliação Psicossocial)",
    icon: Stethoscope,
    children: [
      { title: "Prontuário", href: "/medical-record", icon: FileText },
      { title: "Vacinas", href: "/vaccines", icon: FileText },
      { title: "Absenteísmo", href: "/absenteeism", icon: FileText },
      { title: "Cadastro de Clínicas", href: "/clinic-crud", icon: Stethoscope, description: "Gerencie clínicas de saúde ocupacional parceiras." },
      { title: "Gestão de Clínicas e Credenciados", href: "/clinicas-credenciadas", icon: FolderOpen, description: "Lista, avaliação e gestão de clínicas credenciadas, integração com cadastro e contratos." },
      { title: "App do Colaborador", href: "/app-colaborador", icon: Users, description: "Versão mobile para colaboradores: exames, vacinas, atestados, perfil e notificações." },
      { title: "BI de Saúde Corporativa", href: "/bi-saude", icon: BarChart3, description: "Indicadores, dashboards e exportação para Power BI da saúde corporativa." },
      { title: "Telemedicina Ocupacional", href: "/telemedicina", icon: CalendarCheck, description: "Agende e realize teleconsultas ocupacionais, upload de documentos e emissão automática de ASO." },
      // Motor de Riscos Integrado (PGR + PCMSO)
      {
        title: "Motor de Riscos Integrado (PGR + PCMSO)",
        icon: Gauge,
        children: [
          {
            title: "Exames Obrigatórios",
            href: "/risk-engine/mandatory-exams",
            icon: Stethoscope,
            description: "Cruzamento automático entre Função, Riscos do PGR e Exames do PCMSO. Geração da matriz de exames, periodicidade e justificativa legal."
          },
          {
            title: "Indicador de Conformidade",
            href: "/risk-engine/compliance-indicator",
            icon: CheckCircle,
            description: "Visualização do status dos exames: Verde (em dia), Amarelo (próximo do vencimento), Vermelho (vencido)."
          },
          {
            title: "Ações Sugeridas",
            href: "/risk-engine/suggested-actions",
            icon: CalendarCheck,
            description: "Agendar, Reagendar ou Solicitar laudo conforme pendências identificadas."
          }
        ]
      },
      { title: "PCMSO e Exames Ocupacionais", href: "/occupational-exam-form", icon: HeartPulse },
      { title: "Agendar Exame (ASO)", href: "/aso-scheduling", icon: CalendarCheck },
      { title: "Reabilitação Inteligente (NR-17)", href: "/rehabilitation", icon: HeartPulse },
      { title: "Saúde Mental & Psicossocial (Menu)", href: "/saude-mental", icon: HeartPulse },
      { title: "Dashboard Psicossocial", href: "/psychosocial-dashboard", icon: LayoutDashboard },
      { title: "Avaliação Psicossocial", href: "/psychosocial-assessment", icon: HeartPulse },
      { title: "Plano de Ação Psicossocial", href: "/psychosocial-action-plan", icon: FileText },
      { title: "Histórico de Avaliações Psicossociais", href: "/psychosocial-history", icon: History },
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
    title: "SST Financeira & ESG",
    icon: BarChart3,
    children: [
      { title: "Painel Financeiro de SST", href: "/painel-financeiro-sst", icon: BarChart3, description: "Visão geral financeira, economia potencial, FAP, RAT, NTEP, indicadores críticos e simulação de cenários." },
      { title: "Gestão de FAP/RAT/NTEP", href: "/gestao-fap-rat-ntep", icon: Calculator, description: "Gestão de acidentes, impacto no FAP, riscos NTEP, contestação de nexo e cálculo de economia tributária." },
      { title: "Contestação de Nexo", href: "/contestar-nexo", icon: FileSignature, description: "Contestação de nexo técnico, anexos, argumentação sugerida por IA e geração de PDF." },
      { title: "Dashboard ESG – Social", href: "/esg-dashboard", icon: BarChart3, description: "Indicadores sociais (S), diversidade, treinamentos, ações corretivas e relatórios prontos para investidores." },
      { title: "BI Preditivo (IA)", href: "/bi-preditivo", icon: Lightbulb, description: "IA preditiva indicando probabilidade do próximo acidente, fatores de risco e recomendações." },
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
  // Defina cores por funcionalidade
  const colorMap = {
    'COMPLIANCE': 'bg-green-600 text-white',
    'Auditoria Interna por NR': 'bg-blue-600 text-white',
    'Simulados de Fiscalização': 'bg-yellow-400 text-black',
    // Adicione mais se desejar
  };
  return (
    <React.Fragment key={itemKey}>
      <div className="flex items-center justify-between group">
        <NavLink
          to={item.href}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-4 py-2 text-base font-semibold transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex-grow shadow-sm border border-transparent group-hover:border-sidebar-accent/40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md",
              isActive && colorMap[item.title]
            )
          }
          style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleOpen(itemKey);
            }
          }}
        >
          {item.icon && <item.icon className="h-5 w-5 opacity-80" />}
          <span className="truncate">{item.title}</span>
        </NavLink>
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-1"
            onClick={() => toggleOpen(itemKey)}
            aria-label="Abrir submenu"
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform", openItems[itemKey] && "rotate-180")}/>
          </Button>
        )}
      </div>
      {hasChildren && openItems[itemKey] && (
        <div className="ml-2 mt-2 mb-2 p-3 bg-white/95 dark:bg-zinc-900/95 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 relative animate-fade-in">
          <Button
            variant="outline"
            size="sm"
            className="absolute left-2 top-2 z-10 rounded-full px-3 py-1 text-base font-medium shadow-md border border-sidebar-accent/30 bg-white/80 dark:bg-zinc-900/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => toggleOpen(itemKey)}
          >
            ← Voltar
          </Button>
          <div className="pt-10 space-y-2">
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
        </div>
      )}
    </React.Fragment>
  );
}

function Sidebar() {
  const [openItems, setOpenItems] = useState({});
  const navigate = useNavigate();
  const toggleOpen = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <aside
      className="fixed inset-0 z-50 h-screen w-screen bg-white flex flex-col md:static md:w-72 md:max-w-xs md:bg-sidebar/90 md:border-r md:shadow-2xl md:rounded-none"
    >
      <div className="flex items-center justify-center h-20 bg-white/80 dark:bg-zinc-900/80 shadow-sm border-b border-zinc-200 dark:border-zinc-800">
        <MangustoLogo />
      </div>
      <ScrollArea className="flex-1 w-full">
        <nav className="space-y-2 px-3 py-6">
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
      {/* Floating back button for mobile/desktop */}
      <button
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-sidebar-accent text-sidebar-accent-foreground shadow-lg border border-sidebar-accent/30 hover:bg-sidebar-accent/90 transition-all duration-150 md:static md:rounded-none md:shadow-none md:border-none"
        style={{ fontWeight: 600, fontSize: 18 }}
        onClick={() => navigate(-1)}
      >
        <span className="text-xl">←</span> Voltar
      </button>
    </aside>
  );
}

export { Sidebar };