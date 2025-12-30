-- Tabela para Ordens de Serviço de SST
create table if not exists service_orders (
  id bigserial primary key,
  title text not null,
  description text not null,
  date date not null default now(),
  attachment_url text,
  created_at timestamptz not null default now()
);

-- Permissões básicas (ajuste conforme sua política de segurança)
-- Permitir leitura para todos e escrita para usuários autenticados
-- Exemplo para Supabase (RLS pode ser ajustado conforme necessário)
