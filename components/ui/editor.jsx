"use client";

import { useDebouncedCallback } from "use-debounce";

import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

export default function Editor({
  editable,
  publishedPost,
  unpublishedPost,
  setUnpublishedPost,
  updatedPublishedPost,
  setUpdatedPublishedPost,
}) {
  const onContentChange = useDebouncedCallback((topLevelBlocks) => {
    updatedPublishedPost
      ? setUpdatedPublishedPost({
          ...updatedPublishedPost,
          content: JSON.stringify(topLevelBlocks, null, 2),
        })
      : setUnpublishedPost({
          ...unpublishedPost,
          content: JSON.stringify(topLevelBlocks, null, 2),
        });
  }, 1000);

  const editor = useBlockNote({
    editable,
    onEditorContentChange: (editor) => {
      onContentChange(editor.topLevelBlocks);
    },
    initialContent: publishedPost
      ? JSON.parse(publishedPost)
      : unpublishedPost
        ? JSON.parse(unpublishedPost.content)
        : JSON.parse(updatedPublishedPost.content),
  });

  return <BlockNoteView editor={editor} />;
}
