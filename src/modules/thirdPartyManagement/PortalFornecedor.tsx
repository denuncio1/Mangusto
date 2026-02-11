import React from 'react';

const PortalFornecedor = () => {
  const handleBack = () => window.history.back();
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-8 text-gray-900 font-sans border border-neutral-200 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Portal do Fornecedor</div>
        <button onClick={handleBack} className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition">← Voltar</button>
      </div>
      {/* Tela de login e upload de documentos */}
    </div>
  );
};

export default PortalFornecedor;
