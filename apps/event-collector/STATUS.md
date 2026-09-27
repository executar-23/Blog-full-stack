# STATUS — apps/event-collector/

| Campo          | Valor                                                                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Item AIKB-0003 | `apps/event-collector/`                                                                                                                                                 |
| Caminho real   | `apps/event-collector/`                                                                                                                                                 |
| Status         | SCAFFOLDED                                                                                                                                                              |
| GAPs           | G7, G8                                                                                                                                                                  |
| Evidência      | Worker `POST /v1/events` validando `@blog/analytics-schema` (202), CORS por allowlist, limite 64 KB; 4 testes; `wrangler deploy --dry-run`. Sem destino de eventos (G7) |
| Atualizado     | 2026-09-27                                                                                                                                                              |
