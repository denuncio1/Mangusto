import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fetchOccupationalExams, deleteOccupationalExam } from "@/lib/supabaseOccupationalExams";
import * as FileSaver from "file-saver";

const OccupationalExamList = () => {
  const [exams, setExams] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    refreshExams();
  }, []);

  async function refreshExams() {
    setLoading(true);
    try {
      const data = await fetchOccupationalExams();
      setExams(data || []);
    } catch (err) {
      toast.error("Erro ao buscar exames: " + (err.message || err));
    }
    setLoading(false);
  }

  function gerarXmlS2220(ex) {
    const riscosXml = JSON.parse(ex.riscos_exame || "[]").map(risco => `      <codRisco>${risco}</codRisco>`).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<eSocial>\n  <evtMonit Id="ID${ex.id}">\n    <ideEvento>\n      <tpAmb>1</tpAmb>\n      <procEmi>1</procEmi>\n      <verProc>1.0</verProc>\n    </ideEvento>\n    <ideEmpregador>\n      <tpInsc>1</tpInsc>\n      <nrInsc>00000000000000</nrInsc>\n    </ideEmpregador>\n    <ideVinculo>\n      <cpfTrab>${ex.cpf_trabalhador}</cpfTrab>\n      <matricula>1</matricula>\n    </ideVinculo>\n    <exame>\n      <dtExame>${ex.data_exame}</dtExame>\n      <tpExame>${ex.tipo_exame}</tpExame>\n      <resultado>${ex.resultado}</resultado>\n      <riscos>\n${riscosXml}\n      </riscos>\n    </exame>\n    <infoTrabalhador>\n      <nome>${ex.nome_trabalhador}</nome>\n    </infoTrabalhador>\n  </evtMonit>\n</eSocial>`;
  }

  function handleExportXml(ex) {
    const xml = gerarXmlS2220(ex);
    const blob = new Blob([xml], { type: "application/xml" });
    FileSaver.saveAs(blob, `S-2220_${ex.cpf_trabalhador}_${ex.data_exame}.xml`);
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Confirma excluir este exame?")) return;
    try {
      await deleteOccupationalExam(id);
      toast.success("Exame excluído!");
      await refreshExams();
    } catch (err) {
      toast.error("Erro ao excluir: " + (err.message || err));
    }
  }

  const navigate = useNavigate();
  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
        onClick={() => navigate("/dashboard")}
      >
        ← Voltar ao Menu Principal
      </button>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Exames Ocupacionais Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Carregando...</div>
          ) : exams.length === 0 ? (
            <div className="text-gray-500">Nenhum exame registrado.</div>
          ) : (
            <table className="min-w-full text-xs border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">CPF</th>
                  <th className="border px-2 py-1">Nome</th>
                  <th className="border px-2 py-1">Tipo</th>
                  <th className="border px-2 py-1">Data</th>
                  <th className="border px-2 py-1">Resultado</th>
                  <th className="border px-2 py-1">Riscos Monitorados</th>
                  <th className="border px-2 py-1">Validação</th>
                  <th className="border px-2 py-1">Ações</th>
                </tr>
              </thead>
              <tbody>
                {exams.map(ex => (
                  <tr key={ex.id}>
                    <td className="border px-2 py-1">{ex.cpf_trabalhador}</td>
                    <td className="border px-2 py-1">{ex.nome_trabalhador}</td>
                    <td className="border px-2 py-1">{ex.tipo_exame}</td>
                    <td className="border px-2 py-1">{ex.data_exame}</td>
                    <td className="border px-2 py-1">{ex.resultado}</td>
                    <td className="border px-2 py-1">{JSON.parse(ex.riscos_exame || "[]").join(", ")}</td>
                    <td className="border px-2 py-1">
                      {ex.validado ? (
                        <span className="text-green-700">Válido</span>
                      ) : (
                        <span className="text-red-700">Inconsistências: {ex.inconsistencias}</span>
                      )}
                    </td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" variant="secondary" onClick={() => handleExportXml(ex)}>Exportar XML</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(ex.id)}>Excluir</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OccupationalExamList;
