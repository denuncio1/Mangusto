// Mock API para Gestão de Absenteísmo
import { AbsenceRecord, AbsenteeismDashboardData, CID, MotivoAfastamento } from '../types/absenteeism';

let records: AbsenceRecord[] = [];
let cids: CID[] = [
  { codigo: 'J06', descricao: 'Infecções respiratórias' },
  { codigo: 'M54', descricao: 'Dor lombar' },
  { codigo: 'F41', descricao: 'Ansiedade' },
];

export const getDashboard = async (): Promise<AbsenteeismDashboardData> => {
  // Mock simples baseado nos registros
  const totalAtestados = records.length;
  const horasPerdidas = records.reduce((acc, r) => acc + r.horasPerdidas, 0);
  const topCIDs = cids.map(cid => ({
    cid: cid.codigo,
    descricao: cid.descricao,
    count: records.filter(r => r.cid === cid.codigo).length
  })).sort((a, b) => b.count - a.count).slice(0, 3);
  const motivos: { motivo: MotivoAfastamento; count: number }[] = [
    { motivo: 'doenca_comum', count: records.filter(r => r.motivo === 'doenca_comum').length },
    { motivo: 'acidente', count: records.filter(r => r.motivo === 'acidente').length },
    { motivo: 'consulta', count: records.filter(r => r.motivo === 'consulta').length },
    { motivo: 'outros', count: records.filter(r => r.motivo === 'outros').length },
  ];
  const setoresCriticos = Array.from(new Set(records.map(r => r.setor))).map(setor => ({
    setor,
    count: records.filter(r => r.setor === setor).length
  })).sort((a, b) => b.count - a.count).slice(0, 3);
  const tendencias = [];
  return { totalAtestados, horasPerdidas, topCIDs, motivos, setoresCriticos, tendencias };
};

export const getRecords = async (): Promise<AbsenceRecord[]> => records;
export const createRecord = async (rec: AbsenceRecord): Promise<void> => { records.push(rec); };
export const uploadAtestado = async (file: File): Promise<string> => URL.createObjectURL(file);
export const getCIDs = async (): Promise<CID[]> => cids;
