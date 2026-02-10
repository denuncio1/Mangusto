// Função mock para upload de evidências
export async function uploadEvidence(file: File): Promise<string> {
  // Simula upload e retorna URL
  return Promise.resolve(URL.createObjectURL(file));
}
