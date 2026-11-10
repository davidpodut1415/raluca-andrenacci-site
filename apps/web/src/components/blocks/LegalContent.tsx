interface Heading {
  type: 'heading';
  level: number;
  text: string;
}
interface Paragraph {
  type: 'paragraph';
  text: string;
}
interface List {
  type: 'list';
  items: string[];
}
export type LegalBlock = Heading | Paragraph | List;

/** Renders the structured legal text (imported from the previous site, to be reviewed by a lawyer). */
export function LegalContent({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="max-w-3xl [&>*+*]:mt-5 [&>h2]:mt-12 [&>h3]:mt-8">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return block.level <= 2 ? (
            <h2 key={i} className="text-h3">
              {block.text}
            </h2>
          ) : (
            <h3 key={i} className="text-h4">
              {block.text}
            </h3>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={i} className="list-disc space-y-2 pl-6 marker:text-black">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{block.text}</p>;
      })}
    </div>
  );
}
