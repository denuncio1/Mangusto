
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import AcknowledgementPanel from "@/components/AcknowledgementPanel";
import { sendOrderNotification } from "@/lib/supabaseEmailUtils";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const ServiceOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Em app real, obter o userId do contexto de autenticação
  const userId = "mock-user-1";

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('service_orders').select('*').order('date', { ascending: false });
    if (error) {
      toast.error("Erro ao buscar ordens de serviço");
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    let attachment_url = null;
    if (attachment) {
      const fileExt = attachment.name.split('.').pop();
      const fileName = `ordem_${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('service-orders').upload(fileName, attachment);
      if (uploadError) {
        toast.error("Erro ao fazer upload do anexo");
        return;
      }
      attachment_url = uploadData?.path ? supabase.storage.from('service-orders').getPublicUrl(uploadData.path).data.publicUrl : null;
    }
    const { error } = await supabase.from('service_orders').insert({ title, description, date: new Date().toISOString().slice(0, 10), attachment_url });
    if (!error) {
      // Envio automático de e-mail (ajuste destinatários conforme sua lógica)
      await sendOrderNotification({
        to: "destinatario@empresa.com", // pode ser lista de emails dos trabalhadores
        subject: "Nova Ordem de Serviço de SST",
        message: `Uma nova ordem de serviço foi emitida:\n\nTítulo: ${title}\nDescrição: ${description}`
      });
      toast.success("Ordem de serviço criada e notificação enviada!");
      setTitle("");
      setDescription("");
      setAttachment(null);
      fetchOrders();
    } else {
      toast.error("Erro ao criar ordem de serviço");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Ordens de Serviço de SST</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Nova Ordem de Serviço</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateOrder} className="space-y-4" encType="multipart/form-data">
            <div className="grid gap-2">
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Título da ordem de serviço"
              />
            </div>
            <div className="grid gap-2">
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Descrição detalhada"
              />
            </div>
            <div className="grid gap-2">
              <label className="block text-sm font-medium">Anexo (opcional)</label>
              <input
                type="file"
                accept="application/pdf,image/*,.doc,.docx,.xls,.xlsx"
                onChange={e => setAttachment(e.target.files?.[0] || null)}
                className="block"
              />
              {attachment && <span className="text-xs text-muted-foreground">{attachment.name}</span>}
            </div>
            <Button type="submit" disabled={loading}>Criar Ordem de Serviço</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Ordens de Serviço Emitidas</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Carregando...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Anexo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>{order.title}</TableCell>
                    <TableCell>{order.description}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      {order.attachment_url ? (
                        <a href={order.attachment_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver Anexo</a>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {/* Painel de ciência individual */}
      <AcknowledgementPanel userId={userId} />
    </div>
  );
};

export default ServiceOrders;
