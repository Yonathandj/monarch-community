import PostCard from "../_ui/post-card";

import { getPublishedPosts } from "../_lib/data";

export default async function Page() {
  const publishedPosts = await getPublishedPosts();

  return (
    <main className="flex flex-col gap-y-4">
      {publishedPosts.map((publishedPost) => (
        <PostCard key={publishedPost._id} publishedPost={publishedPost} />
      ))}
    </main>
  );
}
