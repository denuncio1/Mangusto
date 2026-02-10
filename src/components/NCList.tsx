import { NCForm } from "./NCForm";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNCs } from '../lib/ncApi';
import type { NonConformity } from '../types/nonConformity';

export function NCList() {
  const [ncs, setNCs] = useState<NonConformity[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNCs().then(setNCs);
  }, []);

  const [showForm, setShowForm] = useState(false);
  const handleCreated = () => {
    setShowForm(false);
    getNCs().then(setNCs);
  };
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-green-700 flex items-center">
        <span className="mr-2">Gestão de Não Conformidades</span>
        <span className="text-sm font-normal text-gray-500">Plano de Ação 5W2H</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded-lg">
          <thead className="bg-green-100 sticky top-0">
            <tr>
              <th className="py-2 px-3 text-left">Origem</th>
              <th className="py-2 px-3 text-left">Descrição</th>
              <th className="py-2 px-3 text-left">Gravidade</th>
              <th className="py-2 px-3 text-left">NR</th>
              <th className="py-2 px-3 text-left">Área</th>
              <th className="py-2 px-3 text-left">Responsável</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {ncs.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400">Nenhuma NC registrada.</td>
              </tr>
            ) : (
              ncs.map((nc, idx) => (
                <tr key={nc.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-green-50 transition"}>
                  <td className="py-2 px-3 font-medium">{nc.origem}</td>
                  <td className="py-2 px-3">{nc.descricao}</td>
                  <td className="py-2 px-3">
                    <span className={
                      nc.gravidade === 'alta' ? 'text-red-600 font-bold' :
                      nc.gravidade === 'media' ? 'text-yellow-600 font-semibold' :
                      'text-green-600 font-semibold'
                    }>{nc.gravidade}</span>
                  </td>
                  <td className="py-2 px-3">{nc.nrRelacionada}</td>
                  <td className="py-2 px-3">{nc.area}</td>
                  <td className="py-2 px-3">{nc.responsavel}</td>
                  <td className="py-2 px-3">
                    <span className={
                      nc.status === 'concluída' ? 'bg-green-200 text-green-800 px-2 py-1 rounded' :
                      nc.status === 'em tratamento' ? 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded' :
                      'bg-red-100 text-red-800 px-2 py-1 rounded'
                    }>{nc.status}</span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow-sm transition"
                      onClick={() => navigate(`/nc-detail/${nc.id}`)}
                    >Detalhes</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded shadow transition"
          onClick={() => setShowForm(true)}
        >Nova NC</button>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowForm(false)}>×</button>
            <button className="absolute top-2 left-2 text-blue-600 hover:underline text-sm" onClick={() => setShowForm(false)}>
              ← Voltar
            </button>
            <NCForm onCreated={handleCreated} />
          </div>
        </div>
      )}
    </div>
  );
}
