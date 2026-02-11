-- Tabela de comentários/justificativas por versão de documento
create table if not exists public.versioned_documents_comments (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references public.versioned_documents(id) on delete cascade,
  user_id uuid references auth.users(id),
  user_email text,
  comment text not null,
  created_at timestamptz default now()
);
create index if not exists idx_versioned_documents_comments_document_id on public.versioned_documents_comments(document_id);