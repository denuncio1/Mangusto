import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function CreatePassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Informe o email.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Erro ao enviar link", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Email enviado", description: "Verifique sua caixa de entrada para criar sua senha." });
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Criar Senha de Acesso</CardTitle>
        </CardHeader>
        <form onSubmit={handleCreatePassword}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu.email@empresa.com"
                required
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Link de Criação de Senha"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
