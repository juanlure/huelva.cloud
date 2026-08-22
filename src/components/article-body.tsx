import { Fragment } from "react";

function inlineFormat(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function ArticleBody({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n{2,}/);

  return (
    <div className="space-y-5 text-lg leading-relaxed text-ink">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines[0]?.startsWith("## ")) {
          return (
            <h2 key={i} className="pt-4 font-display text-3xl tracking-tight">
              {lines[0].slice(3)}
            </h2>
          );
        }
        if (lines[0]?.startsWith("### ")) {
          return (
            <h3 key={i} className="font-display text-xl tracking-tight">
              {lines[0].slice(4)}
            </h3>
          );
        }
        if (lines.every((line) => line.trim().startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-1 pl-5 text-ink">
              {lines.map((line, j) => (
                <li key={j}>{inlineFormat(line.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }
        if (lines[0]?.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="font-display text-edition italic leading-tight tracking-tight text-tinto"
            >
              {inlineFormat(lines.map((l) => l.replace(/^>\s?/, "")).join(" "))}
            </blockquote>
          );
        }
        return <p key={i}>{inlineFormat(block.replace(/\n/g, " "))}</p>;
      })}
    </div>
  );
}
