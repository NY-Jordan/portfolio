import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { codeToHtml } from "shiki";

import { CodeBlock } from "@/components/content/code-block";
import type { TiptapDoc, TiptapMark, TiptapNode } from "@/types";

function applyMarks(text: string, marks: TiptapMark[] = []): ReactNode {
  return marks.reduce<ReactNode>((acc, mark) => {
    switch (mark.type) {
      case "bold":
        return <strong>{acc}</strong>;
      case "italic":
        return <em>{acc}</em>;
      case "code":
        return <code>{acc}</code>;
      case "link": {
        const href = String(mark.attrs?.href ?? "");
        if (href.startsWith("http")) {
          return (
            <a href={href} target="_blank" rel="noreferrer noopener">
              {acc}
            </a>
          );
        }
        return <Link href={href}>{acc}</Link>;
      }
      default:
        return acc;
    }
  }, text);
}

function extractCode(node: TiptapNode): string {
  return (node.content ?? []).map((child) => child.text ?? "").join("");
}

async function renderNode(node: TiptapNode, key: React.Key): Promise<ReactNode> {
  switch (node.type) {
    case "text":
      return <Fragment key={key}>{applyMarks(node.text ?? "", node.marks)}</Fragment>;
    case "hardBreak":
      return <br key={key} />;
    case "paragraph":
      return <p key={key}>{await renderNodes(node.content)}</p>;
    case "heading": {
      const level = Number(node.attrs?.level ?? 2);
      const id = node.attrs?.id as string | undefined;
      const children = await renderNodes(node.content);
      return level === 3 ? (
        <h3 key={key} id={id}>
          {children}
        </h3>
      ) : (
        <h2 key={key} id={id}>
          {children}
        </h2>
      );
    }
    case "bulletList":
      return <ul key={key}>{await renderNodes(node.content)}</ul>;
    case "orderedList":
      return <ol key={key}>{await renderNodes(node.content)}</ol>;
    case "listItem":
      return <li key={key}>{await renderNodes(node.content)}</li>;
    case "blockquote":
      return <blockquote key={key}>{await renderNodes(node.content)}</blockquote>;
    case "codeBlock": {
      const code = extractCode(node);
      const language = (node.attrs?.language as string | undefined) || "text";
      const html = await codeToHtml(code, { lang: language, theme: "github-dark-default" });
      return <CodeBlock key={key} html={html} rawCode={code} />;
    }
    case "image": {
      const src = String(node.attrs?.src ?? "");
      const alt = String(node.attrs?.alt ?? "");
      return (
        <span
          key={key}
          className="relative my-6 block aspect-video overflow-hidden rounded-lg border border-border"
        >
          <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
        </span>
      );
    }
    default:
      return node.content ? (
        <Fragment key={key}>{await renderNodes(node.content)}</Fragment>
      ) : null;
  }
}

async function renderNodes(nodes: TiptapNode[] = []): Promise<ReactNode[]> {
  return Promise.all(nodes.map((node, index) => renderNode(node, index)));
}

export async function RenderDoc({ doc }: { doc: TiptapDoc }) {
  const children = await renderNodes(doc.content);
  return <>{children}</>;
}
