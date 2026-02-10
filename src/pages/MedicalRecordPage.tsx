import React, { useState } from "react";
import MedicalRecordDashboard from "../components/MedicalRecordDashboard";
import MedicalTimeline from "../components/MedicalTimeline";
import AccessAuditLog from "../components/AccessAuditLog";
import RestrictAccess from "../components/RestrictAccess";

export default function MedicalRecordPage() {
  // Simula papel do usuário logado
  const [role] = useState("medico"); // "medico" ou "auditoria" ou "colaborador"
  const [tab, setTab] = useState<"dashboard" | "timeline" | "audit">("dashboard");

  return (
    <div>
      <div className="max-w-2xl mx-auto flex gap-4 mt-8 mb-4">
        <button className={`px-4 py-2 rounded ${tab === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setTab("dashboard")}>Resumo</button>
        <button className={`px-4 py-2 rounded ${tab === "timeline" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setTab("timeline")}>Linha do Tempo</button>
        <button className={`px-4 py-2 rounded ${tab === "audit" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setTab("audit")}>Auditoria de Acessos</button>
      </div>
      <RestrictAccess role={role}>
        {tab === "dashboard" && <MedicalRecordDashboard />}
        {tab === "timeline" && <MedicalTimeline />}
        {tab === "audit" && <AccessAuditLog />}
      </RestrictAccess>
    </div>
  );
}
