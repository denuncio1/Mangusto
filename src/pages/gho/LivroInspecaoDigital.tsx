import React from "react";

export default function LivroInspecaoDigital() {
  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-xl bg-white shadow">
      <h2 className="font-bold text-lg mb-4">Livro de Inspeção – NR-01</h2>
      <ul className="mb-4 list-disc ml-6">
        <li>01/02 – Auditoria Interna – OK</li>
        <li>28/01 – Recusa de Trabalho – Resolvida</li>
        <li>27/01 – Inspeção NR-12 – 1 NC corrigida</li>
      </ul>
      <div className="mb-4">Assinatura Digital: Válida</div>
    </div>
  );
}
