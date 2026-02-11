
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Certificado = {
  id: number;
  nome: string;
  colaborador: string;
  status: "Pendente" | "Assinado" | "Inválido";
  arquivo: string;
  data: string;
};

const certificadosMock: Certificado[] = [
  { id: 1, nome: "NR-01", colaborador: "Ana", status: "Assinado", arquivo: "cert-nr01-ana.pdf", data: "2026-01-10" },
  { id: 2, nome: "NR-05", colaborador: "Carlos", status: "Pendente", arquivo: "cert-nr05-carlos.pdf", data: "2026-02-01" },
  { id: 3, nome: "NR-10", colaborador: "João", status: "Inválido", arquivo: "cert-nr10-joao.pdf", data: "2025-12-20" },
];

export default function AcademiaSST_Certificados() {
  const navigate = useNavigate();
  const [certificados, setCertificados] = useState<Certificado[]>(certificadosMock);
  const [uploading, setUploading] = useState(false);

  function validarCertificado(id: number) {
    setCertificados((prev) =>
      prev.map((c) =>
        c.id === id && c.status === "Pendente"
          ? { ...c, status: "Assinado" }
          : c
      )
    );
  }

  function invalidarCertificado(id: number) {
    setCertificados((prev) =>
      prev.map((c) =>
        c.id === id && c.status !== "Inválido"
          ? { ...c, status: "Inválido" }
          : c
      )
    );
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      setTimeout(() => {
        setCertificados((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            nome: "Novo Certificado",
            colaborador: "(Novo)",
            status: "Pendente",
            arquivo: e.target.files![0].name,
            data: new Date().toISOString().slice(0, 10),
          },
        ]);
        setUploading(false);
      }, 1200);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">Assinatura Digital de Certificados</h1>
      <p className="mb-6">Validação imediata de certificados no perfil do colaborador, emissão digital e integração com treinamentos.</p>
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="flex items-center gap-4 mb-2">
          <label className="inline-block cursor-pointer">
            <span className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600">Upload novo certificado</span>
            <input
              type="file"
              className="hidden"
              accept="application/pdf"
              disabled={uploading}
              onChange={handleUpload}
            />
          </label>
          {uploading && <span className="text-xs text-gray-500">Enviando...</span>}
        </div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Colaborador</th>
              <th className="text-left py-2">Certificado</th>
              <th className="text-left py-2">Arquivo</th>
              <th className="text-left py-2">Data</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {certificados.map((c) => (
              <tr key={c.id} className="border-b last:border-0">
                <td className="py-2">{c.colaborador}</td>
                <td className="py-2">{c.nome}</td>
                <td className="py-2">
                  <a href="#" className="text-blue-700 underline" title="Visualizar arquivo">{c.arquivo}</a>
                </td>
                <td className="py-2">{c.data}</td>
                <td className="py-2">
                  <span
                    className={
                      c.status === "Assinado"
                        ? "text-green-600"
                        : c.status === "Pendente"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                  >
                    {c.status}
                  </span>
                </td>
                <td className="py-2 space-x-2">
                  {c.status === "Pendente" && (
                    <>
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => validarCertificado(c.id)}
                      >Validar</button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => invalidarCertificado(c.id)}
                      >Invalidar</button>
                    </>
                  )}
                  {c.status === "Assinado" && (
                    <span className="text-xs text-green-700">Assinado digitalmente</span>
                  )}
                  {c.status === "Inválido" && (
                    <span className="text-xs text-red-700">Certificado inválido</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
        onClick={() => navigate(-1)}
      >
        ← Voltar
      </button>
    </div>
  );
}