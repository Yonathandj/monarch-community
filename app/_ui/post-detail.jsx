import Image from "next/image";
import dynamic from "next/dynamic";

import { getPublishedPostByPostId } from "../_lib/data";

const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default async function PostDetail({ postId }) {
  const publishedPost = await getPublishedPostByPostId(postId);

  return (
    <section className="mx-auto flex max-w-[800px] flex-col items-center justify-center p-4">
      <section className="relative h-72 w-full overflow-hidden rounded-xl">
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
                className="rounded-full bg-[#edf2f7] px-2 text-sm"
              >
                #{tag}
              </span>
            ))
          : null}
      </section>
      <h1 className="mt-4 text-center text-4xl font-bold">
        {publishedPost.data.title}
      </h1>
      <section className="mt-2">
        <Editor editable={false} publishedPost={publishedPost.data.content} />
      </section>
    </section>
  );
}
