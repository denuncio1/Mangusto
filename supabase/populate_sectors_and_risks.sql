-- Popule setores
insert into public.sectors (nome, descricao) values
  ('Administrativo', 'Setor administrativo'),
  ('Produção', 'Setor de produção'),
  ('Manutenção', 'Setor de manutenção');

-- Popule agentes de risco (exemplo)
insert into public.occupational_risk_agents (agente, descricao) values
  ('Máquina Rotativa', 'Equipamento com partes móveis'),
  ('Produto Químico', 'Substância perigosa'),
  ('Queda de Altura', 'Risco de queda em altura');

-- Relacione setores e agentes de risco
insert into public.sector_risks (sector_id, risk_agent_id) values
  (1, 1), -- Administrativo - Máquina Rotativa
  (2, 2), -- Produção - Produto Químico
  (3, 3); -- Manutenção - Queda de Altura
