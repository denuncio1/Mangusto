import React, { useState, useRef } from "react";

// Exemplo de perguntas baseadas em contexto
const perguntasBase = [
  { id: 1, texto: "O serviço envolve trabalho em altura?", tipo: "boolean" },
  { id: 2, texto: "Há risco de atmosfera explosiva?", tipo: "boolean" },
  { id: 3, texto: "O local possui energia elétrica energizada?", tipo: "boolean" },
  { id: 4, texto: "O colaborador possui treinamento NR-35 válido?", tipo: "boolean", dependente: 1 },
  { id: 5, texto: "EPI/EPC necessários: Cinturão, trava-quedas, capacete, luvas?", tipo: "multi" },
  { id: 6, texto: "Há necessidade de bloqueio e sinalização?", tipo: "boolean", dependente: 3 },
  { id: 7, texto: "Fotos do local antes do serviço", tipo: "file" },
];

export default function ChecklistDinamicoPTPET() {
  const [respostas, setRespostas] = useState({});
  const [biometria, setBiometria] = useState(null);
  const [geo, setGeo] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  function handleChange(id, value) {
    setRespostas(r => ({ ...r, [id]: value }));
  }

  // Lógica para exibir perguntas dependentes
  function perguntasFiltradas() {
    return perguntasBase.filter(q => {
      if (!q.dependente) return true;
      return respostas[q.dependente] === true;
    });
  }

  // Captura biometria (foto)
  function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    });
  }
  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setBiometria(dataUrl);
      // Parar a câmera
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  }
  // Captura geolocalização
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checklist Inteligente PT/PET</h2>
      <form className="space-y-4">
        {perguntasFiltradas().map(q => (
          <div key={q.id}>
            <label className="block font-medium mb-1">{q.texto}</label>
            {q.tipo === "boolean" && (
              <select
                className="border rounded px-2 py-1"
                value={respostas[q.id] ?? ""}
                onChange={e => handleChange(q.id, e.target.value === "true")}
              >
                <option value="">Selecione</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            )}
            {q.tipo === "multi" && (
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                placeholder="Liste os EPIs/EPCs necessários"
                value={respostas[q.id] ?? ""}
                onChange={e => handleChange(q.id, e.target.value)}
              />
            )}
            {q.tipo === "file" && (
              <input
                type="file"
                className="border rounded px-2 py-1 w-full"
                onChange={e => handleChange(q.id, e.target.files)}
                multiple
              />
            )}
          </div>
        ))}
      </form>
      {/* Biometria facial */}
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Biometria Facial (Foto)</h3>
        {!biometria ? (
          <div>
            <video ref={videoRef} width={320} height={240} className="rounded border" />
            <div className="flex gap-2 mt-2">
              <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded" onClick={startCamera}>Ativar Câmera</button>
              <button type="button" className="px-3 py-1 bg-green-600 text-white rounded" onClick={capturePhoto}>Capturar Foto</button>
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        ) : (
          <img src={biometria} alt="Biometria" className="rounded border w-40 h-32 object-cover" />
        )}
      </div>
      {/* Geolocalização */}
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Geolocalização</h3>
        <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded" onClick={getLocation}>Capturar Localização</button>
        {geo && (
          <div className="mt-2 text-sm text-gray-700">Lat: {geo.lat} | Lng: {geo.lng}</div>
        )}
      </div>
      <pre className="mt-6 bg-gray-100 p-2 rounded text-xs">{JSON.stringify({ ...respostas, biometria, geo }, null, 2)}</pre>
    </div>
  );
}
