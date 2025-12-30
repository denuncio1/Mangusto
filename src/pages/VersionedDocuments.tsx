import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const VersionedDocuments = () => {
  const [docType, setDocType] = useState("inventario");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => { fetchDocs(); }, [refresh, search, filterType, sortBy, sortDir]);

  async function fetchDocs() {
    let query = supabase
      .from("versioned_documents")
      .select("id, doc_type, title, description, file_url, version, created_by, created_at");
    if (filterType) {
      query = query.eq("doc_type", filterType);
    }
    query = query.order(sortBy, { ascending: sortDir === "asc" });
    const { data, error } = await query;
    let filtered = data || [];
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter((d: any) =>
        d.title.toLowerCase().includes(s) ||
        (d.description || "").toLowerCase().includes(s) ||
        (d.created_by || "").toLowerCase().includes(s)
      );
    }
    setDocs(filtered);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    // Upload do arquivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${docType}_${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage.from('versioned-documents').upload(fileName, file);
    if (uploadError) {
      toast.error("Erro ao fazer upload do arquivo.");
      setLoading(false);
      return;
    }
    const file_url = uploadData?.path ? supabase.storage.from('versioned-documents').getPublicUrl(uploadData.path).data.publicUrl : null;
    // Buscar última versão
    const { data: last } = await supabase.from('versioned_documents').select('version').eq('doc_type', docType).order('version', { ascending: false }).limit(1);
    const version = last && last.length > 0 ? last[0].version + 1 : 1;
    const { error } = await supabase.from('versioned_documents').insert({
      doc_type: docType,
      title,
      description,
      file_url,
      version,
      created_by: "usuário atual"
    });
    setLoading(false);
    if (error) {
      toast.error("Erro ao registrar documento.");
    } else {
      toast.success("Documento registrado!");
      setTitle("");
      setDescription("");
      setFile(null);
      setRefresh(r => !r);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Documentos Versionados</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Registrar Novo Documento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div className="grid gap-2">
              <Label htmlFor="docType">
                Tipo de Documento
                <span title="Selecione o tipo conforme classificação legal (ex: PGR, PCMSO, treinamentos, laudos). Definições e exemplos no Glossário NR-01." className="ml-1 cursor-help text-blue-600">[?]</span>
              </Label>
                          <span className="text-xs text-muted-foreground">Consulte exemplos e definições no <a href="/glossario-nr01" className="underline text-blue-700" target="_blank" rel="noopener noreferrer">Glossário NR-01</a>.</span>
              <select id="docType" value={docType} onChange={e => setDocType(e.target.value)} className="border rounded px-2 py-1">
                <option value="inventario">Inventário de Riscos</option>
                <option value="plano_acao">Plano de Ação</option>
                <option value="emergencia">Plano de Emergência</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">Arquivo</Label>
              <Input id="file" type="file" accept="application/pdf,.doc,.docx,.xls,.xlsx,image/*" onChange={e => setFile(e.target.files?.[0] || null)} required />
              {file && <span className="text-xs text-muted-foreground">{file.name}</span>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Registrando..." : "Registrar Documento"}</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Histórico de Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="search">Buscar</Label>
              <Input id="search" placeholder="Título, descrição, autor..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="filterType">Tipo</Label>
              <select id="filterType" className="border rounded px-2 py-1" value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="">Todos</option>
                <option value="inventario">Inventário de Riscos</option>
                <option value="plano_acao">Plano de Ação</option>
                <option value="emergencia">Plano de Emergência</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div>
              <Label htmlFor="sortBy">Ordenar por</Label>
              <select id="sortBy" className="border rounded px-2 py-1" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="created_at">Data de Registro</option>
                <option value="version">Versão</option>
                <option value="title">Título</option>
              </select>
              <button className="ml-2 text-xs underline" type="button" onClick={()=>setSortDir(d=>d==="asc"?"desc":"asc")}>{sortDir==="asc"?"↑":"↓"}</button>
            </div>
            <div>
              <Button type="button" variant="outline" disabled={selected.length===0} onClick={()=>{
                selected.forEach(id=>{
                  const doc = docs.find((d:any)=>d.id===id);
                  if(doc) window.open(doc.file_url, "_blank");
                });
              }}>Baixar Selecionados</Button>
            </div>
          </div>
          {docs.length === 0 ? (
            <p className="text-muted-foreground">Nenhum documento registrado ainda.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th></th>
                  <th>Título</th>
                  <th>Versão</th>
                  <th>Tipo</th>
                  <th>Autor</th>
                  <th>Data</th>
                  <th>Arquivo</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((d: any) => (
                  <tr key={d.id} className="border-b">
                    <td><input type="checkbox" checked={selected.includes(d.id)} onChange={e=>{
                      setSelected(sel=>e.target.checked?[...sel,d.id]:sel.filter(i=>i!==d.id));
                    }} /></td>
                    <td>{d.title}</td>
                    <td>{d.version}</td>
                    <td>{d.doc_type}</td>
                    <td>{d.created_by || "-"}</td>
                    <td>{new Date(d.created_at).toLocaleString()}</td>
                    <td><a href={d.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Baixar</a></td>
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

export default VersionedDocuments;
