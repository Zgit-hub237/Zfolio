import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Rendu Markdown des articles. Le HTML brut n'est pas interprété (pas de rehype-raw) :
 * un contenu d'article ne peut donc pas injecter de script dans la page.
 */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose dark:prose-invert prose-headings:font-display prose-a:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#0d0f0e] prose-img:rounded-xl max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: c }) => {
            const external = href?.startsWith("http");
            return (
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}>
                {c}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
