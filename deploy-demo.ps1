Write-Host "🔨 Construyendo versión DEMO..."
npm run build:demo

Write-Host "🚀 Desplegando versión DEMO a Cloudflare Pages..."
# NOTA: Reemplaza 'play-and-lyrics-demo' con el nombre exacto de tu proyecto en Cloudflare si es diferente.
npx wrangler pages deploy dist-demo --project-name play-and-lyrics-demo
