import React from "react";

export default function SafePlayLoja() {
  const [pontos, setPontos] = React.useState(240);
  const [confirmMsg, setConfirmMsg] = React.useState("");
  const premios = [
    { icon: "🍩", nome: "Voucher Café", valor: 80 },
    { icon: "🎁", nome: "Kit Brinde Mangusto", valor: 150 },
    { icon: "⏰", nome: "Saída Antecipada (30 min)", valor: 200 },
    { icon: "🎟️", nome: "Vale Cinema", valor: 250 }
  ];

  const handleResgatar = () => {
    // Find first prize user can afford
    const premio = premios.find(p => pontos >= p.valor);
    if (!premio) {
      setConfirmMsg("Você não tem pontos suficientes para resgatar um prêmio.");
      return;
    }
    setPontos(pontos - premio.valor);
    setConfirmMsg(`Prêmio '${premio.nome}' resgatado com sucesso!`);
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-900 rounded-xl shadow-lg p-6 text-white font-mono border border-neutral-700">
      <div className="border-b border-neutral-700 pb-2 mb-4 flex items-center justify-between">
        <span className="text-lg font-bold">Loja Mangusto – Troque seus pontos</span>
      </div>
      <div className="mb-4">Seus pontos: <span className="font-bold text-amber-400">{pontos} pts</span></div>
      <div className="mb-4">
        {premios.map((premio, idx) => (
          <div key={idx} className="flex items-center mb-2">
            <span className="mr-2 text-xl">{premio.icon}</span>
            <span className="font-bold text-amber-200">{premio.nome}</span>
            <span className="ml-auto text-amber-400">- {premio.valor} pts</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded transition" onClick={handleResgatar}>Resgatar</button>
      </div>
      {confirmMsg && (
        <div className="mt-4 text-center text-amber-400 font-bold">{confirmMsg}</div>
      )}
    </div>
  );
}