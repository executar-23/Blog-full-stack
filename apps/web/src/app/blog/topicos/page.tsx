import { ScaffoldPage } from '../../../components/ScaffoldPage';
import { pageMetadata } from '../../../seo';

export const metadata = pageMetadata('/blog/topicos', 'Tópicos');

export default function Page() {
  return <ScaffoldPage title="Tópicos" />;
}
