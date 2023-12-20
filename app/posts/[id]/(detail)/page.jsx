import { auth } from "@clerk/nextjs";

import UserCard from "@/app/_ui/user-card";
import PostDetail from "@/app/_ui/post-detail";
import UserInteraction from "@/app/_ui/user-interaction";
import PostCommentForm from "@/app/_ui/post-comment-form";

export default function Page({ params: { id } }) {
  const { userId } = auth();

  return (
    <main className="mt-6">
      <section className="flex">
        <UserInteraction userId={userId} postId={id} />
        <section className="flex flex-col-reverse lg:flex-row">
          <PostDetail postId={id} />
          <UserCard postId={id} />
        </section>
      </section>
      <PostCommentForm userId={userId} />
    </main>
  );
}
