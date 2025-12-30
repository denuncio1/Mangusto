-- Perfil da Empresa para micro e pequenas empresas (NR-01)
CREATE TABLE IF NOT EXISTS company_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  razao_social text NOT NULL,
  cnpj text NOT NULL,
  endereco text NOT NULL,
  ramo text NOT NULL,
  outros text,
  created_at timestamp with time zone DEFAULT timezone('utc', now()),
  updated_at timestamp with time zone DEFAULT timezone('utc', now())
);
