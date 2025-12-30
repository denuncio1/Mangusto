import React, { useState } from "react";
import PsychosocialQuestionnaire from "@/components/PsychosocialQuestionnaire";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import QuestionnaireAnalysis from "@/components/QuestionnaireAnalysis";
import { fullQuestionnaireData } from "@/lib/questionnaireData"; // Importando questionário ampliado

const PsychosocialAssessment = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // --- Lógica aprimorada ---
  // Pesos para fatores críticos (exemplo: violência, saúde mental, diversidade)
  const FACTOR_WEIGHTS: Record<string, number> = {
    violence: 2,
    worklife: 1.5,
    diversity: 1.5,
    environment: 1.2,
    // demais fatores padrão: 1
  };
  // Perguntas sensíveis para alerta automático (ids)
  const SENSITIVE_QUESTIONS = [
    'vio1', 'vio2', 'div2', 'wl2', // assédio, discriminação, saúde mental
  ];
  const handleQuestionnaireSubmit = () => {
    // Lógica para calcular a pontuação com pesos
    const factorScores: Record<string, { total: number; count: number; weight: number }> = {};
    let weightedTotal = 0;
    let weightedCount = 0;

    fullQuestionnaireData.forEach(factor => {
      const weight = FACTOR_WEIGHTS[factor.id] || 1;
      factorScores[factor.id] = { total: 0, count: 0, weight };
      factor.questions.forEach(question => {
        const answerValue = parseInt(answers[question.id], 10);
        if (!isNaN(answerValue)) {
          factorScores[factor.id].total += answerValue;
          factorScores[factor.id].count++;
        }
      });
      if (factorScores[factor.id].count > 0) {
        weightedTotal += (factorScores[factor.id].total / factorScores[factor.id].count) * weight;
        weightedCount += weight;
      }
    });

    // Análise de alertas automáticos para respostas sensíveis
    const sensitiveAlerts: string[] = [];
    fullQuestionnaireData.forEach(factor => {
      factor.questions.forEach(question => {
        if (SENSITIVE_QUESTIONS.includes(question.id)) {
          const answerValue = parseInt(answers[question.id], 10);
          if (!isNaN(answerValue) && answerValue >= 7) {
            // 7 ou mais indica situação crítica
            sensitiveAlerts.push(`Alerta: Resposta crítica em "${question.text}" (${factor.title})`);
          }
        }
      });
    });

    // Faixas adaptáveis (poderia ser configurável)
    const getRiskLevel = (score: number) => {
      if (score >= 7) return { level: 'Alto', color: 'destructive' as const, recommendation: 'Ações imediatas e acompanhamento especializado.' };
      if (score >= 4) return { level: 'Médio', color: 'secondary' as const, recommendation: 'Monitoramento e intervenções preventivas.' };
      return { level: 'Baixo', color: 'default' as const, recommendation: 'Manter boas práticas e vigilância.' };
    };

    // Recomendações detalhadas por fator
    const FACTOR_RECOMMENDATIONS: Record<string, string> = {
      violence: 'Investigue imediatamente situações de assédio ou violência. Garanta canais de denúncia e apoio psicológico.',
      worklife: 'Implemente ações de equilíbrio trabalho-vida e promova saúde mental.',
      diversity: 'Reforce políticas de inclusão e combate à discriminação.',
      environment: 'Avalie e melhore as condições ambientais e de segurança.',
      recognition: 'Promova reconhecimento e justiça organizacional.',
      // ... demais fatores podem ser detalhados
    };

    const calculatedAnalysis = Object.keys(factorScores).map(factorId => {
      const factorInfo = fullQuestionnaireData.find(f => f.id === factorId);
      const score = factorScores[factorId].count > 0 
        ? factorScores[factorId].total / factorScores[factorId].count 
        : 0;
      const risk = getRiskLevel(score);
      return {
        factor: factorInfo?.title || 'Desconhecido',
        score: score,
        riskLevel: risk.level,
        riskColor: risk.color,
        recommendation: FACTOR_RECOMMENDATIONS[factorId] || risk.recommendation,
      };
    });

    setAnalysisResult({
      factors: calculatedAnalysis,
      sensitiveAlerts,
      weightedAverage: weightedCount > 0 ? (weightedTotal / weightedCount) : 0,
    });
  };

  return (
    <div className="space-y-8">
      <BackToMenuButton className="mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Módulo de Avaliação Psicossocial</h1>
      <PsychosocialQuestionnaire 
        answers={answers}
        onAnswerChange={handleAnswerChange}
        onSubmit={handleQuestionnaireSubmit}
      />
      {analysisResult && <QuestionnaireAnalysis analysisData={analysisResult.factors} sensitiveAlerts={analysisResult.sensitiveAlerts} weightedAverage={analysisResult.weightedAverage} />}
    </div>
  );
};

export default PsychosocialAssessment;