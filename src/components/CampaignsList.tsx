import React, { useEffect, useState } from "react";
import { getCampanhas } from "../lib/vaccineApi";
import { VaccineCampaign } from "../types/vaccine";

export default function CampaignsList() {
  const [campanhas, setCampanhas] = useState<VaccineCampaign[]>([]);
  useEffect(() => { getCampanhas().then(setCampanhas); }, []);

  return (
    <div className="bg-gray-50 rounded p-4 mt-6">
      <h3 className="font-semibold mb-2">Campanhas Ativas</h3>
      <ul className="list-disc ml-6">
        {campanhas.filter(c => c.status === 'ativa').map(c => (
          <li key={c.id}>
            <span className="font-bold">{c.nome}</span> – {c.descricao} <button className="ml-2 text-blue-600 underline">Agendar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
