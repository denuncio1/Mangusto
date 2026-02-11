import React from "react";

export default function AcademiaSST() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Academia SST (Treinamentos & Matriz)</h1>
      <p className="mb-6 text-lg text-zinc-700">
        Bem-vindo à Academia SST! Aqui você encontra os principais módulos para gestão de treinamentos, matriz de polivalência, simulados de emergência e certificados digitais. Utilize o menu lateral para acessar cada funcionalidade.
      </p>
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-2">Funcionalidades disponíveis:</h2>
        <ul className="list-disc ml-6 text-zinc-800 space-y-1">
          <li><b>Matriz de Polivalência:</b> Controle de quem pode operar o quê (NR-10, 11, 12, 33, 35).</li>
          <li><b>LMS Integrado:</b> Treinamentos teóricos via vídeo com prova de proficiência.</li>
          <li><b>Simulados de Emergência (NR-23):</b> Agendamento e registro de simulados de abandono e brigada.</li>
          <li><b>Assinatura Digital de Certificados:</b> Validação imediata no perfil do colaborador.</li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-4">
        <a href="/academia-sst/matriz-polivalencia" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">Acessar Matriz de Polivalência</a>
        <a href="/academia-sst/lms" className="px-5 py-3 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition">Acessar LMS Integrado</a>
        <a href="/academia-sst/simulados" className="px-5 py-3 rounded-lg bg-yellow-500 text-black font-semibold shadow hover:bg-yellow-600 transition">Acessar Simulados de Emergência</a>
        <a href="/academia-sst/certificados" className="px-5 py-3 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition">Acessar Certificados Digitais</a>
      </div>
    </div>
  );
}
