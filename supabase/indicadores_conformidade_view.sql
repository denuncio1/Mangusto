-- View para Power BI: Indicadores de Conformidade
CREATE OR REPLACE VIEW indicadores_conformidade AS
SELECT
  d.id,
  d.nr,
  d.indicador,
  d.valor,
  d.updated_at
FROM
  indicadores d
ORDER BY d.updated_at DESC;
