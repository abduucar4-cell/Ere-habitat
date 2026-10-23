/** Injecte un ou plusieurs blocs JSON-LD (échappement du "<" pour éviter toute injection). */
export function JsonLd({ data }: { data: object | Array<object | null> | null }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean) as object[];
  return (
    <>
      {items.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
