"use client";

import { useDebouncedCallback } from "use-debounce";

import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

export default function Editor({
  editable,
  publishedPost,
  fromPostDetail = false,
  unpublishedPost,
  setUnpublishedPost,
}) {
  const onContentChange = useDebouncedCallback((topLevelBlocks) => {
    setUnpublishedPost({
      ...unpublishedPost,
      content: JSON.stringify(topLevelBlocks, null, 2),
    });
  }, 1000);

  const editor = useBlockNote({
    editable,
    onEditorContentChange: (editor) => {
      onContentChange(editor.topLevelBlocks);
    },
    initialContent: fromPostDetail
      ? JSON.parse(publishedPost)
      : JSON.parse(unpublishedPost.content),
  });

  return <BlockNoteView editor={editor} />;
}
