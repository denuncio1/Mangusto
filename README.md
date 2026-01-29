# SST Management System

Sistema completo para gestão de SST (Segurança e Saúde do Trabalho) com integração NR-01, eSocial, Supabase (PostgreSQL) e frontend React.

## Funcionalidades

- Cadastro e gestão de GHE (Grupos Homogêneos de Exposição)
- Cadastro e gestão de Funcionários
- Relacionamento Funcionário x GHE
- Flags de NRs aplicáveis por funcionário
- Treinamentos e exames obrigatórios por GHE
- Alerta automático ao alterar GHE do funcionário
- CRUD completo via frontend React + Supabase
- Scripts SQL para estrutura e dados de exemplo

## Estrutura do Projeto

```
src/                # Frontend React/TypeScript
supabase/           # Scripts SQL (criação e popularização de tabelas)
package.json        # Dependências do projeto
README.md           # Este arquivo
```

## Instalação

1. Clone o repositório:
	```
	git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
	cd SEU_REPOSITORIO
	```

2. Instale as dependências:
	```
	pnpm install
	```

3. Configure o Supabase:
	- Crie um projeto no [Supabase](https://supabase.com/)
	- Copie as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para `.env.local`

4. Execute os scripts SQL:
	- Primeiro: `supabase/criar_tabelas.sql`
	- Depois: `supabase/alterar_ghe_para_campos_completos.sql` (se necessário)
	- Por fim: `supabase/popular_dados.sql`

5. Inicie o frontend:
	```
	pnpm dev
	```

## Uso

- Acesse o sistema via navegador.
- Cadastre GHEs, funcionários, relacione NRs e visualize treinamentos/exames obrigatórios.
- Altere o GHE do funcionário para ver alertas de novos treinamentos/exames.

## Tecnologias

- React + TypeScript + Vite
- Supabase (PostgreSQL)
- Tailwind CSS
- SQL

## Licença

MIT
