import React from "react";
import { Exam } from "../types/asoScheduling";

interface ExamSuggestionProps {
  exames: Exam[];
}

export default function ExamSuggestion({ exames }: ExamSuggestionProps) {
  if (!exames.length) return null;
  return (
    <div>
      <h4 className="font-semibold">Exames Obrigatórios Sugeridos</h4>
      <ul className="list-disc ml-6">
        {exames.map(e => <li key={e.id}>{e.nome}</li>)}
      </ul>
    </div>
  );
}
