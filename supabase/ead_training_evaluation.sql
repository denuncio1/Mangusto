-- Avaliação de aprendizagem da capacitação EAD
CREATE TABLE IF NOT EXISTS ead_training_evaluation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  training_id uuid REFERENCES ead_training(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  resultado text NOT NULL, -- Satisfatório/Insatisfatório
  tipo text, -- Presencial/Digital
  comprovante_url text, -- Assinatura digital ou upload de assinatura presencial
  situacoes_praticas text, -- Descrição das situações práticas avaliadas
  data_avaliacao timestamp with time zone DEFAULT timezone('utc', now())
);
