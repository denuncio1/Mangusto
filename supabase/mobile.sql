-- Backend para funcionalidades do app mobile
-- Tabelas para notificações, checklists, ocorrências e logs de acesso mobile

CREATE TABLE IF NOT EXISTS notificacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    titulo TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT false,
    data_envio TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS checklists_mobile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    titulo TEXT NOT NULL,
    descricao TEXT,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT now(),
    data_conclusao TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS ocorrencias_mobile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    tipo TEXT NOT NULL, -- Ex: "acidente", "quase acidente", "observação"
    descricao TEXT,
    data_ocorrencia TIMESTAMP WITH TIME ZONE DEFAULT now(),
    status TEXT,
    foto_url TEXT
);

CREATE TABLE IF NOT EXISTS logs_acesso_mobile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    data_acesso TIMESTAMP WITH TIME ZONE DEFAULT now(),
    dispositivo TEXT,
    ip_origem TEXT
);
