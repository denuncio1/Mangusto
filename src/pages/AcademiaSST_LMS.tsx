
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTreinamentos } from "../services/api";

type Curso = {
  id: number;
  nome: string;
  status: "Pendente" | "Em andamento" | "Concluído";
  certificado?: string;
};

// Removido cursosMock: agora busca da API


export default function AcademiaSST_LMS() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTreinamentos()
      .then((res) => {
        setCursos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao buscar treinamentos.");
        setLoading(false);
      });
  }, []);

  function iniciarTreinamento(id: number) {
    setCursos((prev) =>
      prev.map((c) =>
        c.id === id && c.status === "Pendente"
          ? { ...c, status: "Em andamento" }
          : c
      )
    );
  }

  function concluirTreinamento(id: number) {
    setCursos((prev) =>
      prev.map((c) =>
        c.id === id && c.status === "Em andamento"
          ? { ...c, status: "Concluído" }
          : c
      )
    );
  }

  function handleUploadCertificado(id: number, file: File) {
    setUploadingId(id);
    setTimeout(() => {
      setCursos((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, certificado: file.name, status: "Concluído" } : c
        )
      );
      setUploadingId(null);
    }, 1200);
  }

  return (
    <div className="p-8">
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
        onClick={() => navigate(-1)}
      >
        ← Voltar
      </button>
      <h1 className="text-2xl font-bold mb-4 text-green-700">LMS Integrado</h1>
      <p className="mb-6">Treinamentos teóricos via vídeo, provas de proficiência, trilhas de aprendizagem e integração com perfil do colaborador.</p>
      <div className="bg-white rounded shadow p-4">
        {loading ? (
          <div className="text-gray-500">Carregando treinamentos...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Curso</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Ações</th>
                <th className="text-left py-2">Certificado</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.id} className="border-b last:border-0">
                  <td className="py-2 font-medium">{curso.nome}</td>
                  <td className="py-2">
                    <span
                      className={
                        curso.status === "Concluído"
                          ? "text-green-600"
                          : curso.status === "Em andamento"
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }
                    >
                      {curso.status}
                    </span>
                  </td>
                  <td className="py-2 space-x-2">
                    {curso.status === "Pendente" && (
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => iniciarTreinamento(curso.id)}
                      >
                        Iniciar
                      </button>
                    )}
                    {curso.status === "Em andamento" && (
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => concluirTreinamento(curso.id)}
                      >
                        Concluir
                      </button>
                    )}
                    {curso.status === "Concluído" && !curso.certificado && (
                      <label className="inline-block cursor-pointer">
                        <span className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600">Upload Certificado</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="application/pdf"
                          disabled={uploadingId === curso.id}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleUploadCertificado(curso.id, e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    )}
                    {uploadingId === curso.id && (
                      <span className="ml-2 text-xs text-gray-500">Enviando...</span>
                    )}
                  </td>
                  <td className="py-2">
                    {curso.certificado ? (
                      <a
                        href={"#"}
                        className="text-blue-700 underline"
                        title="Visualizar certificado"
                      >
                        {curso.certificado}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}