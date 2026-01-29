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
        <p>NR não encontrada.</p>
      </div>
    );
  }

  // ...existing code for rendering NR content...

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      {data.status === "manutencao" ? (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded mb-4">
          Esta NR está em manutenção. O conteúdo será disponibilizado em breve.
        </div>
      ) : (
        <div>
          {/* Conteúdo da NR disponível */}
          <p>Conteúdo da NR {nr}.</p>
        </div>
      )}
    </div>
  );
