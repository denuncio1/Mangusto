import React from "react";

export default function IntegracaoLaboratorios() {
  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-xl bg-white shadow">
      <h2 className="font-bold text-lg mb-4">Integração – Laboratório AcústicaLab</h2>
      <div className="mb-4">
        <b>Últimos Laudos Recebidos:</b>
        <ul className="list-disc ml-6">
          <li>Ruído – Soldagem – 92 dB(A) – OK</li>
          <li>Calor – Forno – IBUTG 29,5 – OK</li>
          <li>Químicos – Tolueno – 12 ppm – OK</li>
        </ul>
      </div>
      <div className="mb-4">
        <b>Status:</b> Integração ativa via API
      </div>
    </div>
  );
}
