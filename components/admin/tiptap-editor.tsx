"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import {
  Bold,
  Italic,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  SquareCode,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { TiptapDoc } from "@/types";

const lowlight = createLowlight(common);

function ToolbarButton({
  active,
  onClick,
  children,
  label,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground",
        active && "bg-card text-accent"
      )}
    >
      {children}
    </button>
  );
}

export function TiptapEditor({
  content,
  onChange,
}: {
  content: TiptapDoc;
  onChange: (doc: TiptapDoc) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false, link: { openOnClick: false } }),
      TiptapImage,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON() as TiptapDoc);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none px-4 py-3 outline-none min-h-[300px]",
      },
    },
  });

  if (!editor) return null;

  function addLink() {
    const url = window.prompt("URL");
    if (!url) return;
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function addImage() {
    const url = window.prompt("Image URL");
    if (!url) return;
    editor?.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div className="rounded-sm border border-border">
      <div className="flex flex-wrap gap-1 border-b border-border p-2">
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Inline code"
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Ordered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Code block"
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <SquareCode className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Link" active={editor.isActive("link")} onClick={addLink}>
          <LinkIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Image" onClick={addImage}>
          <ImageIcon className="size-4" />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
