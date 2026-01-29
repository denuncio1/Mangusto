const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// URL e chave fornecidas pelo usuário
const SUPABASE_URL = 'https://zwobxyeostwhahypsrwe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_P0x1wMcW7xiG1UycQjpEbQ_tUA2HkCi';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const csvPath = path.join(__dirname, '../src/data/cid10_tabela17.csv');

function parseCSV(data) {
  const lines = data.split('\n').filter(Boolean);
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(';');
    if (cols.length >= 2) {
      const codigo = cols[0].trim();
      result.push({
        codigo,
        descricao: cols[1].trim(),
        capitulo: codigo[0],
        grupo: codigo.slice(0,3),
        categoria: codigo.slice(0,3),
        cod_cat: codigo.slice(0,3),
        cod_grupo: codigo.slice(0,3)
      });
    }
  }
  return result;
}

async function importCIDs() {
  const csvData = fs.readFileSync(csvPath, 'utf8');
  const cids = parseCSV(csvData);
  for (const cid of cids) {
    try {
      await supabase.from('cids').upsert(cid, { onConflict: ['codigo'] });
      console.log(`Importado: ${cid.codigo} - ${cid.descricao}`);
    } catch (err) {
      console.error(`Erro ao importar ${cid.codigo}:`, err.message);
    }
  }
  console.log('Importação concluída!');
}

importCIDs();
