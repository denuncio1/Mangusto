import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { getAllDocumentos } from './documentService';

export function DocumentFilterPanel() {
  const [search, setSearch] = useState('');
  const [tipo, setTipo] = useState('');
  const [status, setStatus] = useState('');
  const docs = getAllDocumentos().filter(doc => {
    const matchesSearch = doc.nome.toLowerCase().includes(search.toLowerCase());
    const matchesTipo = tipo ? doc.tipo === tipo : true;
    const matchesStatus = status ? doc.status === status : true;
    return matchesSearch && matchesTipo && matchesStatus;
  });
  const tipos = Array.from(new Set(getAllDocumentos().map(d => d.tipo)));
  const statusList = ['válido', 'vencido', 'em aprovação'];

  return (
    <Card className="p-4 mb-4">
      <div className="flex flex-wrap gap-2 items-center mb-2">
        <Input
          placeholder="Buscar por nome..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-48"
        />
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="border rounded px-2 py-1">
          <option value="">Todos os tipos</option>
          {tipos.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="border rounded px-2 py-1">
          <option value="">Todos os status</option>
          {statusList.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="text-sm text-gray-500">{docs.length} documento(s) encontrado(s)</div>
    </Card>
  );
}
