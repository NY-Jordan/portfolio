"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ html, rawCode }: { html: string; rawCode: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-sm border border-border bg-background/80 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <div
        className="overflow-x-auto rounded-lg border border-border bg-card py-4 text-sm [&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:px-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
