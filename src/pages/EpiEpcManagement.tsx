import React, { useState, useEffect } from "react";
import { consultarCA } from "@/lib/caMteApi";
import { CaStatus } from "./CaStatus";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EpiEpc {
  id: number;
  nome: string;
  tipo: "EPI" | "EPC";
  validade: string;
  ca: string;
  quantidade: number;
}

const initialList: EpiEpc[] = [];

export default function EpiEpcManagement() {
  const [epiEpcList, setEpiEpcList] = useState<EpiEpc[]>(initialList);
  const [form, setForm] = useState<Omit<EpiEpc, "id">>({ nome: "", tipo: "EPI", validade: "", ca: "", quantidade: 1 });
  const [historico, setHistorico] = useState<{ colaborador: string; epiEpcId: number; quantidade: number; data: string }[]>([]);
  const [colaborador, setColaborador] = useState("");
  const [qtdEntrega, setQtdEntrega] = useState(1);
  const [epiSelecionado, setEpiSelecionado] = useState("");
  const [caInfo, setCaInfo] = useState<any>(null);
  const [caLoading, setCaLoading] = useState(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "ca") {
      setCaLoading(true);
      consultarCA(value).then(info => {
        setCaInfo(info);
        setCaLoading(false);
      });
    }
  }
  function handleAdd() {
    setEpiEpcList([
      ...epiEpcList,
      { ...form, id: Date.now() },
    ]);
    setForm({ nome: "", tipo: "EPI", validade: "", ca: "", quantidade: 1 });
  }
  function handleEntrega() {
    if (!colaborador || !epiSelecionado) return;
    const epi = epiEpcList.find(e => e.id === Number(epiSelecionado));
    if (!epi) return;
    setHistorico([
      ...historico,
      { colaborador, epiEpcId: epi.id, quantidade: qtdEntrega, data: new Date().toISOString().slice(0,10) }
    ]);
    setEpiEpcList(epiEpcList.map(e => e.id === epi.id ? { ...e, quantidade: e.quantidade - qtdEntrega } : e));
    setColaborador("");
    setQtdEntrega(1);
    setEpiSelecionado("");
  }
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Gestão de EPI/EPC (NR-06)</h1>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Cadastrar EPI/EPC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
            <Label htmlFor="tipo">Tipo</Label>
            <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange} className="border rounded px-2 py-1">
              <option value="EPI">EPI</option>
              <option value="EPC">EPC</option>
            </select>
            <Label htmlFor="ca">CA</Label>
            <Input id="ca" name="ca" value={form.ca} onChange={handleChange} required placeholder="Código de Aprovação" />
            {form.ca && (
              <div className="text-xs mt-1">
                {caLoading ? "Consultando CA..." : caInfo ? (
                  <span className={
                    caInfo.status === "Válido" ? "text-green-600" : caInfo.status === "Vencido" ? "text-red-600" : "text-gray-500"
                  }>
                    {caInfo.status === "Válido" && `CA válido até ${caInfo.validade}`}
                    {caInfo.status === "Vencido" && `CA vencido em ${caInfo.validade}`}
                    {caInfo.status === "Não encontrado" && "CA não encontrado no MTE"}
                    {caInfo.status === "Válido" || caInfo.status === "Vencido" ? ` (${caInfo.descricao})` : ""}
                  </span>
                ) : null}
              </div>
            )}
            <Label htmlFor="validade">Validade</Label>
            <Input id="validade" name="validade" value={form.validade} onChange={handleChange} required type="date" />
            <Label htmlFor="quantidade">Quantidade</Label>
            <Input id="quantidade" name="quantidade" value={form.quantidade} onChange={handleChange} required type="number" min={1} />
            <Button onClick={handleAdd}>Adicionar</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Estoque e Controle</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Nome</th>
                <th className="border px-2 py-1">Tipo</th>
                <th className="border px-2 py-1">CA</th>
                <th className="border px-2 py-1">Validade</th>
                <th className="border px-2 py-1">Status CA</th>
                <th className="border px-2 py-1">Qtd</th>
              </tr>
            </thead>
            <tbody>
              {epiEpcList.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-gray-500">Nenhum item cadastrado.</td></tr>
              ) : (
                epiEpcList.map(item => (
                  <tr key={item.id}>
                    <td className="border px-2 py-1">{item.nome}</td>
                    <td className="border px-2 py-1">{item.tipo}</td>
                    <td className="border px-2 py-1">{item.ca}</td>
                    <td className="border px-2 py-1">{item.validade}</td>
                    <td className="border px-2 py-1">{item.quantidade}</td>
                    <td className="border px-2 py-1">
                      <CaStatus ca={item.ca} />
                    </td>
                  </tr>
                ))

              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Registrar Entrega de EPI/EPC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Label htmlFor="colaborador">Colaborador</Label>
            <Input id="colaborador" name="colaborador" value={colaborador} onChange={e => setColaborador(e.target.value)} required placeholder="Nome do colaborador" />
            <Label htmlFor="epiSelecionado">EPI/EPC</Label>
            <select id="epiSelecionado" name="epiSelecionado" value={epiSelecionado} onChange={e => setEpiSelecionado(e.target.value)} className="border rounded px-2 py-1">
              <option value="">Selecione</option>
              {epiEpcList.map(item => (
                <option key={item.id} value={item.id}>{item.nome} ({item.tipo})</option>
              ))}
            </select>
            <Label htmlFor="qtdEntrega">Quantidade</Label>
            <Input id="qtdEntrega" name="qtdEntrega" value={qtdEntrega} onChange={e => setQtdEntrega(Number(e.target.value))} required type="number" min={1} />
            <Button onClick={handleEntrega}>Registrar Entrega</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Histórico por Colaborador</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Colaborador</th>
                <th className="border px-2 py-1">EPI/EPC</th>
                <th className="border px-2 py-1">Qtd</th>
                <th className="border px-2 py-1">Data</th>
              </tr>
            </thead>
            <tbody>
              {historico.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-gray-500">Nenhuma entrega registrada.</td></tr>
              ) : (
                historico.map((item, idx) => {
                  const epi = epiEpcList.find(e => e.id === item.epiEpcId);
                  return (
                    <tr key={idx}>
                      <td className="border px-2 py-1">{item.colaborador}</td>
                      <td className="border px-2 py-1">{epi ? epi.nome : ""}</td>
                      <td className="border px-2 py-1">{item.quantidade}</td>
                      <td className="border px-2 py-1">{item.data}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
}


