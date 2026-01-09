import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { insertOccupationalExam, fetchOccupationalExams, updateOccupationalExam, deleteOccupationalExam } from "@/lib/supabaseOccupationalExams";
import { fetchOccupationalRiskAgents } from "@/lib/supabaseRiskAgents";

const OccupationalExamForm = () => {
  const navigate = useNavigate();
  const [cpf, setCpf] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [tipoExame, setTipoExame] = React.useState("");
  const [dataExame, setDataExame] = React.useState("");
  const [resultado, setResultado] = React.useState("");
  const [riscosExame, setRiscosExame] = React.useState<string[]>([]);
  const [riskOptions, setRiskOptions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Buscar riscos ativos (S-2240) para o trabalhador
  React.useEffect(() => {
    async function fetchRiscos() {
      try {
        const agentes = await fetchOccupationalRiskAgents();
        setRiskOptions(agentes || []);
      } catch {}
    }
    fetchRiscos();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cpf || !nome || !tipoExame || !dataExame || !resultado || riscosExame.length === 0) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    // Aqui você pode adicionar validação cruzada se desejar
    insertOccupationalExam({
      cpf_trabalhador: cpf,
      nome_trabalhador: nome,
      tipo_exame: tipoExame,
      data_exame: dataExame,
      resultado,
      riscos_exame: JSON.stringify(riscosExame),
    })
      .then(() => {
        toast.success("Exame registrado!");
        setCpf(""); setNome(""); setTipoExame(""); setDataExame(""); setResultado(""); setRiscosExame([]);
      })
      .catch((err) => {
        toast.error("Erro ao registrar exame: " + (err.message || err));
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
        onClick={() => navigate("/dashboard")}
      >
        ← Voltar ao Menu Principal
      </button>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Registrar Exame Ocupacional (ASO)</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="cpf">CPF do Trabalhador</Label>
              <Input id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} required maxLength={11} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome do Trabalhador</Label>
              <Input id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tipoExame">Tipo de Exame</Label>
              <Input id="tipoExame" value={tipoExame} onChange={e => setTipoExame(e.target.value)} required placeholder="Admissional, Periódico, Demissional..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dataExame">Data do Exame</Label>
              <Input id="dataExame" type="date" value={dataExame} onChange={e => setDataExame(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resultado">Resultado</Label>
              <Input id="resultado" value={resultado} onChange={e => setResultado(e.target.value)} required placeholder="Apto, Inapto, etc." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="riscosExame">Riscos Monitorados (S-2220)</Label>
              <select multiple id="riscosExame" value={riscosExame} onChange={e => setRiscosExame(Array.from(e.target.selectedOptions, opt => opt.value))} className="input input-bordered w-full">
                {riskOptions.map(opt => (
                  <option key={opt.codigo_tabela24} value={opt.codigo_tabela24}>{opt.agente} ({opt.codigo_tabela24})</option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Registrando..." : "Registrar Exame"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OccupationalExamForm;
