"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useContext } from "react";

import { WritePostContext } from "../_provider/write-post-context-provider";
import { UpdatePostContext } from "../_provider/update-post-context-provider";

const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default function PostPreview() {
  const unpublishedPostData = useContext(WritePostContext);
  const updatedPublishedPostData = useContext(UpdatePostContext);

  return (
    <section className="mx-auto flex max-w-[800px] flex-col items-center justify-center p-4">
      <section className="relative h-72 w-full overflow-hidden rounded-xl">
        <Image
          fill={true}
          className="object-cover"
          src={
            updatedPublishedPostData?.updatedPublishedPost?.headerImageURL ||
            unpublishedPostData?.unpublishedPost?.headerImageURL ||
            "/no-image.avif"
          }
          alt={
            `${
              updatedPublishedPostData?.updatedPublishedPost?.title ||
              unpublishedPostData?.unpublishedPost?.title
            } Header Image` || "No Image Available Yet"
          }
        />
      </section>
      <section className="mt-4 flex gap-x-2">
        {updatedPublishedPostData?.updatedPublishedPost?.tags?.length > 0
          ? updatedPublishedPostData.updatedPublishedPost.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#edf2f7] px-2 text-sm"
              >
                #{tag}
              </span>
            ))
          : unpublishedPostData.unpublishedPost.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#edf2f7] px-2 text-sm"
              >
                #{tag}
              </span>
            ))}
      </section>
      <h2 className="mt-4 text-center text-4xl font-bold">
        {updatedPublishedPostData?.updatedPublishedPost?.title ||
          unpublishedPostData?.unpublishedPost.title}
      </h2>
      <section className="mt-2">
        <Editor
          editable={false}
          unpublishedPost={unpublishedPostData?.unpublishedPost}
          updatedPublishedPost={updatedPublishedPostData?.updatedPublishedPost}
        />
      </section>
    </section>
  );
}
