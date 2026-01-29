-- Controle de Acesso Avançado
-- Tabelas para gerenciamento de permissões, papéis, auditoria de acessos e recursos do sistema

CREATE TABLE IF NOT EXISTS papeis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS permissoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT,
    recurso TEXT, -- Ex: "usuarios", "documentos", "relatorios"
    acao TEXT,    -- Ex: "visualizar", "editar", "excluir"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS papel_permissao (
    papel_id UUID REFERENCES papeis(id) ON DELETE CASCADE,
    permissao_id UUID REFERENCES permissoes(id) ON DELETE CASCADE,
    PRIMARY KEY (papel_id, permissao_id)
);

CREATE TABLE IF NOT EXISTS usuario_papel (
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    papel_id UUID REFERENCES papeis(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, papel_id)
);

CREATE TABLE IF NOT EXISTS auditoria_acessos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    recurso TEXT,
    acao TEXT,
    data_acesso TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ip_origem TEXT,
    sucesso BOOLEAN,
    detalhes TEXT
);
