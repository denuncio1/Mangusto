// import React from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";



import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { sendOrderNotification } from "@/lib/supabaseEmailUtils";


const PreventionMeasures = () => {
  // Mock: opções iniciais (em app real, buscar do banco)
  const [measureNameOptions, setMeasureNameOptions] = useState([
    "Programa de Bem-Estar", "Ergonomia", "Treinamento de Segurança", "Outros"
  ]);
  const [responsibleOptions, setResponsibleOptions] = useState([
    "RH", "Engenharia", "Gestor", "Outros"
  ]);
  const [descriptionOptions, setDescriptionOptions] = useState([
    "Reduzir acidentes", "Melhorar conforto", "Atender legislação", "Outros"
  ]);

  // Estado dos campos
  const [measureName, setMeasureName] = useState("");
  const [description, setDescription] = useState("");
  const [responsible, setResponsible] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [trabalhadoresExpostos, setTrabalhadoresExpostos] = useState("");
  const [loading, setLoading] = useState(false);
  const [measures, setMeasures] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Estado do pop-up
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupField, setPopupField] = useState("");
  const [newOption, setNewOption] = useState("");

  // Função para abrir pop-up
  const handleOtherSelect = (field) => {
    setPopupField(field);
    setPopupOpen(true);
    setNewOption("");
  };

  // Função para adicionar nova opção
  const handleAddOption = () => {
    if (!newOption.trim()) return;
    if (popupField === "measureName") setMeasureNameOptions([...measureNameOptions, newOption]);
    if (popupField === "description") setDescriptionOptions([...descriptionOptions, newOption]);
    if (popupField === "responsible") setResponsibleOptions([...responsibleOptions, newOption]);
    setPopupOpen(false);
    // Em app real, salvar no banco de dados
    if (popupField === "measureName") setMeasureName(newOption);
    if (popupField === "description") setDescription(newOption);
    if (popupField === "responsible") setResponsible(newOption);
  };

  useEffect(() => {
    fetchMeasures();
    // eslint-disable-next-line
  }, [refresh]);

  async function fetchMeasures() {
    const { data, error } = await supabase
      .from("action_plan_measures")
      .select("id, measure_name, description, responsible, due_date, created_at")
      .order("created_at", { ascending: false });
    if (!error) setMeasures(data || []);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!measureName.trim()) {
      toast.error("Informe o nome da medida.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("action_plan_measures").insert({
      measure_name: measureName,
      description,
      responsible,
      due_date: dueDate || null,
      trabalhadores_expostos: trabalhadoresExpostos ? parseInt(trabalhadoresExpostos, 10) : 0,
    });
    if (error) {
      toast.error("Erro ao registrar medida.");
      setLoading(false);
      return;
    }
    await sendOrderNotification({
      to: "trabalhadores@empresa.com", // Troque para lista real de e-mails
      subject: `Nova Medida de Prevenção: ${measureName}`,
      message: `Uma nova medida de prevenção foi registrada no Plano de Ação.\n\nNome: ${measureName}\nDescrição: ${description}\nResponsável: ${responsible}\nPrazo: ${dueDate}`,
    });
    toast.success("Medida de prevenção registrada e notificação enviada!");
    setMeasureName("");
    setDescription("");
    setResponsible("");
    setDueDate("");
    setLoading(false);
    setTrabalhadoresExpostos("");
    setRefresh(r => !r);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Criação de Medidas de Prevenção</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Registrar Medida de Prevenção</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="measureName">Nome da Medida</Label>
              <select id="measureName" value={measureName} onChange={e => {
                if (e.target.value === "Outros") handleOtherSelect("measureName");
                else setMeasureName(e.target.value);
              }} className="input input-bordered w-full">
                <option value="">Selecione</option>
                {measureNameOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <select id="description" value={description} onChange={e => {
                if (e.target.value === "Outros") handleOtherSelect("description");
                else setDescription(e.target.value);
              }} className="input input-bordered w-full">
                <option value="">Selecione</option>
                {descriptionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="responsible">Responsável</Label>
              <select id="responsible" value={responsible} onChange={e => {
                if (e.target.value === "Outros") handleOtherSelect("responsible");
                else setResponsible(e.target.value);
              }} className="input input-bordered w-full">
                <option value="">Selecione</option>
                {responsibleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Cronograma (Prazo)</Label>
              <Input id="dueDate" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="trabalhadoresExpostos">Nº de Trabalhadores Expostos</Label>
              <Input id="trabalhadoresExpostos" type="number" min="0" value={trabalhadoresExpostos} onChange={e => setTrabalhadoresExpostos(e.target.value)} placeholder="Ex: 10" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Registrando..." : "Registrar Medida"}</Button>
          {/* Pop-up para adicionar nova opção */}
          {popupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-2">Adicionar nova opção</h2>
                <Input
                  value={newOption}
                  onChange={e => setNewOption(e.target.value)}
                  placeholder="Digite a nova opção"
                  className="mb-4"
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setPopupOpen(false)}>Cancelar</Button>
                  <Button onClick={handleAddOption}>Salvar</Button>
                </div>
              </div>
            </div>
          )}
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Medidas de Prevenção Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          {measures.length === 0 ? (
            <p className="text-muted-foreground">Nenhuma medida cadastrada ainda.</p>
          ) : (
            <ul className="space-y-4">
              {measures.map((m: any) => (
                <li key={m.id} className="border-b pb-2">
                  <div className="font-semibold">{m.measure_name}</div>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">{m.description}</div>
                  <div className="text-xs text-gray-400">Responsável: {m.responsible || "-"}</div>
                  <div className="text-xs text-gray-400">Prazo: {m.due_date ? new Date(m.due_date).toLocaleDateString() : "-"}</div>
                  <div className="text-xs text-gray-400">Registrado em: {new Date(m.created_at).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PreventionMeasures;