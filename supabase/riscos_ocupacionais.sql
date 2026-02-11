-- Criação da tabela public.riscos_ocupacionais
CREATE TABLE IF NOT EXISTS public.riscos_ocupacionais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    grau_risco VARCHAR(50),
    agente_causador VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índice para busca rápida por nome
CREATE INDEX IF NOT EXISTS idx_riscos_ocupacionais_nome ON public.riscos_ocupacionais(nome);
