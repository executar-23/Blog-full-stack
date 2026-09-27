'use client';

/** Last-resort boundary: renders without providers, so it uses no styling. */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  console.error(JSON.stringify({ level: 'error', message: 'global error', digest: error.digest }));
  return (
    <html lang="pt-BR">
      <body>
        <main>
          <h1>Ocorreu um erro</h1>
        </main>
      </body>
    </html>
  );
}
