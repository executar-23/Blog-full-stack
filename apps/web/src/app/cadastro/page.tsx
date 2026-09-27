import { ScaffoldPage } from '../../components/ScaffoldPage';
import { pageMetadata } from '../../seo';

export const metadata = pageMetadata('/cadastro', 'Cadastro');

export default function Page() {
  return <ScaffoldPage title="Cadastro" />;
}
