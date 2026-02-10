import React, { useState } from "react";
import { createNC } from "../lib/ncApi";
import type { NonConformity } from "../types/nonConformity";

const initialNC: Partial<NonConformity> = {
  origem: "auditoria",
  descricao: "",
  gravidade: "media",
  nrRelacionada: "",
  area: "",
  responsavel: "",
  status: "aberta",
  dataRegistro: new Date().toISOString(),
  planos: [],
};

export function NCForm({ onCreated }: { onCreated?: () => void }) {
  const [nc, setNC] = useState<Partial<NonConformity>>(initialNC);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNC({ ...nc, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createNC({ ...nc, id: Date.now().toString(), planos: [] } as NonConformity);
    setLoading(false);
    if (onCreated) onCreated();
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-green-700">Nova Não Conformidade</h3>
        {/* O botão de voltar será controlado pela tela de NCList, então não precisa usar window.history.back aqui. */}
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Origem</label>
        <select name="origem" value={nc.origem} onChange={handleChange} className="w-full border rounded px-2 py-1">
          <option value="auditoria">Auditoria interna</option>
          <option value="simulado">Simulado de fiscalização</option>
          <option value="inspecao">Inspeção de campo</option>
          <option value="acidente">Acidente/incidente</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Descrição</label>
        <textarea name="descricao" value={nc.descricao} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Gravidade</label>
        <select name="gravidade" value={nc.gravidade} onChange={handleChange} className="w-full border rounded px-2 py-1">
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">NR Relacionada</label>
        <select name="nrRelacionada" value={nc.nrRelacionada} onChange={handleChange} className="w-full border rounded px-2 py-1">
          <option value="">Selecione a NR</option>
          <option value="NR 1">NR 1 - Disposições Gerais</option>
          <option value="NR 2">NR 2 - Inspeção Inicial</option>
          <option value="NR 3">NR 3 - Embargo e Interdição</option>
          <option value="NR 4">NR 4 - SESMT</option>
          <option value="NR 5">NR 5 - CIPA</option>
          <option value="NR 6">NR 6 - EPI</option>
          <option value="NR 7">NR 7 - PCMSO</option>
          <option value="NR 9">NR 9 - PPRA</option>
          <option value="NR 10">NR 10 - Segurança em Instalações e Serviços em Eletricidade</option>
          <option value="NR 12">NR 12 - Máquinas e Equipamentos</option>
          <option value="NR 15">NR 15 - Atividades e Operações Insalubres</option>
          <option value="NR 17">NR 17 - Ergonomia</option>
          <option value="NR 18">NR 18 - Condições e Meio Ambiente na Indústria da Construção</option>
          <option value="NR 20">NR 20 - Inflamáveis e Combustíveis</option>
          <option value="NR 23">NR 23 - Proteção Contra Incêndios</option>
          <option value="NR 24">NR 24 - Condições Sanitárias e de Conforto</option>
          <option value="NR 33">NR 33 - Espaços Confinados</option>
          <option value="NR 35">NR 35 - Trabalho em Altura</option>
          <option value="NR 36">NR 36 - Segurança e Saúde no Trabalho em Empresas de Abate e Processamento de Carnes e Derivados</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Área</label>
        <select name="area" value={nc.area} onChange={handleChange} className="w-full border rounded px-2 py-1">
          <option value="">Selecione a área</option>
          <option value="produção">Produção</option>
          <option value="manutenção">Manutenção</option>
          <option value="adm">Administrativo</option>
          <option value="segurança">Segurança do Trabalho</option>
          <option value="qualidade">Qualidade</option>
          <option value="logística">Logística</option>
          <option value="RH">Recursos Humanos</option>
          <option value="TI">Tecnologia da Informação</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Responsável</label>
        <input name="responsavel" value={nc.responsavel} onChange={handleChange} className="w-full border rounded px-2 py-1" />
      </div>
      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow transition" disabled={loading}>
        {loading ? "Salvando..." : "Salvar NC"}
      </button>
    </form>
  );
}
