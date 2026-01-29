-- SIPAT (Semana Interna de Prevenção de Acidentes do Trabalho)
-- Tabelas para gestão de eventos, participantes, atividades e registros de SIPAT

CREATE TABLE IF NOT EXISTS sipat_eventos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id),
    ano INTEGER NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    tema TEXT,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sipat_atividades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evento_id UUID REFERENCES sipat_eventos(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    descricao TEXT,
    data DATE NOT NULL,
    hora_inicio TIME,
    hora_fim TIME,
    local TEXT,
    palestrante TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sipat_participantes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evento_id UUID REFERENCES sipat_eventos(id) ON DELETE CASCADE,
    funcionario_id UUID REFERENCES funcionarios(id),
    nome TEXT,
    email TEXT,
    tipo_participante TEXT, -- Ex: "funcionário", "convidado", "palestrante"
    presente BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sipat_registros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evento_id UUID REFERENCES sipat_eventos(id) ON DELETE CASCADE,
    atividade_id UUID REFERENCES sipat_atividades(id) ON DELETE CASCADE,
    participante_id UUID REFERENCES sipat_participantes(id) ON DELETE CASCADE,
    feedback TEXT,
    certificado_emitido BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
