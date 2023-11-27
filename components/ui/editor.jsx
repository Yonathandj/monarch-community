"use client";

import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

export default function Editor({ editable, content }) {
  const editor = useBlockNote({
    editable,
    initialContent: JSON.parse(content) || [],
  });

  return <BlockNoteView editor={editor} />;
}
