/**
 * Renders a JSON-LD <script> tag. Input is always our own server-built
 * schema objects (never raw user input), but `<` is still escaped so a
 * stray "</script>" inside a string value (e.g. an article title) can't
 * break out of the tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
