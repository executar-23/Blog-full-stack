import { ScaffoldPage } from '../../../components/ScaffoldPage';
import { pageMetadata } from '../../../seo';

export const metadata = pageMetadata('/blog/artigos', 'Artigos');

export default function Page() {
  return <ScaffoldPage title="Artigos" />;
}
