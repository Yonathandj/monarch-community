"use client";

import dynamic from "next/dynamic";
import { useContext } from "react";
import { useDebouncedCallback } from "use-debounce";

import { TagsInput } from "react-tag-input-component";

import { PostContext } from "../_provider/post-context-provider";

import { Textarea } from "@/components/ui/textarea";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default function WriteForm() {
  const { unpublishedPost, setUnpublishedPost } = useContext(PostContext);

  const debouncedOnChangeTextarea = useDebouncedCallback((title) => {
    setUnpublishedPost({
      startWriting: true,
      data: { ...unpublishedPost.data, title },
    });
  }, 1000);

  return (
    <form className="max-w-[800px] mx-auto flex flex-col gap-y-2 p-4">
      <SingleImageDropzone
        width={450}
        height={250}
        className="mx-auto"
        value={unpublishedPost.data.headerImageURL}
        onChange={(file) => {
          setUnpublishedPost({
            startWriting: true,
            data: { ...unpublishedPost.data, headerImageURL: file },
          });
        }}
      />

      <TagsInput
        name="tags"
        separators={["Tab"]}
        value={unpublishedPost.data.tags}
        onChange={(tags) => {
          setUnpublishedPost({
            startWriting: true,
            data: { ...unpublishedPost.data, tags },
          });
        }}
        placeHolder="Untagged post (press tab to add)"
      />

      <Textarea
        name="title"
        placeholder="Untitled post"
        defaultValue={unpublishedPost.data.title}
        onChange={(e) => {
          debouncedOnChangeTextarea(e.target.value);
        }}
        className="mt-4 border-none shadow-none text-4xl focus-visible:ring-0 font-bold resize-none overflow-hidden p-0"
      />

      <Editor
        editable={true}
        unpublishedPost={unpublishedPost}
        setUnpublishedPost={setUnpublishedPost}
      />
    </form>
  );
}
