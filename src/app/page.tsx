import { HOME } from "@/constants/CMSEntryIds";
import { fetchContent } from "@/lib/contentful";
import Image from "next/image";

const parseMarkdown = (markdown: string) => {
  const parts = markdown.split(/(!\[.*?\]\(.*?\))/); // Split by Markdown image syntax
  return parts.map((part) => {
    const imageRegex = /!\[(.*?)\]\((.*?)\)/;
    const match = RegExp(imageRegex).exec(part);
    if (match) {
      let imageUrl = match[2];
      // Ensure the URL is absolute
      if (imageUrl.startsWith("//")) {
        imageUrl = `https:${imageUrl}`;
      }
      return {
        type: "image",
        alt: match[1],
        url: imageUrl,
      };
    }
    return { type: "text", content: part.trim() }; // Non-image content
  });
};

export default async function Home() {
  const homePageData = await fetchContent(HOME);

  console.log(homePageData);

  const parsedContent = parseMarkdown(homePageData.description as string);

  return (
    <main
      className="h-screen inline-flex"
      style={{
        position: "absolute",
        top: 200,
        left: 200,
      }}
    >
      {parsedContent.map((item, index) => {
        if (item.type === "image" && item.url) {
          console.log(index);

          const transformStyle = `translate3d(0px, ${index * -20}px,0px)`;
          return (
            <div
              key={`index-${item.url}`}
              className="hero-thumb-card relative flex gap-4"
            >
              <div className="hero-thumb-card-inner" style={{}}>
                <Image
                  key={`index-${item.url}`}
                  src={item.url}
                  width={180}
                  height={180}
                  style={{
                    transform: transformStyle,
                    transition: "transform 0.3s ease-out",
                  }}
                  alt={item.alt ?? "Image"}
                  className="hero-thumb"
                  priority
                />
              </div>
            </div>
          );
        } else if (item.type === "text" && item.content) {
          return <h1 key={`index-${item.content}`} className="w-max">{item.content}</h1>;
        }
        return null;
      })}
    </main>
  );
}
