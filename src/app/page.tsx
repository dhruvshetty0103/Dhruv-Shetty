import { NAME } from '@/constants/CMSEntryIds';
import { fetchDataByCMSEntryID } from '@/lib/contentful';

export default async function Home() {
  const data = await fetchDataByCMSEntryID(NAME)
  
  return (
    <main className="h-screen">
      <p>{data.name as string}</p>
    </main>
  );
}
