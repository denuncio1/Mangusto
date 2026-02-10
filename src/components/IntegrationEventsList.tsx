import React, { useEffect, useState } from "react";
import { getIntegrationEvents } from "../lib/lawsApi";
import type { IntegrationEvent } from "../types/law";

export function IntegrationEventsList() {
  const [events, setEvents] = useState<IntegrationEvent[]>([]);
  useEffect(() => { getIntegrationEvents().then(setEvents); }, []);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-green-700">Eventos de Integração</h2>
      <table className="min-w-full text-sm border rounded-lg">
        <thead className="bg-green-100">
          <tr>
            <th className="py-2 px-3 text-left">Tipo</th>
            <th className="py-2 px-3 text-left">Data</th>
            <th className="py-2 px-3 text-left">Origem</th>
            <th className="py-2 px-3 text-left">Mensagem</th>
            <th className="py-2 px-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map(evt => (
            <tr key={evt.id}>
              <td className="py-2 px-3">{evt.tipo_evento}</td>
              <td className="py-2 px-3">{new Date(evt.data_evento).toLocaleString()}</td>
              <td className="py-2 px-3">{evt.origem}</td>
              <td className="py-2 px-3">{evt.mensagem}</td>
              <td className="py-2 px-3">
                <span className={evt.status === 'sucesso' ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>{evt.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
