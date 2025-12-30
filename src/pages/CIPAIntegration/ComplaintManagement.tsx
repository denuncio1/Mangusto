import { useState, useEffect } from "react";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import { supabase } from "@/lib/supabaseClient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// O tipo deve corresponder à estrutura da sua tabela no Supabase
type Complaint = {
  id: number;
  protocol: string;
  status: string;
  description: string | null;
  details: string | null;
  handling_notes: string | null;
  created_at: string;
};

export function ComplaintManagement() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [handlingNotes, setHandlingNotes] = useState<string>("");

  async function fetchComplaints() {
    setLoading(true);
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      toast({ title: "Erro ao buscar denúncias", description: error.message, variant: "destructive" });
    } else {
      setComplaints(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    if (selectedComplaint) {
      setHandlingNotes(selectedComplaint.handling_notes || "");
      setNewStatus(""); // Reset status selection
    }
  }, [selectedComplaint]);

  const handleUpdateComplaint = async () => {
    if (!selectedComplaint) return;

    const { error } = await supabase
      .from("complaints")
      .update({
        status: newStatus || selectedComplaint.status,
        handling_notes: handlingNotes,
      })
      .eq("id", selectedComplaint.id);

    if (error) {
      toast({ title: "Erro ao atualizar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Denúncia atualizada." });
      setSelectedComplaint(null);
      fetchComplaints(); // Re-fetch para atualizar a lista
    }
  };

  const getStatusVariant = (status: string): "secondary" | "default" | "destructive" | "outline" => {
    switch (status) {
      case "Recebida":
        return "secondary";
      case "Em Análise":
        return "default";
      case "Investigação Concluída":
        return "outline";
      case "Ação Tomada":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>Gerenciamento de Denúncias (Visão RH)</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <p className="text-red-500">Erro: {error}</p>;
  }

  return (
    <>
      <BackToMenuButton />
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Denúncias (Visão RH)</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog open={!!selectedComplaint} onOpenChange={(isOpen) => !isOpen && setSelectedComplaint(null)}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Protocolo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.protocol}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(complaint.status)}>{complaint.status}</Badge></TableCell>
                    <TableCell>{new Date(complaint.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => setSelectedComplaint(complaint)}>
                        Ver / Alterar Status
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detalhes da Denúncia: {selectedComplaint?.protocol}</DialogTitle>
              </DialogHeader>
              {selectedComplaint && (
                <div className="space-y-4 py-4">
                  <div>
                    <h4 className="font-semibold">Descrição</h4>
                    <p className="text-sm text-muted-foreground">{selectedComplaint.description || "Nenhuma descrição fornecida."}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Status Atual</h4>
                    <p><Badge variant={getStatusVariant(selectedComplaint.status)}>{selectedComplaint.status}</Badge></p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status-select">Alterar Status</Label>
                    <Select onValueChange={setNewStatus} value={newStatus}>
                      <SelectTrigger id="status-select"><SelectValue placeholder="Selecione o novo status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Em Análise">Em Análise</SelectItem>
                        <SelectItem value="Investigação Concluída">Investigação Concluída</SelectItem>
                        <SelectItem value="Ação Tomada">Ação Tomada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="handling-notes">Tratativas (Visível apenas para RH)</Label>
                    <Textarea
                      id="handling-notes"
                      placeholder="Registre aqui as ações tomadas..."
                      value={handlingNotes}
                      onChange={(e) => setHandlingNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <DialogClose asChild><Button variant="ghost">Cancelar</Button></DialogClose>
                <Button onClick={handleUpdateComplaint}>Salvar Alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </>
  );
}
