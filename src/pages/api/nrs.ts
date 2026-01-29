// Exemplo de API REST para integração externa (mock)
import type { NextApiRequest, NextApiResponse } from 'next';
import { NR } from '@/types';

// Simulação de dados
const mockNRs: NR[] = [
  { id: 1, codigo: 'NR-01', descricao: 'Disposições Gerais' },
  { id: 2, codigo: 'NR-06', descricao: 'EPI' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(mockNRs);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
