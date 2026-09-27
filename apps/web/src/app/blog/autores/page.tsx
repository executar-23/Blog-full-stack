import { ScaffoldPage } from '../../../components/ScaffoldPage';
import { pageMetadata } from '../../../seo';

export const metadata = pageMetadata('/blog/autores', 'Autores');

export default function Page() {
  return <ScaffoldPage title="Autores" />;
}
