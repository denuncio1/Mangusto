"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { BackToMenuButton } from "@/components/BackToMenuButton";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showResetDialog, setShowResetDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onLoginSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast({
        title: "Login bem-sucedido!",
        description: "Redirecionando para o painel...",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erro no Login",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      toast({ title: "Por favor, insira seu email.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`, // You might need to create this page
    });
    setLoading(false);
    setShowResetDialog(false);
    if (error) {
      toast({
        title: "Erro ao redefinir senha",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    }
    setResetEmail("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <BackToMenuButton />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Acesso Restrito (RH)</CardTitle>
          <CardDescription>
            Entre com seu email e senha para gerenciar as denúncias.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="rh@suaempresa.com"
                {...register("email")}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            variant="link"
            size="sm"
            className="mt-4"
            onClick={() => setShowResetDialog(true)}
          >
            Esqueceu sua senha?
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Redefinir Senha</AlertDialogTitle>
            <AlertDialogDescription>
              Digite seu email para receber um link de redefinição de senha.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="reset-email" className="sr-only">
              Email
            </Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="seu.email@empresa.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePasswordReset}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enviar Link
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
