import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { fetchSectors, fetchSectorRisks } from "@/lib/supabaseSectors";
import CidAutocomplete from "@/components/CidAutocomplete";

const OccupationalAccidentQuickInput = () => {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [setores, setSetores] = useState<any[]>([]);
  const [dataAcidente, setDataAcidente] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cid, setCid] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [agenteCausador, setAgenteCausador] = useState("");
  const [sugestoesAgente, setSugestoesAgente] = useState<string[]>([]);


  // Carregar setores ao montar
  useEffect(() => {
    fetchSectors().then(setSetores).catch(() => setSetores([]));
  }, []);

  // Sugere agente causador com base nos perigos do setor
  useEffect(() => {
    async function fetchPerigos() {
      if (setor) {
        const setorObj = setores.find(s => s.nome === setor || s.id === setor);
        if (setorObj) {
          const riscos = await fetchSectorRisks(setorObj.id);
          setSugestoesAgente((riscos || []).map(r => r.occupational_risk_agents?.agente || r.occupational_risk_agents?.nome || ""));
        } else {
          setSugestoesAgente([]);
        }
      } else {
        setSugestoesAgente([]);
      }
    }
    fetchPerigos();
  }, [setor, setores]);

  // Verifica consistência CID x diagnóstico
  function validarCidDiagnostico() {
    if (!cid || !diagnostico) return null;
    const diag = diagnostico.toLowerCase();
    // Exemplos de padrões de CID e palavras-chave esperadas no diagnóstico
    const regras = [
      { prefix: "S", palavra: "fratura", mensagem: "CID sugere lesão/fratura, mas diagnóstico não menciona isso." },
      { prefix: "T20", palavra: "queimadura", mensagem: "CID sugere queimadura, mas diagnóstico não menciona isso." },
      { prefix: "T51", palavra: "intoxicação", mensagem: "CID sugere intoxicação, mas diagnóstico não menciona isso." },
      { prefix: "W", palavra: "queda", mensagem: "CID sugere queda, mas diagnóstico não menciona isso." },
      { prefix: "X", palavra: "corte", mensagem: "CID sugere corte, mas diagnóstico não menciona isso." },
      { prefix: "Y", palavra: "contusão", mensagem: "CID sugere contusão, mas diagnóstico não menciona isso." },
    ];
    for (const regra of regras) {
      if (cid.toUpperCase().startsWith(regra.prefix) && !diag.includes(regra.palavra)) {
        return regra.mensagem;
      }
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const inconsistencia = validarCidDiagnostico();
    if (inconsistencia) {
      toast.error(inconsistencia);
      return;
    }
    // TODO: Salvar registro do acidente (S-2210)
    toast.success("Acidente registrado!");
    setCpf(""); setNome(""); setSetor(""); setDataAcidente(""); setDescricao(""); setCid(""); setDiagnostico(""); setAgenteCausador("");
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Registro Rápido de Acidente de Trabalho (S-2210)</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="cpf">CPF do Acidentado</Label>
              <Input id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} required maxLength={11} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome do Acidentado</Label>
              <Input id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="setor">Setor</Label>
              <Select value={setor} onValueChange={setSetor}>
                <SelectTrigger id="setor">
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  {setores.map(s => (
                    <SelectItem key={s.id} value={s.id+''}>{s.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dataAcidente">Data do Acidente</Label>
              <Input id="dataAcidente" type="date" value={dataAcidente} onChange={e => setDataAcidente(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descricao">Descrição do Acidente</Label>
              <Input id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="agenteCausador">Agente Causador</Label>
              <Select value={agenteCausador} onValueChange={setAgenteCausador}>
                <SelectTrigger id="agenteCausador">
                  <SelectValue placeholder="Selecione o agente causador" />
                </SelectTrigger>
                <SelectContent>
                  {sugestoesAgente.map((ag, idx) => (
                    <SelectItem key={idx} value={ag}>{ag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cid">CID</Label>
              <CidAutocomplete value={cid} onChange={setCid} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="diagnostico">Diagnóstico Médico</Label>
              <Input id="diagnostico" value={diagnostico} onChange={e => setDiagnostico(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Registrar Acidente</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OccupationalAccidentQuickInput;
