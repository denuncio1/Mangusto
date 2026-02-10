import React, { useState } from "react";

// Checklists avançados por tema, visão de auditor fiscal experiente
const simulados = [
  {
    tema: "NR-12",
    nome: "Simulado de Fiscalização – NR-12 (Máquinas e Equipamentos)",
    checklist: [
      { pergunta: "Inventário de máquinas e equipamentos atualizado, com identificação de riscos e medidas de controle?", critico: true, doc: "Inventário NR-12", autuacao: "Falta de inventário é autuação gravíssima." },
      { pergunta: "Laudo de Análise de Riscos (LAR) elaborado por profissional habilitado?", critico: true, doc: "LAR", autuacao: "Ausência de LAR é autuação frequente." },
      { pergunta: "Procedimentos de trabalho seguros implementados e documentados?", critico: true, doc: "Procedimentos", autuacao: "Procedimentos genéricos ou inexistentes geram autuação." },
      { pergunta: "Treinamento específico de operadores, com lista de presença e conteúdo programático?", critico: true, doc: "Registros de Treinamento", autuacao: "Treinamento sem comprovação é autuação certa." },
      { pergunta: "Sinalização de segurança visível e adequada em todas as máquinas?", critico: false, doc: "Fotos/Registros", autuacao: "Falta de sinalização é ponto crítico." },
      { pergunta: "Dispositivos de parada de emergência testados e funcionando?", critico: true, doc: "Registros de Teste", autuacao: "Dispositivo inoperante é autuação imediata." },
      { pergunta: "Manual de operação disponível junto à máquina?", critico: false, doc: "Manual", autuacao: "Manual ausente é autuação leve, mas recorrente." },
      { pergunta: "Proteções fixas e móveis instaladas conforme projeto?", critico: true, doc: "Fotos/Projetos", autuacao: "Proteção removida ou inadequada é autuação gravíssima." },
      { pergunta: "Documentação de inspeção e manutenção preventiva em dia?", critico: false, doc: "Registros de Manutenção", autuacao: "Falta de manutenção é autuação comum." },
    ],
    pontosCriticos: [
      "Inventário e LAR ausentes ou desatualizados",
      "Treinamento sem registro",
      "Proteções removidas ou inadequadas",
      "Dispositivos de parada inoperantes"
    ]
  },
  {
    tema: "NR-18",
    nome: "Simulado de Fiscalização – Obra NR-18 (Condições e Meio Ambiente de Trabalho na Indústria da Construção)",
    checklist: [
      { pergunta: "PCMAT (Programa de Condições e Meio Ambiente de Trabalho na Indústria da Construção) disponível, atualizado e assinado?", critico: true, doc: "PCMAT", autuacao: "PCMAT desatualizado ou sem assinatura é autuação grave." },
      { pergunta: "Análise de Riscos específica para cada etapa da obra?", critico: true, doc: "Análise de Riscos", autuacao: "Falta de análise por etapa é autuação frequente." },
      { pergunta: "Registros de treinamentos admissional, periódico e específico para atividades de risco?", critico: true, doc: "Registros de Treinamento", autuacao: "Treinamento sem registro é autuação certa." },
      { pergunta: "Documentação de entrega e uso de EPI/EPC, com CA válido?", critico: true, doc: "Registros de EPI/EPC", autuacao: "EPI/EPC sem documentação é autuação gravíssima." },
      { pergunta: "Controle de acesso à obra, com lista de presença e identificação de terceiros?", critico: false, doc: "Lista de Presença", autuacao: "Acesso sem controle é autuação comum." },
      { pergunta: "Sinalização de segurança e isolamento de áreas de risco?", critico: false, doc: "Fotos/Registros", autuacao: "Falta de sinalização é ponto crítico." },
      { pergunta: "Plano de emergência e rotas de fuga sinalizadas?", critico: true, doc: "Plano de Emergência", autuacao: "Plano ausente é autuação grave." },
      { pergunta: "Registros de inspeção de andaimes, escoramentos e equipamentos de elevação?", critico: true, doc: "Registros de Inspeção", autuacao: "Falta de inspeção é autuação frequente." },
    ],
    pontosCriticos: [
      "PCMAT desatualizado ou sem assinatura",
      "EPI/EPC sem documentação",
      "Treinamento sem registro",
      "Falta de inspeção em andaimes/equipamentos"
    ]
  },
  {
    tema: "Saúde Ocupacional",
    nome: "Simulado de Fiscalização – Saúde Ocupacional (NR-7, NR-9, NR-17, etc.)",
    checklist: [
      { pergunta: "PCMSO (Programa de Controle Médico de Saúde Ocupacional) atualizado, assinado por médico do trabalho?", critico: true, doc: "PCMSO", autuacao: "PCMSO desatualizado ou sem assinatura é autuação grave." },
      { pergunta: "ASO (Atestados de Saúde Ocupacional) de todos os colaboradores em dia?", critico: true, doc: "ASO", autuacao: "ASO vencido ou ausente é autuação gravíssima." },
      { pergunta: "PPRA/PGR (Programa de Prevenção de Riscos Ambientais/Gerenciamento de Riscos) atualizado?", critico: true, doc: "PPRA/PGR", autuacao: "PPRA/PGR desatualizado é autuação frequente." },
      { pergunta: "Registros de exames complementares realizados conforme riscos identificados?", critico: true, doc: "Exames Complementares", autuacao: "Exame não realizado é autuação certa." },
      { pergunta: "Controle de afastamentos e CATs emitidas corretamente?", critico: false, doc: "Registros de Afastamento/CAT", autuacao: "CAT não emitida é autuação comum." },
      { pergunta: "Plano de ação para não conformidades identificado e acompanhado?", critico: false, doc: "Plano de Ação", autuacao: "Não conformidade sem plano é autuação leve, mas recorrente." },
      { pergunta: "Ergonomia: análise de postos de trabalho e implementação de medidas?", critico: false, doc: "Laudo de Ergonomia", autuacao: "Falta de análise ergonômica é autuação frequente." },
    ],
    pontosCriticos: [
      "PCMSO desatualizado ou sem assinatura",
      "ASO vencido ou ausente",
      "PPRA/PGR desatualizado",
      "Exames complementares não realizados"
    ]
  },
];

function calcularProntidao(respostas, checklist) {
  const total = checklist.length;
  const conformes = respostas.filter(r => r === "Conforme").length;
  return Math.round((conformes / total) * 100);
}

import { useEffect } from "react";

const cardStyle = {
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  padding: 24,
  marginBottom: 24,
  maxWidth: 700,
  width: '100%',
};

const checklistItemStyle = (critico) => ({
  marginBottom: 18,
  borderLeft: critico ? '5px solid #e63946' : '5px solid #a8dadc',
  paddingLeft: 16,
  background: critico ? '#fff5f5' : '#f8fafc',
  borderRadius: 8,
  boxShadow: critico ? '0 1px 4px #ffe5e5' : 'none',
});

const simuladoBtnStyle = (selected) => ({
  fontWeight: selected ? 'bold' : 'normal',
  background: selected ? '#ffe066' : '#f1f1f1',
  border: selected ? '2px solid #ffd60a' : '1px solid #ddd',
  borderRadius: 8,
  padding: '10px 18px',
  cursor: 'pointer',
  minWidth: 220,
  marginRight: 12,
  marginBottom: 10,
  transition: 'all 0.2s',
  boxShadow: selected ? '0 2px 8px #fff3cd' : 'none',
});

export default function SimuladosFiscalizacao() {
  const [simuladoIdx, setSimuladoIdx] = useState(0); // Abre o primeiro simulado automaticamente
  const [respostas, setRespostas] = useState(Array(simulados[0].checklist.length).fill(""));
  const [finalizado, setFinalizado] = useState(false);

  const simulado = simulados[simuladoIdx];

  useEffect(() => {
    setRespostas(Array(simulados[simuladoIdx].checklist.length).fill(""));
    setFinalizado(false);
  }, [simuladoIdx]);

  function iniciarSimulado(idx) {
    setSimuladoIdx(idx);
  }

  function responder(idx, valor) {
    setRespostas(r => r.map((v, i) => (i === idx ? valor : v)));
  }

  function finalizar() {
    setFinalizado(true);
  }

  function integrarPlanoAcao() {
    // Aqui integraria com plano de ação real
    alert("Não conformidades integradas ao plano de ação!");
  }

  return (
    <div style={{ padding: 24, background: '#f6f8fa', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ ...cardStyle, marginTop: 12 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222', marginBottom: 4 }}>Simulados de Fiscalização</h1>
        <p style={{ color: '#555', fontSize: 16, marginBottom: 18 }}>Prepare-se para a visita do Auditor Fiscal do Trabalho com simulados realistas e análise de prontidão.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginBottom: 18 }}>
          {simulados.map((s, idx) => (
            <button
              key={s.tema}
              onClick={() => iniciarSimulado(idx)}
              style={simuladoBtnStyle(simuladoIdx === idx)}
            >
              {s.nome}
            </button>
          ))}
        </div>
        <div style={{ ...cardStyle, background: '#f8fafc', boxShadow: 'none', margin: 0, marginTop: 8 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#1d3557', marginBottom: 16 }}>{simulado.nome}</h2>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {simulado.checklist.map((item, idx) => (
              <li key={item.pergunta} style={checklistItemStyle(item.critico)}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{item.pergunta} {item.critico && <span style={{ color: "#e63946", marginLeft: 8 }}>(Crítico)</span>}</div>
                <div style={{ fontSize: 13, color: '#555', marginTop: 2 }}>Documento exigido: <b>{item.doc}</b></div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>O que gera autuação: {item.autuacao}</div>
                <select
                  value={respostas[idx] || ""}
                  onChange={e => responder(idx, e.target.value)}
                  disabled={finalizado}
                  style={{ marginTop: 8, marginBottom: 4, padding: '6px 10px', borderRadius: 6, border: '1px solid #bbb', background: '#fff', fontSize: 15 }}
                >
                  <option value="">Selecione</option>
                  <option value="Conforme">Conforme</option>
                  <option value="Não Conforme">Não Conforme</option>
                  <option value="Não se Aplica">Não se Aplica</option>
                </select>
              </li>
            ))}
          </ul>
          {!finalizado && (
            <button onClick={finalizar} style={{ marginTop: 18, background: '#457b9d', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 1px 4px #bde0fe' }}>Finalizar Simulado</button>
          )}
          {finalizado && (
            <div style={{ marginTop: 28 }}>
              <h3 style={{ color: '#222', fontSize: 18, fontWeight: 700 }}>Índice de Prontidão</h3>
              <p style={{ fontSize: 16, color: '#222' }}>Você está <b style={{ color: '#457b9d' }}>{calcularProntidao(respostas, simulado.checklist)}%</b> pronto para uma fiscalização <b>{simulado.tema}</b>.</p>
              <h4 style={{ color: '#e63946', fontSize: 16, marginTop: 18 }}>Pontos Críticos de Autuação</h4>
              <ul style={{ color: '#e63946', fontWeight: 500, marginLeft: 18 }}>
                {simulado.pontosCriticos.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
              <h4 style={{ color: '#f77f00', fontSize: 16, marginTop: 18 }}>Não conformidades encontradas</h4>
              <ul style={{ marginLeft: 18 }}>
                {simulado.checklist.map((item, idx) => (
                  respostas[idx] === "Não Conforme" && (
                    <li key={idx} style={{ color: item.critico ? '#e63946' : '#f77f00', fontWeight: 500 }}>{item.pergunta} {item.critico && <span>(Crítico)</span>}</li>
                  )
                ))}
              </ul>
              <button onClick={integrarPlanoAcao} style={{ marginTop: 16, background: '#f77f00', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Integrar com Plano de Ação</button>
              <button onClick={() => { setSimuladoIdx(0); setRespostas(Array(simulados[0].checklist.length).fill("")); setFinalizado(false); }} style={{ marginLeft: 16, background: '#adb5bd', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Novo Simulado</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
