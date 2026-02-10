// Simulação de consulta ao MTE para CA
export async function consultarCA(ca: string) {
  // Em produção, aqui seria uma chamada fetch para o portal do MTE
  // Exemplo: https://consultaca.mte.gov.br/api/ca/{ca}
  // Para simulação, retorna dados mockados
  if (!ca) return null;
  // Mock: CA válido e CA vencido
  if (ca === "12345") {
    return {
      ca,
      fabricante: "Fabricante Exemplo",
      validade: "2026-12-31",
      status: "Válido",
      tipo: "EPI",
      descricao: "Cinturão para trabalho em altura",
    };
  }
  if (ca === "99999") {
    return {
      ca,
      fabricante: "Fabricante Exemplo",
      validade: "2024-01-01",
      status: "Vencido",
      tipo: "EPI",
      descricao: "Luvas de proteção química",
    };
  }
  // Default: CA não encontrado
  return {
    ca,
    fabricante: "Desconhecido",
    validade: "",
    status: "Não encontrado",
    tipo: "",
    descricao: "",
  };
}
