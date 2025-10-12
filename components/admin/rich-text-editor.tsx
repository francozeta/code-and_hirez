"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  Link2,
  Undo,
  Redo,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { LinkDialog } from "./link-dialog"

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({
  content,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        bulletList: {
          HTMLAttributes: { class: "list-disc list-outside ml-4" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal list-outside ml-4" },
        },
        listItem: {
          HTMLAttributes: { class: "ml-2" },
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-primary underline underline-offset-2 cursor-pointer",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Escribe aquí...",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[200px] px-4 py-3 text-sm leading-relaxed",
      },
      handleClick(view, pos, event) {
        const attrs = view.state.doc
          .resolve(pos)
          .marks()
          .find((mark) => mark.type.name === "link")?.attrs
        if (attrs?.href && (event.ctrlKey || event.metaKey)) {
          window.open(attrs.href, "_blank", "noopener,noreferrer")
          return true
        }
        return false
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) return null

  // ✅ Simplified and safe list toggle logic
  const handleToggleList = (listType: "bulletList" | "orderedList") => {
    const chain = editor.chain().focus()

    if (listType === "bulletList") {
      chain.toggleBulletList().run()
    } else {
      chain.toggleOrderedList().run()
    }
  }

  const handleAddLink = () => {
    setLinkDialogOpen(true)
  }

  const handleLinkSubmit = (url: string) => {
    const { from, to } = editor.state.selection
    const hasSelection = from !== to

    if (hasSelection) {
      editor.chain().focus().setLink({ href: url }).run()
    } else {
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${url}">${url}</a>`)
        .run()
    }
  }

  return (
    <>
      <div
        className={cn(
          "border rounded-lg overflow-hidden bg-background",
          className
        )}
      >
        {/* Toolbar */}
        <div className="border-b bg-muted/30 p-2 flex flex-wrap gap-1">
          {/* Bold */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "h-8 w-8 p-0",
              editor.isActive("bold") && "bg-muted"
            )}
            title="Negrita (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </Button>

          {/* Italic */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "h-8 w-8 p-0",
              editor.isActive("italic") && "bg-muted"
            )}
            title="Cursiva (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </Button>

          {/* Underline */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              "h-8 w-8 p-0",
              editor.isActive("underline") && "bg-muted"
            )}
            title="Subrayado (Ctrl+U)"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>

          <div className="w-px h-8 bg-border mx-1" />

          {/* Lists */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleToggleList("bulletList")}
            className={cn(
              "h-8 w-8 p-0",
              editor.isActive("bulletList") && "bg-muted"
            )}
            title="Lista con viñetas"
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleToggleList("orderedList")}
            className={cn(
              "h-8 w-8 p-0",
              editor.isActive("orderedList") && "bg-muted"
            )}
            title="Lista numerada"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <div className="w-px h-8 bg-border mx-1" />

          {/* Link */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddLink}
            className={cn(
              "h-8 w-8 p-0",
              editor.isActive("link") && "bg-muted"
            )}
            title="Agregar enlace"
          >
            <Link2 className="h-4 w-4" />
          </Button>

          <div className="w-px h-8 bg-border mx-1" />

          {/* Undo / Redo */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="h-8 w-8 p-0"
            title="Deshacer (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="h-8 w-8 p-0"
            title="Rehacer (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        {/* Editor */}
        <EditorContent editor={editor} />
      </div>

      <LinkDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        onSubmit={handleLinkSubmit}
      />
    </>
  )
}
