

import React, { useState, useRef } from "react";
import {
  listarPermissoes,
  criarPermissao,
  aprovarPermissao,
  rejeitarPermissao,
  PermissaoTrabalhoDigital
} from "../modules/permissaoTrabalho/workflow";

export default function PermissaoTrabalho() {
  const [tipo, setTipo] = useState("");
  const [colaborador, setColaborador] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [checklist, setChecklist] = useState({ altura: false, eletrica: false, espaco: false, epi: false });
  const [epIs, setEPIs] = useState("");
  const [validade, setValidade] = useState("");
  const [biometria, setBiometria] = useState(null);
  const [geo, setGeo] = useState(null);
  const [permissoes, setPermissoes] = useState<PermissaoTrabalhoDigital[]>(listarPermissoes());
  const [mensagem, setMensagem] = useState("");
  const [usuarioSimulado, setUsuarioSimulado] = useState("Engenheiro");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  function handleChecklistChange(e) {
    setChecklist({ ...checklist, [e.target.name]: e.target.checked });
  }
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
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }

  function salvarPermissao(e) {
    e.preventDefault();
    if (!tipo || !colaborador || !responsavel || !validade) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }
    criarPermissao({
      tipo,
      colaborador,
      responsavel,
      checklist,
      epIs,
      validade,
      biometria,
      geo
    });
    setPermissoes(listarPermissoes());
    setMensagem("Permissão registrada e enviada para aprovação.");
    setTipo(""); setColaborador(""); setResponsavel(""); setChecklist({ altura: false, eletrica: false, espaco: false, epi: false }); setEPIs(""); setValidade(""); setBiometria(null); setGeo(null);
  }

  function aprovar(id: string) {
    aprovarPermissao(id, usuarioSimulado);
    setPermissoes(listarPermissoes());
    setMensagem("Permissão aprovada!");
  }
  function rejeitar(id: string) {
    rejeitarPermissao(id, usuarioSimulado, "Não conforme");
    setPermissoes(listarPermissoes());
    setMensagem("Permissão rejeitada.");
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-3xl font-bold mb-4">Permissão de Trabalho Digital</h1>
      <div className="mb-4 flex gap-4 items-center">
        <span className="text-sm text-gray-500">Usuário simulado para aprovação:</span>
        <select className="border rounded px-2 py-1" value={usuarioSimulado} onChange={e => setUsuarioSimulado(e.target.value)}>
          <option value="Engenheiro">Engenheiro</option>
          <option value="Técnico">Técnico</option>
          <option value="Supervisor">Supervisor</option>
        </select>
      </div>
      <form className="space-y-4" onSubmit={salvarPermissao}>
        <div>
          <label className="block font-medium mb-1">Tipo de Permissão</label>
          <select className="border rounded px-2 py-1 w-full" value={tipo} onChange={e => setTipo(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="altura">Trabalho em Altura</option>
            <option value="eletrica">Eletricidade</option>
            <option value="espaco">Espaço Confinado</option>
            <option value="quente">Trabalho a Quente</option>
            <option value="frio">Trabalho a Frio</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Colaborador</label>
          <input className="border rounded px-2 py-1 w-full" value={colaborador} onChange={e => setColaborador(e.target.value)} required placeholder="Nome do colaborador" />
        </div>
        <div>
          <label className="block font-medium mb-1">Responsável</label>
          <input className="border rounded px-2 py-1 w-full" value={responsavel} onChange={e => setResponsavel(e.target.value)} required placeholder="Responsável pela liberação" />
        </div>
        <div>
          <label className="block font-medium mb-1">Checklist de Segurança</label>
          <div className="flex flex-wrap gap-4">
            <label><input type="checkbox" name="altura" checked={checklist.altura} onChange={handleChecklistChange} /> Altura</label>
            <label><input type="checkbox" name="eletrica" checked={checklist.eletrica} onChange={handleChecklistChange} /> Elétrica</label>
            <label><input type="checkbox" name="espaco" checked={checklist.espaco} onChange={handleChecklistChange} /> Espaço Confinado</label>
            <label><input type="checkbox" name="epi" checked={checklist.epi} onChange={handleChecklistChange} /> EPIs Conferidos</label>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">EPIs/EPCs Necessários</label>
          <input className="border rounded px-2 py-1 w-full" value={epIs} onChange={e => setEPIs(e.target.value)} placeholder="Ex: Cinturão, trava-quedas, capacete, luvas..." />
        </div>
        <div>
          <label className="block font-medium mb-1">Validade da Permissão</label>
          <input className="border rounded px-2 py-1 w-full" type="date" value={validade} onChange={e => setValidade(e.target.value)} required />
        </div>
        {/* Biometria facial */}
        <div>
          <label className="block font-medium mb-1">Biometria Facial (Foto)</label>
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
        <div>
          <label className="block font-medium mb-1">Geolocalização</label>
          <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded" onClick={getLocation}>Capturar Localização</button>
          {geo && (
            <div className="mt-2 text-sm text-gray-700">Lat: {geo.lat} | Lng: {geo.lng}</div>
          )}
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded">Registrar Permissão</button>
        </div>
      </form>
      {mensagem && (
        <div className="mt-6 p-4 bg-blue-100 border border-blue-400 rounded text-blue-800 font-semibold">{mensagem}</div>
      )}

      {/* Histórico de permissões */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Histórico de Permissões</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 border">Tipo</th>
                <th className="px-2 py-1 border">Colaborador</th>
                <th className="px-2 py-1 border">Responsável</th>
                <th className="px-2 py-1 border">Validade</th>
                <th className="px-2 py-1 border">Status</th>
                <th className="px-2 py-1 border">Ações</th>
                <th className="px-2 py-1 border">Histórico</th>
              </tr>
            </thead>
            <tbody>
              {permissoes.map(p => (
                <tr key={p.id} className={p.status === 'aprovada' ? 'bg-green-50' : p.status === 'rejeitada' ? 'bg-red-50' : ''}>
                  <td className="border px-2 py-1">{p.tipo}</td>
                  <td className="border px-2 py-1">{p.colaborador}</td>
                  <td className="border px-2 py-1">{p.responsavel}</td>
                  <td className="border px-2 py-1">{p.validade}</td>
                  <td className="border px-2 py-1 font-bold capitalize">{p.status}</td>
                  <td className="border px-2 py-1">
                    {p.status === 'pendente' && (
                      <>
                        <button className="px-2 py-1 bg-green-600 text-white rounded mr-2" onClick={() => aprovar(p.id)}>Aprovar</button>
                        <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => rejeitar(p.id)}>Rejeitar</button>
                      </>
                    )}
                  </td>
                  <td className="border px-2 py-1">
                    <details>
                      <summary className="cursor-pointer text-blue-700 underline">Ver</summary>
                      <ul className="text-xs mt-1">
                        {p.historico.map((h, i) => (
                          <li key={i} className="mb-1">{h.data.slice(0, 16).replace('T', ' ')} - <b>{h.status}</b> por {h.usuario} {h.comentario && <span>({h.comentario})</span>}</li>
                        ))}
                      </ul>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
