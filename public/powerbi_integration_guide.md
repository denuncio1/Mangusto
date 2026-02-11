# Guia de Integração Power BI – Mangusto

## 1. Exportação de Dados
- Os dados do sistema podem ser exportados em formato CSV/Excel diretamente dos dashboards e relatórios principais.
- Para exportação automatizada, utilize a API REST do Supabase ou endpoints customizados (exemplo: `/api/export/indicadores`, `/api/export/auditorias`).

## 2. Conexão Power BI com Supabase
- No Power BI Desktop, selecione "Obter Dados" > "PostgreSQL".
- Insira as credenciais do banco Supabase (host, porta, usuário, senha, database).
- Para maior segurança, crie um usuário de leitura apenas para BI.
- É possível criar visões (views) específicas no Supabase para facilitar a análise e garantir compliance.

## 3. Atualização Automática
- Configure o agendamento de atualização no Power BI Service para manter os dashboards sempre atualizados.
- Recomenda-se atualizar a cada 1h ou conforme a criticidade dos dados.

## 4. Exemplos de Queries Úteis
```sql
-- Indicadores de conformidade
SELECT * FROM indicadores_conformidade;

-- Auditorias realizadas
SELECT * FROM auditorias;

-- Feedbacks e evidências
SELECT * FROM feedbacks_evidencias;
```

## 5. Segurança e LGPD
- Garanta que apenas dados necessários sejam exportados.
- Oculte ou anonimize informações sensíveis conforme a LGPD.

## 6. Suporte
- Para endpoints customizados ou dúvidas, consulte a equipe técnica Mangusto.

---

**Com este guia, você pode criar dashboards avançados e relatórios dinâmicos no Power BI, conectando-se diretamente ao banco ou exportando dados do sistema.**