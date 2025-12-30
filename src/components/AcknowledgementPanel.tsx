import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const AcknowledgementPanel = ({ userId }: { userId: string }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [acknowledged, setAcknowledged] = useState<{ [orderId: number]: boolean }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('service_orders').select('*');
    if (error) {
      toast.error("Erro ao buscar ordens de serviço");
    } else {
      setOrders(data || []);
      // Buscar reconhecimentos do usuário
      const { data: ackData } = await supabase
        .from('service_orders_ack')
        .select('order_id')
        .eq('user_id', userId);
      const ackMap: { [orderId: number]: boolean } = {};
      (ackData || []).forEach((ack: any) => {
        ackMap[ack.order_id] = true;
      });
      setAcknowledged(ackMap);
    }
    setLoading(false);
  };

  const handleAcknowledge = async (orderId: number) => {
    const { error } = await supabase.from('service_orders_ack').insert({ order_id: orderId, user_id: userId });
    if (!error) {
      setAcknowledged({ ...acknowledged, [orderId]: true });
      toast.success("Ordem de serviço reconhecida!");
    } else {
      toast.error("Erro ao reconhecer ordem de serviço");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Reconhecimento de Ordens de Serviço</CardTitle>
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
                <TableHead>Reconhecimento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.title}</TableCell>
                  <TableCell>{order.description}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    {acknowledged[order.id] ? (
                      <span className="text-green-600 font-semibold">Reconhecida</span>
                    ) : (
                      <Button size="sm" onClick={() => handleAcknowledge(order.id)}>
                        Reconhecer
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AcknowledgementPanel;
