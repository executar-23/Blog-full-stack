# policies/accessibility/

**Responsabilidade:** Política de acessibilidade: WCAG 2.2 AA e notas de acessibilidade do ZIP de Design System.

- Item AIKB-0003: `policies/accessibility/`
- Autoridade: ADR-005 (arquitetura alvo), ADR-006 (materialização integral)
- GAPs: — (ver `docs/GAPS.md`)

## Regras em vigor

1. Alvo: **WCAG 2.2 nível AA**.
2. Notas de acessibilidade do ZIP de Design System (`docs/sources/design-system-zip/handoff-spec-onboarding-patterns.md`, seções "Accessibility Notes") são requisitos dos componentes correspondentes.
3. Verificação automatizada:
   - componentes: `jest-axe` (`toHaveNoViolations`) em cada teste de componente;
   - Storybook: `@axe-core/playwright` em todas as stories (violações `serious`/`critical` falham);
   - apps: `@axe-core/playwright` nas rotas públicas.
4. Movimento: durações respeitam `prefers-reduced-motion` (tokens `--blog-motion-*`, decisão IC2).
