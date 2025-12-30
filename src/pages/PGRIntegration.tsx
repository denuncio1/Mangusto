import React, { useState } from "react";
// Futuro: importar dados reais do inventário de riscos
import jsPDF from "jspdf";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import { supabase } from "@/lib/supabaseClient";

const PGRIntegration = () => {
  const [ltcatFile, setLtcatFile] = useState<File | null>(null);
  const [ltcatFileName, setLtcatFileName] = useState("");
  const [pgrFile, setPgrFile] = useState<File | null>(null);
  const [pgrFileName, setPgrFileName] = useState("");
  const [pcmsoFile, setPcmsoFile] = useState<File | null>(null);
  const [pcmsoFileName, setPcmsoFileName] = useState("");



  const handleLtcatUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setLtcatFile(file);
      setLtcatFileName(file.name);
    }
  };

  const handlePgrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPgrFile(file);
      setPgrFileName(file.name);
    }
  };

  const handlePcmsoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPcmsoFile(file);
      setPcmsoFileName(file.name);
    }
  };

  // Função utilitária para buscar dados da empresa e riscos
  const fetchEmpresaERiscos = async () => {
    let empresa = {
      nome: "Empresa Exemplo Ltda.",
      cnpj: "12.345.678/0001-99",
      setor: "Indústria",
      endereco: "Rua das Normas, 123, Centro, Cidade/UF"
    };
    try {
      const { data: empresaData } = await supabase.from('empresa').select('*').single();
      if (empresaData) empresa = empresaData;
    } catch {}

    let riscos = [];
    try {
      const { data: riscosData } = await supabase.from('riscos_ocupacionais').select('*');
      if (riscosData && riscosData.length > 0) {
        riscos = riscosData;
      }
    } catch {}
    if (!riscos.length) {
      riscos = [
        { perigo: "Ruído excessivo", agente: "Físico", setor: "Produção", classificacao: "Alto", nr: "NR-15" },
        { perigo: "Produtos químicos voláteis", agente: "Químico", setor: "Laboratório", classificacao: "Moderado", nr: "NR-09" },
        { perigo: "Postura inadequada", agente: "Ergonômico", setor: "Escritório", classificacao: "Baixo", nr: "NR-17" }
      ];
    }
    return { empresa, riscos };
  };

  // LTCAT
  const handleGenerateLtcat = async () => {
    const { empresa, riscos } = await fetchEmpresaERiscos();
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("LTCAT - Laudo Técnico das Condições Ambientais do Trabalho", 10, 20);
    doc.setFontSize(12);
    doc.text(`Empregador: ${empresa.nome}`, 10, 32);
    doc.text(`CNPJ: ${empresa.cnpj}`, 10, 40);
    doc.text(`Setor: ${empresa.setor}`, 10, 48);
    doc.text(`Endereço: ${empresa.endereco}`, 10, 56);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 10, 64);
    doc.text("Riscos Avaliados:", 10, 74);
    let y = 82;
    riscos.forEach((r, idx) => {
      doc.text(
        `${idx + 1}. Perigo: ${r.perigo} | Agente: ${r.agente} | Setor: ${r.setor} | Classificação: ${r.classificacao} | NR: ${r.nr}`,
        12,
        y,
        { maxWidth: 180 }
      );
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.text(
      "Este documento foi gerado automaticamente a partir do inventário de riscos. Para um laudo completo, revise e personalize conforme a realidade da empresa.",
      10,
      y + 10,
      { maxWidth: 180 }
    );
    doc.save(`LTCAT-${new Date().toISOString().slice(0,10)}.pdf`);
  };

  // PGR
  const handleGeneratePgr = async () => {
    const { empresa, riscos } = await fetchEmpresaERiscos();
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("PGR - Programa de Gerenciamento de Riscos", 10, 20);
    doc.setFontSize(12);
    doc.text(`Empregador: ${empresa.nome}`, 10, 32);
    doc.text(`CNPJ: ${empresa.cnpj}`, 10, 40);
    doc.text(`Setor: ${empresa.setor}`, 10, 48);
    doc.text(`Endereço: ${empresa.endereco}`, 10, 56);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 10, 64);
    doc.text("Riscos Gerenciados:", 10, 74);
    let y = 82;
    riscos.forEach((r, idx) => {
      doc.text(
        `${idx + 1}. Perigo: ${r.perigo} | Agente: ${r.agente} | Setor: ${r.setor} | Classificação: ${r.classificacao} | NR: ${r.nr}`,
        12,
        y,
        { maxWidth: 180 }
      );
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.text(
      "Este documento foi gerado automaticamente a partir do inventário de riscos. Para um PGR completo, revise e personalize conforme a realidade da empresa.",
      10,
      y + 10,
      { maxWidth: 180 }
    );
    doc.save(`PGR-${new Date().toISOString().slice(0,10)}.pdf`);
  };

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
    <div className="space-y-8">
      <div className="mb-4">
        <BackToMenuButton />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">PGR, PCMSO e LTCAT</h1>
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
              Gerar LTCAT automaticamente (avaliar todos os riscos das NR's)
            </button>
          </div>
        </CardContent>
      </Card>

      {/* PGR */}
      <Card>
        <CardHeader>
          <CardTitle>PGR</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Programa de Gerenciamento de Riscos. Gerencie, consulte e integre o PGR com outros documentos legais e operacionais da empresa.
          </p>
          <div className="flex flex-col gap-3">
            <label className="block">
              <span className="mb-1 block font-medium">Subir PGR existente:</span>
              <input type="file" accept=".pdf,.doc,.docx" className="block" onChange={handlePgrUpload} />
            </label>
            {pgrFileName && (
              <span className="text-green-700 text-sm">Arquivo enviado: {pgrFileName}</span>
            )}
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-fit"
              onClick={handleGeneratePgr}
            >
              Gerar PGR automaticamente (avaliar todos os riscos das NR's)
            </button>
          </div>
        </CardContent>
      </Card>

      {/* PCMSO */}
      <Card>
        <CardHeader>
          <CardTitle>PCMSO</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Programa de Controle Médico de Saúde Ocupacional. Integre o PCMSO ao PGR para acompanhamento da saúde dos trabalhadores e cumprimento das exigências legais.
          </p>
          <div className="flex flex-col gap-3">
            <label className="block">
              <span className="mb-1 block font-medium">Subir PCMSO existente:</span>
              <input type="file" accept=".pdf,.doc,.docx" className="block" onChange={handlePcmsoUpload} />
            </label>
            {pcmsoFileName && (
              <span className="text-green-700 text-sm">Arquivo enviado: {pcmsoFileName}</span>
            )}
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 w-fit"
              onClick={handleGeneratePcmso}
            >
              Gerar PCMSO automaticamente (dados básicos da empresa)
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PGRIntegration;