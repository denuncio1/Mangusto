// Mock de controle de acesso e logs para NC
export function canEditNC(userRole: string): boolean {
  // Apenas admin ou gestor podem editar
  return ['admin', 'gestor'].includes(userRole);
}

export function logNCAction(action: string, ncId: string, userId: string) {
  // Simula log de ação
  console.log(`[LOG] ${action} na NC ${ncId} por usuário ${userId}`);
}
