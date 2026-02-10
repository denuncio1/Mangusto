import React from "react";

export default function RestrictAccess({ role, children }: { role: string; children: React.ReactNode }) {
  // Simula acesso restrito: só "medico" pode ver tudo
  if (role !== "medico") {
    return (
      <div className="max-w-2xl mx-auto bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mt-10 rounded">
        Acesso restrito: apenas médicos do trabalho podem visualizar todas as informações do prontuário. Seu acesso está limitado conforme LGPD.
      </div>
    );
  }
  return <>{children}</>;
}
