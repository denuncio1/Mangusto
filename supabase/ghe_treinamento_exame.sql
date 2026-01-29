-- Tabela de treinamentos e exames obrigatórios por GHE
CREATE TABLE IF NOT EXISTS ghe_treinamento_exame (
  id_sst SERIAL PRIMARY KEY,
  id_ghe INTEGER REFERENCES ghe(id_sst) ON DELETE CASCADE,
  tipo VARCHAR(20) NOT NULL, -- 'treinamento' ou 'exame'
  nome VARCHAR(255) NOT NULL,
  periodicidade_meses INTEGER NOT NULL
);
