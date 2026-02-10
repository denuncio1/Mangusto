import React, { useEffect, useState } from "react";
import { getLaws } from "../lib/lawsApi";
import type { Law } from "../types/law";

export function LawsList() {
  const [laws, setLaws] = useState<Law[]>([]);
  useEffect(() => { getLaws().then(setLaws); }, []);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Consulta de Leis</h2>
      <table className="min-w-full text-sm border rounded-lg">
        <thead className="bg-green-100">
          <tr>
            <th className="py-2 px-3 text-left">Tipo</th>
            <th className="py-2 px-3 text-left">Número</th>
            <th className="py-2 px-3 text-left">Título</th>
            <th className="py-2 px-3 text-left">Status</th>
            <th className="py-2 px-3 text-left">Data</th>
            <th className="py-2 px-3 text-center">Texto Integral</th>
          </tr>
        </thead>
        <tbody>
          {laws.map(law => (
            <tr key={law.id}>
              <td className="py-2 px-3">{law.tipo}</td>
              <td className="py-2 px-3">{law.numero}</td>
              <td className="py-2 px-3">{law.titulo}</td>
              <td className="py-2 px-3">{law.status}</td>
              <td className="py-2 px-3">{law.data_publicacao}</td>
              <td className="py-2 px-3 text-center">
                <a href={law.texto_integral_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ver texto</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
