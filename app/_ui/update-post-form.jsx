"use client";

import Loading from "./loading";
import UpdatePostButton from "./update-post-button";

import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Textarea } from "@/components/ui/textarea";
import { TagsInput } from "react-tag-input-component";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
import { UpdatePostContext } from "../_provider/update-post-context-provider";
const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default function UpdatePostForm({ postId }) {
  const [showEditor, setShowEditor] = useState(false);
  const {
    initialHeaderImageURL,
    loadingFetchPublishedPost,
    updatedPublishedPost,
    setUpdatedPublishedPost,
  } = useContext(UpdatePostContext);

  const debouncedOnChangeTextarea = useDebouncedCallback((title) => {
    setUpdatedPublishedPost({ ...updatedPublishedPost, title });
  }, 1000);

  setTimeout(() => {
    setShowEditor(true);
  }, 3000);

  return (
    <section className="relative">
      {loadingFetchPublishedPost ? <Loading /> : null}
      <form className="mx-auto flex max-w-[800px] flex-col gap-y-2 p-6">
        <SingleImageDropzone
          width={450}
          height={250}
          className="mx-auto"
          value={updatedPublishedPost.headerImageURL}
          onChange={(file) => {
            setUpdatedPublishedPost({
              ...updatedPublishedPost,
              headerImageURL: file,
            });
          }}
        />
        <TagsInput
          name="tags"
          separators={["Tab"]}
          value={updatedPublishedPost.tags}
          placeHolder="Untagged post (press tab to add)"
          onChange={(tags) => {
            setUpdatedPublishedPost({ ...updatedPublishedPost, tags });
          }}
        />
        <Textarea
          name="title"
          placeholder="Untitled post"
          defaultValue={updatedPublishedPost.title}
          onChange={(e) => {
            debouncedOnChangeTextarea(e.target.value);
          }}
          className="mt-4 resize-none overflow-hidden border-none p-0 text-4xl font-bold shadow-none focus-visible:ring-0"
        />
        {showEditor ? (
          <Editor
            editable={true}
            updatedPublishedPost={updatedPublishedPost}
            setUpdatedPublishedPost={setUpdatedPublishedPost}
          />
        ) : null}
        <section className="mt-16">
          <UpdatePostButton
            postId={postId}
            updatedPublishedPost={updatedPublishedPost}
            initialHeaderImageURL={initialHeaderImageURL}
          />
        </section>
      </form>
    </section>
  );
}
