"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useContext } from "react";

import { PostContext } from "../_provider/post-context-provider";

const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default function Preview() {
  const { unpublishedPost } = useContext(PostContext);
  return (
    <section className="mx-auto flex max-w-[800px] flex-col items-center justify-center p-4">
      <section className="relative h-72 w-full overflow-hidden rounded-xl">
        <Image
          fill={true}
          className="object-cover"
          src={unpublishedPost.headerImageURL || "/no-image.avif"}
          alt={
            `${unpublishedPost.title} Header Image` || "No Image Available Yet"
          }
        />
      </section>
      <section className="mt-4 flex gap-x-2">
        {unpublishedPost.tags.length > 0
          ? unpublishedPost.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#edf2f7] px-2 text-sm"
              >
                #{tag}
              </span>
            ))
          : null}
      </section>
      <h2 className="mt-4 text-center text-4xl font-bold">
        {unpublishedPost.title}
      </h2>
      <section className="mt-2">
        <Editor editable={false} unpublishedPost={unpublishedPost} />
      </section>
    </section>
  );
}
