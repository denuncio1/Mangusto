-- View para linha do tempo de versões e ações
create or replace view public.versioned_documents_timeline as
select d.id as document_id, d.title, d.version, d.created_at as event_time, 'criação' as event_type, d.created_by as user_email, null as details
from public.versioned_documents d
union all
select l.document_id, null, null, l.timestamp, l.action, l.user_email, l.details
from public.versioned_documents_log l
union all
select c.document_id, null, null, c.created_at, 'comentário', c.user_email, jsonb_build_object('comment', c.comment)
from public.versioned_documents_comments c
order by document_id, event_time;