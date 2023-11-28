"use client";

import { startTransition } from "react";

import { useDebouncedCallback } from "use-debounce";

import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

import { handleUnpublishedPostAction } from "@/app/_lib/actions";

export default function Editor({ editable, content, userId }) {
  const handleContentChange = useDebouncedCallback((topLevelBlocks) => {
    startTransition(() =>
      handleUnpublishedPostAction({
        userId,
        content: JSON.stringify(topLevelBlocks, null, 2),
      })
    );
  }, 1000);

  const editor = useBlockNote({
    editable,
    onEditorContentChange: (editor) => {
      handleContentChange(editor.topLevelBlocks);
    },
    initialContent: content ? JSON.parse(content) : [],
  });

  return <BlockNoteView editor={editor} />;
}
