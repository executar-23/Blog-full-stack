/**
 * Site identity. Name comes from the approved brand kit
 * (docs/sources/brand-kit/site.webmanifest).
 */
export const site = {
  name: 'risco-cognitivo',
  locale: 'pt-BR',
  ogImage: '/social/og-image-1200x630.png',
  logo: '/brand/risco-cognitivo-logo-400w.png',
} as const;

/** Public routes of AIKB-0003 `apps/web/*` (docs/url-governance/routes.md). */
export const routes = [
  { path: '/blog', title: 'Blog' },
  { path: '/blog/artigos', title: 'Artigos' },
  { path: '/blog/topicos', title: 'Tópicos' },
  { path: '/blog/autores', title: 'Autores' },
  { path: '/criadores', title: 'Criadores' },
  { path: '/recursos', title: 'Recursos' },
  { path: '/recursos/calculadoras', title: 'Calculadoras' },
  { path: '/recursos/templates', title: 'Templates' },
  { path: '/recursos/benchmarks', title: 'Benchmarks' },
  { path: '/newsletter', title: 'Newsletter' },
  { path: '/planos', title: 'Planos' },
  { path: '/sobre', title: 'Sobre' },
  { path: '/entrar', title: 'Entrar' },
  { path: '/cadastro', title: 'Cadastro' },
  { path: '/legal', title: 'Legal' },
  { path: '/legal/privacidade', title: 'Privacidade' },
  { path: '/legal/cookies', title: 'Cookies' },
  { path: '/legal/termos', title: 'Termos' },
] as const;

export type RoutePath = (typeof routes)[number]['path'];
