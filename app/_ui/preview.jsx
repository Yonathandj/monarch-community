"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useContext } from "react";

import { PostContext } from "../_provider/post-context-provider";

const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default function Preview() {
  const { unpublishedPost } = useContext(PostContext);
  return (
    <section className="mx-auto max-w-[800px] p-4 flex flex-col justify-center items-center">
      <Image
        width={500}
        height={500}
        src={unpublishedPost.headerImageURL || "/no-image.avif"}
        alt={
          `${unpublishedPost.title} Header Image` || "No Image Available Yet"
        }
      />
      <section className="mt-2 flex gap-x-2">
        {unpublishedPost.tags.length > 0
          ? unpublishedPost.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-[#edf2f7] px-2 rounded-full"
              >
                {tag}
              </span>
            ))
          : null}
      </section>
      <h2 className="text-4xl font-bold mt-2 text-center">{unpublishedPost.title}</h2>
      <section className="mt-2">
        <Editor editable={false} unpublishedPost={unpublishedPost} />
      </section>
    </section>
  );
}
