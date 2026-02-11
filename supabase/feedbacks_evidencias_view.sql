-- View para Power BI: Feedbacks e Evidências
CREATE OR REPLACE VIEW feedbacks_evidencias_view AS
SELECT
  f.id,
  f.nome,
  f.email,
  f.feedback,
  f.evidencia_url,
  f.created_at
FROM
  feedbacks_evidencias f
ORDER BY f.created_at DESC;
