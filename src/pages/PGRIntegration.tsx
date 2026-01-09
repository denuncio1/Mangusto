// Stub for fetchEmpresaERiscos
async function fetchEmpresaERiscos() {
  // TODO: Replace with real implementation
  return { empresa: { nome: "Empresa Exemplo", cnpj: "00.000.000/0001-00", setor: "Setor Exemplo", endereco: "Rua Exemplo, 123", porte: "me" } };
}

// Stubs for missing handlers
function handleLtcatUpload() {}
function handleGenerateLtcat() {}
function handlePcmsoUpload() {}
// --- COMPONENTES AUXILIARES ---
function S2220Form() {
  const [nome, setNome] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [data, setData] = React.useState("");
  const [tipoExame, setTipoExame] = React.useState("");
  const [resultado, setResultado] = React.useState("");
  const [xml, setXml] = React.useState("");
  function gerarXML() {
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n<eSocial>\n  <evtMonit Id="ID${Date.now()}">\n    <ideEvento>\n      <tpAmb>1</tpAmb>\n      <procEmi>1</procEmi>\n      <verProc>1.0</verProc>\n    </ideEvento>\n    <ideEmpregador>\n      <tpInsc>1</tpInsc>\n      <nrInsc>00000000000000</nrInsc>\n    </ideEmpregador>\n    <ideVinculo>\n      <cpfTrab>${cpf}</cpfTrab>\n      <matricula>1</matricula>\n    </ideVinculo>\n    <exame>\n      <dtExame>${data}</dtExame>\n      <tpExame>${tipoExame}</tpExame>\n      <resultado>${resultado}</resultado>\n    </exame>\n    <infoTrabalhador>\n      <nome>${nome}</nome>\n    </infoTrabalhador>\n  </evtMonit>\n</eSocial>`;
    setXml(xmlString);
    const blob = new Blob([xmlString], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `S-2220_Monitoramento_${nome || "trabalhador"}.xml`;
    link.click();
  }
  return (
    <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault(); gerarXML(); }}>
      <label className="block">
        <span className="mb-1 block font-medium">Nome do Trabalhador:</span>
        <input type="text" className="block mb-2" value={nome} onChange={e => setNome(e.target.value)} required />
      </label>
      <label className="block">
        <span className="mb-1 block font-medium">CPF do Trabalhador:</span>
        <input type="text" className="block mb-2" value={cpf} onChange={e => setCpf(e.target.value)} required maxLength={11} pattern="\d{11}" />
      </label>
      <label className="block">
        <span className="mb-1 block font-medium">Data do Exame:</span>
        <input type="date" className="block mb-2" value={data} onChange={e => setData(e.target.value)} required />
      </label>
      <label className="block">
        <span className="mb-1 block font-medium">Tipo de Exame:</span>
        <input type="text" className="block mb-2" value={tipoExame} onChange={e => setTipoExame(e.target.value)} required placeholder="Admissional, Periódico, Demissional..." />
      </label>
      <label className="block">
        <span className="mb-1 block font-medium">Resultado:</span>
        <input type="text" className="block mb-2" value={resultado} onChange={e => setResultado(e.target.value)} required placeholder="Apto, Inapto, etc." />
      </label>
      <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 w-fit">Gerar arquivo S-2220 (Monitoramento) para E-Social</button>
      {xml && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
          <strong>Prévia do XML:</strong>
          <pre>{xml}</pre>
        </div>
      )}
    </form>
  );
}

function S2210Form() {
  const [nome, setNome] = React.useState("");
  const [data, setData] = React.useState("");
  const [local, setLocal] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [xml, setXml] = React.useState("");
  function gerarXML() {
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n<eSocial>\n  <evtCAT Id="ID${Date.now()}">\n    <ideEvento>\n      <tpAmb>1</tpAmb>\n      <procEmi>1</procEmi>\n      <verProc>1.0</verProc>\n    </ideEvento>\n    <ideEmpregador>\n      <tpInsc>1</tpInsc>\n      <nrInsc>00000000000000</nrInsc>\n    </ideEmpregador>\n    <ideVinculo>\n      <cpfTrab>00000000000</cpfTrab>\n      <matricula>1</matricula>\n    </ideVinculo>\n    <cat>\n      <dtAcid>${data}</dtAcid>\n      <tpAcid>1</tpAcid>\n      <hrsTrabAntesAcid>08:00</hrsTrabAntesAcid>\n      <localAcidente>\n        <tpLocal>1</tpLocal>\n        <dscLocal>${local}</dscLocal>\n      </localAcidente>\n      <parteAtingida>\n        <codParteAting>99</codParteAting>\n      </parteAtingida>\n      <agenteCausador>\n        <codAgntCausador>9999</codAgntCausador>\n      </agenteCausador>\n      <descricao>${descricao}</descricao>\n      <observacao>Gerado pelo sistema</observacao>\n    </cat>\n    <infoAcidentado>\n      <nome>${nome}</nome>\n    </infoAcidentado>\n  </evtCAT>\n</eSocial>`;
    setXml(xmlString);
    const blob = new Blob([xmlString], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `S-2210_CAT_${nome || "acidente"}.xml`;
    link.click();
  }
  return (
    <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault(); gerarXML(); }}>
      <label className="block">
        <span className="mb-1 block font-medium">Nome do Acidentado:</span>
        <input type="text" className="block mb-2" value={nome} onChange={e => setNome(e.target.value)} required />
      </label>
      <label className="block">
        <span className="mb-1 block font-medium">Data do Acidente:</span>
        <input type="date" className="block mb-2" value={data} onChange={e => setData(e.target.value)} required />
      </label>
      <label className="block">
        <span className="mb-1 block font-medium">Local do Acidente:</span>
        <input type="text" className="block mb-2" value={local} onChange={e => setLocal(e.target.value)} required />
      </label>
      <label className="block">
        <span className="mb-1 block font-medium">Descrição do Acidente:</span>
        <textarea className="block mb-2" value={descricao} onChange={e => setDescricao(e.target.value)} required />
      </label>
      <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 w-fit">Gerar arquivo S-2210 (CAT) para E-Social</button>
      {xml && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
          <strong>Prévia do XML:</strong>
          <pre>{xml}</pre>
        </div>
      )}
    </form>
  );
}
import React, { useState } from "react";
// Futuro: importar dados reais do inventário de riscos
import jsPDF from "jspdf";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import { supabase } from "@/lib/supabaseClient";
import { fetchOccupationalRiskAgents } from "@/lib/supabaseRiskAgents";
import { mapearCodigoTabela24 } from "@/utils/tabela24Mapper";

const PGRIntegration = () => {
  const [ltcatFile, setLtcatFile] = useState<File | null>(null);
  const [ltcatFileName, setLtcatFileName] = useState("");
  const [pgrFile, setPgrFile] = useState<File | null>(null);
  const [pgrFileName, setPgrFileName] = useState("");
  const [pcmsoFile, setPcmsoFile] = useState<File | null>(null);
  const [pcmsoFileName, setPcmsoFileName] = useState("");

  // S-2240
  const [s2240Xml, setS2240Xml] = useState("");
  const [loadingS2240, setLoadingS2240] = useState(false);

  async function handleGenerateS2240() {
    setLoadingS2240(true);
    try {
      const { empresa } = await fetchEmpresaERiscos();
      const agentes = await fetchOccupationalRiskAgents();
      if (!agentes || agentes.length === 0) {
        alert("Nenhum agente de risco cadastrado.");
        setLoadingS2240(false);
        return;
      }
      // Monta XML S-2240
      const riscosXml = agentes.map((ag) => {
        const codigoTabela24 = ag.codigo_tabela24 || mapearCodigoTabela24(ag.agente);
        return `    <agente>
      <codAgnt>${codigoTabela24 || ""}</codAgnt>
      <dscAgnt>${ag.agente}</dscAgnt>
      <tpAgnt>${ag.tipo}</tpAgnt>
      <intensidade>${ag.intensidade || ""}</intensidade>
      <tecnicaAvaliacao>${ag.tecnica_avaliacao || ""}</tecnicaAvaliacao>
      <epi>${ag.epi || ""}</epi>
      <caEpi>${ag.ca_epi || ""}</caEpi>
      <epc>${ag.epc || ""}</epc>
      <setor>${ag.setor || ""}</setor>
      <dataAvaliacao>${ag.data_avaliacao || ""}</dataAvaliacao>
      <responsavelAvaliacao>${ag.responsavel_avaliacao || ""}</responsavelAvaliacao>
    </agente>`;
      }).join("\n");
      const xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n<eSocial>\n  <evtExpRisco Id="ID${Date.now()}">\n    <ideEvento>\n      <tpAmb>1</tpAmb>\n      <procEmi>1</procEmi>\n      <verProc>1.0</verProc>\n    </ideEvento>\n    <ideEmpregador>\n      <tpInsc>1</tpInsc>\n      <nrInsc>${empresa.cnpj || ""}</nrInsc>\n    </ideEmpregador>\n    <infoRisco>\n${riscosXml}\n    </infoRisco>\n  </evtExpRisco>\n</eSocial>`;
      setS2240Xml(xmlString);
      // Download automático
      const blob = new Blob([xmlString], { type: "application/xml" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `S-2240_AgentesRisco_${empresa.nome || "empresa"}.xml`;
      link.click();
    } catch (e) {
      alert("Erro ao gerar S-2240: " + (e.message || e));
    }
    setLoadingS2240(false);
  }

  // PCMSO
  const handleGeneratePcmso = async () => {
    const { empresa } = await fetchEmpresaERiscos();
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("PCMSO - Programa de Controle Médico de Saúde Ocupacional", 10, 20);
    doc.setFontSize(12);
    doc.text(`Empregador: ${empresa.nome}`, 10, 32);
    doc.text(`CNPJ: ${empresa.cnpj}`, 10, 40);
    doc.text(`Setor: ${empresa.setor}`, 10, 48);
    doc.text(`Endereço: ${empresa.endereco}`, 10, 56);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 10, 64);
    doc.text("Este documento foi gerado automaticamente. Para um PCMSO completo, revise e personalize conforme a realidade da empresa.", 10, 80, { maxWidth: 180 });
    doc.save(`PCMSO-${new Date().toISOString().slice(0,10)}.pdf`);
  };

  // Lógica de dispensa conforme NR-01 1.8
  const [empresaInfo, setEmpresaInfo] = useState<any>(null);
  React.useEffect(() => {
    fetchEmpresaERiscos().then(({ empresa }) => setEmpresaInfo(empresa));
  }, []);

  // Função para avaliar dispensa
  // Geração de declaração digital de dispensa
  const handleGerarDeclaracaoDispensa = () => {
    if (!empresaInfo || !empresaInfo.porte) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Declaração Digital de Dispensa de PGR/PCMSO", 10, 20);
    doc.setFontSize(12);
    doc.text(`Empresa: ${empresaInfo.nome || "-"}`, 10, 32);
    doc.text(`CNPJ: ${empresaInfo.cnpj || "-"}`, 10, 40);
    doc.text(`Setor: ${empresaInfo.setor || "-"}`, 10, 48);
    doc.text(`Endereço: ${empresaInfo.endereco || "-"}`, 10, 56);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 10, 64);
    let texto = "";
    if (empresaInfo.porte === "mei") {
      texto = "De acordo com a NR-01 (item 1.8.1), o MEI está dispensado de elaborar o PGR. Caso atue em dependências de contratante, deverá ser incluído no PGR da contratante.";
    } else if (["me", "epp"].includes(empresaInfo.porte)) {
      texto = "De acordo com a NR-01 (item 1.8.4 e 1.8.6), a empresa está dispensada de elaborar o PGR e o PCMSO, desde que não haja exposição a agentes físicos, químicos, biológicos ou riscos ergonômicos (grau de risco 1 ou 2, conforme NR-4) e as informações digitais estejam declaradas. A dispensa não afasta a obrigatoriedade de exames médicos e ASO.";
    }
    doc.text(texto, 10, 80, { maxWidth: 180 });
    doc.text("Esta declaração deve ser divulgada aos trabalhadores.", 10, 120, { maxWidth: 180 });
    doc.save(`DeclaracaoDispensa_${empresaInfo.nome || "empresa"}_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  function getDispensaAviso() {
    if (!empresaInfo || !empresaInfo.porte) return null;
    const porte = empresaInfo.porte;
    // MEI
    if (porte === "mei") {
      return (
        <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-4 text-green-900 text-sm rounded">
          <b>MEI identificado:</b> De acordo com a NR-01 (item 1.8.1), o MEI está dispensado de elaborar o PGR.<br/>
          <b>Atenção:</b> Se atuar em dependências de contratante, a empresa contratante deve incluí-lo em seu PGR.<br/>
          <button onClick={handleGerarDeclaracaoDispensa} className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Gerar Declaração Digital de Dispensa</button><br/>
          <a href="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-01-disposicoes-gerais" target="_blank" rel="noopener noreferrer" className="underline text-green-700">Ver NR-01</a>
        </div>
      );
    }
    // ME/EPP
    if (["me", "epp"].includes(porte)) {
      return (
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4 text-blue-900 text-sm rounded">
          <b>{porte === "me" ? "Microempresa (ME)" : "Empresa de Pequeno Porte (EPP)"} identificada:</b><br/>
          Caso não haja exposição a agentes físicos, químicos, biológicos ou riscos ergonômicos (grau de risco 1 ou 2, conforme NR-4), e as informações digitais estejam declaradas, a empresa pode ser dispensada de elaborar o PGR e o PCMSO.<br/>
          <b>Atenção:</b> A dispensa não afasta a obrigatoriedade de exames médicos e ASO.<br/>
          <button onClick={handleGerarDeclaracaoDispensa} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Gerar Declaração Digital de Dispensa</button><br/>
          <a href="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-01-disposicoes-gerais" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">Ver NR-01</a>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <div className="space-y-8">
        <div className="mb-4">
          <BackToMenuButton />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Integração com PGR, LTCAT, PCMSO e E-Social</h1>
                <div className="mb-4">
                  <button
                    className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 w-fit"
                    onClick={handleGenerateS2240}
                    disabled={loadingS2240}
                  >
                    {loadingS2240 ? "Gerando S-2240..." : "Gerar S-2240 (Agentes de Risco) para E-Social"}
                  </button>
                </div>
                {s2240Xml && (
                  <div className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                    <strong>Prévia do XML S-2240:</strong>
                    <pre>{s2240Xml}</pre>
                  </div>
                )}
        {getDispensaAviso()}
        {/* LTCAT */}
        <Card>
          <CardHeader>
          <CardTitle>LTCAT</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Laudo Técnico das Condições Ambientais do Trabalho. Gere, consulte e integre o LTCAT com o PGR para fins previdenciários e de segurança do trabalho.
          </p>
          <div className="flex flex-col gap-3">
            <label className="block">
              <span className="mb-1 block font-medium">Subir LTCAT existente:</span>
              <input type="file" accept=".pdf,.doc,.docx" className="block" onChange={handleLtcatUpload} />
            </label>
            {ltcatFileName && (
              <span className="text-green-700 text-sm">Arquivo enviado: {ltcatFileName}</span>
            )}
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-fit"
              onClick={handleGenerateLtcat}
            >
              Gerar LTCAT em PDF
            </button>
          </div>
        </CardContent>


      </Card>
      {/* ...restante do conteúdo... */}
    </div>
  </>
  );
}

export default PGRIntegration;