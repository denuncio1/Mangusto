-- Tabela de logs de acesso, download, assinatura e edição de documentos versionados
create table if not exists public.versioned_documents_log (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references public.versioned_documents(id) on delete cascade,
  action text not null, -- 'view', 'download', 'sign', 'edit', etc
  user_id uuid references auth.users(id),
  user_email text,
  timestamp timestamptz default now(),
  details jsonb
);

-- Índices para busca rápida
create index if not exists idx_versioned_documents_log_document_id on public.versioned_documents_log(document_id);
create index if not exists idx_versioned_documents_log_user_id on public.versioned_documents_log(user_id);
create index if not exists idx_versioned_documents_log_action on public.versioned_documents_log(action);