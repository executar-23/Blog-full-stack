import { ScaffoldPage } from '../../components/ScaffoldPage';
import { pageMetadata } from '../../seo';

export const metadata = pageMetadata('/sobre', 'Sobre');

export default function Page() {
  return <ScaffoldPage title="Sobre" />;
}
