
export default NRPage;
// ...existing code...
import React from "react";
import { useParams } from "react-router-dom";

// Títulos das NRs para exibição
const NR_TITLES: Record<number, string> = {
  1: "Disposições Gerais e Gerenciamento de Riscos Ocupacionais",
  2: "Inspeção Prévia",
  3: "Embargo e Interdição",
  4: "SESMT",
  5: "CIPA",
  6: "EPI",
  7: "PCMSO",
  8: "Edificações",
  9: "Avaliação e Controle de Exposição",
  10: "Segurança em Máquinas e Equipamentos",
  11: "Transporte, Movimentação, Armazenagem e Manuseio de Materiais",
  12: "Segurança no Trabalho em Máquinas e Equipamentos",
  13: "Caldeiras, Vasos de Pressão e Tubulações",
  14: "Ergonomia",
  15: "Atividades e Operações Insalubres",
  16: "Atividades e Operações Perigosas",
  17: "Ergonomia",
  18: "Condições e Meio Ambiente de Trabalho na Indústria da Construção",
  19: "Explosivos",
  20: "Inflamáveis e Combustíveis",
  21: "Trabalhos a Céu Aberto",
  22: "Mineração",
  23: "Proteção Contra Incêndios",
  24: "Condições Sanitárias e de Conforto nos Locais de Trabalho",
  25: "Resíduos Industriais",
  26: "Sinalização de Segurança",
  27: "Registro Profissional do Técnico de Segurança do Trabalho no Ministério do Trabalho",
  28: "Fiscalização e Penalidades",
  29: "Segurança e Saúde no Trabalho Portuário",
  30: "Segurança e Saúde no Trabalho Aquaviário",
  31: "Segurança e Saúde no Trabalho na Agricultura, Pecuária, Silvicultura, Exploração Florestal e Aquicultura",
  32: "Segurança e Saúde no Trabalho em Serviços de Saúde",
  33: "Segurança e Saúde nos Trabalhos em Espaços Confinados",
  34: "Condições e Meio Ambiente de Trabalho na Indústria Naval",
  35: "Trabalho em Altura",
  36: "Segurança e Saúde no Trabalho em Empresas de Abate e Processamento de Carnes e Derivados",
  37: "Segurança e Saúde em Plataformas de Petróleo",
  38: "Segurança e Saúde no Trabalho em Limpeza Urbana e Manejo de Resíduos Sólidos"
};

interface NRPageProps {
  nrNumber?: number;
}

const NRPage: React.FC<NRPageProps> = ({ nrNumber }) => {
  const params = useParams();
  const nr = nrNumber || Number(params["*"].split("/").pop());
  const title = NR_TITLES[nr] || `NR-${nr}`;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">NR-{nr} - {title}</h1>
      <p>Página da NR em manutenção. Estrutura restaurada.</p>
    </div>
  );
};

