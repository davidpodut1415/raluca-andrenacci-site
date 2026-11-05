import type { PostBlock } from '../../content/blog';
import { BlogImg } from '../ui/BlogImg';

/** Renders imported post blocks. Inline HTML is limited to strong/em/a/br by the import script. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col gap-6 text-ink-700 [&_a]:text-burgundy-700 [&_a]:underline [&_a]:underline-offset-4">
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
                className={`${block.type === 'list' ? 'list-disc' : 'list-decimal'} space-y-2 pl-6 marker:text-burgundy-700`}
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
                className="border-l-4 border-burgundy-700 pl-6 font-serif text-h4 leading-snug font-semibold text-ink-900"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          case 'image':
            return (
              <div key={i} className="overflow-hidden rounded-2xl">
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
