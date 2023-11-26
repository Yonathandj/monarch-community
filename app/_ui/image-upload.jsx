"use client";

import { useContext } from "react";
import { postContext } from "../_provider/post-provider";

import { SingleImageDropzone } from "./single-image-dropzone";

export default function ImageUpload() {
  const { post, setPost } = useContext(postContext);
  return (
    <section>
      <SingleImageDropzone
        width={450}
        height={250}
        value={post.file}
        onChange={(file) => {
          setPost({ ...post, file });
        }}
        className="mx-auto"
      />
      <p className="ml-4 font-bold tracking-wider text-xs text-red-600">
        * Good to use landscape image
      </p>
    </section>
  );
}
