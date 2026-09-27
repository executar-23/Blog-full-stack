import { ScaffoldPage } from '../components/ScaffoldPage';
import { getEditorialAccess } from '../server/access';

export const dynamic = 'force-dynamic';

export default async function StudioHome() {
  const access = await getEditorialAccess('author');
  switch (access.state) {
    case 'unconfigured':
      return <ScaffoldPage title="Studio indisponível" />;
    case 'anonymous':
    case 'forbidden':
      return <ScaffoldPage title="Acesso restrito" />;
    case 'granted':
      return <ScaffoldPage title="Studio" />;
  }
}
