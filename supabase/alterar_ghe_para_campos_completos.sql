-- Adicione os campos que faltam na tabela ghe para compatibilizar com os inserts detalhados
ALTER TABLE ghe ADD COLUMN IF NOT EXISTS funcoes_incluidas VARCHAR(255);
ALTER TABLE ghe ADD COLUMN IF NOT EXISTS setor_area VARCHAR(100);
ALTER TABLE ghe ADD COLUMN IF NOT EXISTS riscos_ocupacionais VARCHAR(255);
ALTER TABLE ghe ADD COLUMN IF NOT EXISTS agentes_nocivos VARCHAR(255);
ALTER TABLE ghe ADD COLUMN IF NOT EXISTS medidas_controle VARCHAR(255);
ALTER TABLE ghe ADD COLUMN IF NOT EXISTS localizacao VARCHAR(100);
ALTER TABLE ghe ADD COLUMN IF NOT EXISTS descricao_atividades VARCHAR(255);
ALTER TABLE ghe ADD COLUMN IF NOT EXISTS data_proxima_revisao_pgr DATE;
