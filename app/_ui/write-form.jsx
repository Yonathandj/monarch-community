"use client";

import dynamic from "next/dynamic";

import { startTransition } from "react";

import { useEdgeStore } from "../_lib/edgestore";
import { handleUnpublishedPostAction } from "../_lib/actions";

import { TagsInput } from "react-tag-input-component";

import { Textarea } from "@/components/ui/textarea";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default function WriteForm({ unpublishedPost, userId }) {
  const { edgestore } = useEdgeStore();

  return (
    <form className="max-w-[800px] mx-auto flex flex-col gap-y-2 p-4">
      <SingleImageDropzone
        width={450}
        height={250}
        className="mx-auto"
        value={unpublishedPost?.data?.headerImageURL || null}
        onChange={async (file) => {
          const response = await edgestore.publicImages.upload({
            file,
          });
          startTransition(() =>
            handleUnpublishedPostAction({
              userId,
              headerImageURL: response.url,
            })
          );
        }}
      />

      <TagsInput
        name="tags"
        separators={["Tab"]}
        value={unpublishedPost?.data?.tags || []}
        placeHolder="Untagged post (press tab to add)"
        onChange={(tags) => {
          startTransition(() => handleUnpublishedPostAction({ userId, tags }));
        }}
      />

      <Textarea
        name="title"
        placeholder="Untitled post"
        value={unpublishedPost?.data?.title || ""}
        onChange={(e) => {
          startTransition(() =>
            handleUnpublishedPostAction({ userId, title: e.target.value })
          );
        }}
        className="mt-4 border-none shadow-none text-4xl focus-visible:ring-0 font-bold resize-none overflow-hidden p-0"
      />
      <Editor
        editable={true}
        userId={userId}
        content={unpublishedPost?.data?.content}
      />
    </form>
  );
}
