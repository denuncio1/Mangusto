import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchOccupationalAccidents } from "@/lib/supabaseOccupationalAccidents";

const CATList = () => {
  const [accidents, setAccidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOccupationalAccidents()
      .then(setAccidents)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">CATs Registradas (S-2210)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <div className="text-red-600">Erro: {error}</div>
          ) : accidents.length === 0 ? (
            <div>Nenhum acidente registrado.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border px-2 py-1">Data</th>
                    <th className="border px-2 py-1">Nome</th>
                    <th className="border px-2 py-1">CPF</th>
                    <th className="border px-2 py-1">Setor</th>
                    <th className="border px-2 py-1">Descrição</th>
                    <th className="border px-2 py-1">Agente Causador</th>
                    <th className="border px-2 py-1">CID</th>
                    <th className="border px-2 py-1">Diagnóstico</th>
                  </tr>
                </thead>
                <tbody>
                  {accidents.map(acc => (
                    <tr key={acc.id}>
                      <td className="border px-2 py-1">{acc.data_acidente}</td>
                      <td className="border px-2 py-1">{acc.nome}</td>
                      <td className="border px-2 py-1">{acc.cpf}</td>
                      <td className="border px-2 py-1">{acc.setor}</td>
                      <td className="border px-2 py-1">{acc.descricao}</td>
                      <td className="border px-2 py-1">{acc.agente_causador}</td>
                      <td className="border px-2 py-1">{acc.cid}</td>
                      <td className="border px-2 py-1">{acc.diagnostico}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CATList;
