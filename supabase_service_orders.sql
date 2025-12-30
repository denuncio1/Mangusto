-- Tabela de ordens de serviço de SST
create table if not exists service_orders (
  id bigserial primary key,
  title text not null,
  description text not null,
  date date not null default now()
);

-- Tabela de ciência/acknowledgement de ordens de serviço por usuário
create table if not exists service_orders_ack (
  id bigserial primary key,
  order_id bigint references service_orders(id) on delete cascade,
  user_id uuid not null, -- ou text, conforme autenticação
  acknowledged_at timestamp with time zone default now(),
  unique(order_id, user_id)
);

-- Index para busca rápida
create index if not exists idx_service_orders_ack_user on service_orders_ack(user_id);
