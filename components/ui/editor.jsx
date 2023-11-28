"use client";

import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

export default function Editor({ editable }) {
  const editor = useBlockNote({
    editable,
  });

  return <BlockNoteView editor={editor} />;
}
