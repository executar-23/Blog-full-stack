import { ScaffoldPage } from '../../components/ScaffoldPage';
import { pageMetadata } from '../../seo';

export const metadata = pageMetadata('/legal', 'Legal');

export default function Page() {
  return <ScaffoldPage title="Legal" />;
}
