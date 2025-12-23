import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const ShareWithEntities = () => {
  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Documento compartilhado com sucesso!");
    // Lógica para compartilhamento com rastreabilidade
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Compartilhamento com Sindicatos e Inspeção do Trabalho</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Compartilhar Documento com Rastreabilidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Compartilhe documentos de forma segura e com rastreabilidade com sindicatos e órgãos de inspeção do trabalho.
          </p>
          <form onSubmit={handleShare} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="documentToShare">Documento a Compartilhar</Label>
              <Input id="documentToShare" placeholder="Nome do Documento ou ID" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="entity">Compartilhar Com</Label>
              <Select>
                <SelectTrigger id="entity">
                  <SelectValue placeholder="Selecione a entidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sindicato">Sindicato</SelectItem>
                  <SelectItem value="inspecao-trabalho">Inspeção do Trabalho</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">Compartilhar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareWithEntities;