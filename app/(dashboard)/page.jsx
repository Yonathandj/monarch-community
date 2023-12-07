import { auth } from "@clerk/nextjs";

import PostsCard from "../_ui/posts-card";

export default function Page() {
  return (
    <main className="mt-6">
      <PostsCard />
    </main>
  );
}
