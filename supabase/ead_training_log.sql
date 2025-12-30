-- Logs de acesso e conclusão de capacitação EAD
CREATE TABLE IF NOT EXISTS ead_training_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  training_id uuid REFERENCES ead_training(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  data_acesso timestamp with time zone DEFAULT timezone('utc', now()),
  acao text, -- acesso, conclusão, download material, etc
  detalhes text
);
