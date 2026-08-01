# ✅ JK Pool House - Plano de Melhorias (Nova Rodada)

## Status: ✅ CONCLUÍDO

### 🔧 Etapas do Plano

- [x] 0. Analisar código (HTML, CSS, JS)
- [x] 1. index.html: carregar fontes e CSS via `<link>` (remover `@import` bloqueante)
- [x] 2. css/style.css: remover `@import` de Google Fonts e CSS locais
- [x] 3. css/style.css: adicionar estilos do cursor customizado (`.custom-cursor`)
- [x] 4. css/style.css: adicionar `.nav-cta.mobile-show` (botão Reservar no menu mobile)
- [x] 5. css/style.css: tipografia fluida com `clamp()`
- [x] 6. css/style.css: `scroll-margin-top` para âncoras não ficarem ocultas
- [x] 7. css/style.css: fallback de `backdrop-filter` (navegadores antigos)
- [x] 8. css/style.css: `content-visibility` para performance
- [x] 9. css/responsive.css: breakpoint intermediário (992px - 1120px)
- [x] 10. js/main.js: criar função `toggleVideo` (corrigir vídeos quebrados)
- [x] 11. js/main.js: atualizar `aria-expanded` no FAQ (acessibilidade)
- [x] 12. js/main.js: ativar classe `cursor-enabled`
- [x] 13. Atualizar relatório final

### 📊 Resumo das Alterações

| Arquivo | Principais Mudanças |
|---------|-------------------|
| `index.html` | Fontes e CSS via `<link>` para carregamento otimizado |
| `css/style.css` | Cursor customizado, mobile-show, clamp(), scroll-margin, fallbacks, performance |
| `css/responsive.css` | Breakpoint intermediário 992-1120px |
| `js/main.js` | `toggleVideo()` (play/pause com pausa dos demais), `aria-expanded` sincronizado no FAQ, ativação da classe `cursor-enabled` no body |
| `TODO.md` | Relatório final de conclusão |

### 🎯 Detalhes das Implementações em `js/main.js`

1. **`toggleVideo(card)`** — Função global chamada via `onclick` no `index.html`. Reproduz/pausa o vídeo do card clicado, pausa automaticamente todos os outros vídeos da seção e alterna a classe `.playing` (estilizada no CSS para ocultar o botão ▶). Inclui `catch()` silencioso para bloqueio de autoplay.
2. **`initFaq()`** — Agora sincroniza o atributo `aria-expanded="true/false"` nos botões do FAQ ao abrir/fechar, melhorando a acessibilidade para leitores de tela.
3. **`initCustomCursor()`** — Adiciona `document.body.classList.add('cursor-enabled')` após a verificação de touch, ativando a visibilidade do cursor customizado definida em `css/style.css` (`body.cursor-enabled`).


