import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Delivery {
  id: number;
  colaborador: string;
  epiEpc: string;
  quantidade: number;
  dataEntrega: string;
  validade: string;
  ca: string;
}

const initialDeliveries: Delivery[] = [];

export default function EpiEpcDelivery() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [form, setForm] = useState<Omit<Delivery, "id">>({ colaborador: "", epiEpc: "", quantidade: 1, dataEntrega: "", validade: "", ca: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd() {
    setDeliveries([
      ...deliveries,
      { ...form, id: Date.now() },
    ]);
    setForm({ colaborador: "", epiEpc: "", quantidade: 1, dataEntrega: "", validade: "", ca: "" });
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Entrega e Rastreamento de EPI/EPC</h1>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Registrar Entrega</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Label htmlFor="colaborador">Colaborador</Label>
            <Input id="colaborador" name="colaborador" value={form.colaborador} onChange={handleChange} required placeholder="Nome do colaborador" />
            <Label htmlFor="epiEpc">EPI/EPC</Label>
            <Input id="epiEpc" name="epiEpc" value={form.epiEpc} onChange={handleChange} required placeholder="Nome do EPI/EPC" />
            <Label htmlFor="ca">CA</Label>
            <Input id="ca" name="ca" value={form.ca} onChange={handleChange} required placeholder="Código de Aprovação" />
            <Label htmlFor="validade">Validade</Label>
            <Input id="validade" name="validade" value={form.validade} onChange={handleChange} required type="date" />
            <Label htmlFor="quantidade">Quantidade</Label>
            <Input id="quantidade" name="quantidade" value={form.quantidade} onChange={handleChange} required type="number" min={1} />
            <Label htmlFor="dataEntrega">Data de Entrega</Label>
            <Input id="dataEntrega" name="dataEntrega" value={form.dataEntrega} onChange={handleChange} required type="date" />
            <Button onClick={handleAdd}>Registrar Entrega</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Histórico de Entregas</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Colaborador</th>
                <th className="border px-2 py-1">EPI/EPC</th>
                <th className="border px-2 py-1">CA</th>
                <th className="border px-2 py-1">Validade</th>
                <th className="border px-2 py-1">Qtd</th>
                <th className="border px-2 py-1">Data Entrega</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-gray-500">Nenhuma entrega registrada.</td></tr>
              ) : (
                deliveries.map(item => (
                  <tr key={item.id}>
                    <td className="border px-2 py-1">{item.colaborador}</td>
                    <td className="border px-2 py-1">{item.epiEpc}</td>
                    <td className="border px-2 py-1">{item.ca}</td>
                    <td className="border px-2 py-1">{item.validade}</td>
                    <td className="border px-2 py-1">{item.quantidade}</td>
                    <td className="border px-2 py-1">{item.dataEntrega}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
