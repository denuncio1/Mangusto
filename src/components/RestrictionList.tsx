import React from "react";
import { Restriction } from "../types/rehabilitation";

interface RestrictionListProps {
  restrictions: Restriction[];
}

export default function RestrictionList({ restrictions }: RestrictionListProps) {
  return (
    <div>
      <h3 className="font-semibold">Restrições</h3>
      <ul className="list-disc ml-6">
        {restrictions.map(r => (
          <li key={r.id}>
            {r.descricao} ({r.dataInicio.slice(0,10)} - {r.dataFim ? r.dataFim.slice(0,10) : 'Atual'})
          </li>
        ))}
      </ul>
    </div>
  );
}
