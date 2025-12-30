-- Trigger para notificar (log ou ação futura) quando uma ordem de serviço for reconhecida
create or replace function notify_service_order_ack()
returns trigger as $$
begin
  -- Exemplo: inserir em uma tabela de log, enviar e-mail, etc.
  insert into service_orders_ack_log(order_id, user_id, acknowledged_at)
  values (new.order_id, new.user_id, new.acknowledged_at);
  return new;
end;
$$ language plpgsql;

-- Tabela de log de reconhecimentos (pode ser usada para auditoria ou notificações)
create table if not exists service_orders_ack_log (
  id bigserial primary key,
  order_id bigint,
  user_id uuid,
  acknowledged_at timestamp with time zone
);

-- Trigger
create trigger trg_notify_service_order_ack
  after insert on service_orders_ack
  for each row execute procedure notify_service_order_ack();

-- Exemplo de campo para anexos (arquivo) na tabela de ordens de serviço
alter table service_orders add column if not exists attachment_url text;
