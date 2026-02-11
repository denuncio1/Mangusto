// ...existing code...

import React from "react";

export default function EsgDashboard() {
	return (
		<div className="p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen">
			<h1 className="text-3xl font-bold mb-8 text-green-400">ESG – Indicadores Sociais (S)</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-green-400">
					<span className="text-zinc-500 text-sm">Taxa de Acidentes</span>
					<span className="text-2xl font-bold text-green-600">↓ 22%</span>
				</div>
				<div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
					<span className="text-zinc-500 text-sm">Gravidade Média</span>
					<span className="text-2xl font-bold text-yellow-600">↓ 18%</span>
				</div>
				<div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-blue-400">
					<span className="text-zinc-500 text-sm">Treinamentos Concluídos</span>
					<span className="text-2xl font-bold text-blue-600">94%</span>
				</div>
				<div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-purple-400">
					<span className="text-zinc-500 text-sm">Ações Corretivas Fechadas</span>
					<span className="text-2xl font-bold text-purple-600">87%</span>
				</div>
				<div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-pink-400">
					<span className="text-zinc-500 text-sm">Diversidade & Inclusão</span>
					<span className="text-2xl font-bold text-pink-600">41% mulheres</span>
				</div>
			</div>
			<div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 mb-8">
				<h2 className="text-xl font-semibold mb-2 text-zinc-700 dark:text-zinc-200">Relatórios Prontos</h2>
				<ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
					<li>Relatório ESG – Padrão GRI</li>
					<li>Relatório de Segurança – Investidores</li>
					<li>Relatório de Cultura de Segurança</li>
				</ul>
			</div>
			<div className="flex flex-wrap gap-4 mb-8">
				<button className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition">Exportar Relatório ESG</button>
			</div>
		</div>
	);
}

