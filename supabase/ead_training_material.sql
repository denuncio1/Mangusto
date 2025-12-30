-- Material didático vinculado à capacitação EAD
CREATE TABLE IF NOT EXISTS ead_training_material (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  training_id uuid REFERENCES ead_training(id) ON DELETE CASCADE,
  nome text NOT NULL,
  url text NOT NULL,
  uploaded_at timestamp with time zone DEFAULT timezone('utc', now())
);
