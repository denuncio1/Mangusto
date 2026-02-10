import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Clinic {
  id?: number;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: string;
  responsavel_tecnico: string;
  crm_responsavel: string;
}

const initialClinic: Clinic = {
  nome: "",
  cnpj: "",
  telefone: "",
  email: "",
  endereco: "",
  responsavel_tecnico: "",
  crm_responsavel: ""
};

const ClinicCrud = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [form, setForm] = useState<Clinic>({ ...initialClinic });
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClinics();
  }, []);

  async function fetchClinics() {
    setLoading(true);
    // Substitua por chamada real ao backend/supabase
    setClinics([]); // Mock vazio
    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEdit(clinic: Clinic) {
    setForm(clinic);
    setEditId(clinic.id!);
  }

  function handleCancel() {
    setForm({ ...initialClinic });
    setEditId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Substitua por chamada real ao backend/supabase
    if (editId) {
      // Atualizar clínica
    } else {
      // Criar nova clínica
    }
    setForm({ ...initialClinic });
    setEditId(null);
    setLoading(false);
    fetchClinics();
  }

  async function handleDelete(id: number) {
    setLoading(true);
    // Substitua por chamada real ao backend/supabase
    setLoading(false);
    fetchClinics();
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-8">
      <Button className="mb-4" variant="outline" onClick={() => window.history.back()}>
        Voltar
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{editId ? "Editar Clínica" : "Cadastrar Clínica"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="nome" value={form.nome} onChange={handleChange} required placeholder="Nome da Clínica" />
              <Input name="cnpj" value={form.cnpj} onChange={handleChange} required placeholder="CNPJ" />
              <Input name="telefone" value={form.telefone} onChange={handleChange} required placeholder="Telefone" />
              <Input name="email" value={form.email} onChange={handleChange} required placeholder="E-mail" />
              <Input name="endereco" value={form.endereco} onChange={handleChange} required placeholder="Endereço" />
              <Input name="responsavel_tecnico" value={form.responsavel_tecnico} onChange={handleChange} required placeholder="Responsável Técnico" />
              <Input name="crm_responsavel" value={form.crm_responsavel} onChange={handleChange} required placeholder="CRM do Responsável" />
            </div>
            <div className="flex gap-2 mt-4">
              <Button type="submit" disabled={loading}>{editId ? "Salvar" : "Cadastrar"}</Button>
              {editId && <Button type="button" variant="outline" onClick={handleCancel}>Cancelar</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clínicas Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Carregando...</div>
          ) : clinics.length === 0 ? (
            <div className="text-muted-foreground">Nenhuma clínica cadastrada.</div>
          ) : (
            <table className="w-full text-sm mt-2">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CNPJ</th>
                  <th>Telefone</th>
                  <th>E-mail</th>
                  <th>Responsável Técnico</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {clinics.map(clinic => (
                  <tr key={clinic.id}>
                    <td>{clinic.nome}</td>
                    <td>{clinic.cnpj}</td>
                    <td>{clinic.telefone}</td>
                    <td>{clinic.email}</td>
                    <td>{clinic.responsavel_tecnico}</td>
                    <td>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(clinic)}>Editar</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(clinic.id!)} className="ml-2">Excluir</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicCrud;
