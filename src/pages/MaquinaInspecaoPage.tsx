import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const checklistPerguntas = [
  { id: 1, texto: "Proteções fixas instaladas?", tipo: "simnao" },
  { id: 2, texto: "Botão de emergência funciona?", tipo: "simnao" },
  { id: 3, texto: "Ruído excessivo?", tipo: "simnao" },
];

const MaquinaInspecaoPage = () => {
  const navigate = useNavigate();
  const [respostas, setRespostas] = useState<{ [id: number]: string }>({});
  const [foto, setFoto] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [obs, setObs] = useState("");
  // Mock: geolocalização
  const [geo, setGeo] = useState<string | null>(null);
  // Mock: assinatura
  const [assinatura, setAssinatura] = useState<string>("");

  // Mock: simula geolocalização
  React.useEffect(() => {
    setGeo("-23.5505, -46.6333");
  }, []);

  const handleFile = (setter: (f: File) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setter(e.target.files[0]);
  };

  const finalizar = () => {
    // Mock: gera não conformidade e ordem de manutenção se necessário
    const naoConforme = checklistPerguntas.some(q => respostas[q.id] === "nao");
    if (naoConforme) {
      alert("Não conformidade gerada e ordem de manutenção aberta!");
    } else {
      alert("Inspeção finalizada com sucesso!");
    }
    navigate("/operacoes/checklist-maquinas/resultado");
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <button className="mb-4 text-blue-600 underline" onClick={() => navigate(-1)}>← Voltar</button>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Inspeção NR-12 – Prensa Hidráulica 04</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="mb-4 space-y-2">
            {checklistPerguntas.map(q => (
              <li key={q.id} className="flex items-center gap-4">
                <span>{q.id}. {q.texto}</span>
                <Button variant={respostas[q.id]==="sim"?"default":"outline"} onClick={()=>setRespostas(r=>({...r,[q.id]:"sim"}))}>Sim</Button>
                <Button variant={respostas[q.id]==="nao"?"default":"outline"} onClick={()=>setRespostas(r=>({...r,[q.id]:"nao"}))}>Não</Button>
              </li>
            ))}
          </ol>
          <div className="mb-2">
            <b>Evidências:</b><br />
            <input type="file" accept="image/*" capture="environment" onChange={handleFile(setFoto)} /> Foto
            <input type="file" accept="video/*" capture="environment" onChange={handleFile(setVideo)} className="ml-4" /> Vídeo
            <input type="file" accept="audio/*" onChange={handleFile(setAudio)} className="ml-4" /> Áudio
          </div>
          <div className="mb-2">
            <b>Geolocalização:</b> <span className="text-xs">{geo || "Obtendo..."}</span>
          </div>
          <div className="mb-2">
            <b>Assinatura Digital:</b><br />
            <input type="text" placeholder="Nome do inspetor" value={assinatura} onChange={e=>setAssinatura(e.target.value)} className="input input-xs w-full max-w-xs" />
          </div>
          <div className="mb-2">
            <b>Observações:</b><br />
            <textarea className="border rounded w-full p-2" placeholder="Digite aqui..." value={obs} onChange={e=>setObs(e.target.value)} />
          </div>
          <Button className="w-full mt-4" onClick={finalizar}>Finalizar Inspeção</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaquinaInspecaoPage;
