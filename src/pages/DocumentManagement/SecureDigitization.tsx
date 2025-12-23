import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SecureDigitization = () => {
  const handleDigitize = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Documento digitalizado com sucesso!");
    // Lógica para digitalização segura
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Digitalização Segura de Documentos Físicos</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Digitalizar Documento (NR-1 Item 1.6)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Digitalize documentos físicos de forma segura, garantindo a conformidade com o item 1.6 da NR-1.
          </p>
          <form onSubmit={handleDigitize} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="physicalDocument">Selecionar Documento Físico</Label>
              <Input id="physicalDocument" type="file" accept=".pdf,.jpg,.png" />
            </div>
            <Button type="submit" className="w-full">Iniciar Digitalização</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecureDigitization;