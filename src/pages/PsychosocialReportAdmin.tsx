import React from "react";
import PsychosocialReportAdminList from "@/components/PsychosocialReportAdminList";
import { BackToMenuButton } from "@/components/BackToMenuButton";

export default function PsychosocialReportAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-6 px-2">
      <BackToMenuButton />
      <h1 className="text-2xl font-bold text-center mb-4">Administração de Relatos Psicossociais</h1>
      <PsychosocialReportAdminList />
    </div>
  );
}
