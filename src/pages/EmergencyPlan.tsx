import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";


const EmergencyPlan = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responsible, setResponsible] = useState("");
  const [resources, setResources] = useState("");
  const [simulationDate, setSimulationDate] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    fetchPlans();
    // eslint-disable-next-line
  }, [refresh, search, filterYear, sortBy, sortDir]);

  async function fetchPlans() {
    let query = supabase
      .from("emergency_plans")
      .select("id, title, description, responsible, resources, simulation_date, evidence_url, created_at");
    if (filterYear) {
      query = query.gte("created_at", `${filterYear}-01-01`).lte("created_at", `${filterYear}-12-31`);
    }
    query = query.order(sortBy, { ascending: sortDir === "asc" });
    const { data, error } = await query;
    let filtered = data || [];
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter((p: any) =>
        p.title.toLowerCase().includes(s) ||
        (p.description || "").toLowerCase().includes(s) ||
        (p.responsible || "").toLowerCase().includes(s)
      );
    }
    setPlans(filtered);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("emergency_plans").insert({
      title,
      description,
      responsible,
      resources,
      simulation_date: simulationDate || null,
      evidence_url: evidenceUrl,
    });
    setLoading(false);
    if (error) {
      toast.error("Erro ao registrar plano de emergência.");
    } else {
      toast.success("Plano de emergência registrado!");
      setTitle("");
      setDescription("");
      setResponsible("");
      setResources("");
      setSimulationDate("");
      setEvidenceUrl("");
      setRefresh(r => !r);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Cadastro e Simulação de Planos de Emergência</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Registrar Plano de Emergência</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Título do Plano
                <span title="Informe o nome do plano de emergência conforme exigências legais. Definições e exemplos no Glossário NR-01." className="ml-1 cursor-help text-blue-600">[?]</span>
              </Label>
                          <span className="text-xs text-muted-foreground">Consulte definições e exemplos no <a href="/glossario-nr01" className="underline text-blue-700" target="_blank" rel="noopener noreferrer">Glossário NR-01</a>.</span>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="responsible">Responsável</Label>
              <Input id="responsible" value={responsible} onChange={e => setResponsible(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resources">Recursos Necessários</Label>
              <Textarea id="resources" value={resources} onChange={e => setResources(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="simulationDate">Data da Simulação</Label>
              <Input id="simulationDate" type="date" value={simulationDate} onChange={e => setSimulationDate(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="evidenceUrl">Evidência (URL de arquivo, foto, vídeo)</Label>
              <Input id="evidenceUrl" value={evidenceUrl} onChange={e => setEvidenceUrl(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Registrando..." : "Registrar Plano"}</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Planos de Emergência Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="search">Buscar</Label>
              <Input id="search" placeholder="Título, responsável, descrição..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="filterYear">Ano</Label>
              <Input id="filterYear" type="number" min="2000" max="2100" placeholder="Ano" value={filterYear} onChange={e => setFilterYear(e.target.value)} style={{width:100}} />
            </div>
            <div>
              <Label htmlFor="sortBy">Ordenar por</Label>
              <select id="sortBy" className="border rounded px-2 py-1" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="created_at">Data de Registro</option>
                <option value="simulation_date">Data da Simulação</option>
                <option value="title">Título</option>
              </select>
              <button className="ml-2 text-xs underline" type="button" onClick={()=>setSortDir(d=>d==="asc"?"desc":"asc")}>{sortDir==="asc"?"↑":"↓"}</button>
            </div>
          </div>
          {plans.length === 0 ? (
            <p className="text-muted-foreground">Nenhum plano cadastrado ainda.</p>
          ) : (
            <ul className="space-y-4">
              {plans.map((p: any) => (
                <li key={p.id} className="border-b pb-2">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">{p.description}</div>
                  <div className="text-xs text-gray-400">Responsável: {p.responsible || "-"}</div>
                  <div className="text-xs text-gray-400">Recursos: {p.resources || "-"}</div>
                  <div className="text-xs text-gray-400">Simulação: {p.simulation_date ? new Date(p.simulation_date).toLocaleDateString() : "-"}</div>
                  <div className="text-xs text-gray-400">Registrado em: {new Date(p.created_at).toLocaleString()}</div>
                  {p.evidence_url && (
                    <div className="text-xs mt-1">
                      Evidência: <a href={p.evidence_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver arquivo</a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyPlan;
