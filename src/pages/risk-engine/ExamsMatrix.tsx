import React from "react";

// Exemplo de dados para matriz automática
const matriz = [
  {
    funcao: "Operador de Máquinas",
    risco: "Ruído",
    exame: "Audiometria",
    periodicidade: "12 meses",
    justificativa: "NR 07, Anexo I, item 7.5.3"
  },
  {
    funcao: "Operador de Máquinas",
    risco: "Vibração",
    exame: "Espirometria",
    periodicidade: "24 meses",
    justificativa: "NR 07, Anexo II, item 7.5.4"
  },
  {
    funcao: "Operador de Máquinas",
    risco: "Poeira",
    exame: "Raio-X Tórax",
    periodicidade: "Conforme indicação médica",
    justificativa: "NR 07, Anexo III, item 7.5.5"
  }
];

export default function ExamsMatrix() {
  return (
    <div className="bg-neutral-900 text-neutral-100 p-6 rounded-lg font-mono">
      <div className="text-lg font-bold mb-4">Matriz Automática de Exames</div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b border-neutral-700 pb-2">Função</th>
            <th className="border-b border-neutral-700 pb-2">Risco</th>
            <th className="border-b border-neutral-700 pb-2">Exame</th>
            <th className="border-b border-neutral-700 pb-2">Periodicidade</th>
            <th className="border-b border-neutral-700 pb-2">Justificativa Legal</th>
          </tr>
        </thead>
        <tbody>
          {matriz.map((item, idx) => (
            <tr key={idx}>
              <td className="py-2">{item.funcao}</td>
              <td className="py-2">{item.risco}</td>
              <td className="py-2">{item.exame}</td>
              <td className="py-2">{item.periodicidade}</td>
              <td className="py-2 text-xs text-neutral-400">{item.justificativa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
