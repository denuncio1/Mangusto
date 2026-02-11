
import React, { useState } from "react";
import { ghoApiMock, AuditoriaPortal } from "../../mocks/ghoApiMock";
import { useNavigate } from "react-router-dom";

export default function ModoFiscalizacao() {
  const [ativado, setAtivado] = useState(false);
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAtivar = async () => {
    const auditoria: AuditoriaPortal = await ghoApiMock.ativarAuditoria();
    setAtivado(true);
    setToken(auditoria.token);
    setMsg("Modo Fiscalização ativado! Token seguro gerado para auditor.");
  };

  const handlePortal = () => {
    navigate("/gestao-higiene-ocupacional/modo-fiscalizacao/portal-auditoria?token=" + token);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-xl bg-white shadow">
      <h2 className="font-bold text-lg mb-4">Auditor na Portaria?</h2>
      {!ativado ? (
        <button className="px-4 py-2 bg-yellow-400 text-black rounded font-bold" onClick={handleAtivar}>ATIVAR MODO FISCALIZAÇÃO ⚠️</button>
      ) : (
        <div className="px-4 py-2 bg-green-200 text-black rounded font-bold">
          {msg}<br />
          <span className="text-xs font-normal">Token: <span className="bg-white px-2 py-1 rounded text-black">{token}</span></span>
          <br />
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={handlePortal}>Acessar Portal Auditoria</button>
        </div>
      )}
    </div>
  );
}
