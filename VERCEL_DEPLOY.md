# Deploy Vite + React no Vercel

1. **Build Command**: 
   - `pnpm build` (ou `npm run build`)

2. **Output Directory**:
   - `dist`

3. **vercel.json** (já está correto):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

4. **Estrutura esperada após build:**
   - dist/index.html
   - dist/assets/

5. **Passos no painel do Vercel:**
   - Settings > Build & Output
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Salve e redeploy

6. **Se der 404:**
   - Confirme que o build está gerando a pasta dist.
   - Veja o log de build do Vercel para erros.
   - O projeto deve estar na raiz do repositório.

7. **Dica:**
   - Não use public/ como output, use sempre dist/.

Se seguir esses passos, o deploy funcionará para SPA React/Vite.
