
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SafePlayNearMiss() {
  const [desc, setDesc] = useState("fio desencapado próximo à máquina");
  const [local, setLocal] = useState("Setor de Corte");
  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  // Start camera
  const handleStartCamera = async () => {
    setCameraOn(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      alert("Não foi possível acessar a câmera.");
    }
  };

  // Capture photo
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setPhoto(dataUrl);
      }
      // Stop camera after capture
      if (video.srcObject) {
        const tracks = (video.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
      setCameraOn(false);
    }
  };

  // Remove photo
  const handleRemovePhoto = () => {
    setPhoto(null);
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-900 rounded-xl shadow-lg p-6 text-white font-mono border border-neutral-700">
      <div className="border-b border-neutral-700 pb-2 mb-4 flex items-center justify-between">
        <span className="text-lg font-bold">Reportar Quase-Acidente</span>
      </div>
      <div className="mb-4">
        <div className="bg-neutral-800 rounded p-3 flex items-center justify-between mb-2">
          <span className="font-semibold">Câmera aberta – Tire uma foto</span>
        </div>
        {!photo && !cameraOn && (
          <button
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded transition flex items-center justify-center gap-2 mb-4"
            onClick={handleStartCamera}
          >
            <span role="img" aria-label="camera">📷</span> Capturar
          </button>
        )}
        {cameraOn && (
          <div className="flex flex-col items-center mb-4">
            <video ref={videoRef} className="rounded mb-2" style={{ width: 240, height: 180, background: '#222' }} autoPlay />
            <button
              className="bg-green-500 hover:bg-green-600 text-black font-semibold py-1 px-4 rounded transition mb-2"
              onClick={handleCapture}
            >Tirar Foto</button>
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {photo && (
          <div className="flex flex-col items-center mb-2">
            <img src={photo} alt="Foto capturada" className="rounded mb-2" style={{ width: 240, height: 180, objectFit: 'cover' }} />
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded transition"
              onClick={handleRemovePhoto}
            >Remover Foto</button>
          </div>
        )}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Descrição (opcional):</span>
        <input
          className="w-full mt-2 mb-2 p-2 rounded bg-neutral-800 text-amber-200 border border-neutral-700 focus:border-amber-400 focus:outline-none"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Descreva o quase-acidente"
        />
      </div>
      <div className="mb-4">
        <span className="font-semibold">Local:</span>
        <select
          className="w-full mt-2 mb-2 p-2 rounded bg-neutral-800 text-amber-200 border border-neutral-700 focus:border-amber-400 focus:outline-none"
          value={local}
          onChange={e => setLocal(e.target.value)}
        >
          <option>Setor de Corte</option>
          <option>Produção</option>
          <option>Logística</option>
          <option>Manutenção</option>
        </select>
      </div>
      <button
        className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded transition mb-4"
        onClick={() => navigate("/inteligencia-eventos/safeplay/confirmacao")}
      >
        Enviar Reporte
      </button>
      <div className="text-xs text-yellow-300 text-center mt-2">*Modo Offline: envio será sincronizado depois*</div>
    </div>
  );
}
