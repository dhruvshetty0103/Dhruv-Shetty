import { HOME } from '@/constants/CMSEntryIds';
import { fetchDataByCMSEntryID } from '@/lib/contentful';
import Image from 'next/image';

const parseMarkdown = (markdown:string) => {
  const parts = markdown.split(/(!\[.*?\]\(.*?\))/); // Split by Markdown image syntax
  return parts.map((part) => {
    const imageRegex = /!\[(.*?)\]\((.*?)\)/;
    const match = RegExp(imageRegex).exec(part);
    if (match) {
      let imageUrl = match[2];
      // Ensure the URL is absolute
      if (imageUrl.startsWith('//')) {
        imageUrl = `https:${imageUrl}`;
      }
      return {
        type: 'image',
        alt: match[1],
        url: imageUrl,
      };
    }
    return { type: 'text', content: part.trim() }; // Non-image content
  });
};

export default async function Home() {
  const homePageData = await fetchDataByCMSEntryID(HOME);

  const parsedContent = parseMarkdown(homePageData.description as string);
  
  
  return (
    <main className="h-screen">
      {parsedContent.map((item) => {
        if (item.type === 'image' && item.url) {
          return (
            <Image
              key={`index-${item.url}`}
              src={item.url}
              width={180}
              height={180}
              alt={item.alt ?? 'Image'}
            />
          );
        }
        if (item.type === 'text' && item.content) {
          return <h1 key={`index-${item.content}`}>{item.content}</h1>;
        }
        return null;
      })}
    </main>
  );
}
