"use client";

import { useContext } from "react";
import { useDebouncedCallback } from "use-debounce";
import { PostContext } from "@/app/_provider/post-context-provider";

import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

export default function Editor({ editable }) {
    const { post, setPost } = useContext(PostContext);
    
  const handleChange = useDebouncedCallback((topLevelBlocks) => {
    setPost({
      ...post,
      content: JSON.stringify(topLevelBlocks, null, 2),
    });
  }, 600);

  const editor = useBlockNote({
    editable,
    onEditorContentChange: (editor) => {
      handleChange(editor.topLevelBlocks);
    },
  });

  return <BlockNoteView editor={editor} />;
}
