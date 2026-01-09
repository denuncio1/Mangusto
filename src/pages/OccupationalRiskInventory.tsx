
import React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";

const MOCK_RISKS = [
  { tipo: 'Físico', perigo: 'Ruído excessivo', setor: 'Produção', classificacao: 'Alto', nr: 'NR-15' },
  { tipo: 'Físico', perigo: 'Calor intenso', setor: 'Forno', classificacao: 'Moderado', nr: 'NR-15' },
  { tipo: 'Químico', perigo: 'Produtos químicos voláteis', setor: 'Laboratório', classificacao: 'Moderado', nr: 'NR-09' },
  { tipo: 'Biológico', perigo: 'Exposição a vírus', setor: 'Enfermaria', classificacao: 'Alto', nr: 'NR-32' },
  { tipo: 'Ergonômico', perigo: 'Postura inadequada', setor: 'Escritório', classificacao: 'Baixo', nr: 'NR-17' },
];

const riskTypes = ['Todos', 'Físico', 'Químico', 'Biológico', 'Ergonômico', 'Psicossocial'];

function getPsychosocialRisksFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('psychosocial_risks_inventory');
    if (!data) return [];
    const parsed = JSON.parse(data);
    // Adapta para o formato da tabela
    return parsed.map((r: any) => ({
      tipo: 'Psicossocial',
      perigo: r.riskName,
      setor: r.setor || '-',
      classificacao: r.description?.match(/Nível: (\w+)/)?.[1] || '-',
      nr: 'NR-01',
      impact: r.impact,
      dateIdentified: r.dateIdentified,
      identifiedBy: r.identifiedBy
    }));
  } catch {
    return [];
  }
}

const OccupationalRiskInventory = () => {
  const [filter, setFilter] = React.useState('Todos');
  const [showQR, setShowQR] = React.useState(false);
  const [psychosocialRisks, setPsychosocialRisks] = React.useState<any[]>([]);

  React.useEffect(() => {
    setPsychosocialRisks(getPsychosocialRisksFromStorage());
    // Permite atualização ao voltar da avaliação psicossocial
    window.addEventListener('storage', () => setPsychosocialRisks(getPsychosocialRisksFromStorage()));
    return () => window.removeEventListener('storage', () => setPsychosocialRisks(getPsychosocialRisksFromStorage()));
  }, []);

  // Evidências e histórico por risco
  const [evidenceMap, setEvidenceMap] = React.useState<Record<string, any[]>>({});
  const [historyMap, setHistoryMap] = React.useState<Record<string, any[]>>({});
  const [uploadingId, setUploadingId] = React.useState<string | null>(null);

  // Carregar evidências/histórico do localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const ev = localStorage.getItem('risk_evidence_map');
        setEvidenceMap(ev ? JSON.parse(ev) : {});
        const hist = localStorage.getItem('risk_history_map');
        setHistoryMap(hist ? JSON.parse(hist) : {});
      } catch {
        setEvidenceMap({});
        setHistoryMap({});
      }
    }
  }, []);

  // Salvar evidências/histórico
  const saveEvidenceMap = (map: Record<string, any[]>) => {
    setEvidenceMap(map);
    if (typeof window !== 'undefined') {
      localStorage.setItem('risk_evidence_map', JSON.stringify(map));
    }
  };
  const saveHistoryMap = (map: Record<string, any[]>) => {
    setHistoryMap(map);
    if (typeof window !== 'undefined') {
      localStorage.setItem('risk_history_map', JSON.stringify(map));
    }
  };

  // Histórico do plano de ação (por índice)
  const [actionHistoryMap, setActionHistoryMap] = React.useState<Record<string, any[]>>({});
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const hist = localStorage.getItem('action_history_map');
        setActionHistoryMap(hist ? JSON.parse(hist) : {});
      } catch {
        setActionHistoryMap({});
      }
    }
  }, []);
  const saveActionHistoryMap = (map: Record<string, any[]>) => {
    setActionHistoryMap(map);
    if (typeof window !== 'undefined') {
      localStorage.setItem('action_history_map', JSON.stringify(map));
    }
  };

  // Utilitário para registrar histórico de ação
  const registerActionHistory = (idx: number, action: string, details?: any) => {
    const key = String(idx);
    const prev = actionHistoryMap[key] || [];
    const entry = {
      action,
      details,
      date: new Date().toISOString(),
    };
    const updated = { ...actionHistoryMap, [key]: [...prev, entry] };
    saveActionHistoryMap(updated);
  };

  // Upload de evidência (arquivo base64)
  const handleEvidenceUpload = (riskKey: string, file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const base64 = e.target?.result;
      const newEv = [...(evidenceMap[riskKey] || []), {
        name: file.name,
        type: file.type,
        data: base64,
        date: new Date().toISOString(),
      }];
      const updated = { ...evidenceMap, [riskKey]: newEv };
      saveEvidenceMap(updated);
      // Histórico
      const newHist = [...(historyMap[riskKey] || []), {
        action: 'Upload de evidência',
        fileName: file.name,
        date: new Date().toISOString(),
      }];
      saveHistoryMap({ ...historyMap, [riskKey]: newHist });
      setUploadingId(null);
    };
    reader.readAsDataURL(file);
  };

  // Gerar chave única para cada risco
  const getRiskKey = (r: any, idx: number) => `${r.tipo}-${r.perigo}-${r.setor || idx}`;

  const allRisks = [...MOCK_RISKS, ...psychosocialRisks];
  const filteredRisks = filter === 'Todos' ? allRisks : allRisks.filter(r => r.tipo === filter);

  // Plano de ação psicossocial

  const [actionPlan, setActionPlan] = React.useState<any[]>([]);
  const [editingIdx, setEditingIdx] = React.useState<number | null>(null);
  const [editForm, setEditForm] = React.useState<any>({});

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const data = localStorage.getItem('psychosocial_action_plan');
        setActionPlan(data ? JSON.parse(data) : []);
      } catch {
        setActionPlan([]);
      }
    }
  }, [psychosocialRisks]);

  // Salvar edição
  const handleSaveEdit = (idx: number) => {
    const updated = actionPlan.map((a, i) => i === idx ? { ...a, ...editForm } : a);
    setActionPlan(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('psychosocial_action_plan', JSON.stringify(updated));
    }
    registerActionHistory(idx, 'Edição', { before: actionPlan[idx], after: editForm });
    setEditingIdx(null);
    setEditForm({});
  };

  // Iniciar edição
  const handleEdit = (idx: number) => {
    setEditingIdx(idx);
    setEditForm(actionPlan[idx]);
  };

  // Cancelar edição
  const handleCancelEdit = () => {
    setEditingIdx(null);
    setEditForm({});
  };

  // Atualizar campo do formulário de edição
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prev: any) => ({ ...prev, [name]: value }));
  };

  // Excluir ação
  const handleDelete = (idx: number) => {
    registerActionHistory(idx, 'Exclusão', { deleted: actionPlan[idx] });
    const updated = actionPlan.filter((_, i) => i !== idx);
    setActionPlan(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('psychosocial_action_plan', JSON.stringify(updated));
    }
    if (editingIdx === idx) {
      setEditingIdx(null);
      setEditForm({});
    }
  };

  // Adicionar nova ação manualmente
  const [newAction, setNewAction] = React.useState<any>({
    actionName: '',
    description: '',
    responsible: '',
    dueDate: '',
    status: 'Pendente',
  });

  const handleNewActionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAction((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAddNewAction = () => {
    if (!newAction.actionName || !newAction.description) return;
    const updated = [...actionPlan, newAction];
    setActionPlan(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('psychosocial_action_plan', JSON.stringify(updated));
    }
    setNewAction({ actionName: '', description: '', responsible: '', dueDate: '', status: 'Pendente' });
  };

  return (
    <div className="space-y-8">
      <BackToMenuButton className="mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Inventário de Riscos Ocupacionais</h1>
      <Card>
        <CardHeader>
          <CardTitle>Inventário Unificado de Riscos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2 flex-wrap items-center">
            {riskTypes.map(type => (
              <button
                key={type}
                className={`px-3 py-1 rounded border ${filter === type ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'} transition`}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded border bg-green-700 text-white border-green-700 ml-4"
              onClick={() => setShowQR(v => !v)}
            >
              {showQR ? 'Fechar QR code' : 'Gerar QR code do filtro'}
            </button>
            {showQR && (
              <div className="ml-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/risk-inventory?filter=${encodeURIComponent(filter)}` : '')}`}
                  alt="QR code do filtro"
                  width={120}
                  height={120}
                />
                <div className="text-xs text-gray-600 mt-1">Escaneie para acessar este filtro</div>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-3 py-2 border">Tipo</th>
                  <th className="px-3 py-2 border">Perigo/Risco</th>
                  <th className="px-3 py-2 border">Setor</th>
                  <th className="px-3 py-2 border">Classificação</th>
                  <th className="px-3 py-2 border">NR</th>
                  <th className="px-3 py-2 border">Impacto/Recomendação</th>
                  <th className="px-3 py-2 border">Identificado em</th>
                  <th className="px-3 py-2 border">Origem</th>
                </tr>
              </thead>
              <tbody>
                {filteredRisks.map((r, idx) => {
                  const riskKey = getRiskKey(r, idx);
                  return (
                    <React.Fragment key={riskKey}>
                      <tr className="odd:bg-white even:bg-gray-50">
                        <td className="px-3 py-2 border font-medium">{r.tipo}</td>
                        <td className="px-3 py-2 border">{r.perigo}</td>
                        <td className="px-3 py-2 border">{r.setor || '-'}</td>
                        <td className="px-3 py-2 border">{r.classificacao || '-'}</td>
                        <td className="px-3 py-2 border">{r.nr}</td>
                        <td className="px-3 py-2 border">{r.impact || '-'}</td>
                        <td className="px-3 py-2 border">{r.dateIdentified || '-'}</td>
                        <td className="px-3 py-2 border">{r.identifiedBy || '-'}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td colSpan={8} className="px-3 py-2 border-t-0">
                          <div className="flex flex-wrap gap-4 items-center">
                            <div>
                              <strong>Evidências:</strong>
                              <ul className="list-disc ml-5">
                                {(evidenceMap[riskKey] || []).map((ev, i) => (
                                  <li key={i}>
                                    <a href={ev.data} download={ev.name} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{ev.name}</a> <span className="text-xs text-gray-500">({new Date(ev.date).toLocaleDateString()})</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Anexar evidência:
                                <input
                                  type="file"
                                  className="block mt-1"
                                  disabled={uploadingId === riskKey}
                                  onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      setUploadingId(riskKey);
                                      handleEvidenceUpload(riskKey, file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            <div>
                              <strong>Histórico:</strong>
                              <ul className="list-disc ml-5">
                                {(historyMap[riskKey] || []).map((h, i) => (
                                  <li key={i} className="text-xs text-gray-700">
                                    {h.action} {h.fileName ? `(${h.fileName})` : ''} - {new Date(h.date).toLocaleString()}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                  </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Plano de ação psicossocial */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Plano de Ação Psicossocial</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Formulário para adicionar nova ação */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 items-end">
              <input
                type="text"
                name="actionName"
                value={newAction.actionName}
                onChange={handleNewActionChange}
                placeholder="Ação"
                className="border rounded px-2 py-1 min-w-[120px]"
              />
              <input
                type="text"
                name="description"
                value={newAction.description}
                onChange={handleNewActionChange}
                placeholder="Descrição"
                className="border rounded px-2 py-1 min-w-[180px]"
              />
              <input
                type="text"
                name="responsible"
                value={newAction.responsible}
                onChange={handleNewActionChange}
                placeholder="Responsável"
                className="border rounded px-2 py-1 min-w-[120px]"
              />
              <input
                type="date"
                name="dueDate"
                value={newAction.dueDate}
                onChange={handleNewActionChange}
                className="border rounded px-2 py-1"
              />
              <select
                name="status"
                value={newAction.status}
                onChange={handleNewActionChange}
                className="border rounded px-2 py-1"
              >
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluída">Concluída</option>
              </select>
              <button className="px-3 py-1 bg-green-700 text-white rounded" onClick={handleAddNewAction}>
                Adicionar
              </button>
            </div>
          </div>
          {actionPlan && actionPlan.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-3 py-2 border">Ação</th>
                    <th className="px-3 py-2 border">Descrição</th>
                    <th className="px-3 py-2 border">Responsável</th>
                    <th className="px-3 py-2 border">Prazo</th>
                    <th className="px-3 py-2 border">Status</th>
                    <th className="px-3 py-2 border">Ações</th>
                    <th className="px-3 py-2 border">Histórico</th>
                  </tr>
                </thead>
                <tbody>
                  {actionPlan.map((a, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-gray-50">
                      {editingIdx === idx ? (
                        <>
                          <td className="px-3 py-2 border font-medium">
                            <input
                              type="text"
                              name="actionName"
                              value={editForm.actionName || ''}
                              onChange={handleEditChange}
                              className="w-full border rounded px-2 py-1"
                            />
                          </td>
                          <td className="px-3 py-2 border">
                            <input
                              type="text"
                              name="description"
                              value={editForm.description || ''}
                              onChange={handleEditChange}
                              className="w-full border rounded px-2 py-1"
                            />
                          </td>
                          <td className="px-3 py-2 border">
                            <input
                              type="text"
                              name="responsible"
                              value={editForm.responsible || ''}
                              onChange={handleEditChange}
                              className="w-full border rounded px-2 py-1"
                            />
                          </td>
                          <td className="px-3 py-2 border">
                            <input
                              type="date"
                              name="dueDate"
                              value={editForm.dueDate || ''}
                              onChange={handleEditChange}
                              className="w-full border rounded px-2 py-1"
                            />
                          </td>
                          <td className="px-3 py-2 border">
                            <select
                              name="status"
                              value={editForm.status || 'Pendente'}
                              onChange={handleEditChange}
                              className="w-full border rounded px-2 py-1"
                            >
                              <option value="Pendente">Pendente</option>
                              <option value="Em andamento">Em andamento</option>
                              <option value="Concluída">Concluída</option>
                            </select>
                          </td>
                          <td className="px-3 py-2 border flex gap-2">
                            <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={() => handleSaveEdit(idx)}>Salvar</button>
                            <button className="px-2 py-1 bg-gray-400 text-white rounded" onClick={handleCancelEdit}>Cancelar</button>
                            <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(idx)}>Excluir</button>
                          </td>
                          <td className="px-3 py-2 border text-xs">
                            <ul className="list-disc ml-4">
                              {(actionHistoryMap[String(idx)] || []).map((h, i) => (
                                <li key={i}>
                                  {h.action} - {h.details ? JSON.stringify(h.details) : ''} - {new Date(h.date).toLocaleString()}
                                </li>
                              ))}
                            </ul>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-3 py-2 border font-medium">{a.actionName}</td>
                          <td className="px-3 py-2 border">{a.description}</td>
                          <td className="px-3 py-2 border">{a.responsible || '-'}</td>
                          <td className="px-3 py-2 border">{a.dueDate || '-'}</td>
                          <td className="px-3 py-2 border">{a.status}</td>
                          <td className="px-3 py-2 border flex gap-2">
                            <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={() => handleEdit(idx)}>Editar</button>
                            <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(idx)}>Excluir</button>
                          </td>
                          <td className="px-3 py-2 border text-xs">
                            <ul className="list-disc ml-4">
                              {(actionHistoryMap[String(idx)] || []).map((h, i) => (
                                <li key={i}>
                                  {h.action} - {h.details ? JSON.stringify(h.details) : ''} - {new Date(h.date).toLocaleString()}
                                </li>
                              ))}
                            </ul>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-500">Nenhum plano de ação psicossocial disponível.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OccupationalRiskInventory;