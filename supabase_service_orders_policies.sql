-- Permissões públicas para leitura das ordens de serviço
-- (ajuste conforme política de segurança da sua aplicação)

-- Permitir leitura de ordens de serviço para todos os usuários autenticados
alter table service_orders enable row level security;
create policy "Public read service orders" on service_orders
  for select using (true);

-- Permitir inserção apenas para usuários autenticados (exemplo)
create policy "Authenticated insert service orders" on service_orders
  for insert using (auth.role() = 'authenticated');

-- Permitir leitura/inserção de acknowledgements apenas para o próprio usuário
alter table service_orders_ack enable row level security;
create policy "User read own acknowledgements" on service_orders_ack
  for select using (auth.uid() = user_id);
create policy "User insert own acknowledgements" on service_orders_ack
  for insert with check (auth.uid() = user_id);

-- Permitir deleção apenas para administradores (exemplo)
-- create policy "Admin delete service orders" on service_orders for delete using (auth.role() = 'service_admin');
