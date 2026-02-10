@echo off
REM Inicia o mock server para Auditoria Interna
npx json-server --watch db-auditoria.json --port 3001
