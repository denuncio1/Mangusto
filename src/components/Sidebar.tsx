import React from "react";
import { NavLink } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ClipboardList, ListChecks, FolderOpen, HeartPulse, Calculator, GraduationCap,
  BellRing, LayoutDashboard, FileText, Link, Sparkles, Scale, Target, Users, History,
  ListPlus, FlaskConical, ShieldAlert
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard Gerencial",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inventário de Riscos Ocupacionais",
    href: "/occupational-risk-inventory",
    icon: ClipboardList,
    children: [
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
  },
  {
    title: "Gestão de Documentos Digitais",
    href: "/document-management",
    icon: FolderOpen,
  },
  {
    title: "Módulo de Avaliação Psicossocial",
    href: "/psychosocial-assessment",
    icon: HeartPulse,
  },
  {
    title: "Simulador de Classificação de Riscos",
    href: "/risk-classification-simulator",
    icon: Calculator,
  },
  {
    title: "Capacitação e Sensibilização",
    href: "/training-awareness",
    icon: GraduationCap,
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
  {
    title: "Foco em riscos psicossociais",
    href: "/psychosocial-focus",
    icon: Target,
  },
  {
    title: "Integração com CIPA e trabalhadores",
    href: "/cipa-integration",
    icon: Users,
  },
  {
    title: "Histórico de atualizações por 20 anos",
    href: "/update-history",
    icon: History,
  },
];

export const Sidebar = () => {
  return (
    <ScrollArea className="h-full py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-sidebar-foreground">
          Menu Principal
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <React.Fragment key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground"
                  )
                }
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.title}
              </NavLink>
              {item.children && (
                <div className="ml-6 space-y-1"> {/* Indent children */}
                  {item.children.map((child) => (
                    <NavLink
                      key={child.href}
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
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};