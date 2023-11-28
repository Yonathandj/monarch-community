"use client";

import { useDebouncedCallback } from "use-debounce";

import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

export default function Editor({
  editable,
  unpublishedPost,
  setUnpublishedPost,
}) {
  const onContentChange = useDebouncedCallback((topLevelBlocks) => {
    setUnpublishedPost({
      startWriting: true,
      data: {
        ...unpublishedPost.data,
        content: JSON.stringify(topLevelBlocks, null, 2),
      },
    });
  }, 1000);

  const editor = useBlockNote({
    editable,
    onEditorContentChange: (editor) => {
      onContentChange(editor.topLevelBlocks);
    },
    initialContent: JSON.parse(unpublishedPost.data.content),
  });

  return <BlockNoteView editor={editor} />;
}
