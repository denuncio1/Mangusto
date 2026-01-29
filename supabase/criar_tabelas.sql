-- SCRIPT 1: CRIAÇÃO DAS TABELAS

CREATE TABLE IF NOT EXISTS nr (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL,
  descricao VARCHAR(255) NOT NULL
);

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

CREATE TABLE IF NOT EXISTS ghe_treinamento_exame (
  id_sst SERIAL PRIMARY KEY,
  id_ghe INTEGER REFERENCES ghe(id_sst) ON DELETE CASCADE,
  tipo VARCHAR(20) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  periodicidade_meses INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS funcionario_nr (
  id SERIAL PRIMARY KEY,
  id_funcionario INTEGER REFERENCES funcionario(id) ON DELETE CASCADE,
  id_nr INTEGER REFERENCES nr(id) ON DELETE CASCADE
);
