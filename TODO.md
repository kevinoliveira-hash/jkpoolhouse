# ✅ JK Pool House - Plano de Polimento Profissional (Produção)

## ✅ Limpeza de Código Não Utilizado / Duplicidades

- [x] Removido `js/calendar.js` (nunca usado - sem container `#calendar`)
- [x] Removido `js/modal.js` (sem modais no HTML)
- [x] Removido `js/blog.js` (seção de blog nunca integrada)
- [x] Removido `js/notifications.js` (push notifications sem backend/VAPID)
- [x] Removido `js/analytics.js` (desativado - GA_CONFIG.enabled=false)
- [x] Removido `js/performance.js` (duplicava CSS crítico, WebP placeholder)
- [x] Removido `js/social-share.js` (botão flutuante sobreposto + conflito `showToast`)
- [x] Removida referência aos arquivos removidos no `service-worker.js`
- [x] Removido handler de push/notification do `service-worker.js`
- [x] Removido CSS de `BOOKING MODAL` (`.modal-*`) de `style.css`
- [x] Removida regra global `[class*="scroll"]{display:none}` de `responsive.css`
- [x] Corrigido z-index do scroll progress (inline 1000 → CSS class `.scroll-progress` z-index 50)
- [x] Removida função morta `enhanceCounters` (duplicada de `initCounters`)
- [x] Atualizado `robots.txt` (removido Disallow de analytics/performance)

## Status: 🔄 EM ANDAMENTO

### 🎯 Objetivo
Preparar o projeto para produção mantendo o conceito atual, corrigindo bugs, melhorando SEO, performance, acessibilidade, responsividade e usabilidade em qualquer dispositivo.

### 📋 Etapas do Plano

- [ ] 1. index.html: codificar URLs com espaços (%20) em og:image, twitter:image, Schema.org e preload
- [ ] 2. index.html: adicionar og:image:alt e width/height em imagens acima da dobra (reduzir CLS)
- [ ] 3. index.html: adicionar decoding="async" na imagem hero
- [ ] 4. index.html: adicionar aria-controls no hamburger
- [ ] 5. index.html: remover console.log do registro do Service Worker
- [ ] 6. index.html: adicionar Schema.org FAQPage (JSON-LD)
- [ ] 7. index.html: referenciar novo favicon SVG real da marca
- [ ] 8. assets/icons/favicon.svg: criar favicon real da marca
- [ ] 9. js/notifications.js: remover console.log
- [ ] 10. js/notifications.js: renomear showToast -> showNotificationToast (eliminar conflito)
- [ ] 11. js/social-share.js: corrigir bug de codificação do link WhatsApp
- [ ] 12. js/whatsapp.js: substituir alert() por feedback amigável inline
- [ ] 13. js/whatsapp.js: sanitizar valores do formulário (proteção XSS)
- [ ] 14. css/style.css: prevenir cortes de imagens (object-position/aspect-ratio/contain)
- [ ] 15. css/style.css: evitar CLS em vídeos e mapa (min-height/background)
- [ ] 16. css/responsive.css: ajustar imagens em todas as resoluções (320px-1920px)
- [ ] 17. manifest.json: corrigir ícones/sizes
- [ ] 18. TODO.md: documentar melhorias realizadas
- [x] 19. Hero: corrigir sobreposição de texto nos botões (mantê-los lado a lado, sem esconder "Ver Galeria" no mobile)

### 📊 Resumo das Alterações

| Arquivo | Principais Mudanças |
|---------|-------------------|
| `index.html` | SEO, favicon, acessibilidade, CLS, JSON-LD |
| `assets/icons/favicon.svg` | Favicon real da marca |
| `js/notifications.js` | Limpeza console.log, fix conflito showToast |
| `js/social-share.js` | Fix codificação WhatsApp |
| `js/whatsapp.js` | Feedback amigável, sanitização XSS |
| `css/style.css` | Prevenção de cortes de imagem, CLS |
| `css/responsive.css` | Imagens responsivas |
| `manifest.json` | Ícones corrigidos |
