-- GHE
INSERT INTO ghe (nome, setor, localizacao, descricao_atividades, data_proxima_revisao_pgr) VALUES
  ('Soldagem', 'Produção', 'Galpão 2', 'Soldagem de peças metálicas', '2027-01-10'),
  ('Pintura', 'Manutenção', 'Galpão 1', 'Pintura industrial de estruturas', '2027-02-15');

-- Funcionários
INSERT INTO funcionario (cpf, matricula_esocial, data_admissao, cargo, funcao, cbo, id_ghe, data_ultimo_aso, vencimento_aso) VALUES
  ('12345678901', 'A123', '2024-01-10', 'Soldador', 'Soldagem de estruturas metálicas', '7223-10', 1, '2025-01-10', '2026-01-10'),
  ('98765432100', 'B456', '2023-05-20', 'Pintor', 'Pintura industrial', '7122-10', 2, '2025-05-20', '2026-05-20');

-- Riscos
INSERT INTO risco (agente, tipo_agente, probabilidade, severidade, medidas_controle, epi, epc, numero_ca, validade_ca, id_ghe) VALUES
  ('Ruído', 'Físico', 4, 3, 'EPC: Cabine acústica', 'Protetor auricular', 'Cabine acústica', '12345', '2026-12-31', 1),
  ('Tintas', 'Químico', 3, 4, 'EPC: Exaustor', 'Máscara respiratória', 'Exaustor industrial', '54321', '2026-11-30', 2);

-- CATs
INSERT INTO cat (id_funcionario, data_acidente, cid_10, crm_medico, uf_medico, descricao) VALUES
  (1, '2025-03-10', 'S82.1', '123456', 'SP', 'Fratura da diáfise da tíbia durante operação de solda'),
  (2, '2025-06-15', 'T20.0', '654321', 'RJ', 'Queimadura da cabeça e pescoço durante pintura industrial');
