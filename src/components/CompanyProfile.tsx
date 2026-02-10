import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BackToMenuButton } from "./BackToMenuButton";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth.tsx";


const CompanyProfile = () => {

  const { user } = useAuth();
  const [form, setForm] = useState({
    razaoSocial: "",
    cnpj: "",
    endereco: "",
    ramo: "",
    outros: ""
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from("company_profile")
      .select("razao_social, cnpj, endereco, ramo, outros")
      .eq("user_id", user.id)
      .single()
      .then(({ data, error }) => {
        if (data) {
          setForm({
            razaoSocial: data.razao_social || "",
            cnpj: data.cnpj || "",
            endereco: data.endereco || "",
            ramo: data.ramo || "",
            outros: data.outros || ""
          });
        }
        setLoading(false);
      });
  }, [user]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from("company_profile")
      .upsert({
        user_id: user.id,
        razao_social: form.razaoSocial,
        cnpj: form.cnpj,
        endereco: form.endereco,
        ramo: form.ramo,
        outros: form.outros
      }, { onConflict: ["user_id"] });
    setSaved(!error);
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <BackToMenuButton />
      <Card>
        <CardHeader>
          <CardTitle>Perfil da Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="razaoSocial">Razão Social</Label>
              <Input id="razaoSocial" name="razaoSocial" value={form.razaoSocial} onChange={handleChange} required disabled={loading} />
            </div>
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" name="cnpj" value={form.cnpj} onChange={handleChange} required disabled={loading} />
            </div>
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" name="endereco" value={form.endereco} onChange={handleChange} required disabled={loading} />
            </div>
            <div>
              <Label htmlFor="ramo">Ramo de Atividade</Label>
              <Input id="ramo" name="ramo" value={form.ramo} onChange={handleChange} required disabled={loading} />
            </div>
            <div>
              <Label htmlFor="outros">Outros Dados Importantes</Label>
              <Input id="outros" name="outros" value={form.outros} onChange={handleChange} disabled={loading} />
            </div>
            <Button type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
            {saved && <div className="text-green-600 mt-2">Informações salvas no banco de dados.</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfile;
