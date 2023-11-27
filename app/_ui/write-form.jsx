"use client";

import dynamic from "next/dynamic";

import { TagsInput } from "react-tag-input-component";

import { Textarea } from "@/components/ui/textarea";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default function WriteForm({ unpublishedPost }) {
  return (
    <form className="max-w-[800px] mx-auto flex flex-col gap-y-2 p-4">
      <SingleImageDropzone
        width={450}
        height={250}
        className="mx-auto"
        onChange={(file) => {}}
        value={unpublishedPost?.data?.headerImageURL || null}
      />
      <TagsInput
        name="tags"
        separators={["Tab"]}
        onChange={(tags) => {}}
        value={unpublishedPost?.data?.tags || []}
        placeHolder="Untagged post (press tab to add)"
      />
      <Textarea
        name="title"
        onChange={(e) => {}}
        placeholder="Untitled post"
        value={unpublishedPost?.data?.title || ""}
        className="mt-4 border-none shadow-none text-4xl focus-visible:ring-0 font-bold resize-none overflow-hidden p-0"
      />
      <Editor editable={true} content={unpublishedPost?.data?.content} />
    </form>
  );
}
