# risco-cognitivo — Brand Kit

Pacote preparado a partir do logo aprovado, sem redesenhar o wordmark.

## Estrutura

- `assets/logo/`: arquivo original, recorte justo e versões otimizadas para web.
- `assets/icon/brandmark-r-glyph-transparent.png`: glifo `r` extraído do próprio logo.
- `favicon.ico` + PNGs 16/32/48/96: favicons.
- `apple-touch-icon.png`: ícone iOS 180×180.
- `android-chrome-192x192.png` e `android-chrome-512x512.png`: ícones PWA/Android.
- `maskable-icon-512x512.png`: versão com área segura ampliada.
- `social/`: Open Graph e Twitter/X 1200×630.
- `site.webmanifest`, `browserconfig.xml`, `head-snippet.html`: integração web.
- `brand-tokens.css` e `brand/palette.*`: cores derivadas do raster aprovado.

## Fidelidade

O wordmark e suas proporções vêm diretamente do raster aprovado. O favicon é uma
derivação funcional: usa o glifo `r` extraído do próprio logo e as cores amostradas
do arquivo original. Isso evita retipografia e mantém a identidade em tamanhos pequenos.

## Uso rápido

Copie o conteúdo da pasta para a raiz pública do site e cole o conteúdo de
`head-snippet.html` dentro de `<head>`. Ajuste apenas os caminhos se sua estrutura
pública for diferente.
