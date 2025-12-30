import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface AnalysisData {
  factor: string;
  score: number;
  riskLevel?: string;
  riskColor?: string;
  recommendation?: string;
}

interface QuestionnaireAnalysisProps {
  analysisData: AnalysisData[];
  sensitiveAlerts?: string[];
  weightedAverage?: number;
}

// getRiskLevel agora está na página principal para faixas adaptáveis e recomendações

const QuestionnaireAnalysis: React.FC<QuestionnaireAnalysisProps> = ({ analysisData, sensitiveAlerts, weightedAverage }) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise dos Resultados do Questionário Psicossocial</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {typeof weightedAverage === 'number' && (
          <div className="mb-4">
            <strong>Pontuação Geral Ponderada:</strong> {weightedAverage.toFixed(1)} / 10
          </div>
        )}
        {sensitiveAlerts && sensitiveAlerts.length > 0 && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded">
            <strong>Alertas Críticos:</strong>
            <ul className="list-disc ml-6 mt-2">
              {sensitiveAlerts.map((alert, idx) => <li key={idx}>{alert}</li>)}
            </ul>
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pontuação de Risco por Fator</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analysisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="factor" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" name="Pontuação Média (0-10)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Nível de Risco e Recomendações</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysisData.map((item) => (
              <Card key={item.factor}>
                <CardHeader>
                  <CardTitle className="text-md flex justify-between items-center">
                    {item.factor}
                    <Badge variant={['default','destructive','outline','secondary'].includes(item.riskColor||'') ? (item.riskColor as 'default'|'destructive'|'outline'|'secondary') : 'default'}>{item.riskLevel || '-'}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>Pontuação Média:</strong> {item.score.toFixed(1)} / 10
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Recomendação:</strong> {item.recommendation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionnaireAnalysis;
