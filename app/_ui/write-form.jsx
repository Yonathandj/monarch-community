"use client";

import dynamic from "next/dynamic";

import { useContext } from "react";
import { PostContext } from "../_provider/post-context-provider";

import { TagsInput } from "react-tag-input-component";

import { SingleImageDropzone } from "./single-image-dropzone";

import { Textarea } from "@/components/ui/textarea";
const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default function WriteForm() {
  const { post, setPost } = useContext(PostContext);

  return (
    <form>
      <SingleImageDropzone
        width={450}
        height={250}
        value={post.headerImage}
        onChange={(file) => {
          setPost({ ...post, headerImage: file });
        }}
        className="mx-auto"
      />
      <TagsInput
        name="tags"
        value={post.tags}
        onChange={(tags) => setPost({ ...post, tags })}
        separators={["Tab"]}
        placeHolder="Untagged post (press tab to add)"
      />
      <Textarea
        name="title"
        placeholder="Untitled post"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        className="mt-4 border-none shadow-none text-4xl focus-visible:ring-0 font-bold resize-none overflow-hidden"
      />
      <Editor editable={true} />
    </form>
  );
}
