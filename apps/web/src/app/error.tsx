'use client';

import { useEffect } from 'react';
import { ScaffoldPage } from '../components/ScaffoldPage';

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(
      JSON.stringify({ level: 'error', message: 'render error', digest: error.digest }),
    );
  }, [error]);
  return <ScaffoldPage title="Ocorreu um erro" />;
}
