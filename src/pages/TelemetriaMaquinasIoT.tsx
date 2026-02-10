import React, { useState, useEffect } from "react";

const SENSOR_LABELS = [
  { key: "vibration", label: "Vibração (mm/s)" },
  { key: "temperature", label: "Temperatura (°C)" },
  { key: "hours", label: "Horas de operação" },
  { key: "energy", label: "Consumo de energia (kWh)" }
];

function randomSensorData() {
  return {
    vibration: +(Math.random() * 10).toFixed(2),
    temperature: +(Math.random() * 80 + 20).toFixed(1),
    hours: Math.floor(Math.random() * 10000),
    energy: +(Math.random() * 1000).toFixed(1)
  };
}

function getAlerts(data) {
  const alerts = [];
  if (data.vibration > 7) alerts.push("Vibração excessiva detectada!");
  if (data.temperature > 90) alerts.push("Temperatura crítica!");
  if (data.energy > 900) alerts.push("Consumo de energia elevado!");
  if (data.hours > 9500) alerts.push("Horas de operação próximas do limite!");
  return alerts;
}

function predictFailure(data) {
  // Simulação ML: se vibração e temperatura altas, risco de falha
  if (data.vibration > 7 && data.temperature > 90) return "Risco de falha iminente (ML)";
  if (data.hours > 9500 && data.energy > 900) return "Manutenção preventiva recomendada (ML)";
  return "Funcionamento normal";
}

export default function TelemetriaMaquinasIoT() {
  const [sensorData, setSensorData] = useState(randomSensorData());
  const [alerts, setAlerts] = useState([]);
  const [failure, setFailure] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const data = randomSensorData();
      setSensorData(data);
      setAlerts(getAlerts(data));
      setFailure(predictFailure(data));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleMaintenance() {
    alert("Ordem de manutenção gerada!");
  }

  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-lg p-6 max-w-lg mx-auto mt-10 border border-zinc-700 font-mono">
      <div className="border-b border-zinc-700 pb-2 mb-2 text-lg font-bold">Telemetria de Máquinas (IoT)</div>
      <div className="mb-4">
        {SENSOR_LABELS.map(({ key, label }) => (
          <div key={key} className="flex justify-between py-1">
            <span>{label}</span>
            <span className="font-semibold">{sensorData[key]}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-700 pt-2 mt-2">
        <div className="font-semibold mb-1">Alertas:</div>
        {alerts.length === 0 ? (
          <div className="text-green-400">Nenhum alerta</div>
        ) : (
          <ul className="list-disc ml-6 text-red-400">
            {alerts.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        )}
      </div>
      <div className="border-t border-zinc-700 pt-2 mt-2">
        <div className="font-semibold mb-1">Previsão de Falhas (ML):</div>
        <div className={failure.includes("falha") ? "text-red-400" : "text-yellow-300"}>{failure}</div>
      </div>
      <button
        className="mt-4 border border-zinc-500 px-3 py-1 rounded hover:bg-zinc-800"
        onClick={handleMaintenance}
      >
        Gerar Ordem de Manutenção
      </button>
    </div>
  );
}
