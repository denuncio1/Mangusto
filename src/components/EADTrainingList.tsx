import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";

export default function EADTrainingList({ onScrollToForm }: { onScrollToForm?: () => void }) {
  const { user } = useAuth();
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from("ead_training")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setTrainings(data || []);
        setLoading(false);
      });
  }, [user]);

  if (!user) return <div>Faça login para visualizar suas capacitações.</div>;
  if (loading) return <div>Carregando...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold mb-4">Capacitações EAD/Semipresencial Cadastradas</h2>
      {trainings.length === 0 ? (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
          <b>Nenhuma capacitação cadastrada.</b>
          <div className="mt-2 text-sm">
            Para atender à NR-01, cadastre as capacitações EAD ou semipresenciais realizadas na empresa.<br />
            <ul className="list-disc ml-6 mt-2">
              <li>Inclua cursos obrigatórios e treinamentos de sensibilização.</li>
              <li>Garanta que cada capacitação tenha projeto pedagógico, materiais didáticos, avaliações e logs de acesso.</li>
            </ul>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => {
                  if (onScrollToForm) onScrollToForm();
                }}
              >
                Cadastrar nova capacitação
              </button>
            </div>
          </div>
        </div>
      ) : (
        trainings.map((t) => (
          <Card key={t.id} className={t.requisitos_legais ? "border-green-400" : "border-red-400"}>
            <CardHeader>
              <CardTitle>{t.nome} <span className="text-xs text-muted-foreground">({t.modalidade})</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div><b>Empresa/Instituição:</b> {t.empresa_ofertante}</div>
              <div><b>Documentação:</b> {t.doc_contratacao}</div>
              <div><b>Projeto Pedagógico:</b> {t.projeto_pedagogico ? <span className="text-green-700">OK</span> : <span className="text-red-700">Pendente</span>}</div>
              <div><b>Carga Horária:</b> {t.carga_horaria} horas</div>
              <div><b>Tópicos:</b> {t.topicos}</div>
              <div><b>Atividades Práticas:</b> {t.atividades_praticas}</div>
              <div><b>Certificado:</b> {t.certificado ? <a href={t.certificado} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver Certificado</a> : <span className="text-red-700">Pendente</span>}</div>
              <div><b>Requisitos Legais:</b> {t.requisitos_legais ? <span className="text-green-700">Conforme NR-01</span> : <span className="text-red-700">Incompleto</span>}</div>
              <div className="mt-2">
                <Link to={`/pedagogical-project?trainingId=${t.id}`} className="text-blue-600 underline">Ver/Editar Projeto Pedagógico</Link>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
