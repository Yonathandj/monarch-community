import Image from "next/image";
import dynamic from "next/dynamic";

import { getPublishedPostById } from "../_lib/data";

const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default async function PostDetail({ postId }) {
  const publishedPost = await getPublishedPostById(postId);

  return (
    <section className="mx-auto max-w-[800px] p-4 flex flex-col justify-center items-center">
      <section className="relative w-full h-72 overflow-hidden rounded-xl">
        <Image
          fill={true}
          className="object-cover"
          src={publishedPost.data.headerImageURL || "/no-image.avif"}
          alt={
            `${publishedPost.data.title} Header Image` ||
            "No Image Available Yet"
          }
        />
      </section>
      <section className="mt-4 flex gap-x-2">
        {publishedPost.data.tags.length > 0
          ? publishedPost.data.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-[#edf2f7] px-2 rounded-full"
              >
                #{tag}
              </span>
            ))
          : null}
      </section>
      <h2 className="text-4xl font-bold mt-4 text-center">
        {publishedPost.data.title}
      </h2>
      <section className="mt-2">
        <Editor
          editable={false}
          fromPostDetail={true}
          publishedPost={publishedPost.data.content}
        />
      </section>
    </section>
  );
}
