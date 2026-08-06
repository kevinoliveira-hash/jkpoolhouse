# ✅ JK Pool House - Plano de Polimento Profissional (Produção)

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
