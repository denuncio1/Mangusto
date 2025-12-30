"use client";

import { useState, useEffect } from "react";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Supabase redirects with the token in the URL fragment
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // remove the '#'
    const accessToken = params.get('access_token');
    
    if (accessToken) {
      setToken(accessToken);
      // Verify the token with Supabase to get a session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
            toast({ title: "Link inválido ou expirado", description: "Por favor, solicite um novo link para redefinir sua senha.", variant: "destructive" });
            navigate("/login");
        }
      })
    } else {
        toast({ title: "Token não encontrado", description: "O link de redefinição parece estar incompleto.", variant: "destructive" });
        navigate("/login");
    }
  }, [navigate]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
        toast({ title: "Senha é obrigatória", variant: "destructive" });
        return;
    }
    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (error) {
      toast({
        title: "Erro ao redefinir senha",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Senha alterada com sucesso!",
        description: "Você já pode fazer login com sua nova senha.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="mb-4 self-start"><BackToMenuButton /></div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Crie uma Nova Senha</CardTitle>
          <CardDescription>
            Digite sua nova senha abaixo.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleReset}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input
                id="new-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={loading || !token}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Nova Senha
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
