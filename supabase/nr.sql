-- Tabela de NRs
CREATE TABLE IF NOT EXISTS nr (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL,
  descricao VARCHAR(255) NOT NULL
);

-- Tabela de vínculo funcionário <-> NR
CREATE TABLE IF NOT EXISTS funcionario_nr (
  id SERIAL PRIMARY KEY,
  id_funcionario INTEGER REFERENCES funcionario(id_sst) ON DELETE CASCADE,
  id_nr INTEGER REFERENCES nr(id) ON DELETE CASCADE
);
