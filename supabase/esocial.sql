-- Integração eSocial SST
-- Tabelas para controle de eventos, envios e retornos do eSocial relacionados à saúde e segurança do trabalho

CREATE TABLE IF NOT EXISTS esocial_eventos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id),
    tipo_evento TEXT NOT NULL, -- Ex: S-2210, S-2220, S-2240
    descricao TEXT,
    data_evento DATE NOT NULL,
    status_envio TEXT, -- Ex: "pendente", "enviado", "erro"
    protocolo_envio TEXT,
    retorno_envio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS esocial_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evento_id UUID REFERENCES esocial_eventos(id) ON DELETE CASCADE,
    data_log TIMESTAMP WITH TIME ZONE DEFAULT now(),
    mensagem TEXT,
    tipo TEXT, -- Ex: "info", "erro", "sucesso"
    usuario_id UUID REFERENCES usuarios(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela para armazenar arquivos XML enviados/recebidos (opcional)
CREATE TABLE IF NOT EXISTS esocial_arquivos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evento_id UUID REFERENCES esocial_eventos(id) ON DELETE CASCADE,
    tipo_arquivo TEXT, -- Ex: "xml_envio", "xml_retorno"
    arquivo BYTEA,
    nome_arquivo TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
