-- View para Power BI: Auditorias Realizadas
CREATE OR REPLACE VIEW auditorias_view AS
SELECT
  a.id,
  a.nr,
  a.responsavel,
  a.data,
  a.status,
  a.resultado,
  a.updated_at
FROM
  auditorias a
ORDER BY a.data DESC;
