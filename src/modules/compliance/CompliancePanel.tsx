import { NR_RULES, getRequirementsByNR } from './nrRules';
import { Card } from '@/components/ui/card';

interface CompliancePanelProps {
  nr: string;
}

export function CompliancePanel({ nr }: CompliancePanelProps) {
  const rule = NR_RULES.find(r => r.nr === nr);
  if (!rule) return <div>NR não encontrada.</div>;
  return (
    <Card className="p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{rule.nr} - {rule.title}</h2>
      <p className="mb-2">{rule.description}</p>
      <h3 className="font-semibold">Requisitos:</h3>
      <ul className="list-disc list-inside ml-4">
        {rule.requirements.map((req, i) => (
          <li key={i}>{req}</li>
        ))}
      </ul>
      <div className="text-xs text-gray-500 mt-2">Última atualização: {rule.lastUpdate}</div>
    </Card>
  );
}
