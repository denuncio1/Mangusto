-- CRIAÇÃO DE TODAS AS TABELAS NECESSÁRIAS (PK funcionario = id)

-- Tabela NR
CREATE TABLE IF NOT EXISTS nr (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL,
  descricao VARCHAR(255) NOT NULL
);

-- Tabela GHE
CREATE TABLE IF NOT EXISTS ghe (
  id_sst SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  funcoes_incluidas VARCHAR(255),
  setor_area VARCHAR(100),
  riscos_ocupacionais VARCHAR(255),
  agentes_nocivos VARCHAR(255),
  medidas_controle VARCHAR(255),
  localizacao VARCHAR(100),
  descricao_atividades VARCHAR(255),
  data_proxima_revisao_pgr DATE
);

-- Tabela de treinamentos e exames obrigatórios por GHE
CREATE TABLE IF NOT EXISTS ghe_treinamento_exame (
  id_sst SERIAL PRIMARY KEY,
  id_ghe INTEGER REFERENCES ghe(id_sst) ON DELETE CASCADE,
  tipo VARCHAR(20) NOT NULL, -- 'treinamento' ou 'exame'
  nome VARCHAR(255) NOT NULL,
  periodicidade_meses INTEGER NOT NULL
);

-- Tabela de vínculo funcionário <-> NR (PK funcionario = id)
CREATE TABLE IF NOT EXISTS funcionario_nr (
  id SERIAL PRIMARY KEY,
  id_funcionario INTEGER REFERENCES funcionario(id) ON DELETE CASCADE,
  id_nr INTEGER REFERENCES nr(id) ON DELETE CASCADE
);

-- DADOS DE EXEMPLO

-- Popular tabela NR
INSERT INTO nr (codigo, descricao) VALUES
  ('NR-01', 'Disposições Gerais'),
  ('NR-05', 'CIPA - Comissão Interna de Prevenção de Acidentes'),
  ('NR-06', 'Equipamento de Proteção Individual'),
  ('NR-07', 'Programa de Controle Médico de Saúde Ocupacional'),
  ('NR-09', 'Programa de Prevenção de Riscos Ambientais'),
  ('NR-10', 'Segurança em Instalações e Serviços em Eletricidade'),
  ('NR-12', 'Segurança no Trabalho em Máquinas e Equipamentos'),
  ('NR-17', 'Ergonomia'),
  ('NR-18', 'Condições e Meio Ambiente de Trabalho na Indústria da Construção'),
  ('NR-23', 'Proteção Contra Incêndios');

-- Popular tabela ghe com campos detalhados
INSERT INTO ghe (nome, funcoes_incluidas, setor_area, riscos_ocupacionais, agentes_nocivos, medidas_controle, localizacao, descricao_atividades, data_proxima_revisao_pgr) VALUES
  ('GHE 01', 'Operador de máquina, ajudante de produção', 'Produção', 'Ruído, calor', 'Nível de pressão sonora, temperatura', 'Protetores auriculares, ventilação', 'Galpão 2', 'Soldagem de peças metálicas', '2027-01-10'),
  ('GHE 02', 'Eletricista, técnico de manutenção', 'Manutenção elétrica', 'Choque elétrico, campos eletromagnéticos', 'Tensão elétrica, radiação não ionizante', 'EPCs, EPI, bloqueio e etiquetagem', 'Galpão 1', 'Pintura industrial de estruturas', '2027-02-15'),
  ('GHE 03', 'Auxiliar administrativo', 'Escritório', 'Ergonomia, riscos psicossociais', 'Postura inadequada, estresse', 'Ajuste de mobiliário, pausas, apoio psicológico', 'Administração', 'Rotinas administrativas', '2027-03-01');

-- Popular tabela ghe_treinamento_exame
INSERT INTO ghe_treinamento_exame (id_ghe, tipo, nome, periodicidade_meses) VALUES
  (1, 'treinamento', 'NR-12 - Segurança em Máquinas', 24),
  (1, 'exame', 'Audiometria', 12),
  (2, 'treinamento', 'NR-10 - Segurança em Eletricidade', 24),
  (2, 'exame', 'Eletroencefalograma', 24),
  (3, 'treinamento', 'NR-17 - Ergonomia', 36),
  (3, 'exame', 'Avaliação Psicossocial', 24);
