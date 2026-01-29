-- Indicadores/BI para SST
-- Tabelas para armazenar e calcular indicadores de saúde e segurança do trabalho

CREATE TABLE IF NOT EXISTS indicadores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id),
    nome TEXT NOT NULL,
    descricao TEXT,
    tipo TEXT, -- Ex: "acidente", "absenteísmo", "treinamento", "doença ocupacional"
    formula TEXT, -- Fórmula para cálculo do indicador (opcional)
    unidade TEXT, -- Ex: "%", "dias", "casos"
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS valores_indicadores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    indicador_id UUID REFERENCES indicadores(id) ON DELETE CASCADE,
    periodo_inicio DATE NOT NULL,
    periodo_fim DATE NOT NULL,
    valor NUMERIC NOT NULL,
    meta NUMERIC,
    observacao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Exemplos de indicadores: taxa de frequência de acidentes, taxa de gravidade, absenteísmo, treinamentos realizados, exames periódicos em dia, etc.
