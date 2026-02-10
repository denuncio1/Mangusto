import React, { useState, useEffect } from "react";
import { consultarCA } from "@/lib/caMteApi";

export function CaStatus({ ca }: { ca: string }) {
  const [info, setInfo] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    consultarCA(ca).then(res => {
      if (mounted) setInfo(res);
    });
    return () => { mounted = false; };
  }, [ca]);
  if (!ca) return null;
  if (!info) return <span className="text-gray-400">...</span>;
  if (info.status === "Válido") return <span className="text-green-600">Válido</span>;
  if (info.status === "Vencido") return <span className="text-red-600">Vencido</span>;
  if (info.status === "Não encontrado") return <span className="text-gray-500">Não encontrado</span>;
  return null;
}
