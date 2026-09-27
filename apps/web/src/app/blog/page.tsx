import { ScaffoldPage } from '../../components/ScaffoldPage';
import { pageMetadata } from '../../seo';

export const metadata = pageMetadata('/blog', 'Blog');

export default function Page() {
  return <ScaffoldPage title="Blog" />;
}
