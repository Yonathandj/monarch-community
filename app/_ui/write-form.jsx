"use client";

import { useContext } from "react";
import { PostContext } from "../_provider/post-context-provider";

import { Textarea } from "@/components/ui/textarea";

import { SingleImageDropzone } from "./single-image-dropzone";

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
      <Textarea
        name="title"
        placeholder="Untitled post"
        className="mt-4 border-none shadow-none text-4xl focus-visible:ring-0 font-bold resize-none overflow-hidden"
      />
    </form>
  );
}
