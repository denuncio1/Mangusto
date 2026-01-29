import { useParams } from "react-router-dom";

// Títulos das NRs para exibição
// Títulos e status das NRs
const NR_DATA: Record<number, { title: string; status: "disponivel" | "manutencao" }> = {
  1: { title: "Disposições Gerais e Gerenciamento de Riscos Ocupacionais", status: "disponivel" },
  2: { title: "Inspeção Prévia", status: "manutencao" },
  3: { title: "Embargo e Interdição", status: "manutencao" },
  4: { title: "SESMT", status: "manutencao" },
  5: { title: "CIPA", status: "disponivel" },
  6: { title: "EPI", status: "manutencao" },
  7: { title: "PCMSO", status: "manutencao" },
  8: { title: "Edificações", status: "manutencao" },
  9: { title: "Avaliação e Controle de Exposição", status: "manutencao" },
  10: { title: "Segurança em Máquinas e Equipamentos", status: "manutencao" },
  11: { title: "Transporte, Movimentação, Armazenagem e Manuseio de Materiais", status: "manutencao" },
  12: { title: "Segurança no Trabalho em Máquinas e Equipamentos", status: "manutencao" },
  13: { title: "Caldeiras, Vasos de Pressão e Tubulações", status: "manutencao" },
  14: { title: "Ergonomia", status: "manutencao" },
  15: { title: "Atividades e Operações Insalubres", status: "manutencao" },
  16: { title: "Atividades e Operações Perigosas", status: "manutencao" },
  17: { title: "Ergonomia", status: "manutencao" },
  18: { title: "Condições e Meio Ambiente de Trabalho na Indústria da Construção", status: "manutencao" },
  19: { title: "Explosivos", status: "manutencao" },
  20: { title: "Inflamáveis e Combustíveis", status: "manutencao" },
  21: { title: "Trabalhos a Céu Aberto", status: "manutencao" },
  22: { title: "Mineração", status: "manutencao" },
  23: { title: "Proteção Contra Incêndios", status: "manutencao" },
  24: { title: "Condições Sanitárias e de Conforto nos Locais de Trabalho", status: "manutencao" },
  25: { title: "Resíduos Industriais", status: "manutencao" },
  26: { title: "Sinalização de Segurança", status: "manutencao" },
  27: { title: "Registro Profissional do Técnico de Segurança do Trabalho no Ministério do Trabalho", status: "manutencao" },
  28: { title: "Fiscalização e Penalidades", status: "manutencao" },
  29: { title: "Segurança e Saúde no Trabalho Portuário", status: "manutencao" },
  30: { title: "Segurança e Saúde no Trabalho Aquaviário", status: "manutencao" },
  31: { title: "Segurança e Saúde no Trabalho na Agricultura, Pecuária, Silvicultura, Exploração Florestal e Aquicultura", status: "manutencao" },
  32: { title: "Segurança e Saúde no Trabalho em Serviços de Saúde", status: "manutencao" },
  33: { title: "Segurança e Saúde nos Trabalhos em Espaços Confinados", status: "manutencao" },
  34: { title: "Condições e Meio Ambiente de Trabalho na Indústria Naval", status: "manutencao" },
  35: { title: "Trabalho em Altura", status: "manutencao" },
  36: { title: "Segurança e Saúde no Trabalho em Empresas de Abate e Processamento de Carnes e Derivados", status: "manutencao" },
  37: { title: "Segurança e Saúde em Plataformas de Petróleo", status: "manutencao" },
  38: { title: "Segurança e Saúde no Trabalho em Limpeza Urbana e Manejo de Resíduos Sólidos", status: "manutencao" },
};
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
  const data = NR_DATA[nr];
  if (!data) {

    return (

      <div className="max-w-4xl mx-auto p-6">
