import { ScaffoldPage } from '../../components/ScaffoldPage';
import { pageMetadata } from '../../seo';

export const metadata = pageMetadata('/newsletter', 'Newsletter');

export default function Page() {
  return <ScaffoldPage title="Newsletter" />;
}
