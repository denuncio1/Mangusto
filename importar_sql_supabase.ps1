# Script PowerShell para importar todos os arquivos .sql para o Supabase
# Certifique-se de já ter rodado: supabase login e supabase link --project-ref azdtuqbrxruomxmueguz

$ErrorActionPreference = 'Stop'

# Caminho base do projeto
$basePath = "$PSScriptRoot"

# Busca todos os arquivos .sql no diretório e subdiretórios
$sqlFiles = Get-ChildItem -Path $basePath -Recurse -Filter *.sql

foreach ($file in $sqlFiles) {
    Write-Host "Importando: $($file.FullName)"
    supabase db execute $file.FullName
}

Write-Host "Importação concluída!"
