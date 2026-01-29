import { getAllRiscos } from '@/modules/risks/riskService';
import { getAllDocumentos } from '@/modules/documents/documentService';
import { Card } from '@/components/ui/card';

export function RelatorioRiscosPanel() {
  const riscos = getAllRiscos();
  const documentos = getAllDocumentos();

  function exportarCSV() {
    const header = 'Risco,Classificação,Setor,Grau,Status,Documentos Vinculados\n';
    const rows = riscos.map(r => {
      const docs = documentos.filter(d => d.setor === r.setor).map(d => `${d.nome} (v${d.versao})`).join('; ');
      return `${r.nome},${r.classificacao},${r.setor},${r.grau},${r.status},"${docs}"`;
    });
    const csv = header + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio_riscos.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="p-4 mt-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">Relatório de Riscos Ocupacionais</h3>
        <button onClick={exportarCSV} className="text-blue-700 underline text-sm">Exportar CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border px-2 py-1">Risco</th>
              <th className="border px-2 py-1">Classificação</th>
              <th className="border px-2 py-1">Setor</th>
              <th className="border px-2 py-1">Grau</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Documentos Vinculados</th>
            </tr>
          </thead>
          <tbody>
            {riscos.map(r => {
              const docs = documentos.filter(d => d.setor === r.setor);
              return (
                <tr key={r.id}>
                  <td className="border px-2 py-1">{r.nome}</td>
                  <td className="border px-2 py-1">{r.classificacao}</td>
                  <td className="border px-2 py-1">{r.setor}</td>
                  <td className="border px-2 py-1">{r.grau}</td>
                  <td className="border px-2 py-1">{r.status}</td>
                  <td className="border px-2 py-1">
                    {docs.length > 0 ? docs.map(d => <span key={d.id}>{d.nome} (v{d.versao})<br /></span>) : <span className="text-gray-400">Nenhum</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
