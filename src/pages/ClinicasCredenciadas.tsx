
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Star, FileText, Plus, CheckCircle2 } from "lucide-react";

interface Clinic {
  id?: number;
  nome: string;
  sla?: number;
  preco?: number;
  tipos?: string[];
  endereco: string;
  avaliacao?: { tempo: string; erros: number; reclamacoes: number };
  docs?: string[];
}


export default function ClinicasCredenciadas() {
  const [clinicas, setClinicas] = useState<Clinic[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [nova, setNova] = useState({ nome: "", sla: "", preco: "", tipos: "", endereco: "", docs: [] as File[] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClinics();
  }, []);

  async function fetchClinics() {
    setLoading(true);
    const { data, error } = await supabase.from("clinicas").select("id, nome, endereco");
    if (!error && data) {
      setClinicas(data);
    }
    setLoading(false);
  }

  async function handleAddClinica(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("clinicas").insert({
      nome: nova.nome,
      endereco: nova.endereco
    });
    setLoading(false);
    if (!error) {
      setNova({ nome: "", sla: "", preco: "", tipos: "", endereco: "", docs: [] });
      setShowForm(false);
      fetchClinics();
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-background to-muted/50 py-8">
      <Card className="w-full max-w-3xl shadow-xl border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2"><FolderOpen className="w-6 h-6 text-primary" /> Clínicas Credenciadas</CardTitle>
          <CardDescription className="text-base mt-1">Lista, avaliação e gestão de clínicas credenciadas. Integração com cadastro e contratos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          {loading ? (
            <div>Carregando...</div>
          ) : clinicas.length === 0 ? (
            <div className="text-muted-foreground">Nenhuma clínica cadastrada.</div>
          ) : clinicas.map((c, idx) => (
            <Card key={c.id || idx} className="mb-4 bg-white/90 border border-border shadow-md">
              <CardContent className="py-4">
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{c.nome}</div>
                <div className="flex flex-wrap gap-4 text-sm mt-2 mb-2">
                  {/* SLA, Preço, Tipos, Avaliação, Docs podem ser integrados depois */}
                </div>
                <div className="text-sm text-muted-foreground mb-2">Endereço: {c.endereco}</div>
                <Button size="sm" variant="outline" className="mt-2">Ver Detalhes</Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end">
          {!showForm && (
            <Button variant="secondary" className="flex items-center gap-2" onClick={() => setShowForm(true)}><Plus className="w-4 h-4" /> Adicionar Nova Clínica</Button>
          )}
        </CardFooter>
        {showForm && (
          <Card className="mx-4 mb-4 border border-primary">
            <CardHeader>
              <CardTitle>Nova Clínica</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-3" onSubmit={handleAddClinica}>
                <input required className="w-full border rounded px-3 py-2" placeholder="Nome da clínica" value={nova.nome} onChange={e => setNova({ ...nova, nome: e.target.value })} />
                <input required className="w-full border rounded px-3 py-2" placeholder="SLA (%)" type="number" min="0" max="100" value={nova.sla} onChange={e => setNova({ ...nova, sla: e.target.value })} />
                <input required className="w-full border rounded px-3 py-2" placeholder="Preço médio (R$)" type="number" min="0" value={nova.preco} onChange={e => setNova({ ...nova, preco: e.target.value })} />
                <input required className="w-full border rounded px-3 py-2" placeholder="Tipos de exame (separados por vírgula)" value={nova.tipos} onChange={e => setNova({ ...nova, tipos: e.target.value })} />
                <input required className="w-full border rounded px-3 py-2" placeholder="Endereço" value={nova.endereco} onChange={e => setNova({ ...nova, endereco: e.target.value })} />
                <label className="block text-xs font-medium">Documentação/Contratos</label>
                <input className="w-full" type="file" multiple onChange={e => setNova({ ...nova, docs: e.target.files ? Array.from(e.target.files) : [] })} />
                <div className="flex gap-2 mt-2">
                  <Button type="submit" size="sm">Salvar</Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </Card>
    </div>
  );
}
