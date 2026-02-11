-- Adiciona hash, status e carimbo de tempo à tabela de documentos versionados
alter table public.versioned_documents add column if not exists hash text;
alter table public.versioned_documents add column if not exists status text default 'vigente';
alter table public.versioned_documents add column if not exists signed_by uuid references auth.users(id);
alter table public.versioned_documents add column if not exists signed_at timestamptz;
-- status: vigente, vencido, pendente_assinatura, etc.