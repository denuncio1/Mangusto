import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { fetchSectors, fetchSectorRisks } from "@/lib/supabaseSectors";
import CidAutocomplete from "@/components/CidAutocomplete";

const agentesPadrao = [
  "Agentes Físicos",
  "Agentes Químicos",
  "Agentes Biológicos",
  "Agentes Ergonômicos/Psicossociais",
  "Agentes de Acidentes (Mecânicos/Estruturais)"
];

const cid10Options = [
  { code: "A00", description: "Cólera" },
  { code: "A01", description: "Febre tifóide e paratifóide" },
  { code: "A02", description: "Outras infecções por Salmonella" },
  { code: "A03", description: "Shiguelose" },
  { code: "A04", description: "Outras infecções intestinais bacterianas" },
  { code: "A05", description: "Outras intoxicações alimentares bacterianas" },
  { code: "A06", description: "Amebíase" },
  { code: "A07", description: "Outras doenças protozoárias intestinais" },
  { code: "A08", description: "Infecções intestinais virais" },
  { code: "A09", description: "Diarréia e gastroenterite de origem infecciosa presumível" },
  { code: "B01", description: "Varicela" },
  { code: "B05", description: "Sarampo" },
  { code: "B15", description: "Hepatite aguda A" },
  { code: "B16", description: "Hepatite aguda B" },
  { code: "B17", description: "Outras hepatites virais agudas" },
  { code: "B18", description: "Hepatite viral crônica" },
  { code: "C00", description: "Neoplasia maligna do lábio" },
  { code: "C16", description: "Neoplasia maligna do estômago" },
  { code: "C34", description: "Neoplasia maligna dos brônquios e pulmão" },
  { code: "E10", description: "Diabetes mellitus tipo 1" },
  { code: "outros", description: "Outros" }
];

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
  const [sugestoesAgente, setSugestoesAgente] = useState<string[]>(agentesPadrao);
  const [novoSetor, setNovoSetor] = useState("");
  const [showNovoSetor, setShowNovoSetor] = useState(false);
  const [novoAgente, setNovoAgente] = useState("");
  const [showNovoAgente, setShowNovoAgente] = useState(false);
  const [cidSelecionado, setCidSelecionado] = useState("");
  const [isOutroCid, setIsOutroCid] = useState(false);


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
          const agentes = (riscos || []).map(r => r.occupational_risk_agents?.agente || r.occupational_risk_agents?.nome || "");
          setSugestoesAgente([...agentesPadrao, ...agentes]);
        } else {
          setSugestoesAgente(agentesPadrao);
        }
      } else {
        setSugestoesAgente(agentesPadrao);
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
    let setorId = setor;
    let agenteFinal = agenteCausador;
    if (setor === "outros" && novoSetor.trim()) {
      import("@/lib/supabaseSectors").then(async mod => {
        try {
          const novo = { nome: novoSetor.trim() };
          const res = await mod.insertSector(novo);
          if (res && res[0] && res[0].id) {
            setorId = res[0].id + '';
            const atualizados = await mod.fetchSectors();
            setSetores(atualizados);
            setSetor(setorId);
            toast.success("Novo setor cadastrado!");
          }
        } catch (err) {
          toast.error("Erro ao cadastrar novo setor");
          return;
        }
      });
    }
    if (agenteCausador === "outros" && novoAgente.trim()) {
      agenteFinal = novoAgente.trim();
      setSugestoesAgente(prev => [...prev, agenteFinal]);
      toast.success("Novo agente causador cadastrado!");
    }
    // TODO: Salvar registro do acidente (S-2210) usando setorId e agenteFinal
    toast.success("Acidente registrado!");
    setCpf(""); setNome(""); setSetor(""); setDataAcidente(""); setDescricao(""); setCid(""); setDiagnostico(""); setAgenteCausador(""); setNovoSetor(""); setShowNovoSetor(false); setNovoAgente(""); setShowNovoAgente(false);
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
              <Select
                value={setor}
                onValueChange={value => {
                  setSetor(value);
                  if (value === "outros") {
                    setShowNovoSetor(true);
                  } else {
                    setShowNovoSetor(false);
                    setNovoSetor("");
                  }
                }}
              >
                <SelectTrigger id="setor">
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  {setores.map(s => (
                    <SelectItem key={s.id} value={s.id+''}>{s.nome}</SelectItem>
                  ))}
                  <SelectItem key="outros" value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              {showNovoSetor && (
                <div className="mt-2">
                  <Label htmlFor="novoSetor">Digite o novo setor</Label>
                  <Input id="novoSetor" value={novoSetor} onChange={e => setNovoSetor(e.target.value)} required={showNovoSetor} />
                </div>
              )}
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
              <Select
                value={agenteCausador}
                onValueChange={value => {
                  setAgenteCausador(value);
                  if (value === "outros") {
                    setShowNovoAgente(true);
                  } else {
                    setShowNovoAgente(false);
                    setNovoAgente("");
                  }
                }}
              >
                <SelectTrigger id="agenteCausador">
                  <SelectValue placeholder="Selecione o agente causador" />
                </SelectTrigger>
                <SelectContent>
                  {sugestoesAgente.map((ag, idx) => (
                    <SelectItem key={idx} value={ag}>{ag}</SelectItem>
                  ))}
                  <SelectItem key="outros" value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              {showNovoAgente && (
                <div className="mt-2">
                  <Label htmlFor="novoAgente">Digite o novo agente causador</Label>
                  <Input id="novoAgente" value={novoAgente} onChange={e => setNovoAgente(e.target.value)} required={showNovoAgente} />
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cid">CID-10 (Tabela 17 eSocial)</Label>
              <CidAutocomplete value={cid} onChange={(val, cidObj) => {
                setCid(val);
                if (cidObj && cidObj.descricao) setDescricao(cidObj.descricao);
              }} />
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
