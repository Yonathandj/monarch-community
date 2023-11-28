"use client";

import dynamic from "next/dynamic";

import { TagsInput } from "react-tag-input-component";

import { Textarea } from "@/components/ui/textarea";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default function WriteForm() {
  return (
    <form className="max-w-[800px] mx-auto flex flex-col gap-y-2 p-4">
      <SingleImageDropzone
        width={450}
        height={250}
        value={null}
        className="mx-auto"
        onChange={async (file) => {}}
      />

      <TagsInput
        name="tags"
        value={null}
        separators={["Tab"]}
        onChange={(tags) => {}}
        placeHolder="Untagged post (press tab to add)"
      />

      <Textarea
        name="title"
        placeholder="Untitled post"
        value={null}
        onChange={(e) => {}}
        className="mt-4 border-none shadow-none text-4xl focus-visible:ring-0 font-bold resize-none overflow-hidden p-0"
      />
      <Editor editable={true} />
    </form>
  );
}
