import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getPublishedPostById } from "@/app/_lib/data";

import UpdatePostForm from "@/app/_ui/update-post-form";

export default async function Page({ params: { id: postId } }) {
  const { userId } = auth();
  const publishedPost = await getPublishedPostById(postId);

  if (publishedPost.userId !== userId) {
    redirect("/setting/posts");
  }

  return (
    <main className="mt-6">
      <UpdatePostForm publishedPost={publishedPost} postId={postId} />
    </main>
  );
}
