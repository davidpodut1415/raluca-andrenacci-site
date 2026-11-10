import type { PostBlock } from '../../content/blog';
import { BlogImg } from '../ui/BlogImg';

/** Renders imported post blocks. Inline HTML is limited to strong/em/a/br by the import script. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col gap-5 [&_a]:text-black [&_a]:underline [&_a]:underline-offset-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={i} dangerouslySetInnerHTML={{ __html: block.html }} />;
          case 'heading':
            return block.level === 2 ? (
              <h2
                key={i}
                className="mt-6 text-h3"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            ) : (
              <h3
                key={i}
                className="mt-4 text-h4"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          case 'list':
          case 'ordered': {
            const Tag = block.type === 'list' ? 'ul' : 'ol';
            return (
              <Tag
                key={i}
                className={`${block.type === 'list' ? 'list-disc' : 'list-decimal'} space-y-2 pl-6 marker:text-black`}
              >
                {block.items.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </Tag>
            );
          }
          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-black pl-4 text-h4 leading-snug font-extrabold"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          case 'image':
            return (
              <div key={i} className="overflow-hidden">
                <BlogImg
                  image={block.id}
                  alt={block.alt}
                  sizes="(min-width: 1024px) 48rem, 100vw"
                  className="w-full"
                />
              </div>
            );
        }
      })}
    </div>
  );
}
