// Geração de XML eSocial S-2240 (Condições Ambientais do Trabalho)
import type { Risco } from '@/modules/risks/types';
import type { Documento } from '@/modules/documents/types';

export function gerarXMLS2240(risco: Risco, documentos: Documento[]): string {
  const docXml = documentos.map(doc => `    <doc>
      <nome>${doc.nome}</nome>
      <tipo>${doc.tipo}</tipo>
      <url>${doc.url}</url>
    </doc>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<eSocial>
  <evtExpRisco Id="ID${risco.id}">
    <ideEvento>
      <tpAmb>1</tpAmb>
      <procEmi>1</procEmi>
      <verProc>1.0</verProc>
    </ideEvento>
    <ideEmpregador>
      <tpInsc>1</tpInsc>
      <nrInsc>00000000000000</nrInsc>
    </ideEmpregador>
    <infoExpRisco>
      <risco>
        <nome>${risco.nome}</nome>
        <classificacao>${risco.classificacao}</classificacao>
        <setor>${risco.setor}</setor>
        <grau>${risco.grau}</grau>
        <status>${risco.status}</status>
        <documentos>
${docXml}
        </documentos>
      </risco>
    </infoExpRisco>
  </evtExpRisco>
</eSocial>`;
}
